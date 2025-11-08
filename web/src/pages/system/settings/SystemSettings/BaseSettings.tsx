import React from 'react';
import { Form, Button, message, Space, Spin, Input, Tabs, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import api from '@/service/api';
import { AllLangUIConfig } from '@/components/LanguageSwitch';


const BaseSettingsForm: React.FC = () => {
  const { t, i18n } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm();

  // Get system settings data
  const { loading, data, refresh } = useRequest(api.system.getSystemBaseSettings, {
    onSuccess: (data) => {
      form.setFieldsValue(data);
    },
    onError: (error) => {
      message.error(t('settings.fetchFailed', { defaultValue: 'Failed to fetch settings' }));
      console.error('Failed to get system settings', error);
    }
  });

  // Handle form submission
  const { loading: submitting, run: submitUpdate } = useRequest(api.system.updateSystemBaseSettings, {
    manual: true,
    onSuccess: () => {
      message.success(t('settings.updateSuccess', { defaultValue: 'Settings updated successfully' }));
      refresh(); // Refresh data
    },
    onError: (error) => {
      message.error(t('settings.updateFailed', { defaultValue: 'Failed to update settings' }));
      console.error('Failed to update system settings', error);
    }
  });

  const handleSubmit = (values: API.SystemSettings) => {
    submitUpdate(values);
  };

  return <Spin spinning={loading}>
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={data}
    >
      <Form.Item label={t('settings.base.name', { defaultValue: 'Name' })}>
        <Tabs items={[{
          key: "default",
          label: tCommon(`language.default`, { defaultValue: 'Default' }),
          forceRender: true,
          children: <>
            <Form.Item name={`name`}>
              <Input />
            </Form.Item>
          </>
        }, ...AllLangUIConfig.map(item => ({
          key: item.lang,
          label: i18n.language !== item.lang ? tCommon(`language.${item.lang}`, { defaultValue: item.label, lang: item.label }) : item.label,
          forceRender: true,
          children: <>
            <Form.Item name={[`name_i18n`, item.lang]}>
              <Input />
            </Form.Item>
          </>
        }))]} />
      </Form.Item>
      <Form.Item label={t('settings.base.logo', { defaultValue: 'Logo' })} name="logo">
        <Input />
      </Form.Item>
      <Form.Item label={t('settings.base.homePage', { defaultValue: 'Home Page' })} name="home_page">
        <Input />
      </Form.Item>
      <Form.Item
        label={t('settings.base.disableLocalUserLogin', { defaultValue: 'Disable Local User Login' })}
        name="disable_local_user_login"
        tooltip={t('settings.base.disableLocalUserLoginTooltip', { defaultValue: 'Disable local user login, It is only valid when other authentication methods are enabled.' })}
      >
        <Switch />
      </Form.Item>
      <Form.Item
        label={t('settings.base.enableMultiOrg', { defaultValue: 'Enable Multi-Organization' })}
        name="enable_multi_org"
        tooltip={t('settings.base.enableMultiOrgTooltip', { defaultValue: 'Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab.' })}
      >
        <Switch />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            icon={<SaveOutlined />}
          >
            {tCommon('save', { defaultValue: 'Save' })}
          </Button>
          <Button
            onClick={() => refresh()}
            icon={<ReloadOutlined />}
          >
            {tCommon('refresh', { defaultValue: 'Refresh' })}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </Spin>
};

export default BaseSettingsForm; 