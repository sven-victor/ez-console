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

import React from 'react';
import { Alert, Button, Form, Input, InputNumber, Popconfirm, Space, Switch, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { App } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import api from '@/service/api';

const { Text } = Typography;

type SubjectKind = 'user' | 'service_account';

interface RateLimitOverrideFormProps {
  kind: SubjectKind;
  subjectId: string;
  readOnly?: boolean;
}

const RateLimitOverrideForm: React.FC<RateLimitOverrideFormProps> = ({ kind, subjectId, readOnly }) => {
  const { message } = App.useApp();
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm();

  const getter = kind === 'user' ? api.authorization.getUserRateLimit : api.authorization.getServiceAccountRateLimit;
  const setter = kind === 'user' ? api.authorization.updateUserRateLimit : api.authorization.updateServiceAccountRateLimit;

  const { data, loading, refresh } = useRequest(() => getter({ id: subjectId }), {
    ready: !!subjectId,
    refreshDeps: [subjectId, kind],
    onSuccess: (ov) => {
      form.setFieldsValue({
        rate: ov.rate,
        period: ov.period || '1m',
        burst: ov.burst,
        quota: ov.quota,
        quota_period: ov.quota_period || '1d',
        enabled: ov.enabled !== false,
      });
    },
  });

  const { run: save, loading: saving } = useRequest(
    async (values: API.RateLimitOverride) => setter({ id: subjectId }, {
      ...values,
      clear: false,
      inherited: false,
      enabled: values.enabled !== false,
    }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('rateLimit.saveSuccess', { defaultValue: 'Rate limit override saved' }));
        refresh();
      },
      onError: (error) => {
        message.error(error.message || t('rateLimit.saveFailed', { defaultValue: 'Failed to save override' }));
      },
    },
  );

  const { run: clear, loading: clearing } = useRequest(
    async () => setter({ id: subjectId }, {
      clear: true,
      rate: 0,
      burst: 0,
      quota: 0,
      period: '',
      quota_period: '',
      enabled: false,
      inherited: true,
    }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('rateLimit.resetSuccess', { defaultValue: 'Override cleared; type default restored' }));
        refresh();
      },
      onError: (error) => {
        message.error(error.message);
      },
    },
  );

  const { run: resetCounters, loading: resetting } = useRequest(
    async () => (kind === 'user'
      ? api.authorization.resetUserRateLimit({ id: subjectId })
      : api.authorization.resetServiceAccountRateLimit({ id: subjectId })),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('rateLimit.resetCountersSuccess', { defaultValue: 'Counters reset' }));
      },
      onError: (error) => {
        message.error(error.message);
      },
    },
  );

  return (
    <Form form={form} layout="vertical" onFinish={save} disabled={readOnly || loading} style={{ maxWidth: 480, marginTop: 16 }}>
      {data?.inherited && (
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          message={t('rateLimit.inherited', { defaultValue: 'Using the type default. Save to create a subject-specific override.' })}
        />
      )}
      <Form.Item name="rate" label={t('rateLimit.rate', { defaultValue: 'Rate' })} rules={[{ required: true }]}>
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="period" label={t('rateLimit.period', { defaultValue: 'Period' })} extra={t('rateLimit.periodHint', { defaultValue: 'Examples: 1s, 1m, 1h' })}>
        <Input placeholder="1m" />
      </Form.Item>
      <Form.Item name="burst" label={t('rateLimit.burst', { defaultValue: 'Burst' })}>
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="quota" label={t('rateLimit.quota', { defaultValue: 'Daily quota (0 = none)' })}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="quota_period" label={t('rateLimit.quotaPeriod', { defaultValue: 'Quota period' })}>
        <Input placeholder="1d" />
      </Form.Item>
      <Form.Item
        name="enabled"
        label={t('rateLimit.enabled', { defaultValue: 'Enabled' })}
        valuePropName="checked"
        extra={t('rateLimit.enabledHint', { defaultValue: 'Off: this override is ignored and the type default applies. Use Reset to default to delete the override.' })}
      >
        <Switch />
      </Form.Item>
      {!readOnly && (
        <Space>
          <Button type="primary" htmlType="submit" loading={saving}>{tCommon('save', { defaultValue: 'Save' })}</Button>
          <Popconfirm
            title={t('rateLimit.resetCountersConfirm', { defaultValue: 'Reset rate-limit and quota counters for this subject? They will be able to send requests immediately.' })}
            onConfirm={() => resetCounters()}
          >
            <Button htmlType="button" icon={<UndoOutlined />} loading={resetting}>
              {t('rateLimit.resetCounters', { defaultValue: 'Reset counters' })}
            </Button>
          </Popconfirm>
          {!data?.inherited && (
            <Button onClick={() => clear()} loading={clearing}>{t('rateLimit.resetToDefault', { defaultValue: 'Reset to default' })}</Button>
          )}
        </Space>
      )}
      {data?.inherited && <Text type="secondary">{t('rateLimit.sourceHint', { defaultValue: 'Values shown are inherited.' })}</Text>}
    </Form>
  );
};

export default RateLimitOverrideForm;
