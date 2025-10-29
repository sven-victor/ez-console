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
  message,
  Popconfirm,
  Tag,
  Tooltip,
  Row,
  Col,
  InputNumber,
  Switch,
  Checkbox,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import type { ColumnsType } from 'antd/es/table';
import api from '@/service/api';

const { TextArea } = Input;
const { Option } = Select;

interface ToolSet {
  id: string;
  name: string;
  description: string;
  type: API.ToolSetType | string;
  config?: Record<string, any>;
  status: 'enabled' | 'disabled';
  created_at: string;
  updated_at: string;
}

interface ToolSetFormData {
  name: string;
  description?: string;
  type: API.ToolSetType | string;
  config?: Record<string, any>;
}

const ToolSetSettings: React.FC = () => {
  const { t } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingToolSet, setEditingToolSet] = useState<ToolSet | null>(null);
  const [searchText, setSearchText] = useState('');
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<Record<string, any> | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const [testingToolSetId, setTestingToolSetId] = useState<string>('');

  // Fetch toolsets
  const { loading, data, refresh } = useRequest(
    () => api.toolsets.listToolSets({ current: 1, page_size: 100, search: searchText }),
    {
      refreshDeps: [searchText],
      onError: (error) => {
        message.error(t('settings.toolsets.fetchFailed', { defaultValue: 'Failed to fetch toolsets' }));
        console.error('Failed to fetch toolsets:', error);
      },
    }
  );

  const { loading: typeDefinitionsLoading, data: typeDefinitions } = useRequest(
    () => api.toolsets.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (error) => {
        message.error(t('settings.toolsets.fetchTypeDefinitionsFailed', { defaultValue: 'Failed to fetch toolset type definitions' }));
        console.error('Failed to fetch toolset type definitions:', error);
      },
    }
  );

  // Get current selected type definition
  const currentTypeDefinition = useMemo(() => {
    return typeDefinitions?.find((td) => td.tool_set_type === selectedType);
  }, [typeDefinitions, selectedType]);

  // Create toolset
  const { loading: creating, run: createToolSet } = useRequest(
    (data: ToolSetFormData) => api.toolsets.createToolSet({
      ...data,
      type: data.type as API.ToolSetType
    }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.toolsets.createSuccess', { defaultValue: 'toolset created successfully' }));
        setIsModalVisible(false);
        form.resetFields();
        refresh();
      },
      onError: (error) => {
        message.error(t('settings.toolsets.createFailed', { defaultValue: 'Failed to create toolset' }));
        console.error('Failed to create toolset:', error);
      },
    }
  );

  // Update toolset
  const { loading: updating, run: updateToolSet } = useRequest(
    ({ id, data }: { id: string; data: ToolSetFormData }) => api.toolsets.updateToolSet({ id }, {
      ...data,
      type: data.type as API.ToolSetType
    }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.toolsets.updateSuccess', { defaultValue: 'toolset updated successfully' }));
        setIsModalVisible(false);
        form.resetFields();
        setEditingToolSet(null);
        refresh();
      },
      onError: (error) => {
        message.error(t('settings.toolsets.updateFailed', { defaultValue: 'Failed to update toolset' }));
        console.error('Failed to update toolset:', error);
      },
    }
  );

  // Delete toolset
  const { run: deleteToolSet } = useRequest(
    (id: string) => api.toolsets.deleteToolSet({ id }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.toolsets.deleteSuccess', { defaultValue: 'toolset deleted successfully' }));
        refresh();
      },
      onError: (error) => {
        message.error(t('settings.toolsets.deleteFailed', { defaultValue: 'Failed to delete toolset' }));
        console.error('Failed to delete toolset:', error);
      },
    }
  );

  // Test toolset
  const { loading: testing, run: testToolSet } = useRequest(
    (id: string) => api.toolsets.testToolSet({ id }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.toolsets.testSuccess', { defaultValue: 'toolset connection test successful' }));
      },
      onError: (error) => {
        message.error(t('settings.toolsets.testFailed', { defaultValue: 'toolset connection test failed' }));
        console.error('Failed to test toolset:', error);
      },
    }
  );

  const handleCreate = () => {
    setEditingToolSet(null);
    form.resetFields();
    setSelectedType('');
    setIsModalVisible(true);
  };

  const handleEdit = (record: ToolSet) => {
    setEditingToolSet(record);
    setSelectedType(record.type);

    // Convert config object fields to JSON strings for display
    const formValues = { ...record };
    if (formValues.config) {
      const typeDefinition = typeDefinitions?.find((td) => td.tool_set_type === record.type);
      if (typeDefinition) {
        const configWithStringifiedObjects: Record<string, any> = {};
        typeDefinition.config_fields.forEach((field) => {
          if (field.type === 'object' && formValues.config?.[field.name]) {
            configWithStringifiedObjects[field.name] = JSON.stringify(formValues.config[field.name], null, 2);
          } else if (formValues.config?.[field.name] !== undefined) {
            configWithStringifiedObjects[field.name] = formValues.config[field.name];
          }
        });
        formValues.config = configWithStringifiedObjects;
      }
    }

    form.setFieldsValue(formValues);
    setIsModalVisible(true);
  };

  console.log(selectedType, typeDefinitions)
  const handleTypeChange = (value: string) => {
    setSelectedType(value);

    // Reset and set default values for config fields when type changes
    const typeDefinition = typeDefinitions?.find((td) => td.tool_set_type === value);
    if (typeDefinition) {
      const defaultConfig: Record<string, any> = {};
      typeDefinition.config_fields.forEach((field) => {
        if (field.default) {
          switch (field.type) {
            case 'number':
              defaultConfig[field.name] = Number(field.default);
              break;
            case 'boolean':
              defaultConfig[field.name] = field.default === 'true';
              break;
            case 'array':
              defaultConfig[field.name] = field.default.split(',');
              break;
            default:
              defaultConfig[field.name] = field.default;
          }
        }
      });
      form.setFieldValue('config', defaultConfig);
    } else {
      form.setFieldValue('config', undefined);
    }
  };

  const handleSubmit = (values: ToolSetFormData) => {
    // Convert object field JSON strings to objects
    if (values.config && currentTypeDefinition) {
      const processedConfig: Record<string, any> = {};
      currentTypeDefinition.config_fields.forEach((field) => {
        const value = values.config?.[field.name];
        if (value !== undefined) {
          if (field.type === 'object') {
            try {
              processedConfig[field.name] = typeof value === 'string' ? JSON.parse(value) : value;
            } catch (e) {
              // If parsing fails, keep the original value
              processedConfig[field.name] = value;
            }
          } else {
            processedConfig[field.name] = value;
          }
        }
      });
      values.config = processedConfig;
    }

    if (editingToolSet) {
      updateToolSet({ id: editingToolSet.id, data: values });
    } else {
      createToolSet(values);
    }
  };

  const handleDelete = (id: string) => {
    deleteToolSet(id);
  };

  const handleTest = (id: string) => {
    setTestingToolSetId(id);
    testToolSet(id);
  };

  const handleViewConfig = (config: Record<string, any>) => {
    setSelectedConfig(config);
    setConfigModalVisible(true);
  };

  // Render dynamic config fields based on type definition
  const renderConfigField = (field: API.ToolSetConfigField) => {
    const hasOptions = field.options && field.options.length > 0;

    // Build rules
    const rules = [
      {
        required: field.required,
        message: t('settings.toolsets.fieldRequired', {
          defaultValue: `Please enter ${field.name}`,
          field: field.name,
        }),
      },
    ];

    // If options is empty
    if (!hasOptions) {
      switch (field.type) {
        case 'string':
          return (
            <Form.Item
              key={field.name}
              name={['config', field.name]}
              label={t(`settings.toolsets.${selectedType}.${field.name}`, { defaultValue: field.display_name || field.name })}
              rules={rules}
              tooltip={field.description ? t(`settings.toolsets.${selectedType}.${field.name}Tooltip`, { defaultValue: field.description }) : undefined}
            >
              <Input placeholder={t(`settings.toolsets.${selectedType}.${field.name}Placeholder`, { defaultValue: (field.placeholder || `${t('common.enter', { defaultValue: 'Enter' })} ${field.name}`) })} />
            </Form.Item>
          );

        case 'number':
          return (
            <Form.Item
              key={field.name}
              name={['config', field.name]}
              label={t(`settings.toolsets.${selectedType}.${field.name}`, { defaultValue: field.display_name || field.name })}
              rules={rules}
              tooltip={field.description ? t(`settings.toolsets.${selectedType}.${field.name}Tooltip`, { defaultValue: field.description }) : undefined}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder={t(`settings.toolsets.${selectedType}.${field.name}Placeholder`, { defaultValue: (field.placeholder || `${t('common.enter', { defaultValue: 'Enter' })} ${field.name}`) })}
              />
            </Form.Item>
          );

        case 'boolean':
          return (
            <Form.Item
              key={field.name}
              name={['config', field.name]}
              label={t(`settings.toolsets.${selectedType}.${field.name}`, { defaultValue: field.display_name || field.name })}
              valuePropName="checked"
              tooltip={field.description ? t(`settings.toolsets.${selectedType}.${field.name}Tooltip`, { defaultValue: field.description }) : undefined}
            >
              <Switch />
            </Form.Item>
          );

        case 'array':
          return (
            <Form.Item
              key={field.name}
              name={['config', field.name]}
              label={t(`settings.toolsets.${selectedType}.${field.name}`, { defaultValue: field.display_name || field.name })}
              rules={rules}
              tooltip={field.description ? t(`settings.toolsets.${selectedType}.${field.name}Tooltip`, { defaultValue: field.description }) : undefined}
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder={t(`settings.toolsets.${selectedType}.${field.name}Placeholder`, { defaultValue: (field.placeholder || `${t('common.enter', { defaultValue: 'Enter' })} ${field.name}`) })}
                tokenSeparators={[',']}
              />
            </Form.Item>
          );

        case 'object':
          return (
            <Form.Item
              key={field.name}
              name={['config', field.name]}
              label={t(`settings.toolsets.${selectedType}.${field.name}`, { defaultValue: field.display_name || field.name })}
              rules={[
                ...rules,
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    try {
                      JSON.parse(value);
                      return Promise.resolve();
                    } catch (e) {
                      return Promise.reject(new Error(t('settings.toolsets.invalidJSON', { defaultValue: 'Invalid JSON format' })));
                    }
                  },
                },
              ]}
              tooltip={field.description ? t(`settings.toolsets.${selectedType}.${field.name}Tooltips`, { defaultValue: field.description }) : undefined}
            >
              <TextArea
                rows={4}
                placeholder={t(`settings.toolsets.${selectedType}.${field.name}Placeholder`, { defaultValue: (field.placeholder || `${t('common.enter', { defaultValue: 'Enter' })} ${field.name} (JSON format)`) })}
              />
            </Form.Item>
          );
        case 'password':
          return (
            <Form.Item
              key={field.name}
              name={['config', field.name]}
              label={t(`settings.toolsets.${selectedType}.${field.name}`, { defaultValue: field.display_name || field.name })}
              rules={rules}
              tooltip={field.description ? t(`settings.toolsets.${selectedType}.${field.name}Tooltip`, { defaultValue: field.description }) : undefined}
            >
              <Input.Password placeholder={t(`settings.toolsets.${selectedType}.${field.name}Placeholder`, { defaultValue: (field.placeholder || `${t('common.enter', { defaultValue: 'Enter' })} ${field.name}`) })} autoComplete='new-password' />
            </Form.Item>
          );
        default:
          return null;
      }
    }

    // If options is not empty
    switch (field.type) {
      case 'string':
      case 'number':
        return (
          <Form.Item
            key={field.name}
            name={['config', field.name]}
            label={t(`settings.toolsets.${selectedType}.${field.name}`, { defaultValue: field.display_name || field.name })}
            rules={rules}
            tooltip={field.description ? t(`settings.toolsets.${selectedType}.${field.name}Tooltip`, { defaultValue: field.description }) : undefined}
          >
            <Select allowClear placeholder={field.placeholder ? t(`settings.toolsets.${selectedType}.${field.name}Placeholder`, { defaultValue: field.description }) : (`${t('common.select', { defaultValue: 'Select' })} ${field.name}`)}>
              {field.options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );

      case 'array':
        return (
          <Form.Item
            key={field.name}
            name={['config', field.name]}
            label={t(`settings.toolsets.${selectedType}.${field.name}`, { defaultValue: field.display_name || field.name })}
            rules={rules}
            tooltip={field.description ? t(`settings.toolsets.${selectedType}.${field.name}Tooltip`, { defaultValue: field.description }) : undefined}
          >
            <Checkbox.Group style={{ width: '100%' }}>
              <Space direction="vertical">
                {field.options.map((option) => (
                  <Checkbox key={option.value} value={option.value}>
                    {option.label}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
        );

      default:
        return null;
    }
  };

  const columns: ColumnsType<ToolSet> = [
    {
      title: t('settings.toolsets.name', { defaultValue: 'Name' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('settings.toolsets.type', { defaultValue: 'Type' }),
      dataIndex: 'type',
      key: 'type',
      render: (text) => <Tag color="blue">{text.toUpperCase()}</Tag>,
    },
    {
      title: t('settings.toolsets.status', { defaultValue: 'Status' }),
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
      render: (_, record) => (
        <Space>
          <Tooltip title={t('settings.toolsets.test', { defaultValue: 'Test Connection' })}>
            <Button
              type="text"
              icon={<CheckCircleOutlined />}
              loading={testing && record.id === testingToolSetId}
              onClick={() => handleTest(record.id)}
            />
          </Tooltip>
          {record.config && Object.keys(record.config).length > 0 && (
            <Tooltip title={t('settings.toolsets.viewConfig', { defaultValue: 'View Configuration' })}>
              <Button
                type="text"
                icon={<SettingOutlined />}
                onClick={() => handleViewConfig(record.config!)}
              />
            </Tooltip>
          )}
          <Tooltip title={tCommon('edit', { defaultValue: 'Edit' })}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title={t('settings.toolsets.deleteConfirm', { defaultValue: 'Are you sure you want to delete this toolset?' })}
            onConfirm={() => handleDelete(record.id)}
            okText={tCommon('yes', { defaultValue: 'Yes' })}
            cancelText={tCommon('no', { defaultValue: 'No' })}
          >
            <Tooltip title={tCommon('delete', { defaultValue: 'Delete' })}>
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Search and Actions */}
      <Card style={{ marginBottom: 16 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Input.Search
              placeholder={t('settings.toolsets.searchPlaceholder', { defaultValue: 'Search toolsets...' })}
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
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
              >
                {t('settings.toolsets.create', { defaultValue: 'Create Toolset' })}
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Toolsets Table */}
      <Card>
        <Table
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
        title={editingToolSet ? t('settings.toolsets.edit', { defaultValue: 'Edit Toolset' }) : t('settings.toolsets.create', { defaultValue: 'Create Toolset' })}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingToolSet(null);
          setSelectedType('');
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
            label={t('settings.toolsets.name', { defaultValue: 'Name' })}
            rules={[{ required: true, message: t('settings.toolsets.nameRequired', { defaultValue: 'Please enter toolset name' }) }]}
          >
            <Input placeholder={t('settings.toolsets.namePlaceholder', { defaultValue: 'Enter toolset name' })} />
          </Form.Item>

          <Form.Item
            name="description"
            label={t('settings.toolsets.description', { defaultValue: 'Description' })}
          >
            <TextArea
              rows={3}
              placeholder={t('settings.toolsets.descriptionPlaceholder', { defaultValue: 'Enter toolset description' })}
            />
          </Form.Item>

          <Form.Item
            name="type"
            label={t('settings.toolsets.type', { defaultValue: 'Type' })}
            rules={[{ required: true, message: t('settings.toolsets.typeRequired', { defaultValue: 'Please select type' }) }]}
          >
            <Select
              loading={typeDefinitionsLoading}
              placeholder={t('settings.toolsets.typePlaceholder', { defaultValue: 'Select type' })}
              onChange={handleTypeChange}
              value={selectedType}
              options={typeDefinitions?.map((typeDefinition) => ({
                label: typeDefinition.name,
                value: typeDefinition.tool_set_type,
              }))}
            />
          </Form.Item>

          {/* Dynamic config fields based on selected type */}
          {currentTypeDefinition?.config_fields?.map((field) => renderConfigField(field))}

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={creating || updating}
              >
                {editingToolSet ? tCommon('update', { defaultValue: 'Update' }) : tCommon('create', { defaultValue: 'Create' })}
              </Button>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                  setEditingToolSet(null);
                  setSelectedType('');
                }}
              >
                {tCommon('cancel', { defaultValue: 'Cancel' })}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Configuration View Modal */}
      <Modal
        title={t('settings.toolsets.configuration', { defaultValue: 'Configuration' })}
        open={configModalVisible}
        onCancel={() => setConfigModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setConfigModalVisible(false)}>
            {tCommon('close', { defaultValue: 'Close' })}
          </Button>,
        ]}
        width={600}
      >
        <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 4, overflow: 'auto' }}>
          {JSON.stringify(selectedConfig, null, 2)}
        </pre>
      </Modal>
    </div>
  );
};

export default ToolSetSettings;
