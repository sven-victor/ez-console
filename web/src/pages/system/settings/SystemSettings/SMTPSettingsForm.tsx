import React, { useEffect, useState } from 'react';
import { Form, Input, Switch, Button, message, Modal, Spin, Radio, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { getSMTPSettings, updateSMTPSettings, testSMTPConnection } from '@/api/system';
import { useRequest } from 'ahooks';
import { PermissionGuard } from '@/components/PermissionGuard';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SMTPSettingsForm: React.FC = () => {
  const { t } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm<API.SMTPSettings>();
  const [testResult, setTestResult] = useState<API.SMTPTestResponse | null>(null);
  const [testModalVisible, setTestModalVisible] = useState(false);
  const [testForm] = Form.useForm();
  const [isEnabled, setIsEnabled] = useState(false);
  const { loading: loadingSettings } = useRequest(getSMTPSettings, {
    onSuccess: (data: API.SMTPSettings) => {
      form.setFieldsValue(data);
      setIsEnabled(data.enabled);
    },
    onError: (error) => {
      message.error(t('settings.smtp.loadError', { defaultValue: 'Failed to load SMTP settings: {{error}}', error: `${error.message}` }));
    }
  });

  useEffect(() => {
    setTestResult(null);
  }, [testModalVisible]);

  const { run: handleSubmit, loading: submitLoading } = useRequest(({ port, ...values }) => updateSMTPSettings({ ...values, port: Number(port) }), {
    manual: true,
    onSuccess: () => {
      message.success(t('settings.smtp.saveSuccess', { defaultValue: 'SMTP settings saved successfully.' }));
    },
    onError: (error: any) => {
      message.error(t('settings.smtp.saveError', { defaultValue: 'Failed to save SMTP settings: {{error}}', error: `${error.message}` }));
    },
  });

  const { run: handleTest, loading: testLoading } = useRequest(async (values: API.SMTPTestRequest) => {
    const { port, ...smtpSettings } = await form.validateFields();
    return await testSMTPConnection({
      ...values,
      ...smtpSettings,
      port: Number(port),
    });
  }, {
    onSuccess: (data: API.SMTPTestResponse) => {
      setTestResult(data);
    },
    onError: (error: any) => {
      message.error(t('settings.smtp.testError', { defaultValue: 'SMTP connection test failed: {{error}}', error: `${error.message}` }));
    },
    manual: true,
  });


  return (
    <>
      <Spin spinning={loadingSettings}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            port: 587,
            encryption: 'STARTTLS',
          }}
        >
          <Form.Item
            label={t('settings.smtp.enabled', { defaultValue: 'Enable SMTP' })}
            name="enabled"
            valuePropName="checked"
          >
            <Switch onChange={(checked) => setIsEnabled(checked)} />
          </Form.Item>

          <Form.Item
            label={t('settings.smtp.host', { defaultValue: 'SMTP Host' })}
            name="host"
            rules={[{ required: isEnabled, message: t('settings.smtp.hostRequired', { defaultValue: 'SMTP Host is required.' }) }]}
          >
            <Input disabled={!isEnabled} placeholder="smtp.example.com" />
          </Form.Item>

          <Form.Item
            label={t('settings.smtp.port', { defaultValue: 'SMTP Port' })}
            name="port"
            rules={[{ required: isEnabled, message: t('settings.smtp.portRequired', { defaultValue: 'SMTP Port is required.' }) }]}
          >
            <Input type="number" disabled={!isEnabled} placeholder="587" />
          </Form.Item>

          <Form.Item
            label={t('settings.smtp.username', { defaultValue: 'Username' })}
            name="username"
            rules={[{ required: isEnabled, message: t('settings.smtp.usernameRequired', { defaultValue: 'Username is required.' }) }]}
          >
            <Input disabled={!isEnabled} placeholder="user@example.com" />
          </Form.Item>

          <Form.Item
            label={t('settings.smtp.password', { defaultValue: 'Password' })}
            name="password"
          >
            <Input.Password disabled={!isEnabled} autoComplete="new-password" />
          </Form.Item>

          <Form.Item
            label={t('settings.smtp.encryption', { defaultValue: 'Encryption' })}
            name="encryption"
            rules={[{ required: isEnabled, message: t('settings.smtp.encryptionRequired', { defaultValue: 'Encryption is required.' }) }]}
          >
            <Radio.Group disabled={!isEnabled}>
              <Radio.Button value="None">{t('settings.smtp.encryptionNone', { defaultValue: 'None' })}</Radio.Button>
              <Radio.Button value="SSL/TLS">{t('settings.smtp.encryptionSslTls', { defaultValue: 'SSL/TLS' })}</Radio.Button>
              <Radio.Button value="STARTTLS">{t('settings.smtp.encryptionStartTls', { defaultValue: 'STARTTLS' })}</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label={t('settings.smtp.fromAddress', { defaultValue: 'From Address' })}
            name="from_address"
            rules={[
              { required: isEnabled, message: t('settings.smtp.fromAddressRequired', { defaultValue: 'From Address is required.' }) },
              { type: 'email', message: t('settings.smtp.fromAddressInvalid', { defaultValue: 'Invalid email address.' }) }
            ]}
          >
            <Input disabled={!isEnabled} placeholder="noreply@example.com" />
          </Form.Item>

          <Form.Item
            label={t('settings.smtp.fromName', { defaultValue: 'From Name' })}
            name="from_name"
          >
            <Input disabled={!isEnabled} placeholder={t('settings.smtp.fromNamePlaceholder', { defaultValue: 'System Notifications' })} />
          </Form.Item>

          <Divider>{t('settings.smtp.templateDivider', { defaultValue: 'Template Configuration' })}</Divider>

          <Form.Item
            label={t('settings.smtp.resetPasswordTemplate', { defaultValue: 'Reset Password Template' })}
            name="reset_password_template"
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item
            label={t('settings.smtp.userLockedTemplate', { defaultValue: 'User Locked Template' })}
            name="user_locked_template"
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item
            label={t('settings.smtp.mfaCodeTemplate', { defaultValue: 'MFA Code Template' })}
            name="mfa_code_template"
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item>
            <PermissionGuard permission="system:setting:update">
              <Button type="primary" htmlType="submit" loading={submitLoading} style={{ marginRight: 8 }}>
                {tCommon('save', { defaultValue: 'Save' })}
              </Button>
            </PermissionGuard>
            <Button
              onClick={() => setTestModalVisible(true)}
              disabled={!isEnabled || testLoading}
              loading={testLoading}
            >
              {t('settings.smtp.testConnection', { defaultValue: 'Test Connection' })}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
      <Modal
        title={t('settings.smtp.testConnectionTitle', { defaultValue: 'Test SMTP Connection' })}
        open={testModalVisible}
        onCancel={() => setTestModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setTestModalVisible(false)}>
            {tCommon('cancel', { defaultValue: 'Cancel' })}
          </Button>,
          <Button key="submit" type="primary" loading={testLoading} onClick={() => testForm.submit()}>
            {t('settings.smtp.sendTestEmail', { defaultValue: 'Send Test Email' })}
          </Button>,
        ]}
      >
        <Form
          form={testForm}
          layout="vertical"
          onFinish={(values) => handleTest(values as API.SMTPTestRequest)}
        >
          <Form.Item
            label={t('settings.smtp.testEmailRecipient', { defaultValue: 'Recipient Email Address' })}
            name="to"
            rules={[
              { required: true, message: t('settings.smtp.testEmailRecipientRequired', { defaultValue: 'Recipient email address is required.' }) },
              { type: 'email', message: t('settings.smtp.testEmailRecipientInvalid', { defaultValue: 'Invalid email address.' }) }
            ]}
          >
            <Input placeholder="test@example.com" />
          </Form.Item>
          {testResult && (
            <Form.Item label={t('settings.smtp.testResult', { defaultValue: 'Test Result' })}>
              {testResult.success ? (
                <span style={{ color: 'green' }}>{t('settings.smtp.testSuccess', { defaultValue: 'Connection successful!' })}</span>
              ) : (
                <span style={{ color: 'red' }}>{t('settings.smtp.testFailed', { defaultValue: 'Connection failed: {{error}}', error: testResult.message })}</span>
              )}
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default SMTPSettingsForm; 