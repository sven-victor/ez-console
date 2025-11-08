import React, { useEffect, useState } from 'react';
import { TeamOutlined, CheckOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import HeaderDropdown from './HeaderDropdown';

const OrganizationSwitcher: React.FC = () => {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const organizations = user?.organizations || [];
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(
    localStorage.getItem('orgID')
  );

  const handleSelect = (orgId: string) => {
    if (orgId) {
      localStorage.setItem('orgID', orgId);
      setSelectedOrgId(orgId);
      // Reload page to apply organization context
      window.location.reload();
    } else {
      localStorage.removeItem('orgID');
      setSelectedOrgId(null);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (organizations.length > 0 && !selectedOrgId) {
      handleSelect(organizations[0].id);
    }
  }, [organizations, selectedOrgId]);

  // Don't show if user has no organizations or multi-org is disabled
  if (organizations.length === 0) {
    return null;
  }

  // Get current organization name
  const currentOrg = organizations.find((org) => org.id === selectedOrgId);
  const displayText = currentOrg ? currentOrg.name : t('organization.global', { defaultValue: 'Global' });

  // Build menu items
  const menuItems = [
    ...organizations.map((org) => ({
      key: org.id,
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{org.name}</span>
          {selectedOrgId === org.id && <CheckOutlined />}
        </div>
      ),
      onClick: () => handleSelect(org.id),
    })),
  ];

  return (
    <HeaderDropdown
      menu={{
        items: menuItems,
        selectedKeys: selectedOrgId ? [selectedOrgId] : [''],
      }}
    >
      <TeamOutlined style={{ marginRight: 4 }} />
      <span style={{ height: '1em', lineHeight: '1em', marginLeft: '5px' }}>{displayText}</span>
    </HeaderDropdown>
  );
};

export default OrganizationSwitcher;
