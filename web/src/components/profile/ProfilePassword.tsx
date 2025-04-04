import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { changePassword } from '@/api/authorization';
import { useRequest } from 'ahooks';
import { ApiError } from '@/api/client';

const ProfilePassword: React.FC<{ onSuccess?: () => void, token?: string }> = ({ onSuccess, token }) => {
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm();

  const { run: handleSubmit, loading } = useRequest(async (v: API.ChangePasswordRequest) => {
    return changePassword(v, token)
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
    >
      <Form.Item
        name="old_password"
        label={t('user.oldPassword')}
        rules={[{ required: true, message: t('validation.oldPasswordRequired') }]}
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
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm_password"
        label={t('user.confirmPassword')}
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

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {tCommon('save')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfilePassword; 