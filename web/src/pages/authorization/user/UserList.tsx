import React, { useState, useEffect } from 'react';
import {
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
  message,
  Badge,
  Typography,
  Modal,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
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
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { PermissionGuard } from '@/components/PermissionGuard';
import api from '@/service/api';
import { formatDate } from '@/utils';
import { PAGINATION } from '@/constants';
import { useTranslation } from 'react-i18next';
import Actions from '@/components/Actions';
import { Avatar } from '@/components/Avatar';
import { useRequest } from 'ahooks';

const { Option } = Select;

const FixUserModal = ({ user, onClose, onSuccess }: { user: API.User | null, onClose: () => void, onSuccess: () => void }) => {
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
  const navigate = useNavigate();
  const { t } = useTranslation("authorization");
  const { t: tCommon } = useTranslation("common");
  const [searchForm] = Form.useForm();

  // Data state
  const [users, setUsers] = useState<API.User[]>([]);
  const [total, setTotal] = useState(0);

  const [fixUser, setFixUser] = useState<API.User | null>(null);
  // Query parameters
  const [queryParams, setQueryParams] = useState({
    current: PAGINATION.DEFAULT_CURRENT,
    page_size: PAGINATION.DEFAULT_PAGE_SIZE,
    keywords: undefined,
    status: undefined,
  });

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
      setUsers(result.data || []);
      setTotal(result.total || 0);
    },
    onError: (error) => {
      message.error(t('user.loadError', { defaultValue: 'Failed to load users', error: error.message }));
    },
    refreshDeps: [queryParams],
  });

  // Search form submission
  const handleSearch = (values: any) => {
    setQueryParams({
      ...queryParams,
      current: PAGINATION.DEFAULT_CURRENT, // Reset to the first page
      keywords: values.keywords,
      status: values.status,
    });
  };

  // Reset search form
  const handleReset = () => {
    searchForm.resetFields();
    setQueryParams({
      current: PAGINATION.DEFAULT_CURRENT,
      page_size: PAGINATION.DEFAULT_PAGE_SIZE,
      keywords: undefined,
      status: undefined,
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

  // Reset password
  const handleResetPassword = (id: string, username: string, email: string) => {
    Modal.confirm({
      title: t('user.resetPasswordTitle', { defaultValue: 'Reset Password' }),
      content: t('user.resetPasswordConfirm', { defaultValue: `Are you sure you want to reset the password for ${username}?`, username }),
      okText: tCommon('confirm', { defaultValue: 'Confirm' }),
      cancelText: tCommon('cancel', { defaultValue: 'Cancel' }),
      onOk: async () => {
        try {
          const res = await api.authorization.resetUserPassword({ id }, { password: '' });  // Pass an empty password, the backend will generate a random password
          message.success(t('user.resetPasswordSuccess', { defaultValue: 'Password reset successfully' }));
          if (res.new_password) {
            Modal.info({
              title: t('user.resetPasswordSuccess', { defaultValue: 'Password Reset Successfully' }),
              content: <Typography.Text copyable={{ text: res.new_password }}>{t('user.resetPasswordSuccessContent', { defaultValue: `New password: ${res.new_password}`, password: res.new_password })}</Typography.Text>,
            });
          } else {
            Modal.info({
              title: t('user.resetPasswordSuccess', { defaultValue: 'Password Reset Successfully' }),
              content: t('user.resetPasswordSuccessSendByEmail', { defaultValue: 'The new password has been sent to the user email: {{email}}', email }),
            });
          }
        } catch (error) {
          console.error('Reset password error:', error);
          message.error(t('user.resetPasswordError', { defaultValue: 'Failed to reset password' }));
        }
      },
    });
  };

  const handleUnlock = (id: string) => {
    Modal.confirm({
      title: t('user.unlockTitle', { defaultValue: 'Unlock User' }),
      content: t('user.unlockConfirm', { defaultValue: 'Are you sure you want to unlock this user?' }),
      onOk: async () => {
        try {
          await api.authorization.unlockUser({ id });
          message.success(t('user.unlockSuccess', { defaultValue: 'User unlocked successfully' }));
          fetchUsers();
        } catch (error) {
          message.error(t('user.unlockError', { defaultValue: 'Failed to unlock user: {{error}}', error: (error as any).message ?? String(error) }));
        }
      },
    });
  };

  // Build table columns
  const columns = [
    {
      title: t('user.username', { defaultValue: 'Username' }),
      key: 'user',
      render: (_: any, record: API.User) => (
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
          default:
            return <Badge status="default" text={t(`user.statusEnum.${status}`, { defaultValue: status.charAt(0).toUpperCase() + status.slice(1) })} />;
        }
      },
    },
    {
      title: t('user.roles', { defaultValue: 'Roles' }),
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: any[]) => (
        <span>
          {roles && roles.length > 0 ? (
            roles.map(role => (
              <Tag color="blue" key={role.id}>
                {role.name}
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
      render: (_: any, record: API.User) => {
        const actions = [{
          key: 'view',
          permission: "authorization:user:view",
          icon: <EyeOutlined />,
          tooltip: t('user.viewDetail', { defaultValue: 'View Detail' }),
          onClick: () => navigate(`/authorization/users/${record.id}`),
        }, {
          key: 'edit',
          permission: "authorization:user:update",
          icon: <EditOutlined />,
          tooltip: t('user.edit', { defaultValue: 'Edit' }),
          hidden: record.status === 'locked' || record.status === 'deleted',
          onClick: () => navigate(`/authorization/users/${record.id}/edit`),
        }, {
          key: 'unlock',
          permission: "authorization:user:update",
          icon: <UnlockOutlined />,
          tooltip: t('user.unlock', { defaultValue: 'Unlock' }),
          hidden: record.status !== 'locked',
          onClick: () => handleUnlock(record.id),
        }, {
          key: 'resetPassword',
          permission: "authorization:user:resetPassword",
          icon: <KeyOutlined />,
          disabled: record.disable_change_password,
          tooltip: record.disable_change_password ? t('user.resetPasswordDisabled', { defaultValue: 'The current system prohibits modifying the password of this user.' }) : t('user.resetPassword', { defaultValue: 'Reset Password' }),
          hidden: !((record.source === 'local' || (record.source === 'ldap' && record.ldap_dn)) && record.status !== 'deleted'),
          onClick: () => handleResetPassword(record.id, record.username, record.email),
        }, {
          key: 'fixUser',
          permission: "authorization:user:update",
          icon: <ToolOutlined />,
          tooltip: t('user.fixUser', { defaultValue: 'Fix User' }),
          hidden: !(record.source === 'ldap' && !record.ldap_dn && record.status !== 'deleted'),
          onClick: () => setFixUser(record),
        }, {
          key: 'restore',
          permission: "authorization:user:update",
          icon: <UndoOutlined />,
          tooltip: t('user.restore', { defaultValue: 'Restore' }),
          hidden: record.status !== 'deleted',
          confirm: {
            title: t('user.restoreConfirm', { defaultValue: 'Are you sure you want to restore this user?' }),
            onConfirm: () => handleRestore({ id: record.id }),
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
          layout="inline"
          onFinish={handleSearch}
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16} style={{ width: '100%' }}>
            <Col span={6}>
              <Form.Item name="keywords">
                <Input
                  prefix={<SearchOutlined />}
                  placeholder={t('user.keywords', { defaultValue: 'Search by username, full name, or email' })}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status">
                <Select
                  placeholder={t('user.status', { defaultValue: 'Status' })}
                  allowClear
                  style={{ width: '100%' }}
                >
                  <Option value="active">{t('user.statusEnum.active', { defaultValue: 'Active' })}</Option>
                  <Option value="disabled">{t('user.statusEnum.disabled', { defaultValue: 'Disabled' })}</Option>
                  <Option value="deleted">{t('user.statusEnum.deleted', { defaultValue: 'Deleted' })}</Option>
                  <Option value="locked">{t('user.statusEnum.locked', { defaultValue: 'Locked' })}</Option>
                  <Option value="password_expired">{t('user.statusEnum.password_expired', { defaultValue: 'Password Expired' })}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  htmlType="submit"
                >
                  {tCommon('search', { defaultValue: 'Search' })}
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleReset}
                >
                  {tCommon('reset', { defaultValue: 'Reset' })}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <Row justify="space-between" align="middle" gutter={[0, 16]}>
          <Col>
            <Button type='primary' icon={<ReloadOutlined />} onClick={fetchUsers}>{tCommon('refresh', { defaultValue: 'Refresh' })}</Button>
          </Col>
          <Col>
            <PermissionGuard permission="authorization:user:create">
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                style={{ marginBottom: 16 }}
                onClick={() => navigate('/authorization/users/create')}
              >
                {t('user.create', { defaultValue: 'Create User' })}
              </Button>
            </PermissionGuard>
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