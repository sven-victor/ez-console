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
import {
  Card,
  Descriptions,
  Button,
  Space,
  Tabs,
  Spin,
  message,
  Popconfirm,
  Badge,
  Row,
  Col,
  Form,
  Select,
  Modal,
  Empty,
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
  CheckCircleOutlined,
  LockOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import api from '@/service/api';
import { formatDate } from '@/utils';
import { useTranslation } from 'react-i18next';
import TextArea from 'antd/es/input/TextArea';
import { PermissionGuard } from '@/components/PermissionGuard';
import NotFound from '@/pages/NotFound';
import ServiceAccountForm from './ServiceAccountForm';
import ServiceAccountAccessKeys from './ServiceAccountAccessKeys';
import ServiceAccountAuthorization from './ServiceAccountAuthorization';
import usePermission from '@/hooks/usePermission';
import { useRequest } from 'ahooks';
import { createStyles } from 'antd-style';
const { TabPane } = Tabs;

const templateMap = {
  allow_all: {
    Statement: [
      {
        Effect: 'Allow',
        Action: ['*'],
      },
    ],
  },
  deny_all: {
    Statement: [
      {
        Effect: 'Deny',
        Action: ['*'],
      },
    ],
  },
  allow_with_action: {
    Statement: [
      {
        Effect: 'Allow',
        Action: ['authorization:user:view'],
      },
    ],
  },
  allow_with_condition: {
    Statement: [
      {
        Effect: 'Allow',
        Action: ['authorization:user:update'],
        Condition: {
          StringEquals: {
            'id:': 'abcdef',
          },
        },
      },
      {
        Effect: 'Deny',
        Action: ['*'],
      },
    ],
  },
  allow_with_uri: {
    Statement: [
      {
        Effect: 'Allow',
        Action: ['authorization:user:view'],
        Condition: {
          StringEquals: {
            'http.uri': '/api/users/abcdef',
            'http.method': 'GET',
          },
        },
      },
      {
        Effect: 'Deny',
        Action: ['*'],
      },
    ],
  },
}

const useStyle = createStyles(({ css }) => {
  return {
    rolePolicy: css`
       .ant-collapse-content>.ant-collapse-content-box{
        padding: 2px;
      }
      .ant-form-item-additional>#policy_document_extra{
        min-height: 0;
      }
    `,
    rolePermissionExtra: css`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
    rolePolicyExtra: css`
      position: absolute;
      right: 20px;
      top: 5px;
    `,
  }
});


// Service Account Detail Page
const ServiceAccountDetail: React.FC = () => {
  const { styles } = useStyle();
  const location = useLocation();
  const hash = location.hash;
  const tab = hash.replace('#', '');
  const defaultActiveKey = tab || 'basic';
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation("common");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hasPermission } = usePermission();
  // Data State
  const [serviceAccount, setServiceAccount] = useState<API.ServiceAccount | null>(null);

  const [policyModalVisible, setPolicyModalVisible] = useState(false);
  const [policyForm] = Form.useForm();

  const [editMode, setEditMode] = useState(false);

  if (!id) {
    return <NotFound />;
  }


  // Load service account details
  const { run: fetchServiceAccountDetail, loading } = useRequest(async () => {
    if (!id) return;
    return api.authorization.getServiceAccountById({ id });
  }, {
    onSuccess: (data) => {
      setServiceAccount(data || null);
    },
  });
  useEffect(() => {
    fetchServiceAccountDetail();
  }, [id]);


  // Load different data based on the selected tab
  const handleTabChange = (key: string) => {
    navigate(`#${key}`);
  };

  // Delete service account
  const handleDelete = async () => {
    if (!id) return;

    try {
      await api.authorization.deleteServiceAccount({ id });
      message.success(t('serviceAccount.deleteSuccess', { defaultValue: 'Service account deleted successfully.' }));
      navigate('/authorization/service-accounts');
    } catch (error) {
      console.error(t('serviceAccount.deleteError', { defaultValue: 'Failed to delete service account.' }), error);
      message.error(t('serviceAccount.deleteError', { defaultValue: 'Failed to delete service account.' }));
    }
  };

  // Update service account status
  const { run: handleToggleStatus, loading: updateStatusLoading } = useRequest(async () => {
    if (!serviceAccount) return;
    return api.authorization.updateServiceAccountStatus({ id }, { status: serviceAccount.status === 'active' ? 'disabled' : 'active' });
  }, {
    onSuccess: (data) => {
      setServiceAccount(data || null);
      message.success(t('serviceAccount.statusUpdateSuccess', { defaultValue: 'Service account status updated successfully.' }));
    },
    onError: (error) => {
      console.error(t('serviceAccount.statusUpdateError', { defaultValue: 'Failed to update service account status.' }), error);
      message.error(t('serviceAccount.statusUpdateError', { defaultValue: 'Failed to update service account status.' }));
    },
    manual: true,
  });


  // Update policy document
  const handleUpdatePolicy = async (values: any) => {
    if (!id) return;

    try {
      let policyObj: API.PolicyDocument;
      try {
        policyObj = JSON.parse(values.policy_document);
      } catch (e) {
        message.error(t('serviceAccount.policyInvalidJson', { defaultValue: 'Invalid JSON format for policy document.' }));
        return;
      }

      await api.authorization.setServiceAccountPolicy({ id }, { policy_document: policyObj });
      message.success(t('serviceAccount.policyUpdateSuccess', { defaultValue: 'Policy document updated successfully.' }));
      setPolicyModalVisible(false);
      fetchServiceAccountDetail();
    } catch (error) {
      console.error(t('serviceAccount.policyUpdateError', { defaultValue: 'Failed to update policy document.' }), error);
      message.error(t('serviceAccount.policyUpdateError', { defaultValue: 'Failed to update policy document.' }));
    }
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', padding: '50px' }} />;
  }

  if (!serviceAccount) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Empty description={t('serviceAccount.notFound', { defaultValue: 'Service account not found.' })} />
      </div>
    );
  }

  return (
    <Card
      title={
        <Space>
          <UserOutlined />
          {serviceAccount.name}
          {serviceAccount.status === 'active' ? (
            <Badge status="success" text={t('serviceAccount.statusActive', { defaultValue: 'Active' })} />

          ) : (
            <Badge status="error" text={t('serviceAccount.statusDisabled', { defaultValue: 'Disabled' })} />
          )}
        </Space>
      }
      extra={
        <Space>
          <PermissionGuard permission="authorization:service_account:update">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setEditMode(true)}
              disabled={editMode}
            >
              {tCommon('edit', { defaultValue: 'Edit' })}
            </Button>
          </PermissionGuard>

          <PermissionGuard permission="authorization:service_account:update">
            <Button
              icon={serviceAccount.status === 'active' ? <LockOutlined /> : <CheckCircleOutlined />}
              onClick={handleToggleStatus}
              loading={updateStatusLoading}
            >
              {serviceAccount.status === 'active' ? tCommon('disable', { defaultValue: 'Disable' }) : tCommon('enable', { defaultValue: 'Enable' })}
            </Button>
          </PermissionGuard>

          <PermissionGuard permission="authorization:service_account:delete">
            <Popconfirm
              title={t('serviceAccount.deleteConfirm', { defaultValue: 'Are you sure you want to delete this service account?' })}
              onConfirm={handleDelete}
              okText={tCommon('confirm', { defaultValue: 'Confirm' })}
              cancelText={tCommon('cancel', { defaultValue: 'Cancel' })}
            >
              <Button danger icon={<DeleteOutlined />}>
                {tCommon('delete', { defaultValue: 'Delete' })}
              </Button>
            </Popconfirm>
          </PermissionGuard>

          <Button icon={<RollbackOutlined />} onClick={() => navigate('/authorization/service-accounts')}>
            {tCommon('back', { defaultValue: 'Back' })}
          </Button>
        </Space>
      }
    >
      <Tabs defaultActiveKey={defaultActiveKey} onChange={handleTabChange}>
        <TabPane tab={t('serviceAccount.tabs.basic', { defaultValue: 'Basic Information' })} key="basic">
          <Descriptions bordered column={2}>
            <Descriptions.Item label={t('serviceAccount.name', { defaultValue: 'Name' })} span={2}>
              {serviceAccount.name}
            </Descriptions.Item>
            <Descriptions.Item label={t('serviceAccount.description', { defaultValue: 'Description' })} span={2}>
              {serviceAccount.description || t('serviceAccount.noDescription', { defaultValue: 'N/A' })}
            </Descriptions.Item>
            <Descriptions.Item label={t('serviceAccount.status', { defaultValue: 'Status' })}>
              {serviceAccount.status === 'active' ? (
                <Badge status="success" text={t('serviceAccount.statusActive', { defaultValue: 'Active' })} />
              ) : (
                <Badge status="error" text={t('serviceAccount.statusDisabled', { defaultValue: 'Disabled' })} />
              )}
            </Descriptions.Item>
            <Descriptions.Item label={t('serviceAccount.lastAccess', { defaultValue: 'Last Access' })}>
              {serviceAccount.last_access ? formatDate(serviceAccount.last_access) : t('serviceAccount.neverAccessed', { defaultValue: 'Never' })}
            </Descriptions.Item>
            <Descriptions.Item label={t('serviceAccount.createdAt', { defaultValue: 'Created At' })}>
              {formatDate(serviceAccount.created_at)}
            </Descriptions.Item>
            <Descriptions.Item label={t('serviceAccount.updatedAt', { defaultValue: 'Updated At' })}>
              {formatDate(serviceAccount.updated_at)}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>

        <TabPane
          tab={
            <span>
              <KeyOutlined />
              {t('serviceAccount.accessKeys', { defaultValue: 'Access Keys' })}
            </span>
          }
          disabled={!hasPermission('authorization:service_account:access_key:list')}
          key="access-keys"
        >
          <ServiceAccountAccessKeys serviceAccountID={id} />
        </TabPane>

        <TabPane
          tab={
            <span>
              <LockOutlined />
              {t('serviceAccount.authorization', { defaultValue: 'Authorization' })}
            </span>
          }
          disabled={!hasPermission('authorization:service_account:role:list')}
          key="authorization"
        >
          <ServiceAccountAuthorization
            serviceAccount={serviceAccount}
            onRefresh={fetchServiceAccountDetail}
          />
        </TabPane>

        <TabPane tab={t('serviceAccount.tabs.policy', { defaultValue: 'Policy Document' })} key="policy">
          <div style={{ marginBottom: 16 }}>
            <Row justify="end">
              <Col>
                <PermissionGuard permission="authorization:service_account:update">
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setPolicyModalVisible(true)
                      policyForm.setFieldsValue({
                        policy_document: JSON.stringify(serviceAccount.policy_document, null, 2),
                      })
                    }}
                  >
                    {t('serviceAccount.editPolicy', { defaultValue: 'Edit Policy' })}
                  </Button>
                </PermissionGuard>
              </Col>
            </Row>
          </div>

          <Spin spinning={loading}>
            {serviceAccount.policy_document && serviceAccount.policy_document.Statement && serviceAccount.policy_document.Statement.length > 0 ? (
              <Card>
                <pre style={{ whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
                  {JSON.stringify(serviceAccount.policy_document, null, 2)}
                </pre>
              </Card>
            ) : (
              <Empty description={t('serviceAccount.noPolicy', { defaultValue: 'No policy document defined for this service account.' })} />
            )}
          </Spin>
        </TabPane>
      </Tabs>


      {/* Policy Edit Modal */}
      <Modal
        title={t('serviceAccount.editPolicy', { defaultValue: 'Edit Policy' })}
        open={policyModalVisible}
        onCancel={() => {
          setPolicyModalVisible(false)
          policyForm.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form form={policyForm} layout="vertical" onFinish={handleUpdatePolicy}>
          <Form.Item
            // label={t('role.policyDocument')}
            name="policy_document"
            extra={<span className={styles.rolePolicyExtra}>
              <Select
                style={{ width: 120 }}
                placeholder={t('serviceAccount.insertTemplate', { defaultValue: 'Insert Template' })}
                value={t('serviceAccount.insertTemplate', { defaultValue: 'Insert Template' })}
                options={[
                  { label: t('serviceAccount.allowAll', { defaultValue: 'Allow All' }), value: 'allow_all' },
                  { label: t('serviceAccount.denyAll', { defaultValue: 'Deny All' }), value: 'deny_all' },
                  { label: t('serviceAccount.allowWithAction', { defaultValue: 'Allow with Action' }), value: 'allow_with_action' },
                  { label: t('serviceAccount.denyWithCondition', { defaultValue: 'Allow with Condition' }), value: 'allow_with_condition' },
                  { label: t('serviceAccount.allowWithUri', { defaultValue: 'Allow with URI' }), value: 'allow_with_uri' },
                ]}
                onChange={(e) => {
                  const template = templateMap[e as keyof typeof templateMap];
                  if (template) {
                    policyForm.setFieldValue('policy_document', JSON.stringify(template, null, 2));
                  }
                }}
              />
            </span>}
          >

            <TextArea
              rows={15}
              style={{ fontFamily: 'monospace' }}
              placeholder={`{
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "account:EnableRegion",
                "account:DisableRegion"
            ],
            "Condition": {
                "StringEquals": {"id:": "abcdef"}
            }
        },
        {
            "Effect": "Allow",
            "Action": [
                "*"
            ]
        }
    ]
}`}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {tCommon('save', { defaultValue: 'Save' })}
              </Button>
              <Button onClick={() => setPolicyModalVisible(false)}>
                {tCommon('cancel', { defaultValue: 'Cancel' })}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Service Account Form */}
      <ServiceAccountForm
        serviceAccountID={id}
        onClose={() => setEditMode(false)}
        open={editMode}
      />
    </Card>
  );
};

export default ServiceAccountDetail; 