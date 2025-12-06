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
import { Card, Tabs, message } from 'antd';
import { useTranslation } from 'react-i18next';
import ProfileBasic from '../components/profile/ProfileBasic';
import ProfilePassword from '../components/profile/ProfilePassword';
import ProfileMFA from '../components/profile/ProfileMFA';
import ProfileSessions from '../components/profile/ProfileSessions';
import { useAuth } from '../contexts/AuthContext';
import api from '@/service/api';
import UserAuditLogs from '@/components/authorization/UserAuditLogs';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const hash = location.hash;
  const tab = hash.replace('#', '');
  const defaultActiveKey = tab || 'basic';

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userData = await api.authorization.getCurrentUser();
      updateUser(userData);
    } catch (error) {
      message.error(tCommon('fetchFailed', { defaultValue: 'Failed to fetch data' }));
      console.error('Failed to fetch user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const items = [
    {
      key: 'basic',
      label: t('profile.basic', { defaultValue: 'Basic Information' }),
      children: <ProfileBasic user={user} onSuccess={fetchUserProfile} />
    },
    {
      key: 'password',
      label: t('profile.password', { defaultValue: 'Password' }),
      disabled: user?.disable_change_password,
      children: <ProfilePassword />
    },
    {
      key: 'mfa',
      label: t('profile.mfa', { defaultValue: 'Multi-Factor Authentication' }),
      children: <ProfileMFA user={user} onSuccess={fetchUserProfile} />
    },
    {
      key: 'sessions',
      label: t('profile.sessions', { defaultValue: 'Sessions' }),
      children: <ProfileSessions />
    },
    {
      key: 'auditLogs',
      label: t('profile.auditLogs', { defaultValue: 'Audit Logs' }),
      children: <UserAuditLogs />
    }
  ];

  return (
    <Card
      title={t('profile.title', { defaultValue: 'Profile Settings' })}
      loading={loading}
    >
      <Tabs
        defaultActiveKey={defaultActiveKey}
        onChange={(key) => {
          navigate(`${location.pathname}#${key}`);
        }}
        items={items}
        destroyInactiveTabPane
      />
    </Card>
  );
};

export default Profile; 