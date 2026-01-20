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
import { TeamOutlined, CheckOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import HeaderDropdown from './HeaderDropdown';
import { useSite } from '@/contexts/SiteContext';


const OrganizationSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const { currentOrgId, setCurrentOrgId } = useSite();
  const organizations = user?.organizations || [];

  const handleSelect = (orgId: string) => {
    setCurrentOrgId(orgId);
    window.location.reload();
  };

  // Don't show if user has no organizations or multi-org is disabled
  if (organizations.length === 0) {
    return null;
  }

  // Get current organization name
  const currentOrg = organizations.find((org) => org.id === currentOrgId);
  const displayText = currentOrg ? currentOrg.name : t('organization.global', { defaultValue: 'Global' });

  // Build menu items
  const menuItems = [
    ...organizations.map((org) => ({
      key: org.id,
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{org.name}</span>
          {currentOrgId === org.id && <CheckOutlined />}
        </div>
      ),
      onClick: () => handleSelect(org.id),
    })),
  ];

  return (
    <HeaderDropdown
      className={className}
      menu={{
        items: menuItems,
        selectedKeys: currentOrgId ? [currentOrgId] : [''],
      }}
    >
      <TeamOutlined style={{ marginRight: 4 }} />
      <span style={{ height: '1em', lineHeight: '1em', marginLeft: '5px' }}>{displayText}</span>
    </HeaderDropdown>
  );
};

export default OrganizationSwitcher;
