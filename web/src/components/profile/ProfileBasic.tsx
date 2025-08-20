import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import api from '@/service/api';
import { AvatarUpload } from '../Avatar';

interface ProfileBasicProps {
  user: API.User | null;
  onSuccess: () => void;
}

const ProfileBasic: React.FC<ProfileBasicProps> = ({ user, onSuccess }) => {
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone || '',
        avatar: user.avatar,
      });
    }
  }, [user, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await api.authorization.updateCurrentUser(values);
      message.success(tCommon('updateSuccess'));
      onSuccess();
    } catch (error) {
      message.error(tCommon('updateFailed'));
      console.error('Failed to update user information:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>

        <h2>{user?.full_name || user?.username}</h2>
        {user?.roles && user.roles.length > 0 && (
          <div>
            {t('user.roles')}: {user.roles.map(role => role.name).join(', ')}
          </div>
        )}
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ width: '100%', maxWidth: 500 }}
      >
        <Form.Item
          style={{ marginBottom: 24, textAlign: 'center', justifyItems: 'center' }}
          name="avatar"
        // label={t('user.avatar')}
        >
          <AvatarUpload />
        </Form.Item>
        <Form.Item
          name="username"
          label={t('user.username')}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="email"
          label={t('user.email')}
          rules={[
            { required: true, message: t('validation.emailRequired') },
            { type: 'email', message: t('validation.emailInvalid') }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="full_name"
          label={t('user.fullName')}
          rules={[{ required: true, message: t('validation.fullNameRequired') }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t('user.phone')}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {tCommon('save')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileBasic; 