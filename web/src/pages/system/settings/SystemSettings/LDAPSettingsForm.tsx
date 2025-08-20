import React, { useEffect, useState } from 'react';
import { Form, Input, Switch, Button, message, Modal, Spin, Steps, Skeleton, Descriptions, Divider, Tag, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import api from '@/service/api';
import { useRequest } from 'ahooks';
import { CheckCircleTwoTone, LoadingOutlined } from '@ant-design/icons';
import { PermissionGuard } from '@/components/PermissionGuard';
import { ColumnType } from 'antd/es/table';


interface ImportColumnType<T extends { status: string, ldap_dn: string }> extends Omit<ColumnType<T>, 'render'> {
  render?: (value: any, record: T, index: number, loading: boolean) => React.ReactNode;
}

const ImportLDAPEntryModal = <T extends { status: string, ldap_dn: string }>({ fetchItems, importItems, columns, ...props }: {
  visible: boolean,
  onCancel: () => void,
  fetchItems: () => Promise<T[]>,
  importItems: (dn: string[]) => Promise<T[]>,
  columns: ImportColumnType<T>[],
}) => {
  const { t } = useTranslation('system');
  const [items, setItems] = useState<T[]>([]);

  const [checkedList, setCheckedList] = useState<string[]>([]);


  const { run: loadItems, loading: loadItemsLoading } = useRequest(fetchItems, {
    onError: (error) => {
      message.error(t('settings.ldap.importError', { error: `${error.message}` }));
    },
    onSuccess: (data) => {
      setItems(data);
    },
    manual: true,
  });


  const { run: handleImport, loading: importLoading } = useRequest(async () => {
    for (const item of checkedList.filter((item) => {
      const importItem = items.find((u) => u.ldap_dn === item)
      if (!importItem || importItem.status === 'imported') {
        return false;
      }
      return true;
    })) {
      const data = await importItems([item]);
      setItems((prev) => {
        const newItems = [...prev];
        return newItems.map((item) => {
          for (const newItem of data) {
            if (item.ldap_dn === newItem.ldap_dn) {
              return { ...newItem, status: 'imported' };
            }
          }
          return item;
        });
      });
    }
  }, {
    manual: true,
  });

  useEffect(() => {
    if (props.visible) {
      setItems([]);
      loadItems()
      setCheckedList([]);
    }
  }, [props.visible])

  return <Modal
    title={t('settings.ldap.importTitle')}
    {...props}
    onOk={() => {
      handleImport()
    }}
    width={900}
    confirmLoading={importLoading}
    loading={loadItemsLoading}
  >
    <Table<T>
      rowKey="ldap_dn"
      rowSelection={{
        onChange: (selectedRowKeys) => {
          setCheckedList(selectedRowKeys as string[]);
        },
        getCheckboxProps: (record) => ({
          disabled: record.status === "imported",
        }),
      }}
      columns={columns.map(({ render, ...column }): ColumnType<T> => {
        if (render) {
          return {
            ...column,
            render: (value: any, record: T, index: number) => {
              const loading = checkedList.includes(record.ldap_dn) && importLoading && record.status !== "imported";
              return render(value, record, index, loading)
            }
          }
        }
        return column
      })}
      dataSource={items}
      pagination={false}
      scroll={{ y: 400, x: "max-content" }}
    />
  </Modal>
}

const LDAPSettingsForm: React.FC = () => {
  const { t } = useTranslation('system');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<API.LDAPTestResponse | null>(null);
  const [testModalVisible, setTestModalVisible] = useState(false);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [testForm] = Form.useForm();

  const [isEnabled, setIsEnabled] = useState(false);

  useRequest(api.system.getLdapSettings, {
    onSuccess: (data) => {
      form.setFieldsValue(data);
      setIsEnabled(data.enabled);
    },
    onError: (error) => {
      message.error(t('settings.ldap.loadError', { defaultValue: 'Failed to load LDAP settings: {{error}}', error: `${error.message}` }));
    }
  });


  useEffect(() => {
    setTestResult(null);
  }, [testModalVisible]);

  const handleSubmit = async (values: API.LDAPSettings) => {
    setLoading(true);
    try {
      await api.system.updateLdapSettings(values);
      message.success(t('settings.ldap.saveSuccess', { defaultValue: 'LDAP settings saved successfully.' }));
    } catch (error) {
      message.error(t('settings.ldap.saveError', { defaultValue: 'Failed to save LDAP settings.' }));
    } finally {
      setLoading(false);
    }
  };

  const { run: handleTest, loading: testLoading } = useRequest(async (values: API.LDAPTestRequest) => {
    const ldapSettings = await form.validateFields();
    return await api.system.testLdapConnection({
      ...values,
      ...ldapSettings,
    });
  }, {
    onSuccess: (data) => {
      setTestResult(data);
    },
    onError: (error) => {
      message.error(t('settings.ldap.testError', { defaultValue: 'LDAP connection test failed: {{error}}', error: `${error.message}` }));
    },
    manual: true,
  });



  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          user_attr: 'uid',
          email_attr: 'mail',
          display_name_attr: 'displayName',
          default_role: 'user',
        }}
      >
        <Form.Item
          label={t('settings.ldap.enabled', { defaultValue: 'Enable LDAP Authentication' })}
          name="enabled"
          valuePropName="checked"
        >
          <Switch onChange={(checked) => setIsEnabled(checked)} />
        </Form.Item>

        <Form.Item
          label={t('settings.ldap.serverUrl', { defaultValue: 'LDAP Server URL' })}
          name="server_url"
          rules={[{ required: isEnabled, message: t('settings.ldap.serverUrlRequired', { defaultValue: 'LDAP Server URL is required.' }) }]}
        >
          <Input disabled={!isEnabled} placeholder="ldap://ldap.example.com:389" />
        </Form.Item>


        <Form.Item
          label={t('settings.ldap.bindDn', { defaultValue: 'Bind DN' })}
          name="bind_dn"
          rules={[{ required: isEnabled, message: t('settings.ldap.bindDnRequired', { defaultValue: 'Bind DN is required.' }) }]}
        >
          <Input disabled={!isEnabled} placeholder="cn=admin,dc=example,dc=com" />
        </Form.Item>

        <Form.Item
          label={t('settings.ldap.bindPassword', { defaultValue: 'Bind Password' })}
          name="bind_password"
          rules={[{ required: isEnabled, message: t('settings.ldap.bindPasswordRequired', { defaultValue: 'Bind Password is required.' }) }]}
        >
          <Input.Password hidden autoComplete='new-password' />
        </Form.Item>

        <Form.Item
          label={t('settings.ldap.baseDn', { defaultValue: 'Base DN' })}
          name="base_dn"
          rules={[{ required: isEnabled, message: t('settings.ldap.baseDnRequired', { defaultValue: 'Base DN is required.' }) }]}
        >
          <Input disabled={!isEnabled} placeholder="dc=example,dc=com" />
        </Form.Item>

        <Form.Item
          label={t('settings.ldap.userFilter', { defaultValue: 'User Filter' })}
          name="user_filter"
        >
          <Input disabled={!isEnabled} hidden autoComplete='off' placeholder="(objectClass=person)" />
        </Form.Item>

        <Form.Item
          label={t('settings.ldap.userAttr', { defaultValue: 'User Attribute' })}
          name="user_attr"
          rules={[{ required: isEnabled, message: t('settings.ldap.userAttrRequired', { defaultValue: 'User Attribute is required.' }) }]}
        >
          <Input disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          label={t('settings.ldap.emailAttr', { defaultValue: 'Email Attribute' })}
          name="email_attr"
          rules={[{ required: isEnabled, message: t('settings.ldap.emailAttrRequired', { defaultValue: 'Email Attribute is required.' }) }]}
        >
          <Input disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          label={t('settings.ldap.displayNameAttr', { defaultValue: 'Display Name Attribute' })}
          name="display_name_attr"
          rules={[{ required: isEnabled, message: t('settings.ldap.displayNameAttrRequired', { defaultValue: 'Display Name Attribute is required.' }) }]}
        >
          <Input disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          label={t('settings.ldap.defaultRole', { defaultValue: 'Default Role' })}
          name="default_role"
          rules={[{ required: isEnabled, message: t('settings.ldap.defaultRoleRequired', { defaultValue: 'Default Role is required.' }) }]}
        >
          <Input disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          name="timeout"
          label={t('settings.ldap.timeout', { defaultValue: 'Timeout' })}
          tooltip={t('settings.ldap.timeoutTooltip', { defaultValue: 'Timeout for LDAP connection in seconds' })}
        >
          <Input type="number" defaultValue={15} disabled={!isEnabled} />
        </Form.Item>

        <Divider>{t('settings.ldap.tlsDivider', { defaultValue: 'TLS Configuration' })}</Divider>

        <Form.Item
          label={t('settings.ldap.startTls', { defaultValue: 'Use StartTLS' })}
          name="start_tls"
          valuePropName="checked"
        >
          <Switch disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          label={t('settings.ldap.insecure', { defaultValue: 'Skip TLS Verification (Insecure)' })}
          name="insecure"
          valuePropName="checked"
        >
          <Switch disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          label={t('settings.ldap.caCert', { defaultValue: 'CA Certificate' })}
          name="ca_cert"
        >
          <Input.TextArea placeholder={t('settings.ldap.caCertPlaceholder', { defaultValue: '-----BEGIN CERTIFICATE-----\n...' })} disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          label={t('settings.ldap.clientCert', { defaultValue: 'Client Certificate' })}
          name="client_cert"
        >
          <Input.TextArea placeholder={t('settings.ldap.clientCertPlaceholder', { defaultValue: '-----BEGIN CERTIFICATE-----\n...' })} disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          label={t('settings.ldap.clientKey', { defaultValue: 'Client Key' })}
          name="client_key"
        >
          <Input.TextArea placeholder={t('settings.ldap.clientKeyPlaceholder', { defaultValue: '-----BEGIN PRIVATE KEY-----\n...' })} disabled={!isEnabled} />
        </Form.Item>
        <Form.Item>
          <PermissionGuard permissions={['system:settings:update']}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t('settings.ldap.save', { defaultValue: 'Save Settings' })}
            </Button>
          </PermissionGuard>
          <PermissionGuard permissions={['system:settings:update']}>
            <Button
              disabled={!isEnabled}
              style={{ marginLeft: 8 }}
              onClick={() => setTestModalVisible(true)}
            >
              {t('settings.ldap.testConnection', { defaultValue: 'Test Connection' })}
            </Button>
          </PermissionGuard>
          <PermissionGuard permissions={['authorization:user:create']}>
            <Button
              disabled={!isEnabled}
              style={{ marginLeft: 8 }}
              onClick={() => {
                setImportModalVisible(true)
              }}
            >
              {t('settings.ldap.import', { defaultValue: 'Import Users' })}
            </Button>
          </PermissionGuard>
        </Form.Item>
      </Form >

      <Modal
        title={t('settings.ldap.test.title', { defaultValue: 'Test LDAP Connection' })}
        open={testModalVisible}
        onCancel={() => setTestModalVisible(false)}
        footer={null}
      >
        <Form
          form={testForm}
          layout="vertical"
          onFinish={handleTest}
        >
          <Form.Item
            label={t('settings.ldap.test.username', { defaultValue: 'LDAP Username' })}
            name="username"
            rules={[{ required: true, message: t('settings.ldap.test.usernameRequired', { defaultValue: 'Please enter LDAP username for testing.' }) }]}
          >
            <Input disabled={!isEnabled} />
          </Form.Item>

          <Form.Item
            label={t('settings.ldap.test.password', { defaultValue: 'LDAP Password' })}
            name="password"
            rules={[{ required: true, message: t('settings.ldap.test.passwordRequired', { defaultValue: 'Please enter LDAP password for testing.' }) }]}
          >
            <Input.Password disabled={!isEnabled} />
          </Form.Item>

          <Form.Item>
            <PermissionGuard permissions={['system:settings:update']}>
              <Button disabled={!isEnabled} type="primary" htmlType="submit">
                {t('settings.ldap.test.test', { defaultValue: 'Test' })}
              </Button>
            </PermissionGuard>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => setTestModalVisible(false)}
            >
              {t('settings.ldap.test.cancel', { defaultValue: 'Cancel' })}
            </Button>
          </Form.Item>
        </Form>
        <Spin spinning={testLoading}>
          <Skeleton active={testLoading} loading={testLoading}>
            {testResult && (testResult.user ? <Descriptions bordered>
              <Descriptions.Item label="Username" span={3}>{testResult.user.username}</Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>{testResult.user.email}</Descriptions.Item>
              <Descriptions.Item label="FullName" span={3}>{testResult.user.full_name}</Descriptions.Item>
              <Descriptions.Item label="CreatedAt" span={3}>{testResult.user.created_at}</Descriptions.Item>
              <Descriptions.Item label="UpdatedAt" span={3}>{testResult.user.updated_at}</Descriptions.Item>
            </Descriptions> : <Steps
              direction="vertical"
              current={testResult.message?.findIndex((msg) => !msg.success)}
              status={testResult.message?.find((msg) => !msg.success) ? 'error' : 'finish'}
              items={testResult.message?.map((msg) => ({
                status: msg.success ? 'finish' : 'error',
                title: msg.message,
              }))} />)
            }
          </Skeleton>
        </Spin>
      </Modal>
      <ImportLDAPEntryModal<API.User>
        visible={importModalVisible}
        onCancel={() => setImportModalVisible(false)}
        fetchItems={() => api.system.importLdapUsers({})}
        importItems={(dn: string[]) => api.system.importLdapUsers({ user_dn: dn })}
        columns={[{
          title: t('settings.ldap.username', { defaultValue: 'Username' }),
          dataIndex: 'username',
        }, {
          title: t('settings.ldap.email', { defaultValue: 'Email' }),
          dataIndex: 'email',
        }, {
          title: t('settings.ldap.fullName', { defaultValue: 'Full Name' }),
          dataIndex: 'full_name',
        }, {
          title: t('settings.ldap.importStatus', { defaultValue: 'Import Status' }),
          dataIndex: 'imported',
          fixed: 'right',
          render: (imported, record, _, loading) => {
            if (loading) {
              return <Spin indicator={<LoadingOutlined spin />} />
            }
            if (imported) {
              return <CheckCircleTwoTone twoToneColor="#52c41a" />
            }
            if (record.id) {
              return <Tag color="blue">{t('settings.ldap.importTypeBound', { defaultValue: 'Bound' })}</Tag>
            }
            return <Tag color="green">{t('settings.ldap.importTypeNew', { defaultValue: 'New' })}</Tag>
          }
        }]}
      />
    </>
  );
};

export default LDAPSettingsForm; 