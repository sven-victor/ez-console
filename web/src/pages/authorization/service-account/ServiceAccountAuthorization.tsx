import React, { useState, useEffect } from 'react';
import { Card, Select, Button, message, Tag, Space, Typography, Skeleton, Empty } from 'antd';
import api from '@/service/api';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, LockOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';

interface ServiceAuthorizationProps {
  serviceAccount: API.ServiceAccount | null;
  onRefresh: () => void;
  loading?: boolean;
}

const { Text } = Typography;

const ServiceAccountAuthorization: React.FC<ServiceAuthorizationProps> = ({ serviceAccount, onRefresh, loading }) => {
  const { id: serviceAccountId } = serviceAccount || {};
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const [availableRoles, setAvailableRoles] = useState<Omit<API.Role, 'created_at' | 'updated_at' | 'policy_document' | 'permissions'>[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Omit<API.Role, 'created_at' | 'updated_at' | 'policy_document' | 'permissions'>[]>([]);

  useEffect(() => {
    setSelectedRoles(serviceAccount?.roles || []);
  }, [serviceAccount]);
  const [searchKeywords, setSearchKeywords] = useState<string | undefined>(undefined);
  const { loading: rolesLoading } = useRequest(async () => {
    return api.authorization.listRoles({ current: 1, page_size: 20, search: searchKeywords })
  }, {
    onSuccess: (data) => {
      const roles: Omit<API.Role, 'created_at' | 'updated_at' | 'policy_document' | 'permissions'>[] = data.data;
      selectedRoles.forEach(role => {
        const roleData = roles.find(r => r.id === role.id);
        if (!roleData) {
          roles.push(role);
        }
      });
      setAvailableRoles(roles);
    },
    onError: (error) => {
      console.error('Failed to load roles:', error);
      message.error(t('serviceAccount.loadRolesError', { defaultValue: 'Failed to load roles.' }));
    },
    debounceWait: 300,
    refreshDeps: [searchKeywords],
  });
  // Submit role assignment
  const { run: assignRoles, loading: submitting } = useRequest(async () => {
    if (!serviceAccountId) return;
    return api.authorization.assignServiceAccountRoles({ id: serviceAccountId }, { role_ids: selectedRoles.map(role => role.id) });
  }, {
    onSuccess: () => {
      message.success(t('serviceAccount.assignRolesSuccess', { defaultValue: 'Roles assigned successfully.' }));
      onRefresh();
    },
    onError: (error) => {
      console.error('Failed to assign roles:', error);
      message.error(t('serviceAccount.assignRolesError', { defaultValue: 'Failed to assign roles.' }));
    },
    manual: true,
  });


  const handleRoleChange = (values: string[]) => {
    setSelectedRoles(values.map(value => {
      return availableRoles.find(role => role.id === value) || { id: value, name: value, description: value }
    }));
  };

  return (
    <Card
      title={
        <Space>
          <LockOutlined />
          {t('serviceAccount.authorization', { defaultValue: 'Authorization' })}
        </Space>
      }
      extra={
        <Button
          icon={<SyncOutlined />}
          onClick={() => {
            onRefresh()
          }}
          disabled={loading || submitting}
          loading={submitting}
        >
          {tCommon('refresh', { defaultValue: 'Refresh' })}
        </Button>
      }
    >
      {submitting ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <Text>{t('serviceAccount.roles', { defaultValue: 'Roles' })}</Text>
            <div style={{ marginTop: 8 }}>
              {selectedRoles.length > 0 ? (
                availableRoles
                  .filter(role => selectedRoles.some(r => r.id === role.id))
                  .map(role => (
                    <Tag key={role.id} color="blue">
                      {role.name}
                    </Tag>
                  ))
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={t('serviceAccount.noRoles', { defaultValue: 'No roles assigned.' })}
                  style={{ margin: '10px 0' }}
                />
              )}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <Text>{t('serviceAccount.assignRoles', { defaultValue: 'Assign Roles' })}</Text>
            <Select
              mode="multiple"
              style={{ width: '100%', marginTop: 8 }}
              placeholder={t('serviceAccount.selectRoles', { defaultValue: 'Select roles to assign' })}
              value={selectedRoles.map(role => role.id)}
              onSearch={(keywords) => {
                setSearchKeywords(keywords);
              }}
              onDropdownVisibleChange={(open) => {
                if (open) {
                  setSearchKeywords(undefined);
                }
              }}
              onChange={handleRoleChange}
              loading={loading || rolesLoading}
              optionFilterProp="label"
              options={availableRoles.map(role => ({
                label: role.name,
                value: role.id,
                title: role.description,
              }))}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <Button
              type="primary"
              onClick={assignRoles}
              loading={submitting}
              disabled={loading}
            >
              {t('serviceAccount.assignRoles', { defaultValue: 'Assign Roles' })}
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default ServiceAccountAuthorization; 