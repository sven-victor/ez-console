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

import React, { useState } from 'react';
import { Card, Button, Space, message, Popconfirm, Tag, Row, Col, Tooltip, Table, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, LockOutlined, ReloadOutlined, TeamOutlined, CopyOutlined } from '@ant-design/icons';
import { PermissionGuard } from '@/components/PermissionGuard';
import api from '@/service/api';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useSite } from '@/contexts/SiteContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import usePermission from '@/hooks/usePermission';
import { PAGINATION } from '@/constants';
import RoleDrawer from './RoleDrawer';
import { useRequest } from 'ahooks';

const RoleList: React.FC = () => {
  const { t } = useTranslation("authorization");
  const { t: tCommon } = useTranslation('common');
  const { siteConfig } = useSite();
  const enableMultiOrg = siteConfig?.enable_multi_org ?? false;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasGlobalPermission } = usePermission();
  const organizations = user?.organizations || [];

  const [searchForm] = Form.useForm();

  // Query parameters
  const [queryParams, setQueryParams] = useState<{
    current: number;
    page_size: number;
    search?: string;
    organization_id?: string;
  }>({
    current: PAGINATION.DEFAULT_CURRENT,
    page_size: PAGINATION.DEFAULT_PAGE_SIZE,
    search: undefined,
    organization_id: undefined,
  });

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const { run: fetchRoles, data, loading: loading } = useRequest(async () => {
    return api.authorization.listRoles(queryParams)
  }, {
    debounceWait: 300,
    refreshDeps: [queryParams],
    onError: () => {
      message.error(t('role.loadError', { defaultValue: 'Failed to load role list' }));
    },
  });



  const handleSearch = (values: any) => {
    setQueryParams({
      ...queryParams,
      current: PAGINATION.DEFAULT_CURRENT,
      search: values.search,
      organization_id: values.organization_id || undefined,
    });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setQueryParams(prev => ({
      ...prev,
      current: page,
      page_size: pageSize,
    }));
  };

  const handleEdit = (roleId: string) => {
    navigate(`/authorization/roles/${roleId}/edit`);
  };

  const handleClone = (roleId: string) => {
    navigate(`/authorization/roles/create?cloneFrom=${encodeURIComponent(roleId)}`);
  };

  const { run: deleteRole } = useRequest(
    async ({ id }: { id: string }) => api.authorization.deleteRole({ id }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('role.deleteSuccess', { defaultValue: 'Role deleted successfully.' }));
        fetchRoles();
      },
      onError: (error) => {
        message.error(
          t('role.deleteError', {
            defaultValue: 'Failed to delete role: {{error}}',
            error: error instanceof Error ? error.message : String(error),
          }),
        );
      },
    },
  );

  const handleNameClick = (roleId: string) => {
    setSelectedRoleId(roleId);
    setDrawerOpen(true);
  };

  const showOrgFilter = enableMultiOrg && hasGlobalPermission('authorization:role:view');

  const columns: ColumnsType<API.Role> = [
    {
      title: t('role.name', { defaultValue: 'Role Name' }),
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: API.Role) => (
        <Space>
          <UserOutlined />
          <a onClick={() => handleNameClick(record.id)}>{text}</a>
        </Space>
      ),
    },
    {
      title: t('role.description', { defaultValue: 'Description' }),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('role.roleType', { defaultValue: 'Role Type' }),
      key: 'role_type',
      render: (_: unknown, record: API.Role) =>
        record.role_type === 'system' ? (
          <Tag color="orange">{t('role.typeSystem', { defaultValue: 'System' })}</Tag>
        ) : (
          <Tag color="default">{t('role.typeUser', { defaultValue: 'User' })}</Tag>
        ),
    },
    {
      title: t('role.organization', { defaultValue: 'Organization' }),
      key: 'organization',
      hidden: !enableMultiOrg,
      render: (_: any, record: API.Role) => {
        if (record.organization_id) {
          return (
            <Tag icon={<TeamOutlined />} color="blue">
              {record.organization?.name || record.organization_id}
            </Tag>
          );
        }
        return (
          <Tag color="default">
            {t('role.global', { defaultValue: 'Global' })}
          </Tag>
        );
      },
    },
    {
      title: t('role.permissionCount', { defaultValue: 'Permissions' }),
      key: 'permission_count',
      render: (_: any, record: API.Role) => (
        <Tag color="blue">
          <LockOutlined /> {record.permissions?.length || 0}
        </Tag>
      ),
    },
    {
      title: t('role.createdAt', { defaultValue: 'Created At' }),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'action',
      render: (_: any, record: API.Role) => {
        const isSystemRole = record.role_type === 'system';
        return (
          <Space size="small">
            {!isSystemRole && (
              <>
                <PermissionGuard permission="authorization:role:update">
                  <Tooltip title={t('role.edit', { defaultValue: 'Edit Role' })}>
                    <Button
                      type="text"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(record.id)}
                    />
                  </Tooltip>
                </PermissionGuard>
                <PermissionGuard permission="authorization:role:create">
                  <Tooltip title={t('role.cloneTooltip', { defaultValue: 'Clone role to create page with prefilled form' })}>
                    <Button
                      type="text"
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={() => handleClone(record.id)}
                    />
                  </Tooltip>
                </PermissionGuard>
                <PermissionGuard permission="authorization:role:delete">
                  <Tooltip title={t('role.delete', { defaultValue: 'Delete Role' })}>
                    <Popconfirm
                      title={t('role.deleteConfirm', { defaultValue: 'Are you sure you want to delete this role?' })}
                      onConfirm={() => deleteRole({ id: record.id })}
                      okText={tCommon('confirm', { defaultValue: 'Confirm' })}
                      cancelText={tCommon('cancel', { defaultValue: 'Cancel' })}
                    >
                      <Button
                        type="text"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                      />
                    </Popconfirm>
                  </Tooltip>
                </PermissionGuard>
              </>
            )}
            {isSystemRole && (
              <>
                <Tooltip title={t('role.systemRoleCannotModify', { defaultValue: 'System roles cannot be modified.' })}>
                  <span>
                    <Button type="text" size="small" icon={<LockOutlined />} disabled />
                  </span>
                </Tooltip>
                <PermissionGuard permission="authorization:role:create">
                  <Tooltip title={t('role.cloneTooltip', { defaultValue: 'Clone role to create page with prefilled form' })}>
                    <Button
                      type="text"
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={() => handleClone(record.id)}
                    />
                  </Tooltip>
                </PermissionGuard>
              </>
            )}
          </Space>
        );
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
          name="roleSearchForm"
          initialValues={{
            search: queryParams.search,
            organization_id: queryParams.organization_id,
          }}
          style={{ marginBottom: 0 }}
        >
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col>
              <Space>
                <Form.Item name="search" noStyle>
                  <Input.Search
                    placeholder={t('role.searchPlaceholder', { defaultValue: 'Role name/description' })}
                    allowClear
                    onSearch={() => {
                      handleSearch(searchForm.getFieldsValue());
                    }}
                    style={{ width: 300 }}
                  />
                </Form.Item>
                {showOrgFilter && (
                  <Form.Item name="organization_id" noStyle>
                    <Select
                      placeholder={t('role.allOrganizations', { defaultValue: 'All Organizations' })}
                      allowClear
                      onChange={() => {
                        handleSearch(searchForm.getFieldsValue());
                      }}
                      style={{ minWidth: 180 }}
                      options={[
                        { value: '', label: t('role.global', { defaultValue: 'Global' }) },
                        ...organizations.map((org) => ({ value: org.id, label: org.name })),
                      ]}
                    />
                  </Form.Item>
                )}
              </Space>
            </Col>
            <Col>
              <Space>
                <Button
                  onClick={() => { handleSearch(searchForm.getFieldsValue()); }}
                  icon={<ReloadOutlined />}
                >
                  {tCommon('refresh', { defaultValue: 'Refresh' })}
                </Button>
                <PermissionGuard permission="authorization:role:create">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/authorization/roles/create')}
                  >
                    {t('role.create', { defaultValue: 'Create Role' })}
                  </Button>
                </PermissionGuard>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card>
        <Table<API.Role>
          rowKey="id"
          loading={loading}
          dataSource={data?.data ?? []}
          columns={columns}
          pagination={{
            current: queryParams.current,
            pageSize: queryParams.page_size,
            total: data?.total ?? 0,
            onChange: handlePageChange,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => tCommon('totalItems', { defaultValue: `Total ${total} items`, total }),
          }}
        />
      </Card>

      <RoleDrawer
        roleId={selectedRoleId}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default RoleList;
