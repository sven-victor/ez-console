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
  Popconfirm,
  Badge,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  EyeOutlined,
  LockOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { PermissionGuard } from '@/components/PermissionGuard';
import api from '@/service/api';
import { formatDate } from '@/utils';
import { PAGINATION } from '@/constants';
import { useTranslation } from 'react-i18next';
import ServiceAccountForm from './ServiceAccountForm';

// Service Account List Page
const ServiceAccountList: React.FC = () => {
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const [searchForm] = Form.useForm();
  const [serviceAccountForm] = Form.useForm();

  // Data State
  const [loading, setLoading] = useState(false);
  const [serviceAccounts, setServiceAccounts] = useState<API.ServiceAccount[]>([]);
  const [total, setTotal] = useState(0);

  // Drawer State
  const [modalVisible, setModalVisible] = useState(false);
  const [editingServiceAccountId, setEditingServiceAccountId] = useState<string | null>(null);

  // Query Parameters
  const [queryParams, setQueryParams] = useState({
    current: PAGINATION.DEFAULT_CURRENT,
    page_size: PAGINATION.DEFAULT_PAGE_SIZE,
    search: undefined,
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
      current: PAGINATION.DEFAULT_CURRENT, // Reset to the first page
      search: values.search,
    });
  };

  // Reset search form
  const handleReset = () => {
    searchForm.resetFields();
    setQueryParams({
      current: PAGINATION.DEFAULT_CURRENT,
      page_size: PAGINATION.DEFAULT_PAGE_SIZE,
      search: undefined,
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
    serviceAccountForm.resetFields();
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
        <Space size="small">
          <PermissionGuard permission="authorization:service_account:view">
            <Tooltip title={t('serviceAccount.viewDetail', { defaultValue: 'View Detail' })}>
              <Button
                type="text"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => navigate(`/authorization/service-accounts/${record.id}`)}
              />
            </Tooltip>
          </PermissionGuard>

          <PermissionGuard permission="authorization:service_account:update">
            <Tooltip title={t('serviceAccount.edit', { defaultValue: 'Edit' })}>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => showEditModal(record)}
              />
            </Tooltip>
          </PermissionGuard>

          <PermissionGuard permission="authorization:service_account:update">
            <Tooltip title={record.status === 'active' ? tCommon('disable', { defaultValue: 'Disable' }) : tCommon('enable', { defaultValue: 'Enable' })}>
              <Button
                type="text"
                size="small"
                icon={record.status === 'active' ? <LockOutlined /> : <CheckCircleOutlined />}
                onClick={() => handleToggleStatus(record)}
              />
            </Tooltip>
          </PermissionGuard>

          <PermissionGuard permission="authorization:service_account:delete">
            <Tooltip title={t('serviceAccount.delete', { defaultValue: 'Delete' })}>
              <Popconfirm
                title={t('serviceAccount.deleteConfirm', { defaultValue: 'Are you sure you want to delete this service account?' })}
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
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Search Form */}
      <Card style={{ marginBottom: 16 }}>
        <Form
          form={searchForm}
          layout="horizontal"
          onFinish={handleSearch}
          initialValues={{
            search: queryParams.search,
          }}
          style={{ marginBottom: 0 }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="search" label={tCommon('keyword', { defaultValue: 'Keyword' })}>
                <Input
                  placeholder={t('serviceAccount.searchPlaceholder', { defaultValue: 'Search by name or description' })}
                  allowClear
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" icon={<FilterOutlined />}>
                    {tCommon('filter', { defaultValue: 'Filter' })}
                  </Button>
                  <Button onClick={handleReset} icon={<ReloadOutlined />}>
                    {tCommon('reset', { defaultValue: 'Reset' })}
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Data Table */}
      <Card>
        {/* Table Toolbar */}
        <div style={{ marginBottom: 16 }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Button
                type="primary"
                onClick={handleReset}
                icon={<ReloadOutlined />}
              >
                {tCommon('refresh', { defaultValue: 'Refresh' })}
              </Button>
            </Col>
            <Col>
              <PermissionGuard permission="authorization:service_account:create">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showCreateModal}
                >
                  {t('serviceAccount.create', { defaultValue: 'Create Service Account' })}
                </Button>
              </PermissionGuard>
            </Col>
          </Row>
        </div>

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
        onSuccess={() => {
          fetchServiceAccounts();
        }}
      />
    </div>
  );
};

export default ServiceAccountList; 