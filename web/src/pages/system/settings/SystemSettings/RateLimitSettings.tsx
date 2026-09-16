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
import {
  Alert,
  App,
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Typography,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined, SaveOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';
import api from '@/service/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import Actions from '@/components/Actions';
import usePermission from '@/hooks/usePermission';

const { Text } = Typography;

const subjectOptions = [
  { value: 'anonymous', label: 'anonymous' },
  { value: 'user', label: 'user' },
  { value: 'service_account', label: 'service_account' },
];

type SharedBucketKey = 'anonymous' | 'user' | 'service_account';

const cellItemStyle = { marginBottom: 0 };

const SharedBucketTable: React.FC = () => {
  const { t } = useTranslation('system');
  const rows: { key: SharedBucketKey; label: string }[] = [
    { key: 'anonymous', label: t('settings.rateLimit.anonymous', { defaultValue: 'Anonymous (IP)' }) },
    { key: 'user', label: t('settings.rateLimit.user', { defaultValue: 'User' }) },
    { key: 'service_account', label: t('settings.rateLimit.serviceAccount', { defaultValue: 'Service account' }) },
  ];
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: t('settings.rateLimit.subjectType', { defaultValue: 'Subject' }), dataIndex: 'label', width: 180 },
    {
      title: `${t('settings.rateLimit.rate', { defaultValue: 'Rate' })} / ${t('settings.rateLimit.period', { defaultValue: 'Period' })}`,
      render: (_, row) => (
        <Form.Item style={cellItemStyle}>
          <Space.Compact>
            <Form.Item name={[row.key, 'rate']} rules={[{ required: true }]} noStyle>
              <InputNumber min={1} style={{ width: 88 }} />
            </Form.Item>
            <Form.Item name={[row.key, 'period']} noStyle>
              <Input placeholder="1m" style={{ width: 72 }} />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      ),
    },
    {
      title: t('settings.rateLimit.burst', { defaultValue: 'Burst' }),
      width: 120,
      render: (_, row) => (
        <Form.Item name={[row.key, 'burst']} style={cellItemStyle}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
      ),
    },
    {
      title: `${t('settings.rateLimit.quota', { defaultValue: 'Quota' })} / ${t('settings.rateLimit.quotaPeriod', { defaultValue: 'Quota period' })}`,
      render: (_, row) => (
        <Form.Item style={cellItemStyle}>
          <Space.Compact>
            <Form.Item name={[row.key, 'quota']} noStyle>
              <InputNumber min={0} style={{ width: 100 }} placeholder="0" />
            </Form.Item>
            <Form.Item name={[row.key, 'quota_period']} noStyle>
              <Input placeholder="1d" style={{ width: 72 }} />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      ),
    },
  ];
  return (
    <Table
      size="small"
      pagination={false}
      rowKey="key"
      columns={columns}
      dataSource={rows}
    />
  );
};

