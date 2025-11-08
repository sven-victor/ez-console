import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  Button,
  Space,
  message,
  Popconfirm,
  Tag,
  Modal,
  Form,
  Input,
  Tooltip,
  Tree,
  TreeDataNode,
  Row,
  Col,
  Select,
  Tabs,
  Radio,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  LockOutlined,
  DownOutlined,
  UpOutlined,
  ReloadOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { PermissionGuard } from '@/components/PermissionGuard';
import api from '@/service/api';
import { Table } from '@/components/Table';
import { TableRef } from '@/components/Table';
import { useRef } from 'react';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
const { TextArea } = Input;

import _ from 'lodash';
import { createStyles } from 'antd-style';
import { useSite } from '@/contexts/SiteContext';

const useStyle = createStyles(({ css }) => {
  return {
    rolePolicy: css`
       .ant-collapse-content>.ant-collapse-content-box{
        padding: 2px;
      }
      .ant-form-item-additional>#policy_document_extra{
        min-height: 0;
      }
      .ant-tree .ant-tree-node-content-wrapper{
        flex: none;
      }
    `,
    rolePermissionExtra: css`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
    rolePolicyExtra: css`
      position: absolute;
      right: 5px;
      top: 5px;
    `,
  }
});

interface TreeDataNodeWithCode extends TreeDataNode {
  code: string;
  orgPermission?: boolean;
}


const RoleList: React.FC = () => {
  const { styles } = useStyle();
  const { t } = useTranslation("authorization");
  const { t: tCommon } = useTranslation('common');
  const { user } = useAuth();
  const { siteConfig } = useSite();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<API.Role | null>(null);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const tableRef = useRef<TableRef<API.Role>>(null);
  const [allPermissions, setAllPermissions] = useState<TreeDataNodeWithCode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [selectedOrgId, setSelectedOrgId] = useState<string | undefined>(undefined);

  const organizations = user?.organizations || [];
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const expandAll = () => {
    const allKeys = allPermissions.map(node => node.key);
    setExpandedKeys(allKeys);
    setAutoExpandParent(true);
  };

  const collapseAll = () => {
    setExpandedKeys([]);
    setAutoExpandParent(false);
  };

  // Get current organization ID from localStorage
  useEffect(() => {
    const orgId = localStorage.getItem('orgID');
    setSelectedOrgId(orgId || undefined);
  }, []);

  // Track role type (global or organization)
  const [roleType, setRoleType] = useState<'global' | 'organization'>('global');

  // Filter permissions based on role type (global vs org)
  const filteredPermissions = useMemo(() => {
    const isGlobalRole = roleType === 'global';

    if (isGlobalRole) {
      // Global roles can have all permissions
      return allPermissions;
    } else {
      // Organization roles can only have org permissions (org_permission=true)
      return allPermissions.map(group => {
        const orgPerms = group.children?.filter((child: any) => {
          const childWithCode = child as TreeDataNodeWithCode;
          return childWithCode.orgPermission === true;
        }) as TreeDataNodeWithCode[];
        return {
          ...group,
          children: orgPerms,
        };
      }).filter(group => group.children && group.children.length > 0);
    }
  }, [allPermissions, roleType]);

  // Add policy editing state
  // Handle create role
  const handleCreate = () => {
    setEditingRole(null);
    setCheckedKeys([]);
    form.resetFields();
    // Set default role type based on current selected org
    const defaultOrgId = selectedOrgId || '';
    const defaultRoleType = defaultOrgId && siteConfig?.enable_multi_org ? 'organization' : 'global';
    setRoleType(defaultRoleType);
    form.setFieldsValue({
      role_type: defaultRoleType,
      organization_id: siteConfig?.enable_multi_org ? defaultOrgId : undefined,
      policy_document: JSON.stringify({ Statement: [] }, null, 2),
    });
    setShowModal(true);
  };

  // Handle edit role
  const handleEdit = (role: API.Role) => {
    setEditingRole(role);
    setCheckedKeys(role.permissions?.map((p: API.Permission) => p.id) || []);
    const orgId = role.organization_id || '';
    const currentRoleType = orgId ? 'organization' : 'global';
    setRoleType(currentRoleType);
    form.setFieldsValue({
      name: role.name,
      description: role.description,
      role_type: currentRoleType,
      organization_id: orgId,
      permissions: role.permissions?.map((p: API.Permission) => p.id) || [],
      policy_document: JSON.stringify(role.policy_document || { Statement: [] }, null, 2),
    });
    setShowModal(true);
  };

  // Handle delete role
  const handleDelete = async (id: string) => {
    try {
      await api.authorization.deleteRole({ id });
      message.success(t('role.deleteSuccess', { defaultValue: 'Role deleted successfully.' }));
      tableRef.current?.reload?.();
    } catch (error) {
      message.error(t('role.deleteError', { defaultValue: 'Failed to delete role: {{error}}', error: error }));
    }
  };


  // Validate JSON format
  const validatePolicyDocument = (_: any, value: string) => {
    // Only validate for global roles
    if (roleType === 'organization') {
      return Promise.resolve();
    }

    if (!value || value.trim() === '' || value === '{}' || value === '{"Statement":[]}') {
      if (checkedKeys.length === 0) {
        return Promise.reject(new Error(t('role.permissionOrPolicyRequired', { defaultValue: 'Please select at least one permission or provide a policy document.' })));
      }
      return Promise.resolve();
    }

    try {
      JSON.parse(value);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error(t('role.invalidJsonFormat', { defaultValue: 'Invalid JSON format.' })));
    }
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      // Parse policy document (only for global roles)
      if (roleType === 'global') {
        values.policy_document = JSON.parse(values.policy_document ?? '{}');
      } else {
        // Organization roles don't have policy documents
        values.policy_document = { Statement: [] };
      }
      // Convert role_type to organization_id
      if (values.role_type === 'organization') {
        values.organization_id = values.organization_id || undefined;
      } else {
        values.organization_id = undefined;
      }
      // Remove role_type from submission
      delete values.role_type;
      setLoading(true);
      if (editingRole) {
        await api.authorization.updateRole({ id: editingRole.id }, {
          ...values,
          permissions: checkedKeys.filter((key) => !key.startsWith('[group]-')),
        });
        message.success(t('role.updateSuccess', { defaultValue: 'Role updated successfully.' }));
      } else {
        await api.authorization.createRole({
          ...values,
          permissions: checkedKeys.filter((key) => !key.startsWith('[group]-')),
        });
        message.success(t('role.createSuccess', { defaultValue: 'Role created successfully.' }));
      }
      setShowModal(false);
      tableRef.current?.reload?.();
    } catch (error) {
      console.error(t('role.saveError', { defaultValue: 'Failed to save role.', action: editingRole ? tCommon('update', { defaultValue: 'Update' }) : tCommon('create', { defaultValue: 'Create' }) }), error);
      message.error(t('role.saveError', { defaultValue: 'Failed to save role.', action: editingRole ? tCommon('update', { defaultValue: 'Update' }) : tCommon('create', { defaultValue: 'Create' }) }));
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<API.Role> = [
    {
      title: t('role.name', { defaultValue: 'Role Name' }),
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: t('role.description', { defaultValue: 'Description' }),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('role.organization', { defaultValue: 'Organization' }),
      key: 'organization',
      hidden: !siteConfig?.enable_multi_org,
      render: (_: any, record: API.Role) => {
        if (record.organization_id) {
          return (
            <Tag icon={<TeamOutlined />} color="blue">
              {record.organization?.name || record.organization_id}
            </Tag>
          );
        }
        return (
          <Tag color="default">
            {t('role.global', { defaultValue: 'Global' })}
          </Tag>
        );
      },
    },
    {
      title: t('role.permissionCount', { defaultValue: 'Permissions' }),
      key: 'permission_count',
      render: (_: any, record: API.Role) => (
        <Tag color="blue">
          <LockOutlined /> {record.permissions?.length || 0}
        </Tag>
      ),
    },
    {
      title: t('role.createdAt', { defaultValue: 'Created At' }),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'action',
      render: (_: any, record: API.Role) => (
        <Space size="small">
          <PermissionGuard permission="authorization:role:update">
            <Tooltip title={t('role.edit', { defaultValue: 'Edit Role' })}>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              />
            </Tooltip>
          </PermissionGuard>

          <PermissionGuard permission="authorization:role:delete">
            <Tooltip title={t('role.delete', { defaultValue: 'Delete Role' })}>
              <Popconfirm
                title={t('role.deleteConfirm', { defaultValue: 'Are you sure you want to delete this role?' })}
                onConfirm={() => handleDelete(record.id)}
                okText={tCommon('confirm', { defaultValue: 'Confirm' })}
                cancelText={tCommon('cancel', { defaultValue: 'Cancel' })}
              >
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Tooltip>
          </PermissionGuard>
        </Space>
      ),
    },
  ];
  const templateMap = {
    allow_all: {
      policy: {
        Statement: [
          {
            Effect: 'Allow',
            Action: ['*'],
          },
        ],
      },
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

  const fetchPermissions = async () => {
    api.authorization.listPermissions().then((res) => {
      setAllPermissions(res.map((item, idx) => ({
        key: `[group]-${idx}`,
        title: item.name,
        code: item.name.replace(/ /g, '_'),
        children: item.permissions?.map((p) => ({
          key: p.id,
          code: p.code.replace(/:/g, '.'),
          title: p.name,
          orgPermission: p.org_permission || false,
        })),
      })));
    });
  }
  useEffect(() => {
    fetchPermissions()
  }, []);
  return (
    <div>
      {/* Search Form */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <Row justify="space-between" align="middle" gutter={16}>
            <Col>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    tableRef.current?.reload?.()
                    fetchPermissions()
                  }}
                  icon={<ReloadOutlined />}
                >
                  {tCommon('refresh', { defaultValue: 'Refresh' })}
                </Button>
              </Space>
            </Col>
            <Col>
              <PermissionGuard permission="authorization:role:create">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleCreate}
                >
                  {t('role.create', { defaultValue: 'Create Role' })}
                </Button>
              </PermissionGuard>
            </Col>
          </Row>

        </div>

        <Table<API.Role>
          request={async ({ page_size, current }) => {
            return api.authorization.listRoles({
              current,
              page_size
            })
          }}
          columns={columns}
          actionRef={tableRef}
        />
      </Card>

      <Modal
        title={editingRole ? t('role.editTitle', { defaultValue: 'Edit Role' }) : t('role.createTitle', { defaultValue: 'Create Role' })}
        open={showModal}
        onOk={form.submit}
        onCancel={() => setShowModal(false)}
        confirmLoading={loading}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Tabs
            items={[
              {
                key: 'basic',
                label: t('role.basicInfo', { defaultValue: 'Basic Information' }),
                children: (
                  <>
                    <Form.Item
                      label={t('role.name', { defaultValue: 'Role Name' })}
                      name="name"
                      rules={[{ required: true, message: t('role.nameRequired', { defaultValue: 'Please enter the role name.' }) }]}
                    >
                      <Input placeholder={t('role.namePlaceholder', { defaultValue: 'Enter role name' })} />
                    </Form.Item>

                    <Form.Item
                      label={t('role.description', { defaultValue: 'Description' })}
                      name="description"
                    >
                      <TextArea rows={4} placeholder={t('role.descriptionPlaceholder', { defaultValue: 'Enter role description' })} />
                    </Form.Item>

                    <Form.Item
                      label={t('role.roleType', { defaultValue: 'Role Type' })}
                      name="role_type"
                      hidden={!siteConfig?.enable_multi_org}
                      rules={[{ required: true, message: t('role.roleTypeRequired', { defaultValue: 'Please select role type.' }) }]}
                      extra={editingRole ? t('role.roleTypeCannotChange', { defaultValue: 'Role type cannot be changed after creation.' }) : ''}
                    >
                      <Radio.Group
                        disabled={!!editingRole}
                        onChange={(e) => {
                          const newRoleType = e.target.value;
                          setRoleType(newRoleType);
                          if (newRoleType === 'global') {
                            form.setFieldsValue({ organization_id: undefined });
                          } else {
                            // Set default organization if available
                            const defaultOrgId = selectedOrgId || (organizations.length > 0 ? organizations[0].id : '');
                            form.setFieldsValue({ organization_id: defaultOrgId });
                          }
                          setCheckedKeys([]);
                        }}
                      >
                        <Radio value="global">{t('role.globalRole', { defaultValue: 'Global Role' })}</Radio>
                        <Radio value="organization">{t('role.organizationRole', { defaultValue: 'Organization Role' })}</Radio>
                      </Radio.Group>
                    </Form.Item>

                    {roleType === 'organization' && (
                      <Form.Item
                        hidden={!siteConfig?.enable_multi_org}
                        label={t('role.organization', { defaultValue: 'Organization' })}
                        name="organization_id"
                        rules={[{ required: true, message: t('role.organizationRequired', { defaultValue: 'Please select an organization.' }) }]}
                        extra={organizations.length > 0 ? t('role.organizationHelp', { defaultValue: 'Select the organization this role belongs to' }) : t('role.noOrganizationsAvailable', { defaultValue: 'No organizations available. Please contact your administrator.' })}
                      >
                        {organizations.length > 0 ? (
                          <Select
                            placeholder={t('role.selectOrganization', { defaultValue: 'Select Organization' })}
                            onChange={() => {
                              // Clear checked permissions when organization changes
                              setCheckedKeys([]);
                            }}
                          >
                            {organizations.map((org: any) => (
                              <Select.Option key={org.id} value={org.id}>
                                {org.name}
                              </Select.Option>
                            ))}
                          </Select>
                        ) : (
                          <Select
                            disabled
                            placeholder={t('role.noOrganizationsAvailable', { defaultValue: 'No organizations available' })}
                          />
                        )}
                      </Form.Item>
                    )}
                  </>
                ),
              },
              {
                key: 'permissions',
                label: t('role.permissions', { defaultValue: 'Permissions' }),
                children: (
                  <Form.Item
                    name="permissions"
                    rules={[{
                      validator() {
                        if (checkedKeys.length === 0) {
                          if (roleType === 'global') {
                            const policyDoc = form.getFieldValue('policy_document');
                            if (!policyDoc || policyDoc.trim() === '' || policyDoc === '{}' || policyDoc === '{"Statement":[]}') {
                              return Promise.reject(new Error(t('role.permissionOrPolicyRequired', { defaultValue: 'Please select at least one permission or provide a policy document.' })))
                            }
                          } else {
                            return Promise.reject(new Error(t('role.permissionRequired', { defaultValue: 'Please select at least one permission.' })))
                          }
                        }
                        return Promise.resolve()
                      },
                    }]}
                  >
                    <div>
                      <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                        <span className={styles.rolePermissionExtra}>
                          <Button type="link" onClick={expandAll} icon={<DownOutlined />}>
                            {tCommon('expandAll', { defaultValue: 'Expand All' })}
                          </Button>
                          <Button type="link" onClick={collapseAll} icon={<UpOutlined />}>
                            {tCommon('collapseAll', { defaultValue: 'Collapse All' })}
                          </Button>
                        </span>
                        <Tree
                          treeData={filteredPermissions}
                          titleRender={(node) => {
                            return <span>{t(`permission.title.${node.code}`, { defaultValue: node.title })}</span>
                          }}
                          checkable
                          expandedKeys={expandedKeys}
                          autoExpandParent={autoExpandParent}
                          onExpand={onExpand}
                          checkedKeys={checkedKeys}
                          onCheck={(checkedKeys) => {
                            if (_.isArray(checkedKeys)) {
                              setCheckedKeys(checkedKeys as string[]);
                            } else if (_.has(checkedKeys, 'checked')) {
                              setCheckedKeys(checkedKeys.checked as string[]);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </Form.Item>
                ),
              },
              {
                key: 'policy',
                label: t('role.policyDocument', { defaultValue: 'Policy Document' }),
                disabled: roleType === 'organization',
                children: (
                  <Form.Item
                    name="policy_document"
                    rules={[
                      { validator: validatePolicyDocument }
                    ]}
                    extra={<span className={styles.rolePolicyExtra}>
                      <Select
                        style={{ width: 120 }}
                        placeholder={t('role.insertTemplate', { defaultValue: 'Insert Template' })}
                        value={t('role.insertTemplate', { defaultValue: 'Insert Template' })}
                        options={[
                          { label: t('role.allowAll', { defaultValue: 'Allow All' }), value: 'allow_all' },
                          { label: t('role.denyAll', { defaultValue: 'Deny All' }), value: 'deny_all' },
                          { label: t('role.allowWithAction', { defaultValue: 'Allow with Action' }), value: 'allow_with_action' },
                          { label: t('role.denyWithCondition', { defaultValue: 'Allow with Condition' }), value: 'allow_with_condition' },
                          { label: t('role.allowWithUri', { defaultValue: 'Allow with URI' }), value: 'allow_with_uri' },
                        ]}
                        onChange={(e) => {
                          const template = templateMap[e as keyof typeof templateMap];
                          if (template) {
                            form.setFieldValue('policy_document', JSON.stringify(template, null, 2));
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
                ),
              },
            ]}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default RoleList; 