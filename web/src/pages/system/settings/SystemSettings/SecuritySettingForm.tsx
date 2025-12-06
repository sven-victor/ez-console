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
import { Form, Switch, Select, InputNumber, Button, message, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import api from '@/service/api';


const SecuritySettingForm: React.FC = () => {
  const { t } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm();

  // Get system settings data
  const { loading, data, refresh } = useRequest(api.system.getSecuritySettings, {
    onSuccess: (data) => {
      form.setFieldsValue(data);
    },
    onError: (error) => {
      message.error(t('settings.fetchFailed', { defaultValue: 'Failed to fetch settings' }));
      console.error('Failed to get system settings', error);
    }
  });

  // Handle form submission
  const { loading: submitting, run: submitUpdate } = useRequest(api.system.updateSecuritySettings, {
    manual: true,
    onSuccess: () => {
      message.success(t('settings.updateSuccess', { defaultValue: 'Settings updated successfully' }));
      refresh(); // Refresh data
    },
    onError: (error) => {
      message.error(t('settings.updateFailed', { defaultValue: 'Failed to update settings' }));
      console.error('Failed to update system settings', error);
    }
  });

  const handleSubmit = (values: API.SecuritySettings) => {
    submitUpdate(values);
  };

  return <Spin spinning={loading}>
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={data}
    >
      {/* MFA Settings */}
      <Form.Item
        name="mfa_enforced"
        label={t('settings.security.mfa.label', { defaultValue: 'Enforce Multi-Factor Authentication (MFA)' })}
        valuePropName="checked"
        tooltip={t('settings.security.mfa.tooltip', { defaultValue: 'If enabled, all users will be required to set up MFA.' })}
      >
        <Switch />
      </Form.Item>

      {/* Password Complexity Settings */}
      <Form.Item
        name="password_complexity"
        label={t('settings.security.passwordComplexity.label', { defaultValue: 'Password Complexity' })}
        tooltip={t('settings.security.passwordComplexity.tooltip', { defaultValue: 'Define the complexity requirements for user passwords.' })}
      >
        <Select>
          <Select.Option value="low">{t('settings.security.passwordComplexity.options.low', { defaultValue: 'Low' })}</Select.Option>
          <Select.Option value="medium">{t('settings.security.passwordComplexity.options.medium', { defaultValue: 'Medium' })}</Select.Option>
          <Select.Option value="high">{t('settings.security.passwordComplexity.options.high', { defaultValue: 'High' })}</Select.Option>
          <Select.Option value="very_high">{t('settings.security.passwordComplexity.options.veryHigh', { defaultValue: 'Very High' })}</Select.Option>
        </Select>
      </Form.Item>

      {/* Minimum Password Length */}
      <Form.Item
        name="password_min_length"
        label={t('settings.security.passwordMinLength.label', { defaultValue: 'Minimum Password Length' })}
        tooltip={t('settings.security.passwordMinLength.tooltip', { defaultValue: 'The minimum number of characters required for a password.' })}
        rules={[{ type: 'number', min: 6, max: 32 }]}
      >
        <InputNumber min={6} max={32} style={{ width: '100%' }} />
      </Form.Item>

      {/* Password Expiry Time */}
      <Form.Item
        name="password_expiry_days"
        label={t('settings.security.passwordExpiry.label', { defaultValue: 'Password Expiry (Days)' })}
        tooltip={t('settings.security.passwordExpiry.tooltip', { defaultValue: 'Number of days after which passwords expire. Set to 0 to disable expiry.' })}
      >
        <InputNumber min={0} style={{ width: '100%' }} addonAfter={t('settings.days', { defaultValue: 'Days' })} />
      </Form.Item>

      {/* Login Failure Lock Settings */}
      <Form.Item
        name="login_failure_lock"
        label={t('settings.security.loginFailureLock.label', { defaultValue: 'Lock Account on Login Failure' })}
        valuePropName="checked"
        tooltip={t('settings.security.loginFailureLock.tooltip', { defaultValue: 'Lock user accounts after a specified number of failed login attempts.' })}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.login_failure_lock !== currentValues.login_failure_lock
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('login_failure_lock') ? (
            <Form.Item
              name="login_failure_attempts"
              label={t('settings.security.loginFailureAttempts.label', { defaultValue: 'Login Failure Attempts' })}
              tooltip={t('settings.security.loginFailureAttempts.tooltip', { defaultValue: 'Number of failed login attempts before locking the account.' })}
            >
              <InputNumber min={1} max={10} style={{ width: '100%' }} />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.login_failure_lock !== currentValues.login_failure_lock
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('login_failure_lock') ? (
            <Form.Item
              name="login_failure_lockout_minutes"
              label={t('settings.security.loginFailureLockoutMinutes.label', { defaultValue: 'Login Failure Lockout (Minutes)' })}
              tooltip={t('settings.security.loginFailureLockoutMinutes.tooltip', { defaultValue: 'Number of minutes to lock the account after a specified number of failed login attempts.' })}
            >
              <InputNumber min={1} max={10} style={{ width: '100%' }} addonAfter={t('settings.minutes', { defaultValue: 'Minutes' })} />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      {/* History Password Check Policy */}
      <Form.Item
        name="history_password_check"
        label={t('settings.security.historyPasswordCheck.label', { defaultValue: 'Enforce Password History Policy' })}
        valuePropName="checked"
        tooltip={t('settings.security.historyPasswordCheck.tooltip', { defaultValue: 'Prevent users from reusing recent passwords.' })}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.history_password_check !== currentValues.history_password_check
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('history_password_check') ? (
            <Form.Item
              name="history_password_count"
              label={t('settings.security.historyPasswordCount.label', { defaultValue: 'Password History Count' })}
              tooltip={t('settings.security.historyPasswordCount.tooltip', { defaultValue: 'Number of previous passwords to remember and prevent reuse.' })}
            >
              <InputNumber min={1} max={10} style={{ width: '100%' }} />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      {/* Auto Lock Inactive Account */}
      <Form.Item
        name="inactive_account_lock_days"
        label={t('settings.security.inactiveAccountLock.label', { defaultValue: 'Auto-lock Inactive Accounts (Days)' })}
        tooltip={t('settings.security.inactiveAccountLock.tooltip', { defaultValue: 'Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable.' })}
      >
        <InputNumber min={0} style={{ width: '100%' }} addonAfter={t('settings.days', { defaultValue: 'Days' })} />
      </Form.Item>

      {/* Session Timeout */}
      <Form.Item
        name="session_timeout_minutes"
        label={t('settings.security.sessionTimeout.label', { defaultValue: 'Session Timeout (Minutes)' })}
        tooltip={t('settings.security.sessionTimeout.tooltip', { defaultValue: 'Automatically log out users after a period of inactivity.' })}
      >
        <InputNumber min={5} style={{ width: '100%' }} addonAfter={t('settings.minutes', { defaultValue: 'Minutes' })} />
      </Form.Item>

      {/* Session Idle Timeout */}
      <Form.Item
        name="session_idle_timeout_minutes"
        label={t('settings.security.sessionIdleTimeout.label', { defaultValue: 'Session Idle Timeout (Minutes)' })}
        tooltip={t('settings.security.sessionIdleTimeout.tooltip', { defaultValue: 'Automatically log out users after a period of inactivity.' })}
      >
        <InputNumber min={5} style={{ width: '100%' }} addonAfter={t('settings.minutes', { defaultValue: 'Minutes' })} />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            icon={<SaveOutlined />}
          >
            {tCommon('save', { defaultValue: 'Save' })}
          </Button>
          <Button
            onClick={() => refresh()}
            icon={<ReloadOutlined />}
          >
            {tCommon('refresh', { defaultValue: 'Refresh' })}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </Spin>
};

export default SecuritySettingForm; 