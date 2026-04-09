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

import React, { useMemo } from 'react';
import { Drawer, Descriptions, Tag, Spin, Empty, message, Typography, Card, Space } from 'antd';
import { TeamOutlined, LockOutlined, ToolOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSite } from '@/contexts/SiteContext';
import api from '@/service/api';
import { useRequest } from 'ahooks';

type PermissionSection = {
  key: string;
  groupTitleKey: string;
  groupTitleDefault: string;
  permissions: API.Permission[];
};

interface RoleDrawerProps {
  roleId: string | null;
  open: boolean;
  onClose: () => void;
}

const RoleDrawer: React.FC<RoleDrawerProps> = ({ roleId, open, onClose }) => {
  const { t } = useTranslation('authorization');
  const { siteConfig } = useSite();
  const enableMultiOrg = siteConfig?.enable_multi_org ?? false;


  const { data: role, loading: loading } = useRequest(async () => {
    if (!roleId) return null;
    return api.authorization.getRole({ id: roleId });
  }, {
    refreshDeps: [roleId, open],
    ready: !!roleId && open,
    onError: () => {
      message.error(t('role.loadDetailError', { defaultValue: 'Failed to load role details' }));
    },
  });

  const {
    data: permissionCatalog,
    loading: catalogLoading,
    error: catalogError,
  } = useRequest(async () => api.authorization.listPermissions(), {
    refreshDeps: [open],
    ready: open,
  });

  const catalog = permissionCatalog ?? [];

  /** Same grouping as RoleForm when the catalog is unavailable (error or empty). */
  const fallbackPermissionGroups = useMemo(() => {
    if (!role?.permissions?.length) return {};
    const groups: Record<string, API.Permission[]> = {};
    for (const perm of role.permissions) {
      const parts = perm.code.split(':');
      const groupKey = parts.length >= 2 ? `${parts[0]}:${parts[1]}` : parts[0];
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(perm);
    }
    return groups;
  }, [role?.permissions]);

  const permissionsTabContent = useMemo(() => {
    if (!role?.permissions?.length) {
      return (
        <Empty description={t('role.noPermissions', { defaultValue: 'No permissions assigned' })} />
      );
    }

    const scrollBoxStyle: React.CSSProperties = {
      maxHeight: 420,
      overflowY: 'auto',
      border: '1px solid var(--ant-color-border)',
      borderRadius: 6,
      padding: '12px 12px 4px',
    };

    if (catalogLoading && catalog.length === 0 && !catalogError) {
      return (
        <div style={{ ...scrollBoxStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 140 }}>
          <Spin />
        </div>
      );
    }

    const sections: PermissionSection[] = [];
    const rolePermissionIds = new Set(role.permissions.map((p) => p.id));

    if (catalog.length > 0) {
      const catalogPermissionIds = new Set<string>();
      for (const g of catalog) {
        for (const p of g.permissions || []) {
          catalogPermissionIds.add(p.id);
        }
      }

      catalog.forEach((item, idx) => {
        const matched = (item.permissions || []).filter((p) => rolePermissionIds.has(p.id));
        if (!matched.length) return;
        sections.push({
          key: `catalog-${idx}`,
          groupTitleKey: `permission.title.${item.name.replace(/ /g, '_')}`,
          groupTitleDefault: item.name,
          permissions: matched,
        });
      });

      const orphans = role.permissions.filter((p) => !catalogPermissionIds.has(p.id));
      if (orphans.length) {
        sections.push({
          key: 'orphans',
          groupTitleKey: 'role.otherPermissions',
          groupTitleDefault: 'Other permissions',
          permissions: orphans,
        });
      }
    } else {
      Object.entries(fallbackPermissionGroups).forEach(([groupKey, perms], idx) => {
        sections.push({
          key: `fallback-${idx}`,
          groupTitleKey: `permission.title.${groupKey.replace(/:/g, '.')}`,
          groupTitleDefault: groupKey,
          permissions: perms,
        });
      });
    }

    return (
      <div style={scrollBoxStyle}>
        {sections.map((section) => (
          <div key={section.key} style={{ marginBottom: 12 }}>
            <Typography.Text strong style={{ display: 'block', marginBottom: 8 }}>
              {t(section.groupTitleKey, { defaultValue: section.groupTitleDefault })}
            </Typography.Text>
            <div
              style={{
                marginLeft: 4,
                paddingLeft: 12,
                borderLeft: '2px solid var(--ant-color-split)',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {section.permissions.map((perm) => (
                  <Tag key={perm.id} title={perm.code}>
                    {t(`permission.title.${perm.code.replace(/:/g, '.')}`, { defaultValue: perm.name })}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }, [role, catalog, catalogLoading, catalogError, fallbackPermissionGroups, t]);

  const hasPolicyDocument = useMemo(() => {
    if (!role?.policy_document) return false;
    return role.policy_document.Statement?.length > 0;
  }, [role?.policy_document]);

  const hasAIToolPermissions = useMemo(() => {
    return (role?.ai_tool_permissions?.length || 0) > 0;
  }, [role?.ai_tool_permissions]);

  const tabItems = useMemo(() => {
    const items = [role ? (
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label={t('role.name', { defaultValue: 'Role Name' })}>
          {role.name}
        </Descriptions.Item>
        <Descriptions.Item label={t('role.description', { defaultValue: 'Description' })}>
          {role.description || '-'}
        </Descriptions.Item>
        <Descriptions.Item label={t('role.roleType', { defaultValue: 'Role Type' })}>
          {role.role_type === 'system' ? (
            <Tag color="orange">{t('role.typeSystem', { defaultValue: 'System' })}</Tag>
          ) : (
            <Tag color="default">{t('role.typeUser', { defaultValue: 'User' })}</Tag>
          )}
        </Descriptions.Item>
        {enableMultiOrg && (
          <Descriptions.Item label={t('role.organization', { defaultValue: 'Organization' })}>
            {role.organization_id ? (
              <Tag icon={<TeamOutlined />} color="blue">
                {role.organization?.name || role.organization_id}
              </Tag>
            ) : (
              <Tag color="default">{t('role.global', { defaultValue: 'Global' })}</Tag>
            )}
          </Descriptions.Item>
        )}
        <Descriptions.Item label={t('role.createdAt', { defaultValue: 'Created At' })}>
          {new Date(role.created_at).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label={t('role.updatedAt', { defaultValue: 'Updated At' })}>
          {new Date(role.updated_at).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    ) : null,
      ,
    <Card title={<>
      <LockOutlined style={{ marginRight: 4 }} />
      {t('role.permissions', { defaultValue: 'Permissions' })}
      {role?.permissions?.length ? ` (${role.permissions.length})` : ''}
    </>}>
      {permissionsTabContent}
    </Card>,
    ];

    if (hasPolicyDocument) {
      items.push(
        <Card
          title={t('role.policyDocument', { defaultValue: 'Policy Document' })}
        >
          <pre style={{
            background: 'var(--ant-color-fill-tertiary)',
            padding: 12,
            borderRadius: 6,
            overflow: 'auto',
            maxHeight: 400,
            fontSize: 13,
          }}>
            {JSON.stringify(role?.policy_document, null, 2)}
          </pre>
        </Card>
      );
    }

    if (hasAIToolPermissions) {
      const toolsByToolset: Record<string, { toolset: API.ToolSet; tools: string[] }> = {};
      for (const atp of role!.ai_tool_permissions) {
        const key = atp.toolset_id;
        if (!toolsByToolset[key]) {
          toolsByToolset[key] = { toolset: atp.toolset, tools: [] };
        }
        toolsByToolset[key].tools.push(atp.tool_name);
      }
      items.push((<Card title={<>
        <ToolOutlined style={{ marginRight: 4 }} />
        {t('role.aiPermissions', { defaultValue: 'AI Tool Permissions' })}
      </>}>
        {Object.entries(toolsByToolset).map(([tsId, { toolset, tools }]) => (
          <div key={tsId} style={{ marginBottom: 12 }}>
            <Typography.Text strong style={{ display: 'block', marginBottom: 4 }}>
              {toolset?.name || tsId}
            </Typography.Text>
            <div>
              {tools.map((toolName) => (
                <Tag key={toolName} color="blue" style={{ marginBottom: 4 }}>
                  {toolName}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </Card>));
    }

    return items;
  }, [role, permissionsTabContent, hasPolicyDocument, hasAIToolPermissions, enableMultiOrg, t]);

  return (
    <Drawer
      title={t('role.viewTitle', { defaultValue: 'View Role' })}
      open={open}
      onClose={onClose}
      width={800}
      destroyOnHidden
    >
      <Spin spinning={loading}>
        <Space direction='vertical'>
          {role ? (
            tabItems
          ) : (
            !loading && <Empty />
          )}
        </Space>
      </Spin>

    </Drawer>
  );
};

export default RoleDrawer;
