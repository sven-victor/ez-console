import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Table,
  Space,
  message,
  Modal,
  Form,
  Input,
  Typography,
  DatePicker,
  Popconfirm,
  Alert,
  Tooltip,
  Badge,
  Switch,
} from 'antd';
import {
  PlusOutlined,
  SyncOutlined,
  KeyOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { getServiceAccountAccessKeys, createServiceAccountAccessKey, updateServiceAccountAccessKey, deleteServiceAccountAccessKey } from '@/api/authorization';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@/utils';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';

interface ServiceAccessKeysProps {
  serviceAccountID: string;
}

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

const ServiceAccountAccessKeys: React.FC<ServiceAccessKeysProps> = ({ serviceAccountID: serviceAccountId }) => {
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const [accessKeys, setAccessKeys] = useState<API.ServiceAccountAccessKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<API.ServiceAccountAccessKey | null>(null);
  const [newKey, setNewKey] = useState<API.ServiceAccountAccessKey | null>(null);
  const [showSecretModal, setShowSecretModal] = useState(false);

  // Load access key list
  const fetchAccessKeys = async () => {
    if (!serviceAccountId) return;

    setLoading(true);
    try {
      const result = await getServiceAccountAccessKeys(serviceAccountId);
      setAccessKeys(result);
    } catch (error) {
      console.error('Failed to load access keys:', error);
      message.error(t('serviceAccount.loadKeysError', { defaultValue: 'Failed to load access keys.' }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessKeys();
  }, [serviceAccountId]);

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        message.success(t('serviceAccount.copyKeySuccess', { defaultValue: 'Copied to clipboard!' }));
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  // Open create key modal window
  const showCreateModal = () => {
    setEditingKey(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Open edit key modal window
  const showEditModal = (record: API.ServiceAccountAccessKey) => {
    setEditingKey(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      status: record.status === 'active',
      expires_at: record.expires_at ? dayjs(record.expires_at) : undefined,
    });
    setModalVisible(true);
  };

  // Close modal window
  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const { run: runUpdateAccessKey, loading: updateLoading } = useRequest(
    async () => {
      const values = await form.validateFields();
      if (editingKey) {
        const result = await updateServiceAccountAccessKey(serviceAccountId, editingKey.id, {
          name: values.name,
          description: values.description,
          status: values.status ? 'active' : 'disabled',
          expires_at: values.expires_at ? values.expires_at.toISOString() : undefined,
        });
        setModalVisible(false);
        return result;
      } else {
        // Create key
        const result = await createServiceAccountAccessKey(serviceAccountId, {
          name: values.name,
          description: values.description,
          expires_at: values.expires_at ? values.expires_at.toISOString() : undefined,
        });
        setNewKey(result);
        setModalVisible(false);
        setShowSecretModal(true);
      }

    }, {
    manual: true,
    onSuccess: () => {
      message.success(t('serviceAccount.updateKeySuccess', { defaultValue: 'Access key updated successfully.' }));
      fetchAccessKeys();
    },
    onError: () => {
      message.error(t('serviceAccount.updateKeyError', { defaultValue: 'Failed to update access key.' }));
    },
  });

  // Delete key
  const handleDelete = async (keyId: string) => {
    try {
      await deleteServiceAccountAccessKey(serviceAccountId, keyId);
      message.success(t('serviceAccount.deleteKeySuccess', { defaultValue: 'Access key deleted successfully.' }));
      fetchAccessKeys();
    } catch (error) {
      console.error('Failed to delete key:', error);
      message.error(t('serviceAccount.deleteKeyError', { defaultValue: 'Failed to delete access key.' }));
    }
  };

  // Close Secret display dialog
  const handleSecretModalClose = () => {
    setShowSecretModal(false);
    setNewKey(null);
  };

  const columns = [
    {
      title: t('serviceAccount.keyName', { defaultValue: 'Name' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('serviceAccount.accessKey', { defaultValue: 'Access Key ID' }),
      dataIndex: 'access_key_id',
      key: 'access_key_id',
      render: (text: string) => (
        <Space>
          <KeyOutlined />
          <Text copyable>{text}</Text>
        </Space>
      ),
    },
    {
      title: t('serviceAccount.keyDescription', { defaultValue: 'Description' }),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('serviceAccount.keyStatus', { defaultValue: 'Status' }),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        status === 'active' ? (
          <Badge status="success" text={t('serviceAccount.keyActive', { defaultValue: 'Active' })} />
        ) : (
          <Badge status="error" text={t('serviceAccount.keyDisabled', { defaultValue: 'Disabled' })} />
        )
      ),
    },
    {
      title: t('serviceAccount.keyExpires', { defaultValue: 'Expires At' }),
      dataIndex: 'expires_at',
      key: 'expires_at',
      render: (date: string) => (
        date ? formatDate(date) : <Text type="secondary">{t('serviceAccount.neverExpires', { defaultValue: 'Never' })}</Text>
      ),
    },
    {
      title: t('serviceAccount.keyLastUsed', { defaultValue: 'Last Used' }),
      dataIndex: 'last_used',
      key: 'last_used',
      render: (date: string) => (
        date ? formatDate(date) : <Text type="secondary">{t('serviceAccount.keyNeverUsed', { defaultValue: 'Never' })}</Text>
      ),
    },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'action',
      render: (_: any, record: API.ServiceAccountAccessKey) => (
        <Space size="small">
          <Tooltip title={t('serviceAccount.updateKey', { defaultValue: 'Update Key' })}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => showEditModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title={t('serviceAccount.deleteKeyConfirm', { defaultValue: 'Are you sure you want to delete this access key?' })}
            onConfirm={() => handleDelete(record.id)}
            okText={tCommon('confirm', { defaultValue: 'Confirm' })}
            cancelText={tCommon('cancel', { defaultValue: 'Cancel' })}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title={
          <Space>
            <KeyOutlined />
            {t('serviceAccount.accessKeys', { defaultValue: 'Access Keys' })}
          </Space>
        }
        extra={
          <Space>
            <Button
              icon={<SyncOutlined />}
              onClick={fetchAccessKeys}
              loading={loading}
            >
              {tCommon('refresh', { defaultValue: 'Refresh' })}
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showCreateModal}
            >
              {t('serviceAccount.createAccessKey', { defaultValue: 'Create Access Key' })}
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={accessKeys}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </Card>

      {/* Create/Edit Key Modal Window */}
      <Modal
        title={editingKey ? t('serviceAccount.updateKey', { defaultValue: 'Update Access Key' }) : t('serviceAccount.createAccessKey', { defaultValue: 'Create Access Key' })}
        open={modalVisible}
        onOk={runUpdateAccessKey}
        confirmLoading={updateLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label={t('serviceAccount.keyName', { defaultValue: 'Key Name' })}
            rules={[{ required: true, message: t('serviceAccount.keyNameRequired', { defaultValue: 'Please enter a name for the access key.' }) }]}
          >
            <Input placeholder={t('serviceAccount.keyNamePlaceholder', { defaultValue: 'Enter key name' })} />
          </Form.Item>
          <Form.Item
            name="description"
            label={t('serviceAccount.keyDescription', { defaultValue: 'Description' })}
          >
            <TextArea
              rows={3}
              placeholder={t('serviceAccount.keyDescriptionPlaceholder', { defaultValue: 'Enter key description (optional)' })}
            />
          </Form.Item>

          {editingKey && (
            <Form.Item
              name="status"
              label={t('serviceAccount.keyStatus', { defaultValue: 'Status' })}
              valuePropName="checked"
            >
              <Switch
                checkedChildren={t('serviceAccount.keyActive', { defaultValue: 'Active' })}
                unCheckedChildren={t('serviceAccount.keyDisabled', { defaultValue: 'Disabled' })}
              />
            </Form.Item>
          )}

          <Form.Item
            name="expires_at"
            label={t('serviceAccount.keyExpires', { defaultValue: 'Expires At' })}
          >
            <DatePicker
              showTime
              placeholder={t('serviceAccount.selectExpireDate', { defaultValue: 'Select expiry date (optional)' })}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Display Secret of Newly Created Key */}
      <Modal
        title={
          <Space>
            <ExclamationCircleOutlined style={{ color: '#faad14' }} />
            {t('serviceAccount.secretNoticeTitle', { defaultValue: 'Access Key Created - Important!' })}
          </Space>
        }
        open={showSecretModal}
        footer={[
          <Button key="close" onClick={handleSecretModalClose}>
            {tCommon('confirm', { defaultValue: 'I have copied the secret key. Close' })}
          </Button>
        ]}
        closable={false}
      >
        <Alert
          message={t('serviceAccount.secretNoticeMessage', { defaultValue: 'Your new Secret Access Key is displayed below. This is the only time you will be able to see this secret. Please copy it and store it securely.' })}
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />

        {newKey && (
          <>
            <div style={{ marginBottom: 16 }}>
              <Text strong>{t('serviceAccount.accessKey', { defaultValue: 'Access Key ID' })}:</Text>
              <Paragraph copyable={{ text: newKey.access_key_id }}>
                {newKey.access_key_id}
              </Paragraph>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong>{t('serviceAccount.secretKey', { defaultValue: 'Secret Access Key' })}:</Text>
              <Paragraph copyable={{ text: newKey.secret_access_key || '' }}>
                {newKey.secret_access_key}
              </Paragraph>
            </div>

            <Button
              type="primary"
              icon={<CopyOutlined />}
              onClick={() => {
                // Copy access_key and secret as formatted text
                const textToCopy = `Access Key: ${newKey.access_key_id}\nSecret Key: ${newKey.secret_access_key}`;
                copyToClipboard(textToCopy);
              }}
              block
            >
              {t('serviceAccount.copyToClipboard', { defaultValue: 'Copy Keys to Clipboard' })}
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default ServiceAccountAccessKeys; 