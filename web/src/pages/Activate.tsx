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
import { Form, Input, Button, Card, Alert, Typography, Result } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '@/service/api';
import { ApiError } from '@/service/client';
import LanguageSwitch, { LanguageConfig } from '@/components/LanguageSwitch';
import Loading from '@/components/Loading';
import { useSite } from '@/contexts/SiteContext';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

const { Title } = Typography;

interface ActivateProps {
  transformLangConfig?: (langs: LanguageConfig[]) => LanguageConfig[];
}

const useStyle = createStyles(({ css }) => ({
  container: css`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0f2f5;
  `,
  card: css`
    width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `,
  languageSwitch: css`
    position: absolute;
    top: 0;
    right: 0;
  `,
  titleArea: css`
    text-align: center;
    margin-bottom: 20px;
  `,
  errorAlert: css`
    margin-bottom: 20px;
  `,
}));

const Activate: React.FC<ActivateProps> = ({ transformLangConfig }) => {
  const { styles } = useStyle();
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { siteConfig, loading: siteConfigLoading, error: fetchSiteConfigError } = useSite();

  const [activationToken] = useState<string | null>(searchParams.get('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get('token') ? null : t('activate.invalidToken', { defaultValue: 'Invalid or expired activation link' }),
  );
  const [success, setSuccess] = useState(false);
  const [siteName, setSiteName] = useState<string>('');

  useEffect(() => {
    if (siteConfig) {
      setSiteName(siteConfig.name_i18n?.[i18n.language] || siteConfig.name || '');
      window.document.title = siteConfig.name;
      document.getElementById('site-icon')?.setAttribute('href', siteConfig.logo || '');
    }
  }, [siteConfig, i18n.language]);

  const onFinish = async (values: { password: string; confirm_password: string }) => {
    if (!activationToken) {
      setError(t('activate.invalidToken', { defaultValue: 'Invalid or expired activation link' }));
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await api.authorization.activateUser({ token: activationToken, password: values.password });
      setSuccess(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(t('activate.error', { defaultValue: 'Activation failed: {{error}}', error: err.message }));
      } else {
        setError(t('activate.error', { defaultValue: 'Activation failed' }));
      }
    } finally {
      setLoading(false);
    }
  };

  if (siteConfigLoading) {
    return <Loading />;
  }

  if (!siteConfig) {
    return (
      <Result
        status="500"
        title="500"
        subTitle={t('login.fetchSiteConfigError', {
          defaultValue: 'Failed to fetch site config: {{error}}',
          error: fetchSiteConfigError?.message || fetchSiteConfigError,
        })}
      />
    );
  }

  return (
    <div className="activate-page">
      <div className={classNames(styles.container, 'activate-page-container')}>
        <Card className={classNames(styles.card, 'activate-page-card')}>
          <div className={classNames(styles.languageSwitch, 'language-switch')}>
            <LanguageSwitch transformLangConfig={transformLangConfig} />
          </div>

          <div className={classNames(styles.titleArea, 'activate-page-title')}>
            <Title level={2}>{siteName}</Title>
            <p>{t('activate.subtitle', { defaultValue: 'Activate your account' })}</p>
          </div>

          {error && (
            <Alert
              className={classNames(styles.errorAlert, 'activate-page-error')}
              message={error}
              type="error"
              showIcon
            />
          )}

          {success ? (
            <Result
              status="success"
              title={t('activate.success', { defaultValue: 'Account activated successfully' })}
              subTitle={t('activate.successSubtitle', {
                defaultValue: 'Your account has been activated. You can now log in.',
              })}
              extra={
                <Button type="primary" onClick={() => { navigate('/login') }}>
                  {t('activate.goToLogin', { defaultValue: 'Go to Login' })}
                </Button>
              }
            />
          ) : (
            <Form name="activate" onFinish={onFinish} size="large" className="activate-page-form">
              <div style={{ marginBottom: 16 }}>
                <Typography.Text type="secondary">
                  {t('activate.description', { defaultValue: 'Please set a password to activate your account.' })}
                </Typography.Text>
              </div>

              <Form.Item
                name="password"
                rules={[{ required: true, message: t('activate.passwordRequired', { defaultValue: 'Password is required' }) }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder={t('activate.newPassword', { defaultValue: 'New Password' })}
                  autoComplete="new-password"
                />
              </Form.Item>

              <Form.Item
                name="confirm_password"
                dependencies={['password']}
                rules={[
                  { required: true, message: t('activate.confirmPasswordRequired', { defaultValue: 'Please confirm your password' }) },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t('activate.passwordMismatch', { defaultValue: 'Passwords do not match' })));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder={t('activate.confirmPassword', { defaultValue: 'Confirm Password' })}
                  autoComplete="new-password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block disabled={!activationToken}>
                  {t('activate.activateButton', { defaultValue: 'Activate Account' })}
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Activate;
