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

import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Descriptions,
  Button,
  Tag,
  Space,
  Tabs,
  Typography,
  Spin,
  message,
  Badge,
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/service/api';
import { formatDate } from '@/utils';
import { useTranslation } from 'react-i18next';
import UserAuditLogs from '@/components/authorization/UserAuditLogs';
import { Avatar } from '@/components/Avatar';
import { ApiError } from '@/service/client';
import usePermission from '@/hooks/usePermission';
import { useSite } from '@/contexts/SiteContext';
import { useRequest } from 'ahooks';

const { Title } = Typography;
const { TabPane } = Tabs;

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation("authorization");
  const { t: tCommon } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<API.User | null>(null);
  const { hasPermission } = usePermission();

  const { enableMultiOrg } = useSite();

  const { data: organizations, loading: organizationsLoading } = useRequest(async () => {
    return (await api.system.listOrganizations({ current: 1, page_size: 1000 })).data || [];
  }, {
    refreshDeps: [enableMultiOrg],
    onError: (error) => {
      message.error(t('organizations.loadError', { defaultValue: 'Failed to load organizations', error: error.message }));
    },
    cacheKey: 'fetchAllOrganizations',
    cacheTime: 1000 * 60 * 10,
  });

  const renderOrganizationRole = useCallback((organization_id: string, role: API.Role): React.ReactNode => {
    if (organizationsLoading) {
      return <>{<Spin size="small" />}:{role.name}</>;
    }
    const organization = organizations?.find(org => org.id === organization_id);
    if (organization) {
      return `${organization.name}:${role.name}`;
    }
    return role.name;
  }, [organizations, organizationsLoading]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const userData = await api.authorization.getUser({ id });
        setUser(userData);
      } catch (error) {
        if (!(error instanceof ApiError && error.code === "E4041")) {
          console.error('Failed to get user details:', error);
          message.error(t('user.detailLoadError', { defaultValue: 'Failed to load user details' }));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, t]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Title level={4}>{t('user.notFound', { defaultValue: 'User not found' })}</Title>
        <Button type="primary" onClick={() => navigate('/authorization/users')}>
          {t('user.backToList', { defaultValue: 'Back to User List' })}
        </Button>
      </div>
    );
  }
  const getMfaStatus = () => {
    if (user.mfa_enabled) {
      return <Badge status="success" text={t('user.mfaEnabled', { defaultValue: 'Enabled' })} />
    }
    if (user.mfa_enforced) {
      return <Badge status="warning" text={t('user.mfaEnforced', { defaultValue: 'Enforced' })} />
    }
    return <Badge status="default" text={t('user.mfaDisabled', { defaultValue: 'Disabled' })} />
  }
  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            src={user.avatar}
            style={{ marginRight: 16 }}
          />
          <div>
            <div style={{ fontSize: 20, fontWeight: 'bold' }}>{user.username}</div>
            <div style={{ color: '#888' }}>{user.email}</div>
          </div>
        </div>
      }
      extra={
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/authorization/users')}
          >
            {tCommon('back', { defaultValue: 'Back' })}
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/authorization/users/${id}/edit`)}
          >
            {tCommon('edit', { defaultValue: 'Edit' })}
          </Button>
        </Space>
      }
    >
      <Tabs defaultActiveKey="basic">
        <TabPane tab={t('user.basicInfo', { defaultValue: 'Basic Information' })} key="basic">
          <Descriptions bordered column={2} style={{ marginTop: 16 }}>
            <Descriptions.Item label={t('user.username', { defaultValue: 'Username' })}>{user.username}</Descriptions.Item>
            <Descriptions.Item label={t('user.fullName', { defaultValue: 'Full Name' })}>{user.full_name}</Descriptions.Item>
            <Descriptions.Item label={t('user.email', { defaultValue: 'Email' })}>{user.email}</Descriptions.Item>
            <Descriptions.Item label={t('user.status', { defaultValue: 'Status' })}>
              {user.status === 'active' ? (
                <Badge status="success" text={t('user.statusActive', { defaultValue: 'Active' })} />
              ) : (
                <Badge status="error" text={t(`user.statusEnum.${user.status}`, { defaultValue: user.status.charAt(0).toUpperCase() + user.status.slice(1) })} />
              )}
            </Descriptions.Item>
            <Descriptions.Item label={t('user.roles', { defaultValue: 'Roles' })} span={2}>
              {user.roles && user.roles.length > 0 ? (
                user.roles.map(role => (
                  <Tag color="blue" key={role.id}>
                    {enableMultiOrg ? renderOrganizationRole(role.organization_id, role) : role.name}
                  </Tag>
                ))
              ) : (
                <Tag>{t('user.noRole', { defaultValue: 'No Role' })}</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label={t('user.mfa', { defaultValue: 'MFA' })}>
              {getMfaStatus()}
            </Descriptions.Item>
            <Descriptions.Item label={t('user.lastLogin', { defaultValue: 'Last Login' })}>
              {user.last_login ? formatDate(user.last_login) : t('user.neverLogin', { defaultValue: 'Never' })}
            </Descriptions.Item>
            <Descriptions.Item label={t('user.createdAt', { defaultValue: 'Created At' })}>
              {formatDate(user.created_at)}
            </Descriptions.Item>
            <Descriptions.Item label={t('user.updatedAt', { defaultValue: 'Updated At' })}>
              {formatDate(user.updated_at)}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane disabled={!hasPermission('authorization:user:view_audit_logs')} tab={t('user.auditLogs', { defaultValue: 'Audit Logs' })} key="logs">
          <UserAuditLogs userId={id || ''} />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default UserDetail; 