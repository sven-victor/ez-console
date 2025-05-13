import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Card, message, Typography, Alert, Divider, Space, Avatar } from 'antd';
import { LockOutlined, UserOutlined, GithubOutlined, KeyOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { getOAuthProviders, getOAuthLoginURL } from '@/api/authorization';
import { ApiError } from '@/api/client';
import ProfilePassword from '@/components/profile/ProfilePassword';
import { maskEmail } from '@/utils';
import { getSiteConfig } from '@/api/system';
import LanguageSwitch from '@/components/LanguageSwitch';
import Loading from '@/components/Loading';

const { Title } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login, oauthLogin, user: currentUser } = useAuth();
  const { t, i18n } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [oauthLoading, setOAuthLoading] = useState<{ [key: string]: boolean }>({});
  const [pageType, setPageType] = useState<'login' | 'password_expired' | 'mfa'>('login');
  const [token, setToken] = useState<string | null>(null);
  const [mfaType, setMfaType] = useState<string | null>(null);
  const [user, setUser] = useState<API.User | null>(null);
  const [form] = Form.useForm();
  const callbackRef = useRef(false)
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<API.OAuthProvider[]>([]);
  const [submitButtonDisabledCountdown, setSubmitButtonDisabledCountdown] = useState(0);

  const [siteName, setSiteName] = useState<string>('Loading...');
  const [siteConfig, setSiteConfig] = useState<API.SiteConfig | null>(null);

  const onLogin = async (values: { username: string, password: string } | { mfa_token: string, mfa_code: string } | { code: string, state: string, provider: string }) => {
    const handleLogin = async (values: { username: string, password: string } | { mfa_token: string, mfa_code: string } | { code: string, state: string, provider: string }) => {
      if ('username' in values) {
        return await login({ username: values.username, password: values.password });
      } else if ('mfa_token' in values) {
        return await login({ mfa_token: values.mfa_token, mfa_code: values.mfa_code });
      } else {
        return await oauthLogin({ code: values.code, state: values.state, provider: values.provider });
      }
    }
    try {
      setLoading(true);
      const res = await handleLogin(values);
      await new Promise(resolve => setTimeout(resolve, 100));
      if (res && res.mfa_enforced && !res.mfa_enabled && location.pathname !== '/profile') {
        navigate('/profile#mfa');
      } else {
        const redirect = searchParams.get('redirect');
        if (redirect) {
          window.location.href = redirect;
        } else if (siteConfig?.home_page) {
          window.location.href = siteConfig.home_page;
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      if ((error as any).password_expired) {
        setPageType('password_expired');
        setToken((error as any).token);
        setError(null);
      } else if ((error as any).needsMFA) {
        setError(null);
        setPageType('mfa');
        navigate('/login', { replace: true });
        setMfaType((error as any).mfaType);
        setUser((error as any).user);
        form.setFieldValue('mfa_token', (error as any).mfaToken);
      } else if ('username' in values || 'mfa_token' in values) {
        if (error instanceof ApiError) {
          setError(t('login.error', { defaultValue: 'Login failed: {{error}}', error: t(`login.${error}`, { defaultValue: error.message }) }));
        } else if (typeof error === 'string') {
          setError(error);
        } else {
          setError(t('login.error', { defaultValue: 'Login failed' }));
        }
        if ('mfa_token' in values) {
          setSubmitButtonDisabledCountdown(30);
          // reset button disabled after 30 seconds, 30 seconds countdown
          const countdownInterval = setInterval(() => {
            setSubmitButtonDisabledCountdown(countdown => countdown >= 1 ? countdown - 1 : 0);
          }, 1000);
          setTimeout(() => {
            clearInterval(countdownInterval);
            setSubmitButtonDisabledCountdown(0);
          }, 30000);
        } else if ('username' in values) {
          setPageType('login');
        }
      } else {
        if (error instanceof ApiError) {
          setError(t('login.oauthError', { defaultValue: 'OAuth login failed: {{error}}', error: t(`login.${error.code}`, { defaultValue: error.message }) }));
        } else if (typeof error === 'string') {
          setError(error);
        } else {
          setError(t('login.oauthError', { defaultValue: 'OAuth login failed: {{error}}', error: error }));
        }
        navigate('/login', { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }

  const fetchProviders = async () => {
    setProviders(await getOAuthProviders() || []);
  }

  // Handle OAuth callback
  useEffect(() => {
    if (!callbackRef.current) {
      callbackRef.current = true
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const provider = searchParams.get('provider');
      if (code && state && provider) {
        onLogin({ code, state, provider });
      } else {
        fetchProviders()
      }
    }
  }, [searchParams, oauthLogin]);


  useEffect(() => {
    if (i18n.language) {
      setSiteName(siteConfig?.name_i18n[i18n.language] || siteConfig?.name || "")
    }
  }, [siteConfig, i18n.language])


  // Get OAuth login URL and redirect
  const handleOAuthLogin = async (provider: string) => {
    try {
      setOAuthLoading({ ...oauthLoading, [provider]: true });
      const { url } = await getOAuthLoginURL(provider);
      window.location.href = url;
    } catch (error) {
      message.error(t('login.oauthError', { defaultValue: 'OAuth login failed' }));
      console.error('OAuth login error:', error);
    } finally {
      setOAuthLoading({ ...oauthLoading, [provider]: false });
    }
  };

  // Get the corresponding icon based on the provider name
  const getProviderIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <GithubOutlined />;
      default:
        return null;
    }
  };
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const provider = searchParams.get('provider');


  useEffect(() => {
    const fetchSiteConfig = async () => {
      const siteConfig = await getSiteConfig()
      setSiteName(siteConfig.name)
      setSiteConfig(siteConfig)
      window.document.title = siteConfig.name
      document.getElementById('site-icon')?.setAttribute('href', siteConfig.logo)
    }
    fetchSiteConfig()
  }, [])

  if ((code && state && provider) || !siteConfig) {
    return <Loading />
  }

  if (currentUser && currentUser.status === 'active') {
    const redirect = searchParams.get('redirect');
    if (redirect) {
      window.location.href = redirect;
    } else if (siteConfig?.home_page) {
      window.location.href = siteConfig.home_page;
    } else {
      navigate('/');
    }
  }


  return (
    <div>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
      }}>
        <LanguageSwitch />
      </div>
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f2f5'
      }}>
        <Card style={{ width: 400, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <Title level={2}>{siteName}</Title>
            <p>{t('login.subtitle', { defaultValue: 'Enter your credentials to continue' })}</p>
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 20 }}
            />
          )}
          {mfaType && (
            <Alert
              message={t(`login.mfaTips.${mfaType}`, { defaultValue: 'You have enabled MFA based on ${mfaType}, please enter the corresponding one-time password.' })}
              type="info"
              showIcon
              style={{ marginBottom: 20 }}
            />
          )}
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onLogin}
            size="large"
            form={form}
            hidden={pageType === 'password_expired'}
          >
            {/* TODO: fix MFA code input */}
            {pageType === 'mfa' && (
              <>
                <Form.Item hidden={!user?.email || mfaType !== 'email'}>
                  <Input value={maskEmail(user?.email)} />
                </Form.Item>
                <Form.Item name="mfa_token" hidden={true}>
                  <Input />
                </Form.Item>
                <Form.Item name="mfa_code" hidden={pageType !== 'mfa'}>
                  <Input placeholder={t('login.mfa-code', { defaultValue: 'MFA Code' })} prefix={<KeyOutlined />} />
                </Form.Item>
              </>
            )}
            {pageType === 'login' && (
              <>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: t('login.usernameRequired', { defaultValue: 'Username is required' }) }]}
                >
                  <Input prefix={<UserOutlined />} placeholder={t('login.username', { defaultValue: 'Username' })} autoComplete="username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: t('login.passwordRequired', { defaultValue: 'Password is required' }) }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder={t('login.password', { defaultValue: 'Password' })}
                    autoComplete="current-password"
                  />
                </Form.Item>
              </>
            )}

            <Form.Item>
              <Button
                disabled={submitButtonDisabledCountdown > 0}
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                {submitButtonDisabledCountdown > 0 ? <span style={{ marginLeft: 8 }}>{submitButtonDisabledCountdown}s</span> : t('login.login', { defaultValue: 'Login' })}
              </Button>
            </Form.Item>
          </Form>

          {providers.length > 0 && pageType !== 'password_expired' && (
            <>
              <Divider>{t('login.or', { defaultValue: 'Or' })}</Divider>

              <Space direction="vertical" style={{ width: '100%' }}>
                {providers.map(provider => (
                  <Button
                    key={provider.name}
                    icon={getProviderIcon(provider.name)}
                    onClick={() => handleOAuthLogin(provider.name)}
                    loading={oauthLoading[provider.name]}
                    block
                  >
                    {provider.icon_url ? <Avatar src={provider.icon_url} /> :
                      t('login.continueWith', { defaultValue: 'Continue with {{provider}}', provider: provider.display_name })}
                  </Button>
                ))}
              </Space>
            </>
          )}
          {pageType === 'password_expired' && <ProfilePassword onSuccess={() => {
            setPageType('login');
            form.setFieldValue('password', '')
            form.setFieldValue('mfa_code', '')
          }} token={token || undefined} />}
        </Card>
      </div>
    </div>
  );
};

export default Login; 