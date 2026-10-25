/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  App,
  Table,
  Card,
  Button,
  Tag,
  Space,
  Input,
  Row,
  Col,
  Form,
  Select,
  Badge,
  Typography,
  Modal,
  Tooltip,
  Spin,
} from 'antd';
import {
  ReloadOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  EyeOutlined,
  KeyOutlined,
  UndoOutlined,
  ToolOutlined,
  UnlockOutlined,
  ExportOutlined,
  MailOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { PermissionGuard } from '@/components/PermissionGuard';
import api from '@/service/api';
import { formatDate } from '@/utils';
import { PAGINATION } from '@/constants';
import { useTranslation } from 'react-i18next';
import Actions, { ActionProps } from '@/components/Actions';
import { Avatar } from '@/components/Avatar';
import { useRequest } from 'ahooks';
import { useSite } from '@/contexts/SiteContext';
import { useAI, type RegisteredClientTool } from '@/contexts/AIContext';

const { Option } = Select;

const USER_STATUS_VALUES = ['active', 'disabled', 'deleted', 'locked', 'password_expired', 'pending_activation'] as const;

/** Compact user shape returned to the AI model by page tools. */
const summarizeUsers = (list: API.User[]) =>
  list.map((u) => ({
    id: u.id,
    username: u.username,
    full_name: u.full_name,
    email: u.email,
    status: u.status,
  }));

const FixUserModal = ({ user, onClose, onSuccess }: { user: API.User | null, onClose: () => void, onSuccess: () => void }) => {
  const { message } = App.useApp();
  const { t } = useTranslation("authorization");

  const [fixMethod, setFixMethod] = useState<'local' | 'bind' | null>(null);
  const [ldapUserDN, setLdapUserDN] = useState<string | null>(null);


  const { run: handleUpdateUser, loading: updateUserLoading } = useRequest(api.authorization.updateUser, {
    onSuccess: () => {
      message.success(t('user.updateUserSuccess', { defaultValue: 'User updated successfully' }));
      onSuccess();
    },
    onError: (error) => {
      message.error(t('user.updateUserError', { defaultValue: 'Failed to update user', error: error.message }));
    },
    manual: true,
  });

  const { data: ldapUsers, loading: ldapUsersLoading } = useRequest(async () => {
    if (fixMethod === 'bind') {
      return api.authorization.getLdapUsers({ skip_existing: true }).then((users) => {
        const recommend = []
        const other = []
        for (const ldapUser of users) {
          if (ldapUser.username === user?.username ||
            ldapUser.email === user?.email ||
            ldapUser.full_name === user?.full_name
          ) {
            recommend.push({ recommend: true, ...ldapUser })
          } else {
            other.push({ recommend: false, ...ldapUser })
          }
        }
        return [...recommend, ...other]
      });
    }
    return Promise.resolve([]);
  }, {
    refreshDeps: [user?.id, fixMethod],
  });

  useEffect(() => {
    if (user) {
      setFixMethod(null)
      setLdapUserDN(null)
    }
  }, [user])


  return <Modal
    open={user !== null}
    onCancel={onClose}
    onOk={() => {
      if (user) {
        if (fixMethod === 'local') {
          return handleUpdateUser({ id: user.id }, { source: 'local' });
        } else if (fixMethod === 'bind') {
          if (!ldapUserDN) {
            message.error(t('user.ldapUserDNRequired', { defaultValue: 'LDAP User DN is required' }));
            return;
          }
          return handleUpdateUser({ id: user.id }, { source: 'ldap', ldap_dn: ldapUserDN });
        } else {
          message.error(t('user.unknownFixMethod', { defaultValue: 'Unknown fix method' }));
          return;
        }
      }
      message.error(t('user.unknownUserId', { defaultValue: 'Unknown user id' }));
      return;
    }}
    title={t('user.fixUserTitle', { defaultValue: 'Fix User' })}>
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button loading={updateUserLoading} style={{ width: '100%', height: 40 }} type={'default'} variant='outlined' color={fixMethod === 'local' ? 'primary' : 'default'} onClick={() => setFixMethod('local')}>{t('user.fixUserConvertToLocal', { defaultValue: 'Convert to Local' })}</Button>
      <Button loading={updateUserLoading} style={{ width: '100%', height: 40 }} type={'default'} variant='outlined' color={fixMethod === 'bind' ? 'primary' : 'default'} onClick={() => setFixMethod('bind')}>{t('user.fixUserBindLDAPUser', { defaultValue: 'Bind LDAP User' })}</Button>
      <Select
        loading={ldapUsersLoading}
        style={{ display: fixMethod === 'bind' ? 'block' : 'none' }}
        onSelect={(value) => setLdapUserDN(value)}
        options={ldapUsers?.map((user) => ({ label: <div><Tag color={user.recommend ? 'blue' : 'default'}>{user.full_name}</Tag> {user.username} - {user.email} - {user.ldap_dn}</div>, value: user.ldap_dn }))}

        showSearch={true}
      />
    </Space>
  </Modal >
}

// User list page
const UserList: React.FC = () => {
  const { message, modal } = App.useApp();

  const { registerPageAI } = useAI();
  const { addTask } = useSite();
  const navigate = useNavigate();
  const { t } = useTranslation("authorization");
  const { t: tCommon } = useTranslation("common");
  const [searchForm] = Form.useForm();

  // Data state
  const [users, setUsers] = useState<API.User[]>([]);
  const [total, setTotal] = useState(0);

  const { enableMultiOrg } = useSite();

  const [fixUser, setFixUser] = useState<API.User | null>(null);
  // Query parameters
  const [queryParams, setQueryParams] = useState<API.listUsersParams>({
    current: PAGINATION.DEFAULT_CURRENT,
    page_size: PAGINATION.DEFAULT_PAGE_SIZE,
    keywords: undefined,
    status: undefined,
  });

  // Latest page state for AI tool handlers (they run outside the render cycle).
  const usersRef = useRef(users);
  usersRef.current = users;
  const totalRef = useRef(total);
  totalRef.current = total;
  const queryParamsRef = useRef(queryParams);
  queryParamsRef.current = queryParams;

  // Resolvers waiting for the next list load, so AI tools can return fresh data.
  const loadWaitersRef = useRef<Array<(ok: boolean) => void>>([]);
  const settleLoadWaiters = (ok: boolean) => {
    const waiters = loadWaitersRef.current;
    loadWaitersRef.current = [];
    waiters.forEach((resolve) => resolve(ok));
  };
  const waitForNextLoad = useCallback((timeoutMs = 10000) => new Promise<boolean>((resolve) => {
    let settled = false;
    const done = (ok: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(ok);
    };
    const timer = setTimeout(() => {
      loadWaitersRef.current = loadWaitersRef.current.filter((w) => w !== done);
      done(false);
    }, timeoutMs);
    loadWaitersRef.current.push(done);
  }), []);

  const { data: organizations, loading: organizationsLoading } = useRequest(async () => {
    return (await api.system.listOrganizations({ current: 1, page_size: 1000 })).data || [];
  }, {
    refreshDeps: [enableMultiOrg],
    onError: (error) => {
      message.error(t('organizations.loadError', { defaultValue: 'Failed to load organizations', error: error.message }));
    },
    cacheKey: 'fetchAllOrganizations',
    cacheTime: 1000 * 60 * 10,
  });


  const renderOrganizationRole = useCallback((organization_id: string, role: API.Role): React.ReactNode => {
    if (organizationsLoading) {
      return <>{<Spin size="small" />}:{role.name}</>;
    }
    const organization = organizations?.find(org => org.id === organization_id);
    if (organization) {
      return `${organization.name}:${role.name}`;
    }
    return role.name;
  }, [organizations, organizationsLoading]);

  // Load user list
  const { run: fetchUsers, loading } = useRequest(() => {
    const filters = {
      status: queryParams.status,
      keywords: queryParams.keywords
    };
    return api.authorization.listUsers({
      current: queryParams.current,
      page_size: queryParams.page_size,
      ...filters
    });
  }, {
    onSuccess: (result) => {
      const nextUsers = result.data || [];
      const nextTotal = result.total || 0;
      // Update refs before waking AI waiters: they snapshot immediately,
      // before React re-renders and the render-time ref assignments run.
      usersRef.current = nextUsers;
      totalRef.current = nextTotal;
      setUsers(nextUsers);
      setTotal(nextTotal);
      settleLoadWaiters(true);
    },
    onError: (error) => {
      message.error(t('user.loadError', { defaultValue: 'Failed to load users', error: error.message }));
      settleLoadWaiters(false);
    },
    refreshDeps: [queryParams],
  });

  // Search form submission
  const handleSearch = (values: { keywords?: string; status?: string }) => {
    setQueryParams({
      ...queryParams,
      current: PAGINATION.DEFAULT_CURRENT, // Reset to the first page
      keywords: values.keywords,
      status: values.status,
    });
  };


  // Page change event
  const handlePageChange = (page: number, pageSize: number) => {
    setQueryParams(prev => ({
      ...prev,
      current: page,
      page_size: pageSize,
    }));
  };

  // AI chat integration: expose the page state and the actions a user can
  // perform on this page as client tools. Handlers call the same state
  // setters as the UI, so the model never bypasses what the user can do here.
  useEffect(() => {
    const snapshot = () => {
      const query = queryParamsRef.current;
      const pageSize = query.page_size || PAGINATION.DEFAULT_PAGE_SIZE;
      const current = query.current || PAGINATION.DEFAULT_CURRENT;
      const total = totalRef.current;
      const pageCount = Math.max(1, Math.ceil(total / pageSize) || 1);
      return {
        query: {
          current,
          page_size: pageSize,
          keywords: query.keywords ?? null,
          status: query.status ?? null,
        },
        total,
        page_count: pageCount,
        has_more: current * pageSize < total,
        users: summarizeUsers(usersRef.current),
      };
    };
    const sameQuery = (a: API.listUsersParams, b: API.listUsersParams) =>
      a.current === b.current
      && a.page_size === b.page_size
      && (a.keywords || undefined) === (b.keywords || undefined)
      && (a.status || undefined) === (b.status || undefined);
    const applyQueryAndWait = async (patch: Partial<API.listUsersParams>) => {
      const next = { ...queryParamsRef.current, ...patch };
      // Same query object values would still retrigger useRequest via a new
      // object identity; skip the state update so the table does not reload.
      if (sameQuery(queryParamsRef.current, next)) {
        return JSON.stringify({ ok: true, already_current: true, ...snapshot() });
      }
      queryParamsRef.current = next;
      const load = waitForNextLoad();
      setQueryParams(next);
      const loaded = await load;
      return JSON.stringify({ ok: loaded, ...(loaded ? {} : { warning: 'List did not finish loading; data may be stale' }), ...snapshot() });
    };

    const tools: RegisteredClientTool[] = [
      {
        name: 'ui_search_users',
        description:
          'Filter the user list by keyword (matches username, full name, or email) and/or status, then return the first page of results. The result includes total, page_count, and has_more. If has_more is false, do not call ui_set_users_page. Omit a field to clear that filter.',
        parameters: {
          type: 'object',
          properties: {
            keywords: { type: 'string', description: 'Search keyword; empty or omitted clears the keyword filter.' },
            status: {
              type: 'string',
              enum: [...USER_STATUS_VALUES],
              description: 'Status filter; omitted clears the status filter.',
            },
          },
          required: [],
        },
        handler: async (argsJson: string) => {
          const args = JSON.parse(argsJson || '{}') as { keywords?: string; status?: string };
          const keywords = args.keywords?.trim() || undefined;
          const status = args.status && (USER_STATUS_VALUES as readonly string[]).includes(args.status) ? args.status : undefined;
          if (args.status && !status) {
            return JSON.stringify({ error: `Invalid status "${args.status}"`, allowed: USER_STATUS_VALUES });
          }
          searchForm.setFieldsValue({ keywords, status });
          return applyQueryAndWait({ current: PAGINATION.DEFAULT_CURRENT, keywords, status });
        },
      },
      {
        name: 'ui_set_users_page',
        description:
          'Go to another page of the current filtered list, or change the page size. Only call this when the last result has has_more=true, or when you are changing page_size. Do not call it to look for more rows when has_more is false — that reloads the same page.',
        parameters: {
          type: 'object',
          properties: {
            page: { type: 'integer', minimum: 1, description: '1-based page number. Must be <= page_count from the last result.' },
            page_size: { type: 'integer', minimum: 1, maximum: 200, description: 'Rows per page; omitted keeps the current size.' },
          },
          required: [],
        },
        handler: async (argsJson: string) => {
          const args = JSON.parse(argsJson || '{}') as { page?: number; page_size?: number };
          const current = queryParamsRef.current;
          const pageSize = args.page_size && args.page_size > 0 ? Math.min(args.page_size, 200) : (current.page_size || PAGINATION.DEFAULT_PAGE_SIZE);
          const maxPage = Math.max(1, Math.ceil(totalRef.current / pageSize) || 1);
          if (args.page != null && args.page > maxPage) {
            return JSON.stringify({
              ok: false,
              error: `Page ${args.page} is out of range. There ${maxPage === 1 ? 'is only 1 page' : `are only ${maxPage} pages`}.`,
              requested_page: args.page,
              ...snapshot(),
            });
          }
          const page = Math.max(args.page ?? current.current ?? 1, 1);
          return applyQueryAndWait({ current: page, page_size: pageSize });
        },
      },
      {
        name: 'ui_open_user',
        description:
          'Open the detail page of a user from the current list, by user id or username. Navigates away from the list; the detail page has its own tools, if any.',
        parameters: {
          type: 'object',
          properties: {
            user_id: { type: 'string', description: 'User id (UUID). Preferred when known.' },
            username: { type: 'string', description: 'Username, resolved against the currently loaded page of users.' },
          },
          required: [],
        },
        handler: (argsJson: string) => {
          const args = JSON.parse(argsJson || '{}') as { user_id?: string; username?: string };
          const list = usersRef.current;
          const user = args.user_id
            ? list.find((u) => u.id === args.user_id)
            : args.username
              ? list.find((u) => u.username === args.username)
              : undefined;
          if (!user) {
            if (args.user_id) {
              // Not on the current page but the id may still be valid; let the detail page decide.
              navigate(`/authorization/users/${args.user_id}`);
              return JSON.stringify({ ok: true, path: `/authorization/users/${args.user_id}`, note: 'User id not found in the loaded page; opened by id.' });
            }
            return JSON.stringify({
              error: 'User not found in the currently loaded page. Provide user_id or search first with ui_search_users.',
              loaded_users: summarizeUsers(list).map((u) => ({ id: u.id, username: u.username })),
            });
          }
          navigate(`/authorization/users/${user.id}`);
          return JSON.stringify({ ok: true, path: `/authorization/users/${user.id}`, user: summarizeUsers([user])[0] });
        },
      },
    ];

    return registerPageAI({
      ephemeralSystemPrompts: [
        'The user is on the User Management list page. Use ui_get_page_data to read the loaded users and current filters, ui_search_users to filter, ui_set_users_page only when has_more is true or you need a different page_size, and ui_open_user to open a user. Tool results include total, page_count, and has_more; do not paginate when has_more is false. Prefer these tools over describing manual steps.',
      ],
      pageData: snapshot,
      pageDataDescription: 'Returns the current query (page, page size, keywords, status), total, page_count, has_more, and the loaded users (id, username, full_name, email, status).',
      tools,
    });
  }, [registerPageAI, navigate, searchForm, waitForNextLoad]);

  // Restore user
  const { run: handleRestore } = useRequest(api.authorization.restoreUser, {
    onSuccess: () => {
      message.success(t('user.restoreSuccess', { defaultValue: 'User restored successfully' }));
      fetchUsers();
    },
    onError: (error) => {
      message.error(t('user.restoreError', { defaultValue: 'Failed to restore user', error: error.message }));
    },
    manual: true,
  });

  // Delete user
  const { run: handleDelete } = useRequest(api.authorization.deleteUser, {
    onSuccess: () => {
      message.success(t('user.deleteSuccess', { defaultValue: 'User deleted successfully' }));
      fetchUsers();
    },
    onError: (error) => {
      message.error(t('user.deleteError', { defaultValue: 'Failed to delete user', error: error.message }));
    },
    manual: true,
  });

  const { runAsync: runResetPassword } = useRequest(
    (p: { id: string; email: string }) =>
      api.authorization.resetUserPassword({ id: p.id }, { password: '' }),
    {
      manual: true,
      onSuccess: (res, params) => {
        const p = params[0];
        message.success(t('user.resetPasswordSuccess', { defaultValue: 'Password reset successfully' }));
        if (res.new_password) {
          modal.info({
            title: t('user.resetPasswordSuccess', { defaultValue: 'Password Reset Successfully' }),
            content: (
              <Typography.Text copyable={{ text: res.new_password }}>
                {t('user.resetPasswordSuccessContent', {
                  defaultValue: `New password: ${res.new_password}`,
                  password: res.new_password,
                })}
              </Typography.Text>
            ),
          });
        } else {
          modal.info({
            title: t('user.resetPasswordSuccess', { defaultValue: 'Password Reset Successfully' }),
            content: t('user.resetPasswordSuccessSendByEmail', {
              defaultValue: 'The new password has been sent to the user email: {{email}}',
              email: p.email,
            }),
          });
        }
      },
      onError: () => {
        message.error(t('user.resetPasswordError', { defaultValue: 'Failed to reset password' }));
      },
    },
  );

  // Reset password
  const handleResetPassword = (id: string, username: string, email: string) => {
    modal.confirm({
      title: t('user.resetPasswordTitle', { defaultValue: 'Reset Password' }),
      content: t('user.resetPasswordConfirm', {
        defaultValue: `Are you sure you want to reset the password for ${username}?`,
        username,
      }),
      okText: tCommon('confirm', { defaultValue: 'Confirm' }),
      cancelText: tCommon('cancel', { defaultValue: 'Cancel' }),
      onOk: () => runResetPassword({ id, email }),
    });
  };

  // Create user export task (adds task to task list; user can download from task when complete)
  const { run: handleExport, loading: exportLoading } = useRequest(
    () =>
      api.authorization.createUserExportTask({
        keywords: queryParams.keywords,
        status: queryParams.status,
      }),
    {
      onSuccess: (res) => {
        const taskId = res.id;
        if (taskId) {
          message.success(
            t('user.exportTaskCreated', {
              defaultValue: 'Export task created. You can view progress and download the file from the task list.',
            })
          );
        } else {
          message.success(t('user.exportTaskCreatedShort', { defaultValue: 'Export task created.' }));
        }
        addTask(res);
      },
      onError: (error) => {
        message.error(
          t('user.exportError', {
            defaultValue: 'Failed to create export task',
            error: error instanceof Error ? error.message : String(error),
          })
        );
      },
      manual: true,
    }
  );

  const { runAsync: runUnlockUser } = useRequest(
    (userId: string) => api.authorization.unlockUser({ id: userId }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('user.unlockSuccess', { defaultValue: 'User unlocked successfully' }));
        fetchUsers();
      },
      onError: (error) => {
        message.error(
          t('user.unlockError', {
            defaultValue: 'Failed to unlock user: {{error}}',
            error: error instanceof Error ? error.message : String(error),
          }),
        );
      },
    },
  );

  const handleUnlock = (user: API.User) => {
    modal.confirm({
      title: t('user.unlockTitle', { defaultValue: 'Unlock User' }),
      content: t('user.unlockConfirm', {
        defaultValue: 'Are you sure you want to unlock this user?',
        username: user.username,
      }),
      onOk: () => runUnlockUser(user.id),
    });
  };

  const { runAsync: runAdminDisableMFA } = useRequest(
    (userId: string) => api.authorization.adminDisableUserMfa({ id: userId }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('user.adminDisableMFASuccess', { defaultValue: 'MFA disabled successfully' }));
        fetchUsers();
      },
      onError: (error) => {
        message.error(
          t('user.adminDisableMFAError', {
            defaultValue: 'Failed to disable MFA: {{error}}',
            error: error instanceof Error ? error.message : String(error),
          }),
        );
      },
    },
  );

  const handleAdminDisableMFA = (user: API.User) => {
    modal.confirm({
      title: t('user.adminDisableMFATitle', { defaultValue: 'Disable MFA' }),
      content: t('user.adminDisableMFAConfirm', {
        defaultValue: 'Are you sure you want to disable MFA for this user? They will be logged out of all sessions.',
        username: user.username,
      }),
      okType: 'danger',
      onOk: () => runAdminDisableMFA(user.id),
    });
  };

  const { runAsync: runResendActivation } = useRequest(
    (userId: string) => api.authorization.resendActivationEmail({ id: userId }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('user.resendActivationSuccess', { defaultValue: 'Activation email resent successfully' }));
      },
      onError: (error) => {
        message.error(
          t('user.resendActivationError', {
            defaultValue: 'Failed to resend activation email: {{error}}',
            error: error instanceof Error ? error.message : String(error),
          }),
        );
      },
    },
  );

  const handleResendActivation = (user: API.User) => {
    modal.confirm({
      title: t('user.resendActivationTitle', { defaultValue: 'Resend Activation Email' }),
      content: t('user.resendActivationConfirm', {
        defaultValue: 'Resend activation email to {{email}}?',
        email: user.email,
      }),
      onOk: () => runResendActivation(user.id),
    });
  };

  // Build table columns
  const columns = [
    {
      title: t('user.username', { defaultValue: 'Username' }),
      key: 'user',
      render: (_: unknown, record: API.User) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            size="small"
            icon={<UserOutlined />}
            src={record.avatar}
            style={{ marginRight: 8 }}
          />
          <Link to={`/authorization/users/${record.id}`}>{record.username}</Link>
        </div>
      ),
    },
    {
      title: t('user.fullName', { defaultValue: 'Full Name' }),
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: t('user.email', { defaultValue: 'Email' }),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('user.source', { defaultValue: 'Source' }),
      dataIndex: 'source',
      key: 'source',
      render: (source: string, record: API.User) => {
        switch (source) {
          case 'ldap':
            if (!record.ldap_dn) {
              return <Tooltip title={t('user.ldapUserNotBound', { defaultValue: 'LDAP User is not bound to any local user, please bind it.' })}>
                <Tag color="red">{t('user.sourceLdap', { defaultValue: 'LDAP' })}</Tag>
              </Tooltip>;
            }
            return <Tag color="blue">{t('user.sourceLdap', { defaultValue: 'LDAP' })}</Tag>;
          case 'oauth2':
            return <Tag color="green">{t('user.sourceOauth2', { defaultValue: 'OAuth2' })}</Tag>;
          default:
            return <Tag color="default">{t('user.sourceLocal', { defaultValue: 'Local' })}</Tag>;
        }
      },
    },
    {
      title: t('user.status', { defaultValue: 'Status' }),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        switch (status) {
          case 'disabled':
            return <Badge status="default" text={t('user.statusEnum.disabled', { defaultValue: 'Disabled' })} />;
          case 'password_expired':
            return <Badge status="warning" text={t('user.statusEnum.password_expired', { defaultValue: 'Password Expired' })} />;
          case 'active':
            return <Badge status="success" text={t('user.statusEnum.active', { defaultValue: 'Active' })} />;
          case 'locked':
            return <Badge status="warning" text={t('user.statusEnum.locked', { defaultValue: 'Locked' })} />;
          case 'deleted':
            return <Badge status="error" text={t('user.statusEnum.deleted', { defaultValue: 'Deleted' })} />;
          case 'pending_activation':
            return <Badge status="processing" text={t('user.statusEnum.pending_activation', { defaultValue: 'Pending Activation' })} />;
          default:
            return <Badge status="default" text={t(`user.statusEnum.${status}`, { defaultValue: status.charAt(0).toUpperCase() + status.slice(1) })} />;
        }
      },
    },
    {
      title: t('user.roles', { defaultValue: 'Roles' }),
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: API.Role[]) => (
        <span>
          {roles && roles.length > 0 ? (
            roles.map(role => (
              <Tag color="blue" key={role.id}>
                {role.organization_id ? renderOrganizationRole(role.organization_id, role) : role.name}
              </Tag>
            ))
          ) : (
            <Tag>{t('user.noRole', { defaultValue: 'No Role' })}</Tag>
          )}
        </span>
      ),
    },
    {
      title: t('user.mfa', { defaultValue: 'MFA' }),
      dataIndex: 'mfa_enabled',
      key: 'mfa_enabled',
      render: (mfa_enabled: boolean) => {
        return mfa_enabled ? (
          <Badge status="success" text={t('user.mfaEnabled', { defaultValue: 'Enabled' })} />
        ) : (
          <Badge status="default" text={t('user.mfaDisabled', { defaultValue: 'Disabled' })} />
        );
      },
    },
    {
      title: t('user.lastLogin', { defaultValue: 'Last Login' }),
      dataIndex: 'last_login',
      key: 'last_login',
      render: (last_login: string) => (
        last_login ? formatDate(last_login) : t('user.neverLogin', { defaultValue: 'Never' })
      ),
    },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'action',
      width: 160,
      render: (_: unknown, record: API.User) => {
        const actions: ActionProps[] = [{
          key: 'view',
          permission: "authorization:user:view",
          icon: <EyeOutlined />,
          tooltip: t('user.viewDetail', { defaultValue: 'View Detail' }),
          onClick: async () => navigate(`/authorization/users/${record.id}`),
        }, {
          key: 'edit',
          permission: "authorization:user:update",
          icon: <EditOutlined />,
          tooltip: t('user.edit', { defaultValue: 'Edit' }),
          hidden: record.status === 'locked' || record.status === 'deleted',
          onClick: async () => navigate(`/authorization/users/${record.id}/edit`),
        }, {
          key: 'unlock',
          permission: "authorization:user:update",
          icon: <UnlockOutlined />,
          tooltip: t('user.unlock', { defaultValue: 'Unlock' }),
          hidden: record.status !== 'locked',
          onClick: async () => handleUnlock(record),
        }, {
          key: 'disableMFA',
          permission: "authorization:user:update",
          icon: <SafetyOutlined />,
          tooltip: t('user.adminDisableMFA', { defaultValue: 'Disable MFA' }),
          hidden: !record.mfa_enabled || record.status === 'deleted',
          danger: true,
          onClick: async () => handleAdminDisableMFA(record),
        }, {
          key: 'resendActivation',
          permission: "authorization:user:update",
          icon: <MailOutlined />,
          tooltip: t('user.resendActivation', { defaultValue: 'Resend Activation Email' }),
          hidden: record.status !== 'pending_activation' || !record.email,
          onClick: async () => handleResendActivation(record),
        }, {
          key: 'resetPassword',
          permission: "authorization:user:reset_password",
          icon: <KeyOutlined />,
          disabled: record.disable_change_password,
          tooltip: record.disable_change_password ? t('user.resetPasswordDisabled', { defaultValue: 'The current system prohibits modifying the password of this user.' }) : t('user.resetPassword', { defaultValue: 'Reset Password' }),
          hidden: !((record.source === 'local' || (record.source === 'ldap' && record.ldap_dn)) && record.status !== 'deleted' && record.status !== 'pending_activation'),
          onClick: async () => handleResetPassword(record.id, record.username, record.email),
        }, {
          key: 'fixUser',
          permission: "authorization:user:update",
          icon: <ToolOutlined />,
          tooltip: t('user.fixUser', { defaultValue: 'Fix User' }),
          hidden: !(record.source === 'ldap' && !record.ldap_dn && record.status !== 'deleted'),
          onClick: async () => setFixUser(record),
        }, {
          key: 'restore',
          permission: "authorization:user:update",
          icon: <UndoOutlined />,
          tooltip: t('user.restore', { defaultValue: 'Restore' }),
          hidden: record.status !== 'deleted',
          confirm: {
            title: t('user.restoreConfirm', { defaultValue: 'Are you sure you want to restore this user?' }),
            onConfirm: async () => handleRestore({ id: record.id }),
          }

        }, {
          key: 'delete',
          permission: "authorization:user:delete",
          icon: <DeleteOutlined />,
          tooltip: t('user.delete', { defaultValue: 'Delete' }),
          danger: true,
          confirm: {
            title: t('user.deleteConfirm', { defaultValue: 'Are you sure you want to delete this user?' }),
            onConfirm: () => handleDelete({ id: record.id }),
            okText: tCommon('confirm', { defaultValue: 'Confirm' }),
            cancelText: tCommon('cancel', { defaultValue: 'Cancel' }),
          }
        }]
        return <Actions actions={actions} key="actions" />
      },
    },
  ];

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <Form
          form={searchForm}
          layout="vertical"
          onFinish={handleSearch}
          name='userSearchForm'
        >
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col >
              <Space>
                <Form.Item name="keywords" noStyle>
                  <Input.Search
                    placeholder={t('user.keywords', { defaultValue: 'Search by username, full name, or email' })}
                    allowClear
                    onSearch={() => {
                      handleSearch(searchForm.getFieldsValue())
                    }}
                    style={{ width: 300 }}
                  />
                </Form.Item>
                <Form.Item name="status" noStyle>
                  <Select
                    placeholder={t('user.status', { defaultValue: 'Status' })}
                    allowClear
                    onChange={() => {
                      handleSearch(searchForm.getFieldsValue())
                    }}
                    style={{ width: 220 }}
                  >
                    <Option value="active">{t('user.statusEnum.active', { defaultValue: 'Active' })}</Option>
                    <Option value="disabled">{t('user.statusEnum.disabled', { defaultValue: 'Disabled' })}</Option>
                    <Option value="deleted">{t('user.statusEnum.deleted', { defaultValue: 'Deleted' })}</Option>
                    <Option value="locked">{t('user.statusEnum.locked', { defaultValue: 'Locked' })}</Option>
                    <Option value="password_expired">{t('user.statusEnum.password_expired', { defaultValue: 'Password Expired' })}</Option>
                    <Option value="pending_activation">{t('user.statusEnum.pending_activation', { defaultValue: 'Pending Activation' })}</Option>
                  </Select>
                </Form.Item>
              </Space>
            </Col>
            <Col >
              <Space>
                <Button icon={<ReloadOutlined />} onClick={fetchUsers}>{tCommon('refresh', { defaultValue: 'Refresh' })}</Button>
                <PermissionGuard permission="authorization:user:export">
                  <Button
                    icon={<ExportOutlined />}
                    loading={exportLoading}
                    onClick={() => handleExport()}
                  >
                    {t('user.export', { defaultValue: 'Export' })}
                  </Button>
                </PermissionGuard>
                <PermissionGuard permission="authorization:user:create">
                  <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    onClick={() => navigate('/authorization/users/create')}
                  >
                    {t('user.create', { defaultValue: 'Create User' })}
                  </Button>
                </PermissionGuard>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <Row justify="space-between" align="middle" gutter={[0, 16]}>
          <Col>

          </Col>
          <Col>

          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{
            current: queryParams.current,
            pageSize: queryParams.page_size,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => tCommon('totalItems', { defaultValue: `Total ${total} items`, total }),
            onChange: handlePageChange,
          }}
        />
      </Card>
      <FixUserModal user={fixUser} onClose={() => setFixUser(null)} onSuccess={() => {
        setFixUser(null)
        fetchUsers()
      }} />
    </div>
  );
};

export default UserList;