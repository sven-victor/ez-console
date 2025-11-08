import React from 'react';
import { Card, Tabs, TabsProps, type TabsProps as AntTabsProps } from 'antd';
import { useTranslation } from 'react-i18next';
import OAuthSettingsForm from './OAuthSettingsForm';
import SecuritySettingForm from './SecuritySettingForm';
import LDAPSettingsForm from './LDAPSettingsForm';
import SMTPSettingsForm from './SMTPSettingsForm';
import BaseSettingsForm from './BaseSettings';
import AIModelSettings from './AIModelSettings';
import ToolSetSettings from './ToolSetSettings';
import OrganizationSettings from './OrganizationSettings';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSite } from '@/contexts/SiteContext';
import usePermission from '@/hooks/usePermission';

export interface SystemSettingsProps {
  transformItems?: (items: AntTabsProps['items']) => AntTabsProps['items'];
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
    // Only show organization tab if multi-org is enabled
    ...(enableMultiOrg ? [{
      key: 'organizations',
      label: t('settings.tabs.organizations', { defaultValue: 'Organizations' }),
      children: <OrganizationSettings />,
      hidden: !hasPermission('system:organization:view'),
    }] : []),
  ];

  console.log(items, hasPermission('system:settings:update'))
  return (
    <Card title={t('settings.title', { defaultValue: 'System Settings' })}>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        onChange={(key) => {
          navigate(`${location.pathname}#${key}`);
          // window.history.pushState({}, '', `${location.pathname}#${key}`);
        }}
        items={transformItems(items.filter(item => !item.hidden))}
      />
    </Card>
  );
};

export default SystemSettings; 