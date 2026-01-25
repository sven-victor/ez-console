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

import React, { useRef } from 'react';
import { Card, Button, Space, message, Popconfirm, Tag, Row, Col, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, LockOutlined, ReloadOutlined, TeamOutlined } from '@ant-design/icons';
import { PermissionGuard } from '@/components/PermissionGuard';
import api from '@/service/api';
import { Table } from '@/components/Table';
import { TableRef } from '@/components/Table';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useSite } from '@/contexts/SiteContext';
import { useNavigate } from 'react-router-dom';

const RoleList: React.FC = () => {
  const { t } = useTranslation("authorization");
  const { t: tCommon } = useTranslation('common');
  const { siteConfig } = useSite();
  const navigate = useNavigate();
  const tableRef = useRef<TableRef<API.Role>>(null);
  const handleEdit = (roleId: string) => {
    navigate(`/authorization/roles/${roleId}/edit`);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.authorization.deleteRole({ id });
      message.success(t('role.deleteSuccess', { defaultValue: 'Role deleted successfully.' }));
      tableRef.current?.reload?.();
    } catch (error) {
      message.error(t('role.deleteError', { defaultValue: 'Failed to delete role: {{error}}', error }));
    }
  };

  const columns: ColumnsType<API.Role> = [
    {
      title: t('role.name', { defaultValue: 'Role Name' }),
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <UserOutlined />
          {text}
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
      hidden: !siteConfig?.enable_multi_org,
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
                <PermissionGuard permission="authorization:role:delete">
                  <Tooltip title={t('role.delete', { defaultValue: 'Delete Role' })}>
                    <Popconfirm
                      title={t('role.deleteConfirm', { defaultValue: 'Are you sure you want to delete this role?' })}
                      onConfirm={() => handleDelete(record.id)}
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
              <Tooltip title={t('role.systemRoleCannotModify', { defaultValue: 'System roles cannot be modified.' })}>
                <span>
                  <Button type="text" size="small" icon={<LockOutlined />} disabled />
                </span>
              </Tooltip>
            )}
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      {/* Search Form */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <Row justify="space-between" align="middle" gutter={16}>
            <Col>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    tableRef.current?.reload?.();
                  }}
                  icon={<ReloadOutlined />}
                >
                  {tCommon('refresh', { defaultValue: 'Refresh' })}
                </Button>
              </Space>
            </Col>
            <Col>
              <PermissionGuard permission="authorization:role:create">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => navigate('/authorization/roles/create')}
                >
                  {t('role.create', { defaultValue: 'Create Role' })}
                </Button>
              </PermissionGuard>
            </Col>
          </Row>

        </div>

        <Table<API.Role>
          request={async ({ page_size, current }) => {
            return api.authorization.listRoles({
              current,
              page_size
            })
          }}
          columns={columns}
          actionRef={tableRef}
        />
      </Card>
    </div>
  );
};

export default RoleList; 