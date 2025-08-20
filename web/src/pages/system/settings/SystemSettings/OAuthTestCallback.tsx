import { useRequest } from "ahooks";
import { Card, Result, Space } from "antd";
import { useState } from "react";
import ReactJson from 'react-json-view'
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Loading from "@/components/Loading";
import api from '@/service/api';
const OAuthTestCallback = () => {
  const { t } = useTranslation('system');
  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider');
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const [user, setUser] = useState<API.User | null>(null);
  const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null);
  const [message, setMessage] = useState<{
    status: 'success' | 'error';
    message: string;
    error?: string;
  } | null>(null);
  useRequest(async () => {
    if (!code || !state || !provider) {
      throw new Error(t('settings.oauth.testConnection.missingRequiredParameters', { defaultValue: 'Missing required parameters' }));
    }
    const response = await api.system.testOauthCallback({ code: code, state: state, provider: provider });
    if (!response.user_info) {
      throw new Error(t('settings.oauth.testConnection.responseUserInfoIsNull', { defaultValue: 'response user_info is null' }));
    }
    if (!response.user) {
      throw new Error(t('settings.oauth.testConnection.responseUserIsNull', { defaultValue: 'response user is null' }));
    }
    setUser(response.user);
    setUserInfo(response.user_info);
  }, {
    onSuccess: () => {
      setMessage({
        status: 'success',
        message: t('settings.oauth.testConnection.success', { defaultValue: 'Successfully tested connection' }),
      });
    },
    onError: (error) => {
      setMessage({
        status: 'error',
        message: t('settings.oauth.testConnection.callbackFailed', { defaultValue: 'Failed to test connection' }),
        error: error.message,
      });
    }
  });
  if (message) {
    return <div>
      <Result
        status={message.status}
        title={message.message}
        subTitle={message.error}
        extra={<Space style={{ display: !userInfo || !user ? 'none' : 'inline-block', textAlign: 'left' }} direction='vertical'>
          <Card title={t('settings.oauth.testConnection.oauthUserInfo', { defaultValue: 'OAuth User Info' })}>
            <ReactJson src={userInfo || {}} />
          </Card>
          <Card title={t('settings.oauth.testConnection.loginUserInfo', { defaultValue: 'Login User Info' })} style={{ marginTop: 16 }}>
            <ReactJson src={user || {}} />
          </Card>
        </Space>}
      />
    </div>;
  }
  return <Loading />;
};

export default OAuthTestCallback;
