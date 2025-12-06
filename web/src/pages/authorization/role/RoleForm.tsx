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

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Card,
  Form,
  Input,
  Radio,
  Select,
  Tabs,
  Tree,
  Button,
  Space,
  message,
  Spin,
  Empty,
  Checkbox,
} from 'antd';
import type { DataNode } from 'antd/es/tree';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { createStyles } from 'antd-style';
import api from '@/service/api';
import { useAuth } from '@/hooks/useAuth';
import { useSite } from '@/contexts/SiteContext';

const { TextArea } = Input;

const useStyle = createStyles(({ css }) => {
  return {
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
  };
});

interface TreeDataNodeWithCode extends DataNode {
  code: string;
  orgPermission?: boolean;
  children?: TreeDataNodeWithCode[];
}

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
};

const defaultPolicyDocument = JSON.stringify({ Statement: [] }, null, 2);

const RoleForm: React.FC = () => {
  const { styles } = useStyle();
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEditMode = Boolean(id);
  const { enableMultiOrg, currentOrgId } = useSite();
  const { user } = useAuth();

  const organizations = user?.organizations || [];

  const [form] = Form.useForm();
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [allPermissions, setAllPermissions] = useState<TreeDataNodeWithCode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [aiToolsets, setAiToolsets] = useState<API.ToolSet[]>([]);
  const [aiToolSelections, setAiToolSelections] = useState<Record<string, string[]>>({});
  const aiToolSelectionsRef = useRef<Record<string, string[]>>({});
  const [aiToolsetsLoading, setAiToolsetsLoading] = useState(false);
  const [roleType, setRoleType] = useState<'global' | 'organization'>('global');
  const [selectedOrgId, setSelectedOrgId] = useState<string | undefined>(undefined);
  const [pageLoading, setPageLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    aiToolSelectionsRef.current = aiToolSelections;
  }, [aiToolSelections]);

  useEffect(() => {
    setSelectedOrgId(currentOrgId || undefined);
  }, []);

  const fetchPermissions = useCallback(async () => {
    try {
      const res = await api.authorization.listPermissions();
      setAllPermissions(
        res.map((item, idx) => {
          const childNodes = (item.permissions || []).map((p) => ({
            key: p.id,
            code: p.code.replace(/:/g, '.'),
            title: p.name,
            orgPermission: p.org_permission || false,
          })) as TreeDataNodeWithCode[];
          return {
            key: `[group]-${idx}`,
            title: item.name,
            code: item.name.replace(/ /g, '_'),
            children: childNodes,
          } as TreeDataNodeWithCode;
        }),
      );
    } catch (error) {
      message.error(t('role.loadError', { defaultValue: 'Failed to load role list' }));
    }
  }, [t]);

  useEffect(() => {
    void fetchPermissions();
  }, [fetchPermissions]);

  const fetchAiToolsets = useCallback(
    async (organizationId: string, initialSelection?: Record<string, string[]>) => {
      if (!organizationId) {
        setAiToolsets([]);
        setAiToolSelections(initialSelection || {});
        return;
      }
      setAiToolsetsLoading(true);
      try {
        const data = await api.system.listToolSets(
          { page_size: 1000, include_tools: true },
          { headers: { 'X-Scope-OrgID': organizationId } },
        );
        const toolsets = (data.data || []).filter((item) => item.status === 'enabled');
        setAiToolsets(toolsets);
        const sourceSelections = initialSelection || aiToolSelectionsRef.current || {};
        const nextSelections: Record<string, string[]> = {};
        toolsets.forEach((toolset) => {
          const existing = sourceSelections[toolset.id] || [];
          nextSelections[toolset.id] = existing.filter((tool) =>
            (toolset.tools || []).some((definition) => definition.name === tool),
          );
        });
        setAiToolSelections(nextSelections);
      } catch (error) {
        message.error(t('role.loadAiToolsetsError', { defaultValue: 'Failed to load AI toolsets.' }));
        setAiToolsets([]);
        setAiToolSelections(initialSelection || {});
      } finally {
        setAiToolsetsLoading(false);
      }
    },
    [t],
  );

  const mapPermissionsToSelections = (permissions?: API.RoleAIToolPermission[]): Record<string, string[]> => {
    if (!permissions) {
      return {};
    }
    return permissions.reduce<Record<string, string[]>>((acc, permission) => {
      if (!permission.toolset_id || !permission.tool_name) {
        return acc;
      }
      if (!acc[permission.toolset_id]) {
        acc[permission.toolset_id] = [];
      }
      if (!acc[permission.toolset_id].includes(permission.tool_name)) {
        acc[permission.toolset_id].push(permission.tool_name);
      }
      return acc;
    }, {});
  };

  const loadRole = useCallback(
    async (roleId: string) => {
      setPageLoading(true);
      try {
        const detailedRole = await api.authorization.getRole({ id: roleId });
        const permissions = detailedRole.permissions?.map((p: API.Permission) => p.id) || [];
        setCheckedKeys(permissions);
        form.setFieldsValue({ permissions });
        const orgId = detailedRole.organization_id || '';
        const currentRoleType = orgId ? 'organization' : 'global';
        setRoleType(currentRoleType);

        const initialSelection = mapPermissionsToSelections(detailedRole.ai_tool_permissions);
        if (currentRoleType === 'organization' && orgId) {
          await fetchAiToolsets(orgId, initialSelection);
        } else {
          setAiToolsets([]);
          setAiToolSelections({});
        }

        form.setFieldsValue({
          name: detailedRole.name,
          description: detailedRole.description,
          role_type: currentRoleType,
          organization_id: orgId || undefined,
          policy_document: JSON.stringify(detailedRole.policy_document || { Statement: [] }, null, 2),
        });
      } catch (error) {
        message.error(t('role.detailLoadError', { defaultValue: 'Failed to load role details' }));
        navigate('/authorization/roles');
      } finally {
        setPageLoading(false);
      }
    },
    [fetchAiToolsets, form, navigate, t],
  );

  useEffect(() => {
    if (isEditMode && id) {
      void loadRole(id);
      return;
    }

    const defaultOrgId =
      selectedOrgId || (organizations.length > 0 ? organizations[0].id : '');
    const defaultRoleType = enableMultiOrg && defaultOrgId ? 'organization' : 'global';
    setRoleType(defaultRoleType);
    form.setFieldsValue({
      role_type: defaultRoleType,
      organization_id: defaultRoleType === 'organization' ? defaultOrgId : undefined,
      policy_document: defaultPolicyDocument,
      permissions: [],
    });
    setCheckedKeys([]);
    setAiToolSelections({});
    if (defaultRoleType === 'organization' && defaultOrgId) {
      void fetchAiToolsets(defaultOrgId, {});
    } else {
      setAiToolsets([]);
    }
  }, [
    fetchAiToolsets,
    form,
    id,
    isEditMode,
    organizations,
    selectedOrgId,
    enableMultiOrg,
    loadRole,
  ]);

  const filteredPermissions = useMemo<TreeDataNodeWithCode[]>(() => {
    const isGlobalRole = roleType === 'global';

    if (isGlobalRole) {
      return allPermissions;
    }
    return allPermissions
      .map((group) => {
        const orgPerms = (group.children || []).filter(
          (child) => (child as TreeDataNodeWithCode).orgPermission === true,
        ) as TreeDataNodeWithCode[];
        return {
          ...group,
          children: orgPerms,
        } as TreeDataNodeWithCode;
      })
      .filter((group) => group.children && group.children.length > 0);
  }, [allPermissions, roleType]);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const expandAll = () => {
    const allKeys = allPermissions.map((node) => node.key as React.Key);
    setExpandedKeys(allKeys);
    setAutoExpandParent(true);
  };

  const collapseAll = () => {
    setExpandedKeys([]);
    setAutoExpandParent(false);
  };

  const handleAiToolSelectionChange = useCallback((toolsetId: string, values: string[]) => {
    setAiToolSelections((prev) => ({
      ...prev,
      [toolsetId]: values,
    }));
  }, []);

  const validatePolicyDocument = (_: unknown, value: string) => {
    if (roleType === 'organization') {
      return Promise.resolve();
    }

    if (!value || value.trim() === '' || value === '{}' || value === '{"Statement":[]}') {
      if (checkedKeys.length === 0) {
        return Promise.reject(
          new Error(
            t('role.permissionOrPolicyRequired', {
              defaultValue: 'Please select at least one permission or provide a policy document.',
            }),
          ),
        );
      }
      return Promise.resolve();
    }

    try {
      JSON.parse(value);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(
        new Error(t('role.invalidJsonFormat', { defaultValue: 'Invalid JSON format.' })),
      );
    }
  };

  const handleSubmit = async (values: any) => {
    const payload = { ...values };

    try {
      if (roleType === 'global') {
        payload.policy_document = JSON.parse(values.policy_document ?? '{}');
      } else {
        payload.policy_document = { Statement: [] };
      }

      if (payload.role_type === 'organization') {
        payload.organization_id = payload.organization_id || undefined;
      } else {
        payload.organization_id = undefined;
      }
      delete payload.role_type;

      const aiAssignments =
        roleType === 'organization'
          ? Object.entries(aiToolSelections)
            .map(([toolsetId, tools]) => ({
              toolset_id: toolsetId,
              tools: Array.from(new Set(tools)),
            }))
            .filter((item) => item.tools.length > 0)
          : [];
      payload.ai_tool_permissions = aiAssignments;
      payload.permissions = checkedKeys.filter((key) => !key.startsWith('[group]-'));

      setSubmitLoading(true);
      if (isEditMode && id) {
        await api.authorization.updateRole({ id }, payload as API.UpdateRoleRequest);
        message.success(t('role.updateSuccess', { defaultValue: 'Role updated successfully.' }));
      } else {
        await api.authorization.createRole(payload as API.CreateRoleRequest);
        message.success(t('role.createSuccess', { defaultValue: 'Role created successfully.' }));
      }
      navigate('/authorization/roles');
    } catch (error) {
      message.error(
        t('role.saveError', {
          defaultValue: 'Failed to save role.',
          action: isEditMode
            ? tCommon('update', { defaultValue: 'Update' })
            : tCommon('create', { defaultValue: 'Create' }),
        }),
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Card
      title={
        isEditMode
          ? t('role.editTitle', { defaultValue: 'Edit Role' })
          : t('role.createTitle', { defaultValue: 'Create Role' })
      }
      loading={pageLoading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          policy_document: defaultPolicyDocument,
          permissions: [],
        }}
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
                    rules={[
                      {
                        required: true,
                        message: t('role.nameRequired', {
                          defaultValue: 'Please enter the role name.',
                        }),
                      },
                    ]}
                  >
                    <Input placeholder={t('role.namePlaceholder', { defaultValue: 'Enter role name' })} />
                  </Form.Item>

                  <Form.Item
                    label={t('role.description', { defaultValue: 'Description' })}
                    name="description"
                  >
                    <TextArea
                      rows={4}
                      placeholder={t('role.descriptionPlaceholder', {
                        defaultValue: 'Enter role description',
                      })}
                    />
                  </Form.Item>

                  <Form.Item
                    label={t('role.roleType', { defaultValue: 'Role Type' })}
                    name="role_type"
                    hidden={!enableMultiOrg}
                    rules={[
                      {
                        required: true,
                        message: t('role.roleTypeRequired', {
                          defaultValue: 'Please select role type.',
                        }),
                      },
                    ]}
                    extra={
                      isEditMode
                        ? t('role.roleTypeCannotChange', {
                          defaultValue: 'Role type cannot be changed after creation.',
                        })
                        : ''
                    }
                  >
                    <Radio.Group
                      disabled={isEditMode}
                      onChange={(e) => {
                        const newRoleType = e.target.value;
                        setRoleType(newRoleType);
                        if (newRoleType === 'global') {
                          form.setFieldsValue({ organization_id: undefined });
                          setAiToolsets([]);
                          setAiToolSelections({});
                        } else {
                          const defaultOrgId =
                            selectedOrgId || (organizations.length > 0 ? organizations[0].id : '');
                          form.setFieldsValue({ organization_id: defaultOrgId });
                          if (defaultOrgId) {
                            void fetchAiToolsets(defaultOrgId, aiToolSelectionsRef.current);
                          } else {
                            setAiToolsets([]);
                            setAiToolSelections({});
                          }
                        }
                        setCheckedKeys([]);
                        form.setFieldsValue({ permissions: [] });
                      }}
                    >
                      <Radio value="global">
                        {t('role.globalRole', { defaultValue: 'Global Role' })}
                      </Radio>
                      <Radio value="organization">
                        {t('role.organizationRole', { defaultValue: 'Organization Role' })}
                      </Radio>
                    </Radio.Group>
                  </Form.Item>

                  {roleType === 'organization' && (
                    <Form.Item
                      hidden={!enableMultiOrg}
                      label={t('role.organization', { defaultValue: 'Organization' })}
                      name="organization_id"
                      rules={[
                        {
                          required: true,
                          message: t('role.organizationRequired', {
                            defaultValue: 'Please select an organization.',
                          }),
                        },
                      ]}
                      extra={
                        organizations.length > 0
                          ? t('role.organizationHelp', {
                            defaultValue: 'Select the organization this role belongs to',
                          })
                          : t('role.noOrganizationsAvailable', {
                            defaultValue: 'No organizations available. Please contact your administrator.',
                          })
                      }
                    >
                      {organizations.length > 0 ? (
                        <Select
                          placeholder={t('role.selectOrganization', {
                            defaultValue: 'Select Organization',
                          })}
                          onChange={(value) => {
                            setCheckedKeys([]);
                            form.setFieldsValue({ permissions: [] });
                            const orgIdValue = value || '';
                            if (orgIdValue) {
                              void fetchAiToolsets(orgIdValue, {});
                            } else {
                              setAiToolsets([]);
                              setAiToolSelections({});
                            }
                          }}
                        >
                          {organizations.map((org) => (
                            <Select.Option key={org.id} value={org.id}>
                              {org.name}
                            </Select.Option>
                          ))}
                        </Select>
                      ) : (
                        <Select
                          disabled
                          placeholder={t('role.noOrganizationsAvailable', {
                            defaultValue: 'No organizations available',
                          })}
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
                  rules={[
                    {
                      validator() {
                        if (checkedKeys.length === 0) {
                          if (roleType === 'global') {
                            const policyDoc = form.getFieldValue('policy_document');
                            if (
                              !policyDoc ||
                              policyDoc.trim() === '' ||
                              policyDoc === '{}' ||
                              policyDoc === '{"Statement":[]}'
                            ) {
                              return Promise.reject(
                                new Error(
                                  t('role.permissionOrPolicyRequired', {
                                    defaultValue:
                                      'Please select at least one permission or provide a policy document.',
                                  }),
                                ),
                              );
                            }
                          } else {
                            return Promise.reject(
                              new Error(
                                t('role.permissionRequired', {
                                  defaultValue: 'Please select at least one permission.',
                                }),
                              ),
                            );
                          }
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <div>
                    <div
                      style={{
                        maxHeight: '400px',
                        overflowY: 'auto',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                      }}
                    >
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
                          const treeNode = node as TreeDataNodeWithCode;
                          const title = typeof treeNode.title === 'string' ? treeNode.title : String(treeNode.title ?? '');
                          return (
                            <span>
                              {t(`permission.title.${treeNode.code}`, { defaultValue: title })}
                            </span>
                          );
                        }}
                        checkable
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        onExpand={onExpand}
                        checkedKeys={checkedKeys}
                        onCheck={(newCheckedKeys) => {
                          let values: string[] = [];
                          if (_.isArray(newCheckedKeys)) {
                            values = newCheckedKeys as string[];
                          } else if (_.has(newCheckedKeys, 'checked')) {
                            values = (newCheckedKeys as any).checked as string[];
                          }
                          setCheckedKeys(values);
                          form.setFieldsValue({ permissions: values });
                        }}
                      />
                    </div>
                  </div>
                </Form.Item>
              ),
            },
            {
              key: 'ai-tools',
              label: t('role.aiPermissions', { defaultValue: 'AI Tool Permissions' }),
              disabled: roleType === 'global',
              children: (
                <Spin spinning={aiToolsetsLoading}>
                  {roleType === 'organization' ? (
                    aiToolsets.length > 0 ? (
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        {aiToolsets.map((toolset) => (
                          <Card
                            key={toolset.id}
                            size="small"
                            title={toolset.name}
                            extra={toolset.description ? <span>{toolset.description}</span> : undefined}
                          >
                            {(toolset.tools || []).length > 0 ? (
                              <Checkbox.Group
                                style={{ width: '100%' }}
                                value={aiToolSelections[toolset.id] || []}
                                onChange={(checked) =>
                                  handleAiToolSelectionChange(toolset.id, checked as string[])
                                }
                              >
                                <Space direction="vertical" style={{ width: '100%' }}>
                                  {(toolset.tools || []).map((tool) => (
                                    <Checkbox value={tool.name} key={tool.name}>
                                      <div>
                                        <div>{tool.name}</div>
                                        {tool.description && (
                                          <div
                                            style={{
                                              color: 'rgba(0,0,0,0.45)',
                                              fontSize: 12,
                                            }}
                                          >
                                            {tool.description}
                                          </div>
                                        )}
                                      </div>
                                    </Checkbox>
                                  ))}
                                </Space>
                              </Checkbox.Group>
                            ) : (
                              <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={t('role.aiToolsetNoTools', {
                                  defaultValue: 'No tools available in this toolset.',
                                })}
                              />
                            )}
                          </Card>
                        ))}
                      </Space>
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={t('role.aiToolsetsEmpty', {
                          defaultValue: 'No AI toolsets available for this organization.',
                        })}
                      />
                    )
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={t('role.aiPermissionsGlobalInfo', {
                        defaultValue: 'AI tool permissions are only available for organization roles.',
                      })}
                    />
                  )}
                </Spin>
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
                    {
                      validator: validatePolicyDocument,
                    },
                  ]}
                  extra={
                    <span className={styles.rolePolicyExtra}>
                      <Select
                        style={{ width: 160 }}
                        placeholder={t('role.insertTemplate', { defaultValue: 'Insert Template' })}
                        options={[
                          { label: t('role.allowAll', { defaultValue: 'Allow All' }), value: 'allow_all' },
                          { label: t('role.denyAll', { defaultValue: 'Deny All' }), value: 'deny_all' },
                          {
                            label: t('role.allowWithAction', { defaultValue: 'Allow with Action' }),
                            value: 'allow_with_action',
                          },
                          {
                            label: t('role.denyWithCondition', { defaultValue: 'Allow with Condition' }),
                            value: 'allow_with_condition',
                          },
                          {
                            label: t('role.allowWithUri', { defaultValue: 'Allow with URI' }),
                            value: 'allow_with_uri',
                          },
                        ]}
                        onChange={(templateKey) => {
                          if (typeof templateKey === 'string') {
                            const template = templateMap[templateKey as keyof typeof templateMap];
                            if (template) {
                              form.setFieldValue('policy_document', JSON.stringify(template, null, 2));
                            }
                          }
                        }}
                      />
                    </span>
                  }
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
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitLoading}
            >
              {isEditMode ? tCommon('update', { defaultValue: 'Update' }) : tCommon('create', { defaultValue: 'Create' })}
            </Button>
            <Button
              onClick={() => navigate('/authorization/roles')}
            >
              {tCommon('cancel', { defaultValue: 'Cancel' })}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RoleForm;

