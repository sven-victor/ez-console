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
import { Form, InputNumber, Button, message, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import api from '@/service/api';

const TaskSettingsForm: React.FC = () => {
  const { t } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm();

  const { loading, refresh } = useRequest(api.system.getTaskSettings, {
    onSuccess: (res) => {
      if (res) {
        form.setFieldsValue({ max_concurrent: res.max_concurrent });
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
        initialValues={{ max_concurrent: 10 }}
      >
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
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitting} icon={<SaveOutlined />}>
              {tCommon('save', { defaultValue: 'Save' })}
            </Button>
            <Button onClick={() => refresh()} icon={<ReloadOutlined />}>
              {tCommon('refresh', { defaultValue: 'Refresh' })}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default TaskSettingsForm;
