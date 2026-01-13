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

import React, { useState, useEffect } from 'react';
import { Form, Switch, Select, Input, Button, Space, message, Spin, Divider, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import api from '@/service/api';
import { getURL } from '@/utils';

// URL format regular expression
const URL_PATTERN = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/;

interface OAuthSettingsFormProps {
  initialData?: API.OAuthSettings;
  onRefresh?: () => void;
}

// Preset OAuth provider field mapping configuration
const PROVIDER_FIELD_MAPPINGS = {
  github: {
    email_field: 'email',
    username_field: 'login',
    full_name_field: 'name',
    avatar_field: 'avatar_url',
    role_field: '',
    icon_url: 'https://github.githubassets.com/favicons/favicon.svg',
    display_name: 'GitHub',
    endpoints: {
      auth_endpoint: 'https://github.com/login/oauth/authorize',
      token_endpoint: 'https://github.com/login/oauth/access_token',
      userinfo_endpoint: 'https://api.github.com/user',
    },
    scope: 'user:email',
  },
  google: {
    email_field: 'email',
    username_field: 'email',
    full_name_field: 'name',
    avatar_field: 'picture',
    role_field: '',
    icon_url: 'https://www.google.com/favicon.ico',
    display_name: 'Google',
    endpoints: {
      auth_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      token_endpoint: 'https://oauth2.googleapis.com/token',
      userinfo_endpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
    },
    scope: 'profile email',
  },
  dingtalk: {
    email_field: 'email',
    username_field: 'nick',
    full_name_field: 'name',
    avatar_field: 'avatar',
    role_field: '',
    icon_url: 'https://img.alicdn.com/tfs/TB1pTD.XQT2gK0jSZFkXXcIQFXa-160-160.png',
    display_name: 'DingTalk',
    endpoints: {
      auth_endpoint: 'https://oapi.dingtalk.com/connect/qrconnect',
      token_endpoint: 'https://oapi.dingtalk.com/gettoken',
      userinfo_endpoint: 'https://oapi.dingtalk.com/topapi/user/get',
    },
    scope: 'snsapi_login',
  },
  wechat: {
    email_field: '',
    username_field: 'openid',
    full_name_field: 'nickname',
    avatar_field: 'headimgurl',
    role_field: '',
    icon_url: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico',
    display_name: 'WeChat',
    endpoints: {
      auth_endpoint: 'https://open.weixin.qq.com/connect/qrconnect',
      token_endpoint: 'https://api.weixin.qq.com/sns/oauth2/access_token',
      userinfo_endpoint: 'https://api.weixin.qq.com/sns/userinfo',
    },
    scope: 'snsapi_login',
  },
  custom: {
    email_field: '',
    username_field: '',
    full_name_field: '',
    avatar_field: '',
    role_field: '',
    icon_url: '',
    display_name: '',
    endpoints: {
      auth_endpoint: '',
      token_endpoint: '',
      userinfo_endpoint: '',
    },
    scope: '',
  },
};

const OAuthSettingsForm: React.FC<OAuthSettingsFormProps> = ({ initialData, onRefresh }) => {
  const { t } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm<API.OAuthSettings>();
  const [currentProvider, setCurrentProvider] = useState<string>(initialData?.provider || 'custom');
  const [showCustomFields, setShowCustomFields] = useState<boolean>(initialData?.provider === 'custom' || initialData?.provider === 'autoDiscover');
  const [isEnabled, setIsEnabled] = useState<boolean>(initialData?.enabled || false);
  const [autoCreateUser, setAutoCreateUser] = useState<boolean>(initialData?.auto_create_user || false);

  // Load data
  const { loading, data, refresh } = useRequest(api.system.getOauthSettings, {
    manual: !!initialData,
    onSuccess: (data) => {
      form.setFieldsValue(data);
      setCurrentProvider(data.provider);
      setShowCustomFields(data.provider === 'custom' || data.provider === 'autoDiscover');
      setIsEnabled(data.enabled);
      setAutoCreateUser(data.auto_create_user);
    },
    onError: (error) => {
      message.error(t('settings.fetchFailed', { defaultValue: 'Failed to fetch settings' }));
      console.error('Failed to get OAuth settings', error);
    }
  });

  // Initialize form data
  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
      setCurrentProvider(initialData.provider);
      setShowCustomFields(initialData.provider === 'custom' || initialData.provider === 'autoDiscover');
      setIsEnabled(initialData.enabled);
      setAutoCreateUser(initialData.auto_create_user);
    }
  }, [initialData, form]);

  // Handle provider change
  const handleProviderChange = (value: string) => {
    setCurrentProvider(value);
    setShowCustomFields(value === 'custom' || value === 'autoDiscover');

    // Auto-fill preset values based on the selected provider
    const providerConfig = PROVIDER_FIELD_MAPPINGS[value as keyof typeof PROVIDER_FIELD_MAPPINGS];
    if (providerConfig) {
      // Set endpoints
      form.setFieldsValue({
        auth_endpoint: providerConfig.endpoints.auth_endpoint,
        token_endpoint: providerConfig.endpoints.token_endpoint,
        userinfo_endpoint: providerConfig.endpoints.userinfo_endpoint,
        scope: providerConfig.scope,
        // Set field mappings
        email_field: providerConfig.email_field,
        username_field: providerConfig.username_field,
        full_name_field: providerConfig.full_name_field,
        avatar_field: providerConfig.avatar_field,
        role_field: providerConfig.role_field,
        // Set display configuration
        icon_url: providerConfig.icon_url,
        display_name: providerConfig.display_name,
      });
    }
  };

  // Handle enabled state change
  const handleEnabledChange = (checked: boolean) => {
    setIsEnabled(checked);
  };

  // Handle auto create user change
  const handleAutoCreateUserChange = (checked: boolean) => {
    setAutoCreateUser(checked);
  };

  // Handle form submission
  const { loading: submitting, run: submitUpdate } = useRequest(api.system.updateOauthSettings, {
    manual: true,
    onSuccess: () => {
      message.success(t('settings.updateSuccess', { defaultValue: 'Settings updated successfully' }));
      if (onRefresh) {
        onRefresh();
      } else {
        refresh();
      }
    },
    onError: (error) => {
      message.error(t('settings.updateFailed', { defaultValue: 'Failed to update settings' }));
      console.error('Failed to update OAuth settings', error);
    }
  });

  const handleSubmit = (values: API.OAuthSettings) => {
    submitUpdate(values);
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      refresh();
    }
  };

  const { loading: testConnectionLoading, run: handleTestConnection } = useRequest(async ({ redirect_uri, ...values }: API.OAuthSettings) => {
    let testRedirectURI: URL;
    if (redirect_uri) {
      testRedirectURI = new URL(redirect_uri);
    } else {
      testRedirectURI = new URL(window.location.origin);
    }
    testRedirectURI.pathname = getURL('/system/settings/oauth/test-callback');
    testRedirectURI.searchParams.set('provider', currentProvider);
    return api.system.testOauthConnection({ redirect_uri: testRedirectURI.toString(), ...values });
  }, {
    manual: true,
    onSuccess: ({ url }) => {
      window.open(url, '_blank');
    },
    onError: (error) => {
      message.error(t('settings.oauth.testConnection.failed', { defaultValue: 'Failed to test connection: {{error}}', error: error.message }));
      console.error('Failed to test OAuth connection', error);
    }
  });

  // Determine whether to display endpoint fields
  const shouldShowEndpoints = () => {
    return currentProvider === 'custom';
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialData || data}
      >
        {/* Enable OAuth */}
        <Form.Item
          name="enabled"
          label={t('settings.oauth.enabled.label', { defaultValue: 'Enable OAuth' })}
          valuePropName="checked"
          tooltip={t('settings.oauth.enabled.tooltip', { defaultValue: 'Enable or disable OAuth login for the system.' })}
        >
          <Switch onChange={handleEnabledChange} />
        </Form.Item>

        {/* OAuth Provider */}
        <Form.Item
          name="provider"
          label={t('settings.oauth.provider.label', { defaultValue: 'OAuth Provider' })}
          tooltip={t('settings.oauth.provider.tooltip', { defaultValue: 'Select an OAuth provider or configure a custom one.' })}
          rules={[
            {
              required: isEnabled,
              message: t('settings.oauth.provider.required', { defaultValue: 'Please select an OAuth provider.' })
            }
          ]}
        >
          <Select onChange={handleProviderChange} disabled={!isEnabled}>
            <Select.Option value="github">{t('settings.oauth.provider.options.github', { defaultValue: 'GitHub' })}</Select.Option>
            <Select.Option value="google">{t('settings.oauth.provider.options.google', { defaultValue: 'Google' })}</Select.Option>
            <Select.Option value="dingtalk">{t('settings.oauth.provider.options.dingtalk', { defaultValue: 'DingTalk' })}</Select.Option>
            <Select.Option value="wechat">{t('settings.oauth.provider.options.wechat', { defaultValue: 'WeChat' })}</Select.Option>
            <Select.Option value="autoDiscover">{t('settings.oauth.provider.options.autoDiscover', { defaultValue: 'Auto Discover' })}</Select.Option>
            <Select.Option value="custom">{t('settings.oauth.provider.options.custom', { defaultValue: 'Custom' })}</Select.Option>
          </Select>
        </Form.Item>

        {/* Display Name */}
        <Form.Item
          name="display_name"
          label={t('settings.oauth.displayName.label', { defaultValue: 'Display Name' })}
          tooltip={t('settings.oauth.displayName.tooltip', { defaultValue: 'The name displayed on the login button for this provider.' })}
        >
          <Input
            disabled={!isEnabled}
            placeholder={currentProvider !== 'custom' ? t(`settings.oauth.provider.options.${currentProvider}`, { defaultValue: currentProvider }) : ''}
          />
        </Form.Item>

        {/* Icon URL */}
        <Form.Item
          name="icon_url"
          label={t('settings.oauth.iconUrl.label', { defaultValue: 'Icon URL' })}
          tooltip={t('settings.oauth.iconUrl.tooltip', { defaultValue: 'URL of the icon for this provider. Displayed on the login button.' })}
          rules={[
            {
              pattern: URL_PATTERN,
              message: t('settings.oauth.iconUrl.invalidUrl', { defaultValue: 'Please enter a valid URL.' })
            }
          ]}
        >
          <Input disabled={!isEnabled} placeholder="https://example.com/icon.png" />
        </Form.Item>

        {/* Client ID */}
        <Form.Item
          name="client_id"
          label={t('settings.oauth.clientId.label', { defaultValue: 'Client ID' })}
          tooltip={t('settings.oauth.clientId.tooltip', { defaultValue: 'The Client ID provided by the OAuth provider.' })}
          rules={[
            {
              required: isEnabled,
              message: t('settings.oauth.clientId.required', { defaultValue: 'Client ID is required.' })
            }
          ]}
        >
          <Input disabled={!isEnabled} />
        </Form.Item>

        {/* Client Secret */}
        <Form.Item
          name="client_secret"
          label={t('settings.oauth.clientSecret.label', { defaultValue: 'Client Secret' })}
          tooltip={t('settings.oauth.clientSecret.tooltip', { defaultValue: 'The Client Secret provided by the OAuth provider. This will be stored encrypted.' })}
          rules={[
            {
              required: isEnabled,
              message: t('settings.oauth.clientSecret.required', { defaultValue: 'Client Secret is required.' })
            }
          ]}
        >
          <Input.Password disabled={!isEnabled} autoComplete="off" visibilityToggle={false} placeholder={t('settings.oauth.clientSecret.unchanged', { defaultValue: 'Leave blank to keep unchanged' })} />
        </Form.Item>

        {/* Authentication Endpoint - Only show when custom provider */}
        {shouldShowEndpoints() && (
          <Form.Item
            name="auth_endpoint"
            label={t('settings.oauth.authEndpoint.label', { defaultValue: 'Authorization Endpoint' })}
            tooltip={t('settings.oauth.authEndpoint.tooltip', { defaultValue: 'The authorization endpoint URL of the OAuth provider.' })}
            rules={[
              {
                required: isEnabled && currentProvider === 'custom',
                message: t('settings.oauth.authEndpoint.required', { defaultValue: 'Authorization Endpoint is required.' })
              },
              {
                pattern: URL_PATTERN,
                message: t('settings.oauth.authEndpoint.invalidUrl', { defaultValue: 'Please enter a valid URL.' })
              }
            ]}
          >
            <Input disabled={!isEnabled} />
          </Form.Item>
        )}
        <Form.Item
          name="wellknown_endpoint"
          hidden={currentProvider !== 'autoDiscover'}
          label={t('settings.oauth.wellknownEndpoint.label', { defaultValue: 'Wellknown Endpoint' })}
          tooltip={t('settings.oauth.wellknownEndpoint.tooltip', { defaultValue: 'The wellknown endpoint URL of the OAuth provider.' })}
          rules={[
            {
              pattern: URL_PATTERN,
              message: t('settings.oauth.wellknownEndpoint.invalidUrl', { defaultValue: 'Please enter a valid URL.' })
            },
            {
              required: isEnabled && currentProvider === 'autoDiscover',
              message: t('settings.oauth.wellknownEndpoint.required', { defaultValue: 'Wellknown Endpoint is required.' })
            },
          ]}
        >
          <Input disabled={!isEnabled} />
        </Form.Item>
        {/* Token Endpoint - Only show when custom provider */}
        {shouldShowEndpoints() && (
          <Form.Item
            name="token_endpoint"
            label={t('settings.oauth.tokenEndpoint.label', { defaultValue: 'Token Endpoint' })}
            tooltip={t('settings.oauth.tokenEndpoint.tooltip', { defaultValue: 'The token endpoint URL of the OAuth provider.' })}
            rules={[
              {
                required: isEnabled && currentProvider === 'custom',
                message: t('settings.oauth.tokenEndpoint.required', { defaultValue: 'Token Endpoint is required.' })
              },
              {
                pattern: URL_PATTERN,
                message: t('settings.oauth.tokenEndpoint.invalidUrl', { defaultValue: 'Please enter a valid URL.' })
              }
            ]}
          >
            <Input disabled={!isEnabled} />
          </Form.Item>
        )}

        {/* User Information Endpoint - Only show when custom provider */}
        {shouldShowEndpoints() && (
          <Form.Item
            name="userinfo_endpoint"
            label={t('settings.oauth.userInfoEndpoint.label', { defaultValue: 'User Info Endpoint' })}
            tooltip={t('settings.oauth.userInfoEndpoint.tooltip', { defaultValue: 'The user information endpoint URL of the OAuth provider.' })}
            rules={[
              {
                required: isEnabled && currentProvider === 'custom',
                message: t('settings.oauth.userInfoEndpoint.required', { defaultValue: 'User Info Endpoint is required.' })
              },
              {
                pattern: URL_PATTERN,
                message: t('settings.oauth.userInfoEndpoint.invalidUrl', { defaultValue: 'Please enter a valid URL.' })
              }
            ]}
          >
            <Input disabled={!isEnabled} />
          </Form.Item>
        )}

        {/* Authorization Scope */}
        <Form.Item
          name="scope"
          label={t('settings.oauth.scope.label', { defaultValue: 'Authorization Scope' })}
          tooltip={t('settings.oauth.scope.tooltip', { defaultValue: 'The scopes to request from the OAuth provider, separated by spaces.' })}
          rules={[
            {
              required: isEnabled,
              message: t('settings.oauth.scope.required', { defaultValue: 'Scope is required.' })
            }
          ]}
        >
          <Input disabled={!isEnabled} />
        </Form.Item>

        {/* Redirect URI */}
        <Form.Item
          name="redirect_uri"
          label={t('settings.oauth.redirectUri.label', { defaultValue: 'Redirect URI' })}
          tooltip={t('settings.oauth.redirectUri.tooltip', { defaultValue: 'The Redirect URI registered with the OAuth provider. This should match the one configured in your application.' })}
          rules={[(form) => {
            if (form.getFieldValue('redirect_uri') !== '') {
              return {
                pattern: URL_PATTERN,
                message: t('settings.oauth.redirectUri.invalidUrl', { defaultValue: 'Please enter a valid URL.' })
              }
            }
            return { required: false }
          }]}
        >
          <Input disabled={!isEnabled} placeholder={`http://${window.location.host}${getURL(`/login?provider=settings.${currentProvider}`)}`} />
        </Form.Item>

        {/* Auto Create User */}
        <Form.Item
          name="auto_create_user"
          label={t('settings.oauth.autoCreateUser.label', { defaultValue: 'Auto Create User' })}
          valuePropName="checked"
          tooltip={t('settings.oauth.autoCreateUser.tooltip', { defaultValue: 'Automatically create a new user if one does not exist with the OAuth email.' })}
        >
          <Switch onChange={handleAutoCreateUserChange} disabled={!isEnabled} />
        </Form.Item>

        {/* Default Role */}
        <Form.Item
          name="default_role"
          label={t('settings.oauth.defaultRole.label', { defaultValue: 'Default Role' })}
          tooltip={t('settings.oauth.defaultRole.tooltip', { defaultValue: 'The default role to assign to new users created via OAuth. Enter role ID.' })}
          rules={[
            {
              required: isEnabled && autoCreateUser,
              message: t('settings.oauth.defaultRole.required', { defaultValue: 'Default Role is required when auto create user is enabled.' })
            }
          ]}
        >
          <Input disabled={!isEnabled || !autoCreateUser} />
        </Form.Item>

        {/* Role Mapping Mode */}
        <Form.Item
          name="role_mapping_mode"
          label={t('settings.oauth.roleMappingMode.label', { defaultValue: 'Role Mapping Mode' })}
          tooltip={t('settings.oauth.roleMappingMode.tooltip', { defaultValue: 'Controls how user roles are synchronized from OAuth2 provider.' })}
          initialValue="auto"
        >
          <Select disabled={!isEnabled}>
            <Select.Option value="disabled">
              {t('settings.oauth.roleMappingMode.options.disabled.label', { defaultValue: 'Disabled' })}
            </Select.Option>
            <Select.Option value="auto">
              {t('settings.oauth.roleMappingMode.options.auto.label', { defaultValue: 'Auto' })}
            </Select.Option>
            <Select.Option value="enforce">
              {t('settings.oauth.roleMappingMode.options.enforce.label', { defaultValue: 'Enforce' })}
            </Select.Option>
          </Select>
        </Form.Item>

        {/* Role Mapping Mode Description */}
        <Alert
          style={{ marginBottom: 16 }}
          type="info"
          showIcon
          message={t('settings.oauth.roleMappingMode.infoTitle', { defaultValue: 'Role Mapping Mode Information' })}
          description={
            <div>
              <p><strong>{t('settings.oauth.roleMappingMode.options.disabled.label', { defaultValue: 'Disabled' })}:</strong> {t('settings.oauth.roleMappingMode.options.disabled.description', { defaultValue: 'Ignores role information from OAuth2 provider. New users get the default role.' })}</p>
              <p><strong>{t('settings.oauth.roleMappingMode.options.auto.label', { defaultValue: 'Auto' })}:</strong> {t('settings.oauth.roleMappingMode.options.auto.description', { defaultValue: 'Uses OAuth2 roles for new users or users without roles, but preserves existing role assignments.' })}</p>
              <p><strong>{t('settings.oauth.roleMappingMode.options.enforce.label', { defaultValue: 'Enforce' })}:</strong> {t('settings.oauth.roleMappingMode.options.enforce.description', { defaultValue: 'Always overwrites user roles with OAuth2 roles when available.' })}</p>
            </div>
          }
        />

        {/* MFA */}
        <Form.Item
          name="mfa_enabled"
          label={t('settings.oauth.mfaEnabled.label', { defaultValue: 'MFA Enabled' })}
          valuePropName="checked"
          tooltip={t('settings.oauth.mfaEnabled.tooltip', { defaultValue: 'Enable MFA for OAuth login(Only valid when MFA is enabled by the user).' })}
        >
          <Switch disabled={!isEnabled} />
        </Form.Item>

        {/* Field Mapping Divider */}
        <Divider>{t('settings.oauth.fieldMapping.title', { defaultValue: 'Field Mapping' })}</Divider>

        {/* Field Mapping Hint */}
        <Alert
          style={{ marginBottom: 16 }}
          type="info"
          showIcon
          message={t('settings.oauth.fieldMapping.autoDetectHint', { defaultValue: 'For preset providers, fields are typically auto-detected. Customize if needed.' })}
          description={!showCustomFields ? t('settings.oauth.fieldMapping.presetDescription', { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' }) : ''}
        />

        {/* Email Field */}
        <Form.Item
          name="email_field"
          label={t('settings.oauth.fieldMapping.emailField.label', { defaultValue: 'Email Field' })}
          tooltip={t('settings.oauth.fieldMapping.emailField.tooltip', { defaultValue: 'The field name in the user info response that contains the user email. (e.g., email)' })}
        >
          <Input placeholder="email" disabled={!isEnabled || !showCustomFields} />
        </Form.Item>

        {/* Username Field */}
        <Form.Item
          name="username_field"
          label={t('settings.oauth.fieldMapping.usernameField.label', { defaultValue: 'Username Field' })}
          tooltip={t('settings.oauth.fieldMapping.usernameField.tooltip', { defaultValue: 'The field name in the user info response that contains the username. (e.g., login, sub)' })}
        >
          <Input placeholder="login" autoComplete="off" disabled={!isEnabled || !showCustomFields} />
        </Form.Item>

        {/* Full Name Field */}
        <Form.Item
          name="full_name_field"
          label={t('settings.oauth.fieldMapping.fullNameField.label', { defaultValue: 'Full Name Field' })}
          tooltip={t('settings.oauth.fieldMapping.fullNameField.tooltip', { defaultValue: 'The field name in the user info response that contains the user\'s full name. (e.g., name)' })}
        >
          <Input placeholder="name" disabled={!isEnabled || !showCustomFields} />
        </Form.Item>

        {/* Avatar Field */}
        <Form.Item
          name="avatar_field"
          label={t('settings.oauth.fieldMapping.avatarField.label', { defaultValue: 'Avatar URL Field' })}
          tooltip={t('settings.oauth.fieldMapping.avatarField.tooltip', { defaultValue: 'The field name in the user info response that contains the URL to the user\'s avatar. (e.g., picture, avatar_url)' })}
        >
          <Input placeholder="avatar_url" disabled={!isEnabled || !showCustomFields} />
        </Form.Item>

        {/* Role Field */}
        <Form.Item
          name="role_field"
          label={t('settings.oauth.fieldMapping.roleField.label', { defaultValue: 'Role Field' })}
          tooltip={t('settings.oauth.fieldMapping.roleField.tooltip', { defaultValue: 'The field name in the user info response that contains the user\'s role. (Optional)' })}
        >
          <Input placeholder="role" disabled={!isEnabled || !showCustomFields} />
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
              loading={testConnectionLoading}
              onClick={async () => {
                const values = form.getFieldsValue();
                handleTestConnection(values);
              }}
            >
              {t('settings.oauth.testConnection.button', { defaultValue: 'Test Connection' })}
            </Button>
            <Button
              onClick={handleRefresh}
              icon={<ReloadOutlined />}
            >
              {tCommon('refresh', { defaultValue: 'Refresh' })}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default OAuthSettingsForm; 