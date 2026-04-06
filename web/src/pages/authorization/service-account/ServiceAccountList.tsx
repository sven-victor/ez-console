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

import React, { useState, useEffect, useCallback } from 'react';
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
  Tooltip,
  message,
  Badge,
  Select,
} from 'antd';
import {
  ReloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  LockOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { PermissionGuard } from '@/components/PermissionGuard';
import api from '@/service/api';
import { formatDate } from '@/utils';
import { PAGINATION } from '@/constants';
import { useTranslation } from 'react-i18next';
import { useSite } from '@/contexts/SiteContext';
import { useAuth } from '@/hooks/useAuth';
import ServiceAccountForm from './ServiceAccountForm';
import Actions from '@/components/Actions';

// Service Account List Page
const ServiceAccountList: React.FC = () => {
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const [searchForm] = Form.useForm();
  const { siteConfig } = useSite();
  const { user } = useAuth();
  const organizations = user?.organizations || [];
  const enableMultiOrg = siteConfig?.enable_multi_org ?? false;

  // Data State
  const [loading, setLoading] = useState(false);
  const [serviceAccounts, setServiceAccounts] = useState<API.ServiceAccount[]>([]);
  const [total, setTotal] = useState(0);

  // Drawer State
  const [modalVisible, setModalVisible] = useState(false);
  const [editingServiceAccountId, setEditingServiceAccountId] = useState<string | null>(null);

  // Query Parameters
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

  // Load service account list

  const fetchServiceAccounts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.authorization.getServiceAccounts(queryParams);
      setServiceAccounts(response.data || []);
      setTotal(response.total || 0);
    } catch (error) {
      console.error(t('serviceAccount.loadError', { defaultValue: 'Failed to load service accounts' }), error);
      message.error(t('serviceAccount.loadError', { defaultValue: 'Failed to load service accounts' }));
    } finally {
      setLoading(false);
    }
  }, [queryParams, t]);

  useEffect(() => {
    fetchServiceAccounts();
  }, [fetchServiceAccounts]);

  // Search form submission
  const handleSearch = (values: any) => {
    setQueryParams({
      ...queryParams,
      current: PAGINATION.DEFAULT_CURRENT,
      search: values.search,
      organization_id: values.organization_id || undefined,
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

  // Open create service account drawer
  const showCreateModal = () => {
    setEditingServiceAccountId(null);
    setModalVisible(true);
  };

  // Open edit service account drawer
  const showEditModal = (serviceAccount: API.ServiceAccount) => {
    setEditingServiceAccountId(serviceAccount.id);
    setModalVisible(true);
  };

  // Close drawer
  const closeModal = () => {
    setModalVisible(false);
  };


  // Delete service account
  const handleDelete = async (id: string) => {
    try {
      await api.authorization.deleteServiceAccount({ id });
      message.success(t('serviceAccount.deleteSuccess', { defaultValue: 'Service account deleted successfully' }));
      fetchServiceAccounts();
    } catch (error) {
      console.error(t('serviceAccount.deleteError', { defaultValue: 'Failed to delete service account' }), error);
      message.error(t('serviceAccount.deleteError', { defaultValue: 'Failed to delete service account' }));
    }
  };

  // Toggle service account status
  const handleToggleStatus = async (record: API.ServiceAccount) => {
    const newStatus = record.status === 'active' ? 'disabled' : 'active';
    try {
      await api.authorization.updateServiceAccountStatus({ id: record.id }, { status: newStatus });
      message.success(t('serviceAccount.statusUpdateSuccess', { defaultValue: 'Status updated successfully' }));
      fetchServiceAccounts();
    } catch (error) {
      console.error(t('serviceAccount.statusUpdateError', { defaultValue: 'Failed to update status' }), error);
      message.error(t('serviceAccount.statusUpdateError', { defaultValue: 'Failed to update status' }));
    }
  };

  // Build table columns
  const columns = [
    {
      title: t('serviceAccount.name', { defaultValue: 'Name' }),
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: API.ServiceAccount) => (
        <PermissionGuard permission="authorization:service_account:view" fallback={text}>
          <Link to={`/authorization/service-accounts/${record.id}`}>
            {text}
          </Link>
        </PermissionGuard>
      ),
    },
    {
      title: t('serviceAccount.description', { defaultValue: 'Description' }),
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <Tooltip title={text}>
          <span>{text?.length > 30 ? `${text.substring(0, 30)}...` : text}</span>
        </Tooltip>
      ),
    },
    ...(enableMultiOrg
      ? [
        {
          title: t('serviceAccount.organization', { defaultValue: 'Organization' }),
          key: 'organization',
          render: (_: unknown, record: API.ServiceAccount) => {
            if (record.organization_id) {
              return (
                <Tag icon={<TeamOutlined />} color="blue">
                  {record.organization?.name || record.organization_id}
                </Tag>
              );
            }
            return (
              <Tag color="default">
                {t('serviceAccount.global', { defaultValue: 'Global' })}
              </Tag>
            );
          },
        },
      ]
      : []),
    {
      title: t('serviceAccount.status', { defaultValue: 'Status' }),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        status === 'active' ?
          <Badge status="success" text={t('serviceAccount.statusActive', { defaultValue: 'Active' })} /> :
          <Badge status="error" text={t('serviceAccount.statusDisabled', { defaultValue: 'Disabled' })} />
      ),
    },
    {
      title: t('serviceAccount.roles', { defaultValue: 'Roles' }),
      key: 'roles',
      render: (_: any, record: API.ServiceAccount) => (
        <Space size={[0, 4]} wrap>
          {record.roles?.map(role => (
            <Tag color="blue" key={role.id}>
              {role.name}
            </Tag>
          ))}
          {(!record.roles || record.roles.length === 0) &&
            <Tag>{t('serviceAccount.noRoles', { defaultValue: 'No Roles' })}</Tag>
          }
        </Space>
      ),
    },
    {
      title: t('serviceAccount.hasPolicy', { defaultValue: 'Has Policy' }),
      key: 'policy',
      render: (_: any, record: API.ServiceAccount) => (
        record.policy_document && record.policy_document.Statement && record.policy_document.Statement.length > 0 ?
          <Tag color="green" icon={<CheckCircleOutlined />}>{t('serviceAccount.hasPolicy', { defaultValue: 'Has Policy' })}</Tag> :
          <Tag color="default" icon={<CloseCircleOutlined />}>{t('serviceAccount.noPolicy', { defaultValue: 'No Policy' })}</Tag>
      ),
    },
    {
      title: t('serviceAccount.createdAt', { defaultValue: 'Created At' }),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (time: string) => formatDate(time),
    },
    {
      title: t('serviceAccount.lastAccess', { defaultValue: 'Last Access' }),
      dataIndex: 'last_access',
      key: 'last_access',
      render: (time: string) => time ? formatDate(time) : t('serviceAccount.neverAccessed', { defaultValue: 'Never Accessed' }),
    },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'action',
      render: (_: any, record: API.ServiceAccount) => (
        <Actions
          actions={[
            {
              key: 'view',
              icon: <EyeOutlined />,
              tooltip: t('serviceAccount.viewDetail', { defaultValue: 'View Service Account Details' }),
              onClick: async () => navigate(`/authorization/service-accounts/${record.id}`),
              permission: 'authorization:service_account:view',
            },
            {
              key: 'edit',
              icon: <EditOutlined />,
              tooltip: t('serviceAccount.edit', { defaultValue: 'Edit Service Account' }),
              onClick: async () => showEditModal(record),
              permission: 'authorization:service_account:update',
            },
            {
              key: 'toggleStatus',
              icon: record.status === 'active' ? <LockOutlined /> : <CheckCircleOutlined />,
              tooltip:
                record.status === 'active'
                  ? t('serviceAccount.actionTooltipDisable', { defaultValue: 'Disable this service account' })
                  : t('serviceAccount.actionTooltipEnable', { defaultValue: 'Enable this service account' }),
              onClick: async () => handleToggleStatus(record),
              permission: 'authorization:service_account:update',
            },
            {
              key: 'delete',
              icon: <DeleteOutlined />,
              danger: true,
              tooltip: t('serviceAccount.delete', { defaultValue: 'Delete Service Account' }),
              confirm: {
                title: t('serviceAccount.deleteConfirm', { defaultValue: 'Are you sure you want to delete this service account?' }),
                onConfirm: async () => handleDelete(record.id),
                okText: tCommon('confirm', { defaultValue: 'Confirm' }),
                cancelText: tCommon('cancel', { defaultValue: 'Cancel' }),
              },
              permission: 'authorization:service_account:delete',
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      {/* Search Form */}
      <Card style={{ marginBottom: 16 }}>
        <Form
          form={searchForm}
          layout='vertical'
          onFinish={handleSearch}
          name='serviceAccountSearchForm'
          initialValues={{
            search: queryParams.search,
            organization_id: queryParams.organization_id,
          }}
          style={{ marginBottom: 0 }}
        >
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col >
              <Space>
                <Form.Item name="search" noStyle>
                  <Input.Search
                    placeholder={t('serviceAccount.searchPlaceholder', { defaultValue: 'Search by name or description' })}
                    allowClear
                    onSearch={() => {
                      handleSearch(searchForm.getFieldsValue())
                    }}
                    style={{ width: 300 }}
                  />
                </Form.Item>
                {!enableMultiOrg && (
                  <Form.Item name="organization_id" noStyle>
                    <Select
                      placeholder={t('serviceAccount.filterByOrg', { defaultValue: 'All organizations' })}
                      allowClear
                      style={{ minWidth: 160 }}
                      options={[
                        { value: '', label: t('serviceAccount.global', { defaultValue: 'Global' }) },
                        ...organizations.map((org) => ({ value: org.id, label: org.name })),
                      ]}
                    />
                  </Form.Item>
                )}
              </Space>
            </Col>
            <Col >
              <Space>
                <Button
                  onClick={() => { handleSearch(searchForm.getFieldsValue()) }}
                  icon={<ReloadOutlined />}
                >
                  {tCommon('refresh', { defaultValue: 'Refresh' })}
                </Button>
                <PermissionGuard permission="authorization:service_account:create">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showCreateModal}
                  >
                    {t('serviceAccount.create', { defaultValue: 'Create Service Account' })}
                  </Button>
                </PermissionGuard>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Data Table */}
      <Card>
        <Table
          rowKey="id"
          dataSource={serviceAccounts}
          columns={columns}
          loading={loading}
          pagination={{
            current: queryParams.current,
            pageSize: queryParams.page_size,
            total,
            onChange: handlePageChange,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => tCommon('totalItems', { defaultValue: `Total ${total} items`, total }),
          }}
        />
      </Card>

      {/* Service Account Form */}
      <ServiceAccountForm
        serviceAccountID={editingServiceAccountId}
        onClose={closeModal}
        open={modalVisible}
        enableMultiOrg={enableMultiOrg}
        organizations={organizations}
        onSuccess={() => {
          fetchServiceAccounts();
        }}
      />
    </div>
  );
};

export default ServiceAccountList; 