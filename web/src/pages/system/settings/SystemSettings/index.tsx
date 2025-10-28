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
import { useLocation, useNavigate } from 'react-router-dom';


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

  const items = [
    {
      key: 'base',
      label: t('settings.tabs.base', { defaultValue: 'Base Settings' }),
      children: <BaseSettingsForm />,
    },
    {
      key: 'security',
      label: t('settings.tabs.security', { defaultValue: 'Security Settings' }),
      children: <SecuritySettingForm />,
    },
    {
      key: 'oauth',
      label: t('settings.tabs.oauth', { defaultValue: 'OAuth Settings' }),
      children: <OAuthSettingsForm />,
    },
    {
      key: 'ldap',
      label: t('settings.tabs.ldap', { defaultValue: 'LDAP Settings' }),
      children: <LDAPSettingsForm />,
    },
    {
      key: 'smtp',
      label: t('settings.tabs.smtp', { defaultValue: 'SMTP Settings' }),
      children: <SMTPSettingsForm />,
    },
    {
      key: 'ai-models',
      label: t('settings.tabs.aiModels', { defaultValue: 'AI Models' }),
      children: <AIModelSettings />,
    },
    {
      key: 'ai-toolsets',
      label: t('settings.tabs.toolSets', { defaultValue: 'Tool Sets' }),
      children: <ToolSetSettings />,
    },
  ];

  return (
    <Card title={t('settings.title', { defaultValue: 'System Settings' })}>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        onChange={(key) => {
          navigate(`${location.pathname}#${key}`);
          // window.history.pushState({}, '', `${location.pathname}#${key}`);
        }}
        items={transformItems(items)}
      />
    </Card>
  );
};

export default SystemSettings; 