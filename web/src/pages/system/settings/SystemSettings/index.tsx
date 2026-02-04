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
import { Card, Tabs, type TabsProps as AntTabsProps } from 'antd';
import { useTranslation } from 'react-i18next';
import OAuthSettingsForm from './OAuthSettingsForm';
import SecuritySettingForm from './SecuritySettingForm';
import LDAPSettingsForm from './LDAPSettingsForm';
import SMTPSettingsForm from './SMTPSettingsForm';
import BaseSettingsForm from './BaseSettings';
import AIModelSettings from './AIModelSettings';
import ToolSetSettings from './ToolSetSettings';
import SkillSettings from './SkillSettings';
import OrganizationSettings from './OrganizationSettings';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSite } from '@/contexts/SiteContext';
import usePermission from '@/hooks/usePermission';
import { TFunction } from 'i18next';

export interface SystemSettingsProps {
  transformItems?: (items: AntTabsProps['items'], t: TFunction) => AntTabsProps['items'];
}

const SystemSettings: React.FC<SystemSettingsProps> = ({
  transformItems = (items) => items,
}) => {
  const { t } = useTranslation('system');
  const navigate = useNavigate();
  const location = useLocation();
  const hash = location.hash;
  const tab = hash.replace('#', '');
  const defaultActiveKey = tab || 'base';

  const { enableMultiOrg } = useSite();

  // Fetch system settings to check if multi-org is enabled

  const { hasPermission } = usePermission();

  const items = [
    {
      key: 'base',
      label: t('settings.tabs.base', { defaultValue: 'Base Settings' }),
      children: <BaseSettingsForm />,
      hidden: !hasPermission('system:settings:update'),
    },
    {
      key: 'security',
      label: t('settings.tabs.security', { defaultValue: 'Security Settings' }),
      children: <SecuritySettingForm />,
      hidden: !hasPermission('system:security:update'),
    },
    {
      key: 'oauth',
      label: t('settings.tabs.oauth', { defaultValue: 'OAuth Settings' }),
      children: <OAuthSettingsForm />,
      hidden: !hasPermission('system:settings:update'),
    },
    {
      key: 'ldap',
      label: t('settings.tabs.ldap', { defaultValue: 'LDAP Settings' }),
      children: <LDAPSettingsForm />,
      hidden: !hasPermission('system:settings:update'),
    },
    {
      key: 'smtp',
      label: t('settings.tabs.smtp', { defaultValue: 'SMTP Settings' }),
      children: <SMTPSettingsForm />,
      hidden: !hasPermission('system:settings:update'),
    },
    {
      key: 'ai-models',
      label: t('settings.tabs.aiModels', { defaultValue: 'AI Models' }),
      children: <AIModelSettings />,
      hidden: !hasPermission('ai:models:view'),
    },
    {
      key: 'ai-toolsets',
      label: t('settings.tabs.toolSets', { defaultValue: 'Tool Sets' }),
      children: <ToolSetSettings />,
      hidden: !hasPermission('system:toolsets:view'),
    },
    {
      key: 'skills',
      label: t('settings.tabs.skills', { defaultValue: 'Skills' }),
      children: <SkillSettings />,
      hidden: !hasPermission('system:skills:view'),
    },
    // Only show organization tab if multi-org is enabled
    ...(enableMultiOrg ? [{
      key: 'organizations',
      label: t('settings.tabs.organizations', { defaultValue: 'Organizations' }),
      children: <OrganizationSettings />,
      hidden: !hasPermission('system:organization:view'),
    }] : []),
  ];

  return (
    <Card title={t('settings.title', { defaultValue: 'System Settings' })}>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        onChange={(key) => {
          navigate(`${location.pathname}#${key}`);
          // window.history.pushState({}, '', `${location.pathname}#${key}`);
        }}
        items={transformItems(items.filter(item => !item.hidden), t)}
      />
    </Card>
  );
};

export default SystemSettings; 