const RateLimitSettings: React.FC = () => {
  const { message } = App.useApp();
  const { t } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');
  const { hasPermission } = usePermission();
  const canUpdate = hasPermission('system:rate_limit:update');
  const [form] = Form.useForm();
  const [ruleForm] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<API.RateLimitRule | null>(null);
  const [page, setPage] = useState({ current: 1, page_size: 10 });
  const [search, setSearch] = useState('');

  const { data, loading, refresh } = useRequest(api.system.getRateLimitSettings, {
    onSuccess: (settings) => form.setFieldsValue(settings),
    onError: () => message.error(t('settings.fetchFailed', { defaultValue: 'Failed to fetch settings' })),
  });

  const { loading: submitting, run: saveSettings } = useRequest(api.system.updateRateLimitSettings, {
    manual: true,
    onSuccess: () => {
      message.success(t('settings.updateSuccess', { defaultValue: 'Settings updated successfully' }));
      refresh();
    },
    onError: (error) => message.error(error.message || t('settings.updateFailed', { defaultValue: 'Failed to update settings' })),
  });

  const { data: rules, loading: rulesLoading, refresh: refreshRules } = useRequest(
    () => api.system.listRateLimitRules({ current: page.current, page_size: page.page_size, search: search || undefined }),
    { refreshDeps: [page.current, page.page_size, search] },
  );

  const openCreate = () => {
    setEditing(null);
    ruleForm.resetFields();
    ruleForm.setFieldsValue({ subject_type: 'user', period: '1m', enabled: true, method: 'GET', quota: 0 });
    setModalOpen(true);
  };

  const openEdit = (row: API.RateLimitRule) => {
    setEditing(row);
    ruleForm.setFieldsValue(row);
    setModalOpen(true);
  };

  const { run: submitRule, loading: ruleSaving } = useRequest(
    async (values: API.RateLimitRule) => {
      if (editing?.id) {
        return api.system.updateRateLimitRule({ id: editing.id }, values);
      }
      return api.system.createRateLimitRule(values);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success(tCommon('success', { defaultValue: 'Operation successful' }));
        setModalOpen(false);
        refreshRules();
      },
      onError: (error) => message.error(error.message),
    },
  );

  const columns: ColumnsType<API.RateLimitRule> = [
    { title: t('settings.rateLimit.subjectType', { defaultValue: 'Subject' }), dataIndex: 'subject_type', width: 140 },
    { title: t('settings.rateLimit.subjectId', { defaultValue: 'Subject ID' }), dataIndex: 'subject_id', ellipsis: true },
    { title: t('settings.rateLimit.method', { defaultValue: 'Method' }), dataIndex: 'method', width: 90 },
    { title: t('settings.rateLimit.path', { defaultValue: 'Path' }), dataIndex: 'path', ellipsis: true },
    { title: t('settings.rateLimit.rate', { defaultValue: 'Rate' }), dataIndex: 'rate', width: 80 },
    { title: t('settings.rateLimit.period', { defaultValue: 'Period' }), dataIndex: 'period', width: 80 },
    { title: t('settings.rateLimit.burst', { defaultValue: 'Burst' }), dataIndex: 'burst', width: 80 },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      width: 120,
      render: (_, row) => (
        <Actions actions={[
          {
            key: 'edit',
            permission: 'system:rate_limit:update',
            icon: <EditOutlined />,
            tooltip: tCommon('edit', { defaultValue: 'Edit' }),
            onClick: async () => { openEdit(row); },
          },
          {
            key: 'delete',
            permission: 'system:rate_limit:update',
            icon: <DeleteOutlined />,
            danger: true,
            tooltip: tCommon('delete', { defaultValue: 'Delete' }),
            confirm: { title: t('settings.rateLimit.deleteConfirm', { defaultValue: 'Delete this rule?' }) },
            onClick: async () => { await api.system.deleteRateLimitRule({ id: row.id }); refreshRules(); },
          },
        ]} />
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      {data?.memory_warn && (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          message={t('settings.rateLimit.memoryWarn', { defaultValue: 'Cluster mode with in-memory store: limits are per node. Use rate_limit.store=redis for cluster-wide limits.' })}
        />
      )}
      <Form form={form} layout="vertical" onFinish={saveSettings} disabled={!canUpdate}>
        <Space wrap align="center" style={{ marginBottom: 16 }}>
          <Form.Item name="enabled" label={t('settings.rateLimit.enabled', { defaultValue: 'Enable rate limiting' })} valuePropName="checked" style={{ marginBottom: 0 }}>
            <Switch />
          </Form.Item>
          <Text type="secondary">
            {t('settings.rateLimit.storeLabel', { defaultValue: 'Store' })}: {data?.store || 'memory'}
            {' · '}
            {t('settings.rateLimit.failOpen', { defaultValue: 'Fail open' })}: {String(data?.fail_open ?? true)}
          </Text>
        </Space>
        <Divider>{t('settings.rateLimit.defaults', { defaultValue: 'Default shared buckets' })}</Divider>
        <SharedBucketTable />
        <PermissionGuard permission="system:rate_limit:update">
          <Space style={{ marginTop: 12 }}>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={submitting}>{tCommon('save', { defaultValue: 'Save' })}</Button>
            <Button icon={<ReloadOutlined />} onClick={() => refresh()}>{tCommon('refresh', { defaultValue: 'Refresh' })}</Button>
          </Space>
        </PermissionGuard>
      </Form>
      <Divider>{t('settings.rateLimit.routeRules', { defaultValue: 'Route rules' })}</Divider>
      <Space style={{ marginBottom: 12 }}>
        <Input.Search
          allowClear
          placeholder={tCommon('search', { defaultValue: 'Search' })}
          onSearch={(value) => {
            setSearch(value);
            setPage((p) => ({ ...p, current: 1 }));
          }}
          style={{ width: 240 }}
        />
        <PermissionGuard permission="system:rate_limit:update">
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>{tCommon('create', { defaultValue: 'Create' })}</Button>
        </PermissionGuard>
        <Button icon={<ReloadOutlined />} onClick={() => refreshRules()}>{tCommon('refresh', { defaultValue: 'Refresh' })}</Button>
      </Space>
      <Table
        rowKey="id"
        loading={rulesLoading}
        columns={columns}
        dataSource={rules?.data || []}
        pagination={{
          current: rules?.current || page.current,
          pageSize: rules?.page_size || page.page_size,
          total: rules?.total || 0,
          onChange: (current, page_size) => setPage({ current, page_size }),
        }}
      />
      <Modal
        open={modalOpen}
        title={editing ? t('settings.rateLimit.editRule', { defaultValue: 'Edit rule' }) : t('settings.rateLimit.createRule', { defaultValue: 'Create rule' })}
        onCancel={() => setModalOpen(false)}
        onOk={() => ruleForm.submit()}
        confirmLoading={ruleSaving}
        destroyOnClose
      >
        <Form form={ruleForm} layout="vertical" onFinish={submitRule} disabled={!canUpdate}>
          <Form.Item name="subject_type" label={t('settings.rateLimit.subjectType', { defaultValue: 'Subject' })} rules={[{ required: true }]}>
            <Select options={subjectOptions} />
          </Form.Item>
          <Form.Item name="subject_id" label={t('settings.rateLimit.subjectId', { defaultValue: 'Subject ID' })}>
            <Input placeholder={t('settings.rateLimit.subjectIdHint', { defaultValue: 'Empty = all subjects of this type' })} />
          </Form.Item>
          <Form.Item name="method" label={t('settings.rateLimit.method', { defaultValue: 'Method' })}>
            <Input placeholder="GET" />
          </Form.Item>
          <Form.Item name="path" label={t('settings.rateLimit.path', { defaultValue: 'Path' })} extra={t('settings.rateLimit.pathHint', { defaultValue: 'Gin full path, e.g. /api/ai/chat/sessions/:sessionId. Empty = shared bucket.' })}>
            <Input />
          </Form.Item>
          <Form.Item name="rate" label={t('settings.rateLimit.rate', { defaultValue: 'Rate' })} rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="period" label={t('settings.rateLimit.period', { defaultValue: 'Period' })}>
            <Input placeholder="1m" />
          </Form.Item>
          <Form.Item name="burst" label={t('settings.rateLimit.burst', { defaultValue: 'Burst' })}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="quota" label={t('settings.rateLimit.quota', { defaultValue: 'Quota' })}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="quota_period" label={t('settings.rateLimit.quotaPeriod', { defaultValue: 'Quota period' })}>
            <Input placeholder="1d" />
          </Form.Item>
          <Form.Item name="enabled" label={t('settings.rateLimit.enabled', { defaultValue: 'Enabled' })} valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  );
};

export default RateLimitSettings;
