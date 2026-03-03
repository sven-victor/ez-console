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
import { Form, InputNumber, Button, message, Space, Spin, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { SaveOutlined, ReloadOutlined, CalendarOutlined } from '@ant-design/icons';
import api from '@/service/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import { useNavigate } from 'react-router-dom';

const TaskSettingsForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('system');
  const { t: tTask } = useTranslation('task');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm<API.TaskSettings>();

  const { data: backendsList } = useRequest(api.system.listLogStorageBackends);
  const logStorageBackendOptions = (backendsList ?? []).map((b: API.LogStorageBackendOption) => ({
    value: b.id,
    label: t(`settings.task.logStorage.${b.id}`, { defaultValue: b.name }),
  }));

  const { loading, refresh } = useRequest(api.system.getTaskSettings, {
    onSuccess: (res) => {
      if (res) {
        form.setFieldsValue({
          max_concurrent: res.max_concurrent,
          log_storage_backend: res.log_storage_backend ?? 'database',
          ai_chat_retention_days: res.ai_chat_retention_days ?? 90,
          log_retention_days: res.log_retention_days ?? 30,
          audit_log_retention_days: res.audit_log_retention_days ?? 365,
        });
      }
    },
    onError: () => {
      message.error(t('settings.fetchFailed', { defaultValue: 'Failed to fetch settings' }));
    },
  });

  const { loading: submitting, run: submitUpdate } = useRequest(api.system.updateTaskSettings, {
    manual: true,
    onSuccess: () => {
      message.success(t('settings.updateSuccess', { defaultValue: 'Settings updated successfully' }));
      refresh();
    },
    onError: () => {
      message.error(t('settings.updateFailed', { defaultValue: 'Failed to update settings' }));
    },
  });

  const handleSubmit = (values: API.TaskSettings) => {
    submitUpdate(values);
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          max_concurrent: 10,
          log_storage_backend: 'database',
          ai_chat_retention_days: 90,
          task_log_retention_days: 30,
          audit_log_retention_days: 365,
        }}
      >
        <Form.Item
          name="log_storage_backend"
          label={t('settings.task.logStorageBackend', { defaultValue: 'Log storage' })}
          tooltip={t('settings.task.logStorageBackendTooltip', {
            defaultValue: 'Where task execution logs are stored. Database stores logs in the application database.',
          })}
        >
          <Select
            options={logStorageBackendOptions}
            placeholder={t('settings.task.logStoragePlaceholder', { defaultValue: 'Select backend' })}
            loading={backendsList === undefined}
          />
        </Form.Item>
        <Form.Item
          name="max_concurrent"
          label={t('settings.task.maxConcurrent', { defaultValue: 'Max concurrent tasks' })}
          tooltip={t('settings.task.maxConcurrentTooltip', {
            defaultValue: 'Maximum number of tasks that can run at the same time.',
          })}
          rules={[{ type: 'number', min: 1, max: 100 }]}
        >
          <InputNumber min={1} max={100} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="ai_chat_retention_days"
          label={t('settings.task.aiChatRetentionDays', { defaultValue: 'AI chat retention (days)' })}
          tooltip={t('settings.task.aiChatRetentionDaysTooltip', {
            defaultValue: 'Retention period for AI chat sessions, based on the last conversation time.',
          })}
          rules={[{ type: 'number', min: 1, max: 3650 }]}
        >
          <InputNumber min={1} max={3650} style={{ width: '100%' }} addonAfter={t('settings.days', { defaultValue: 'Days' })} />
        </Form.Item>

        <Form.Item
          name="task_log_retention_days"
          label={t('settings.task.taskLogRetentionDays', { defaultValue: 'Task log retention (days)' })}
          tooltip={t('settings.task.taskLogRetentionDaysTooltip', {
            defaultValue: 'Retention period for task execution logs and historical task run records.',
          })}
          rules={[{ type: 'number', min: 1, max: 3650 }]}
        >
          <InputNumber min={1} max={3650} style={{ width: '100%' }} addonAfter={t('settings.days', { defaultValue: 'Days' })} />
        </Form.Item>

        <Form.Item
          name="audit_log_retention_days"
          label={t('settings.task.auditLogRetentionDays', { defaultValue: 'Audit log retention (days)' })}
          tooltip={t('settings.task.auditLogRetentionDaysTooltip', {
            defaultValue: 'Retention period for audit logs.',
          })}
          rules={[{ type: 'number', min: 1, max: 3650 }]}
        >
          <InputNumber min={1} max={3650} style={{ width: '100%' }} addonAfter={t('settings.days', { defaultValue: 'Days' })} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitting} icon={<SaveOutlined />}>
              {tCommon('save', { defaultValue: 'Save' })}
            </Button>
            <Button onClick={() => refresh()} icon={<ReloadOutlined />}>
              {tCommon('refresh', { defaultValue: 'Refresh' })}
            </Button>
            <PermissionGuard permission="task:schedule:list">
              <Button icon={<CalendarOutlined />} onClick={() => navigate('/tasks/schedules')}>
                {tTask('scheduledTasks', { defaultValue: 'Scheduled Tasks' })}
              </Button>
            </PermissionGuard>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default TaskSettingsForm;
