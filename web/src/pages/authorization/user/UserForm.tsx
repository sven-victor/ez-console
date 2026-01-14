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

import React, { useCallback } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Space,
  message,
  Switch,
  Spin,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/service/api';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { AvatarUpload } from '@/components/Avatar';
import { useSite } from '@/contexts/SiteContext';

const { Option } = Select;

interface UserFormValues {
  username?: string;
  avatar?: string;
  email: string;
  full_name: string;
  password?: string;
  confirm_password?: string;
  status: 'active' | 'disabled';
  role_ids: string[];
  mfa_enforced: boolean;
}

const UserForm: React.FC = () => {
  const { id = "" } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation("authorization");
  const { t: tCommon } = useTranslation("common");
  const [form] = Form.useForm();
  const isEditMode = !!id;

  const { enableMultiOrg } = useSite();

  const { data: organizations, loading: organizationsLoading } = useRequest(async () => {
    return (await api.system.listOrganizations({ current: 1, page_size: 1000 })).data || [];
  }, {
    refreshDeps: [enableMultiOrg],
    onError: (error) => {
      message.error(t('organizations.loadError', { defaultValue: 'Failed to load organizations', error: error.message }));
    },
    cacheKey: 'fetchAllOrganizations',
    cacheTime: 1000 * 60 * 10,
  });


  const renderOrganizationRole = useCallback((organization_id: string, role: API.Role): React.ReactNode => {
    if (organizationsLoading) {
      return <>{<Spin size="small" />}:{role.name}</>;
    }
    const organization = organizations?.find(org => org.id === organization_id);
    if (organization) {
      return `${organization.name}:${role.name}`;
    }
    return role.name;
  }, [organizations, organizationsLoading]);

  // Get role list
  const { data: rolesData, loading: rolesLoading } = useRequest(async () => {
    const response = await api.authorization.listRoles({});
    return response.data.map((role: API.Role) => ({
      ...role,
      label: role.name,
      value: role.id,
    }));
  });

  // If in edit mode, get user information
  const { loading: userLoading } = useRequest(async () => {
    if (!isEditMode || !form) {
      return;
    }

    try {
      const userData = await api.authorization.getUser({ id });

      form.setFieldsValue({
        username: userData.username,
        email: userData.email,
        full_name: userData.full_name,
        status: userData.status,
        role_ids: userData.roles ? userData.roles.map(role => role.id) : [],
        mfa_enforced: userData.mfa_enforced,
      });

      return userData;
    } catch (error) {
      message.error(t('user.loadError', { defaultValue: 'Failed to load user data' }));
    }
  }, { refreshDeps: [id, form] });

  // Submit form
  const { run: onSubmit, loading: submitLoading } = useRequest(async (values: UserFormValues) => {
    try {
      if (isEditMode) {
        // Update user basic information
        await api.authorization.updateUser({ id }, {
          email: values.email,
          avatar: values.avatar,
          full_name: values.full_name,
          status: values.status,
          mfa_enforced: values.mfa_enforced,
          role_ids: values.role_ids,
        });

        message.success(t('user.updateSuccess', { defaultValue: 'User updated successfully' }));
        navigate(`/authorization/users/${id}`);
      } else {
        // Create new user
        const userData: API.CreateUserRequest = {
          username: values.username!,
          avatar: values.avatar,
          password: values.password!,
          email: values.email,
          full_name: values.full_name,
          mfa_enforced: values.mfa_enforced,
          role_ids: values.role_ids,
        };

        const newUser = await api.authorization.createUser(userData);
        message.success(t('user.createSuccess', { defaultValue: 'User created successfully' }));
        navigate(`/authorization/users/${newUser.id}`);
      }
    } catch (error) {
      message.error(isEditMode ? t('user.updateError', { defaultValue: 'Failed to update user', error: error as string }) : t('user.createError', { defaultValue: 'Failed to create user', error: error as string }));
    }
  }, { manual: true });

  // Form validation rules
  const validatePassword = (_: any, value: string) => {
    if (isEditMode) return Promise.resolve();
    if (!value) return Promise.reject(new Error(t('user.passwordRequired', { defaultValue: 'Password is required' })));
    if (value.length < 8) return Promise.reject(new Error(t('user.passwordTooShort', { defaultValue: 'Password must be at least 8 characters long' })));
    return Promise.resolve();
  };

  const validateConfirmPassword = (_: any, value: string) => {
    if (isEditMode) return Promise.resolve();
    if (!value) return Promise.reject(new Error(t('user.confirmPasswordRequired', { defaultValue: 'Please confirm your password' })));
    if (value !== form.getFieldValue('password')) {
      return Promise.reject(new Error(t('user.passwordMismatch', { defaultValue: 'Passwords do not match' })));
    }
    return Promise.resolve();
  };

  return (
    <Card
      title={isEditMode ? t('user.editTitle', { defaultValue: 'Edit User' }) : t('user.createTitle', { defaultValue: 'Create User' })}
      loading={userLoading || rolesLoading}
    >
      <Form
        form={form}
        layout="horizontal"
        onFinish={onSubmit}
        labelCol={{
          sm: { span: 24 },
          md: { span: 6 },
        }}
        wrapperCol={{
          sm: { span: 24 },
          md: { span: 18 },
        }}
        size='middle'
        style={{ maxWidth: '500px', margin: '0 auto' }}
        initialValues={{
          status: 'active',
          role_ids: [],
        }}
      >
        <Form.Item
          name="avatar"
          label={t('user.avatar', { defaultValue: 'Avatar' })}
        >
          <AvatarUpload />
        </Form.Item>
        <Form.Item
          name="username"
          label={t('user.username', { defaultValue: 'Username' })}
          rules={[
            { required: !isEditMode, message: t('user.usernameRequired', { defaultValue: 'Username is required' }) },
          ]}
        >
          <Input disabled={isEditMode} placeholder={t('user.usernamePlaceholder', { defaultValue: 'Enter username' })} />
        </Form.Item>
        <Form.Item
          name="email"
          label={t('user.email', { defaultValue: 'Email' })}
          rules={[
            { required: true, message: t('user.emailRequired', { defaultValue: 'Email is required' }) },
            { type: 'email', message: t('user.emailInvalid', { defaultValue: 'Invalid email format' }) },
          ]}
        >
          <Input placeholder={t('user.emailPlaceholder', { defaultValue: 'Enter email address' })} />
        </Form.Item>
        <Form.Item
          name="full_name"
          label={t('user.fullName', { defaultValue: 'Full Name' })}
          rules={[{ required: true, message: t('user.fullNameRequired', { defaultValue: 'Full name is required' }) }]}
        >
          <Input placeholder={t('user.fullNamePlaceholder', { defaultValue: 'Enter full name' })} />
        </Form.Item>
        {isEditMode && (
          <Form.Item
            name="status"
            label={t('user.status', { defaultValue: 'Status' })}
            rules={[{ required: true, message: t('user.statusRequired', { defaultValue: 'Status is required' }) }]}
          >
            <Select placeholder={t('user.statusPlaceholder', { defaultValue: 'Select status' })}>
              <Option value="active">{t('user.statusActive', { defaultValue: 'Active' })}</Option>
              <Option value="disabled">{t('user.statusDisabled', { defaultValue: 'Disabled' })}</Option>
              <Option value="password_expired">{t('user.statusEnum.password_expired', { defaultValue: 'Password Expired' })}</Option>
            </Select>
          </Form.Item>)}
        <Form.Item
          name="mfa_enforced"
          label={t('user.mfaEnforced', { defaultValue: 'MFA Enforced' })}
        >
          <Switch />
        </Form.Item>

        {!isEditMode && (
          <>
            <Form.Item
              name="password"
              label={t('user.password', { defaultValue: 'Password' })}
              rules={[{ validator: validatePassword }]}
            >
              <Input.Password autoComplete='new-password' placeholder={t('user.passwordPlaceholder', { defaultValue: 'Enter password' })} />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              label={t('user.confirmPassword', { defaultValue: 'Confirm Password' })}
              rules={[{ validator: validateConfirmPassword }]}
              dependencies={['password']}
            >
              <Input.Password autoComplete="new-password" placeholder={t('user.confirmPasswordPlaceholder', { defaultValue: 'Confirm password' })} />
            </Form.Item>
          </>
        )}

        <Form.Item
          name="role_ids"
          label={t('user.roles', { defaultValue: 'Roles' })}
        >
          <Select
            mode="multiple"
            placeholder={t('user.selectRoles', { defaultValue: 'Select roles' })}
            options={rolesData?.map((role: API.Role & { label: string, value: string }) => ({
              ...role,
              label: enableMultiOrg ? renderOrganizationRole(role.organization_id, role) : role.name,
            }))}
            optionFilterProp="label"
            loading={rolesLoading}
          />
        </Form.Item>

        {/* Submit button, centered */}
        <Form.Item wrapperCol={{ offset: 9 }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitLoading}
            >
              {isEditMode ? tCommon('update', { defaultValue: 'Update' }) : tCommon('create', { defaultValue: 'Create' })}
            </Button>
            <Button
              onClick={() => isEditMode ? navigate(`/authorization/users/${id}`) : navigate('/authorization/users')}
            >
              {tCommon('cancel', { defaultValue: 'Cancel' })}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserForm; 