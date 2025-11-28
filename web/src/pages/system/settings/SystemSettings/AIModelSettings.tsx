import React, { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
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
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import type { ColumnsType } from 'antd/es/table';
import api from '@/service/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import Actions from '@/components/Actions';
import DynamicConfigField from '@/components/DynamicConfigField';

const { TextArea } = Input;

interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: API.AIModelProvider;
  config: Record<string, any>;
  status: 'enabled' | 'disabled';
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

interface AIModelFormData {
  name: string;
  description?: string;
  provider: API.AIModelProvider;
  config?: Record<string, any>;
  is_default?: boolean;
}

const AIModelSettings: React.FC = () => {
  const { t } = useTranslation('ai');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingModel, setEditingModel] = useState<AIModel | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [formValues, setFormValues] = useState<Record<string, any>>({});
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
    setFormValues({});
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
    };
    // Don't populate password fields for security
    if (currentProviderDefinition?.config_fields) {
      currentProviderDefinition.config_fields.forEach((field) => {
        if (field.type === 'password') {
          formData[field.name] = '';
        }
      });
    }
    setFormValues(formData);
    form.setFieldsValue(formData);
    setIsModalVisible(true);
  };

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
    // Reset config fields when provider changes
    const currentValues = form.getFieldsValue();
    if (currentProviderDefinition?.config_fields) {
      currentProviderDefinition.config_fields.forEach((field) => {
        form.setFieldValue(field.name, undefined);
      });
    }
  };

  const handleSubmit = (values: AIModelFormData) => {
    // Extract config fields from form values
    const config: Record<string, any> = {};
    if (currentProviderDefinition?.config_fields) {
      currentProviderDefinition.config_fields.forEach((field) => {
        const value = values.config?.[field.name];
        if (value !== undefined && value !== null && value !== '') {
          config[field.name] = value;
        }
      });
    }

    const submitData: AIModelFormData = {
      name: values.name,
      description: values.description,
      provider: values.provider,
      config,
      is_default: values.is_default,
    };

    if (editingModel) {
      updateModel({ id: editingModel.id, data: submitData });
    } else {
      createModel(submitData);
    }
  };

  const getDependentValues = (field: API.ConfigField) => {
    if (!field.data_source?.depends_on) {
      return {};
    }
    const dependentValues: Record<string, any> = {};
    field.data_source.depends_on.forEach((dep) => {
      dependentValues[dep] = formValues[dep];
    });
    return dependentValues;
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
          {status === 'enabled' ? t('common.enabled', { defaultValue: 'Enabled' }) : t('common.disabled', { defaultValue: 'Disabled' })}
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
            tooltip: tCommon('edit', { defaultValue: 'Edit' }),
            onClick: async () => handleEdit(record),
          },
          {
            key: 'delete',
            permission: 'ai:models:delete',
            icon: <DeleteOutlined />,
            tooltip: tCommon('delete', { defaultValue: 'Delete' }),
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
              t('common.pagination.total', {
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
          onValuesChange={(_, allValues) => setFormValues(allValues)}
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

          {/* Dynamic config fields based on selected provider */}
          {currentProviderDefinition?.config_fields?.map((field) => (
            <DynamicConfigField
              key={field.name}
              field={field}
              selectedType={selectedProvider}
              dependentValues={getDependentValues(field)}
              formValues={formValues}
            />
          ))}

          <Form.Item
            name="is_default"
            valuePropName="checked"
          >
            <Switch /> <span style={{ marginLeft: 8 }}>{t('models.setAsDefault', { defaultValue: 'Set as default model' })}</span>
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
                  setFormValues({});
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
