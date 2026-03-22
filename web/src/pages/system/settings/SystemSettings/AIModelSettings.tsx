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

import React, { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  message,
  Tag,
  Tooltip,
  Row,
  Col,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  StarOutlined,
  StarFilled,
  BugOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import api from '@/service/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import Actions from '@/components/Actions';
import JsonSchemaConfigForm from '@/components/JsonSchemaConfigForm';

const { TextArea } = Input;

interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: API.AIModelProvider;
  config: Record<string, any>;
  status: 'enabled' | 'disabled';
  is_default: boolean;
  max_chat_tokens?: number;
  max_chat_iterations?: number;
  created_at: string;
  updated_at: string;
}

interface AIModelFormData {
  name: string;
  description?: string;
  provider: API.AIModelProvider;
  config?: Record<string, any>;
  is_default?: boolean;
  status?: 'enabled' | 'disabled';
  max_chat_tokens?: number;
  max_chat_iterations?: number;
}

const AIModelSettings: React.FC = () => {
  const { t } = useTranslation('ai');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingModel, setEditingModel] = useState<AIModel | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  // Fetch AI type definitions
  const { loading: typeDefinitionsLoading, data: typeDefinitions } = useRequest(
    () => api.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (error) => {
        message.error(t('models.fetchTypeDefinitionsFailed', { defaultValue: 'Failed to fetch AI type definitions' }));
        console.error('Failed to fetch AI type definitions:', error);
      },
    }
  );

  // Get current selected provider definition
  const currentProviderDefinition = useMemo(() => {
    return typeDefinitions?.find((td) => td.provider === selectedProvider);
  }, [typeDefinitions, selectedProvider]);

  // Fetch AI models
  const { loading, data, refresh } = useRequest(
    () => api.ai.listAiModels({ current: 1, page_size: 100, search: searchText }),
    {
      refreshDeps: [searchText],
      onError: (error) => {
        message.error(t('models.fetchFailed', { defaultValue: 'Failed to fetch AI models' }));
        console.error('Failed to fetch AI models:', error);
      },
    }
  );

  // Create AI model
  const { loading: creating, run: createModel } = useRequest(
    ({ config, ...data }: AIModelFormData) => api.ai.createAiModel({ config: config ?? {}, ...data }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('models.createSuccess', { defaultValue: 'AI model created successfully' }));
        setIsModalVisible(false);
        form.resetFields();
        refresh();
      },
      onError: (error) => {
        message.error(t('models.createFailed', { defaultValue: 'Failed to create AI model' }));
        console.error('Failed to create AI model:', error);
      },
    }
  );

  // Update AI model
  const { loading: updating, run: updateModel } = useRequest(
    ({ id, data }: { id: string; data: AIModelFormData }) => api.ai.updateAiModel({ id }, data),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('models.updateSuccess', { defaultValue: 'AI model updated successfully' }));
        setIsModalVisible(false);
        form.resetFields();
        setEditingModel(null);
        refresh();
      },
      onError: (error) => {
        message.error(t('models.updateFailed', { defaultValue: 'Failed to update AI model' }));
        console.error('Failed to update AI model:', error);
      },
    }
  );

  // Delete AI model
  const { runAsync: deleteModel } = useRequest(
    (id: string) => api.ai.deleteAiModel({ id }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('models.deleteSuccess', { defaultValue: 'AI model deleted successfully' }));
        refresh();
      },
      onError: (error) => {
        message.error(t('models.deleteFailed', { defaultValue: 'Failed to delete AI model' }));
        console.error('Failed to delete AI model:', error);
      },
    }
  );

  // Test AI model
  const { runAsync: testModel } = useRequest(
    (id: string) => api.ai.testAiModel({ id }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('models.testSuccess', { defaultValue: 'AI model connection test successful' }));
      },
      onError: (error) => {
        message.error(t('models.testFailed', { defaultValue: 'AI model connection test failed' }));
        console.error('Failed to test AI model:', error);
      },
    }
  );

  // Set default AI model
  const { runAsync: setDefaultModel } = useRequest(
    (id: string) => api.ai.setDefaultAiModel({ id }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('models.setDefaultSuccess', { defaultValue: 'Default AI model set successfully' }));
        refresh();
      },
      onError: (error) => {
        message.error(t('models.setDefaultFailed', { defaultValue: 'Failed to set default AI model' }));
        console.error('Failed to set default AI model:', error);
      },
    }
  );

  const handleCreate = () => {
    setEditingModel(null);
    setSelectedProvider('');
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: AIModel) => {
    setEditingModel(record);
    setSelectedProvider(record.provider);
    const config = record.config || {};
    const formData: Record<string, any> = {
      name: record.name,
      description: record.description,
      provider: record.provider,
      is_default: record.is_default,
      config: config, // Spread config fields to form
      status: record.status,
      max_chat_tokens: record.max_chat_tokens ?? 0,
      max_chat_iterations: record.max_chat_iterations ?? 0,
    };
    form.setFieldsValue(formData);
    setIsModalVisible(true);
  };

  const handleClone = async (record: AIModel) => {
    setEditingModel(null);
    setSelectedProvider(record.provider);
    form.resetFields();
    try {
      const m = (await api.ai.getAiModel({ id: record.id })) as AIModel;
      const cfg = { ...(m.config || {}) };
      if ('api_key' in cfg) {
        cfg.api_key = '';
      }
      form.setFieldsValue({
        name: `${m.name} (copy)`,
        description: m.description,
        provider: m.provider,
        config: cfg,
        is_default: false,
        status: 'enabled' as const,
        max_chat_tokens: m.max_chat_tokens ?? 0,
        max_chat_iterations: m.max_chat_iterations ?? 0,
      });
      setIsModalVisible(true);
    } catch {
      message.error(t('models.cloneLoadFailed', { defaultValue: 'Failed to load model for clone' }));
    }
  };

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
    // Reset config fields when provider changes

    form.setFieldValue('config', undefined);
  };

  const handleSubmit = (values: AIModelFormData) => {
    let config: Record<string, any> = values.config ?? {};

    const submitData: AIModelFormData = {
      name: values.name,
      description: values.description,
      provider: values.provider,
      config,
      is_default: values.is_default,
      status: values.status,
      max_chat_tokens: values.max_chat_tokens ?? 0,
      max_chat_iterations: values.max_chat_iterations ?? 0,
    };

    if (editingModel) {
      updateModel({ id: editingModel.id, data: submitData });
    } else {
      createModel(submitData);
    }
  };



  const columns: ColumnsType<AIModel> = [
    {
      title: t('models.name', { defaultValue: 'Name' }),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          {record.is_default && (
            <Tooltip title={t('models.defaultModel', { defaultValue: 'Default Model' })}>
              <StarFilled style={{ color: '#faad14' }} />
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: t('models.provider', { defaultValue: 'Provider' }),
      dataIndex: 'provider',
      key: 'provider',
      render: (text) => <Tag color="blue">{text.toUpperCase()}</Tag>,
    },
    {
      title: t('models.status', { defaultValue: 'Status' }),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'enabled' ? 'green' : 'red'}>
          {status === 'enabled' ? tCommon('enabled', { defaultValue: 'Enabled' }) : tCommon('disabled', { defaultValue: 'Disabled' })}
        </Tag>
      ),
    },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'actions',
      width: 200,
      render: (_, record) => {
        return <Actions actions={[
          {
            key: 'test',
            permission: 'ai:models:test',
            icon: <CheckCircleOutlined />,
            tooltip: t('models.test', { defaultValue: 'Test Connection' }),
            onClick: async () => testModel(record.id),
          },
          {
            key: 'setDefault',
            permission: 'ai:models:setDefault',
            icon: <StarOutlined />,
            tooltip: t('models.setDefault', { defaultValue: 'Set as Default' }),
            onClick: async () => setDefaultModel(record.id),
          },
          {
            key: 'update',
            permission: 'ai:models:update',
            icon: <EditOutlined />,
            tooltip: t('models.editTooltip', { defaultValue: 'Edit model' }),
            onClick: async () => handleEdit(record),
          },
          {
            key: 'clone',
            permission: 'ai:models:create',
            icon: <CopyOutlined />,
            tooltip: t('models.cloneTooltip', { defaultValue: 'Clone as new model (re-enter API key if needed)' }),
            onClick: async () => handleClone(record),
          },
          {
            key: 'delete',
            permission: 'ai:models:delete',
            icon: <DeleteOutlined />,
            tooltip: t('models.deleteTooltip', { defaultValue: 'Delete model' }),
            onClick: async () => deleteModel(record.id),
            danger: true,
          },
        ]} key="actions" />
      },
    },
  ];

  return (
    <div>
      {/* Search and Actions */}
      <Card style={{ marginBottom: 16 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Input.Search
              placeholder={t('models.searchPlaceholder', { defaultValue: 'Search AI models...' })}
              style={{ width: 300 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col>
            <Space>
              <PermissionGuard permission="ai:trace:manage">
                <Button
                  icon={<BugOutlined />}
                  onClick={() => navigate('/system/settings/ai-trace')}
                >
                  {t('trace.debug', { defaultValue: 'Debug' })}
                </Button>
              </PermissionGuard>
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={refresh}
                loading={loading}
              >
                {tCommon('refresh', { defaultValue: 'Refresh' })}
              </Button>
              <PermissionGuard permission="ai:models:create">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleCreate}
                >
                  {t('models.create', { defaultValue: 'Create AI Model' })}
                </Button>
              </PermissionGuard>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* AI Models Table */}
      <Card>
        <Table<AIModel>
          columns={columns}
          dataSource={data?.data || []}
          loading={loading}
          rowKey="id"
          pagination={{
            total: data?.total || 0,
            current: data?.current || 1,
            pageSize: data?.page_size || 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              tCommon('pagination.total', {
                defaultValue: `${range[0]}-${range[1]} of ${total} items`,
                start: range[0],
                end: range[1],
                total,
              }),
          }}
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={editingModel ? t('models.edit', { defaultValue: 'Edit AI Model' }) : t('models.create', { defaultValue: 'Create AI Model' })}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingModel(null);
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label={t('models.name', { defaultValue: 'Name' })}
            rules={[{ required: true, message: t('models.nameRequired', { defaultValue: 'Please enter model name' }) }]}
          >
            <Input placeholder={t('models.namePlaceholder', { defaultValue: 'Enter model name' })} />
          </Form.Item>

          <Form.Item
            name="description"
            label={t('models.description', { defaultValue: 'Description' })}
          >
            <TextArea
              rows={3}
              placeholder={t('models.descriptionPlaceholder', { defaultValue: 'Enter model description' })}
            />
          </Form.Item>

          <Form.Item
            name="provider"
            label={t('models.provider', { defaultValue: 'Provider' })}
            rules={[{ required: true, message: t('models.providerRequired', { defaultValue: 'Please select provider' }) }]}
          >
            <Select
              loading={typeDefinitionsLoading}
              placeholder={t('models.providerPlaceholder', { defaultValue: 'Select provider' })}
              onChange={handleProviderChange}
              value={selectedProvider}
              options={typeDefinitions?.map((typeDefinition) => ({
                label: typeDefinition.name,
                value: typeDefinition.provider,
              }))}
            />
          </Form.Item>

          {currentProviderDefinition && (<Form.Item name={['config']}>
            <JsonSchemaConfigForm
              schema={currentProviderDefinition.config_schema as unknown as Record<string, unknown>}
            />
          </Form.Item>)}

          <Form.Item
            name="max_chat_tokens"
            label={t('models.maxChatTokens', { defaultValue: 'Max chat tokens (context / summarization)' })}
            tooltip={t('models.maxChatTokensHelp', {
              defaultValue: '0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model.',
            })}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
          </Form.Item>
          <Form.Item
            name="max_chat_iterations"
            label={t('models.maxChatIterations', { defaultValue: 'Max chat iterations (tool rounds)' })}
            tooltip={t('models.maxChatIterationsHelp', {
              defaultValue: '0 uses default. Positive value caps tool-call iterations for this model.',
            })}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
          </Form.Item>

          <Form.Item
            name="is_default"
            valuePropName="checked"
          >
            <Switch /> <span style={{ marginLeft: 8 }}>{t('models.setAsDefault', { defaultValue: 'Set as default model' })}</span>
          </Form.Item>
          <Form.Item hidden name="status" label={t('models.status', { defaultValue: 'Status' })}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={creating || updating}
              >
                {editingModel ? tCommon('update', { defaultValue: 'Update' }) : tCommon('create', { defaultValue: 'Create' })}
              </Button>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                  setEditingModel(null);
                  setSelectedProvider('');
                }}
              >
                {tCommon('cancel', { defaultValue: 'Cancel' })}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AIModelSettings;
