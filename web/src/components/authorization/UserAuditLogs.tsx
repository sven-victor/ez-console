import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Space, Form, Input, DatePicker, Button, Row, Col, Select, Modal, message } from 'antd';
import { EyeOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '@/service/api';
import { formatDate } from '@/utils';
import { useRequest } from 'ahooks';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Format IP address for display
const formatIP = (ip: string) => {
  return ip || 'N/A';
};

// Get status tag
const getStatusTag = (status: string, t: any) => {
  return status === 'success' ? (
    <Tag color="success">{t('statuses.success')}</Tag>
  ) : (
    <Tag color="error">{t('statuses.failed')}</Tag>
  );
};

interface UserAuditLogsProps {
  userId?: string;
  request?: (params: API.PaginationRequest & API.getCurrentUserLogsParams) => Promise<API.PaginationResponse<API.AuditLog>>;
  columnsFilter?: (columns: any[]) => any[];
}

const UserAuditLogs: React.FC<UserAuditLogsProps> = ({
  userId,
  request = (params: API.PaginationRequest & API.getCurrentUserLogsParams) => {
    if (!userId) {
      return api.authorization.getCurrentUserLogs(params);
    }
    return api.authorization.getUserLogs({ id: userId, ...params });
  },
  columnsFilter = (columns: any[]) => columns,
}) => {
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<API.getCurrentUserLogsParams>({});
  const [form] = Form.useForm();
  const { loading, run, data: { data } = {} } = useRequest(async (params: API.getCurrentUserLogsParams = filters, page = 1, pageSize = 10) => {
    return request({
      ...params,
      current: page ?? 1,
      page_size: pageSize ?? 10,
    });
  }, {
    onError(error) {
      message.error(t('auditLog.fetchFailed', { error: error }));
    },
    onSuccess({ total }) {
      setPagination({
        ...pagination,
        total,
      });
    },
  })

  // Load data on initial load and when user ID changes
  useEffect(() => {
    run(filters, 1, pagination.pageSize);
  }, []);

  // Handle table pagination change
  const handleTableChange = (newPagination: any) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
    run({}, newPagination.current, newPagination.pageSize);
  };

  // Handle filter form submission
  const handleFilterSubmit = (values: any) => {
    run({
      ...values,
      start_time: values.dateRange?.[0]?.toISOString(),
      end_time: values.dateRange?.[1]?.toISOString(),
    }, 1, pagination.pageSize)
  };

  // Reset filter conditions
  const handleReset = () => {
    form.resetFields();
    setFilters({});
    setPagination({ ...pagination, current: 1 });
    run({}, 1, pagination.pageSize);
  };

  // Table column definitions
  const columns = [
    {
      title: t('auditLog.timestamp'),
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => formatDate(timestamp),
    },
    {
      title: t('auditLog.action'),
      dataIndex: 'action',
      key: 'action',
      render: (action: string, record: API.AuditLog) => {
        if (action) {
          return t(`action.${action.replace(':', '.')}`, { defaultValue: record.action_name });
        }
        return record.action_name ?? record.action;
      },
    },
    {
      title: t('auditLog.user_agent'),
      dataIndex: 'user_agent',
      key: 'user_agent',
    },
    {
      title: t('auditLog.ip'),
      dataIndex: 'ip',
      key: 'ip',
      render: (ip: string) => formatIP(ip),
    },
    {
      title: t('auditLog.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status, t),
    },
    {
      title: t('auditLog.details'),
      dataIndex: 'details',
      key: 'details',
      render: (details: any) => {
        return <Button type='link' icon={<EyeOutlined />} onClick={() => {
          Modal.info({
            title: t('auditLog.details'),
            content: JSON.stringify(details),
          });
        }} />
      },
    },
  ];


  return (
    <div>
      {/* Search filter form */}
      <Card style={{ marginBottom: 16 }}>
        <Form
          form={form}
          layout="horizontal"
          onFinish={handleFilterSubmit}
          initialValues={filters}
        >
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="search" label={t('auditLog.search')}>
                <Input placeholder={t('auditLog.searchPlaceholder')} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="action" label={t('auditLog.action')}>
                <Select allowClear placeholder={t('auditLog.selectAction')}>
                  <Option value="login">{t('actions.login')}</Option>
                  <Option value="logout">{t('actions.logout')}</Option>
                  <Option value="password_reset">{t('actions.passwordReset')}</Option>
                  <Option value="mfa_change">{t('actions.mfaChange')}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label={t('auditLog.status')}>
                <Select allowClear placeholder={t('auditLog.selectStatus')}>
                  <Option value="success">{t('statuses.success')}</Option>
                  <Option value="failed">{t('statuses.failed')}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="dateRange" label={t('auditLog.dateRange')}>
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Space>
                <Button onClick={handleReset}>{tCommon('reset')}</Button>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  {tCommon('search')}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Audit log table */}
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={handleReset}
            style={{ marginRight: 8 }}
          >
            {tCommon('refresh')}
          </Button>
        </div>
        <Table
          rowKey="id"
          columns={columnsFilter(columns)}
          dataSource={data}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => tCommon('totalItems', { total }),
          }}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
};

export default UserAuditLogs; 