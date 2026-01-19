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
import { Form, Input, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import api from '@/service/api';
import { useRequest } from 'ahooks';
import { ApiError } from '@/service/client';
import classNames from 'classnames';

const ProfilePassword: React.FC<{ className?: string, onSuccess?: () => void, token?: string }> = ({ className, onSuccess, token }) => {
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm();

  const { run: handleSubmit, loading } = useRequest(async (v: API.ChangePasswordRequest) => {
    return api.authorization.changePassword(v, token ? { headers: { Authorization: `Bearer ${token}` } } : {})
  }, {
    manual: true,
    onSuccess: () => {
      message.success(t('user.passwordChanged'));
      form.resetFields();
      onSuccess?.();
    },
    onError: (error: ApiError | Error) => {
      if (error instanceof ApiError) {
        const code = error.code ?? 'normal';
        message.error(t(`user.passwordChangeFailed.${code}`, { error: error.message, defaultValue: "Password change failed: {{error}}" }));
      } else {
        message.error(t('user.passwordChangeFailed.normal', { error: error.message, defaultValue: "Password change failed: {{error}}" }));
      }
      console.error('Failed to change password:', error);
    },
  });

  return (
    <Form<API.ChangePasswordRequest>
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 500, margin: '0 auto' }}
      className={classNames('profile-password', className)}
    >
      <Form.Item
        name="old_password"
        label={t('user.oldPassword')}
        rules={[{ required: true, message: t('validation.oldPasswordRequired') }]}
        className={classNames('profile-password-item', 'profile-password-item-old-password')}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="new_password"
        label={t('user.newPassword')}
        rules={[
          { required: true, message: t('validation.newPasswordRequired') },
          { min: 8, message: t('validation.passwordMinLength') }
        ]}
        className={classNames('profile-password-item', 'profile-password-item-new-password')}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm_password"
        label={t('user.confirmPassword')}
        className={classNames('profile-password-item', 'profile-password-item-confirm-password')}
        rules={[
          { required: true, message: t('validation.confirmPasswordRequired') },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('new_password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t('validation.passwordMismatch')));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item className={classNames('profile-password-item', 'profile-password-item-submit')}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {tCommon('save')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfilePassword; 