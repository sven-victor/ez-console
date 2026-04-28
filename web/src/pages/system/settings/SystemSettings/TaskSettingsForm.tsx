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
import { Form, Input, InputNumber, Switch, Button, message, Space, Spin, Select } from 'antd';
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
  const [form] = Form.useForm<Record<string, any>>();

  const { data: backendsList } = useRequest(api.system.listLogStorageBackends);
  const { data: fieldDefs } = useRequest(api.system.getTaskSettingFields);

  const logStorageBackendOptions = (backendsList ?? []).map((b: API.LogStorageBackendOption) => ({
    value: b.id,
    label: t(`settings.task.logStorage.${b.id}`, { defaultValue: b.name }),
  }));

  const { loading, refresh } = useRequest(api.system.getTaskSettings, {
    onSuccess: (res) => {
      if (res) {
        form.setFieldsValue(res);
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

  const handleSubmit = (values: Record<string, any>) => {
    submitUpdate(values);
  };

  const renderFieldControl = (field: API.TaskSettingField) => {
    switch (field.value_type) {
      case 'int':
        return (
          <InputNumber
            style={{ width: '100%' }}
            addonAfter={
              field.key.includes('retention_days')
                ? t('settings.days', { defaultValue: 'Days' })
                : undefined
            }
          />
        );
      case 'bool':
        return <Switch />;
      default:
        return <Input />;
    }
  };

  const getFieldRules = (field: API.TaskSettingField) => {
    if (field.value_type === 'int') {
      return [{ type: 'number' as const }];
    }
    return [];
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        {/* Fixed non-extensible setting with dedicated UI */}
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

        {/* Dynamically rendered extensible fields */}
        {(fieldDefs ?? []).map((field: API.TaskSettingField) => (
          <Form.Item
            key={field.key}
            name={field.key}
            label={t(`settings.task.fields.${field.key}`, { defaultValue: field.key })}
            rules={getFieldRules(field)}
            valuePropName={field.value_type === 'bool' ? 'checked' : 'value'}
          >
            {renderFieldControl(field)}
          </Form.Item>
        ))}

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
