import { useRequest } from "ahooks";
import { Modal, Space, Button, Input, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import api from '@/service/api';
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface ServiceAccountFormProps {
  serviceAccountID?: string | null;
  onClose: () => void;
  open?: boolean;
  onSuccess?: () => void;
}

const ServiceAccountForm = ({
  serviceAccountID,
  onClose,
  open = false,
  onSuccess,
}: ServiceAccountFormProps) => {
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm();

  const { run: saveServiceAccount, loading } = useRequest((values: any) => {
    if (serviceAccountID) {
      return api.authorization.updateServiceAccount({ id: serviceAccountID }, values);
    }
    return api.authorization.createServiceAccount(values);
  }, {
    onSuccess: () => {
      message.success(t('serviceAccount.saveSuccess', { defaultValue: 'Service account saved successfully.' }));
      onClose();
      onSuccess?.();
    },
    onError: () => {
      message.error(t('serviceAccount.saveError', { defaultValue: 'Failed to save service account.' }));
    },
    manual: true,
  })

  useEffect(() => {
    if (open && serviceAccountID) {
      api.authorization.getServiceAccountById({ id: serviceAccountID }).then((res) => {
        form.setFieldsValue({
          name: res.name,
          description: res.description,
        });
      });
    } else {
      form.resetFields();
    }
  }, [serviceAccountID, open]);

  return <Modal
    title={serviceAccountID ? t('serviceAccount.edit', { defaultValue: 'Edit Service Account' }) : t('serviceAccount.create', { defaultValue: 'Create Service Account' })}
    width={500}
    onClose={onClose}
    open={open}
    footer={
      <Space>
        <Button onClick={onClose}>{tCommon('cancel', { defaultValue: 'Cancel' })}</Button>
        <Button
          type="primary"
          onClick={form.submit}
          loading={loading}
        >
          {tCommon('save', { defaultValue: 'Save' })}
        </Button>
      </Space>
    }
  >
    <Form
      form={form}
      layout="vertical"
      onFinish={saveServiceAccount}
    >
      <Form.Item
        label={t('serviceAccount.name', { defaultValue: 'Name' })}
        name="name"
        rules={[{ required: true, message: t('serviceAccount.nameRequired', { defaultValue: 'Please enter a name for the service account.' }) }]}
      >
        <Input placeholder={t('serviceAccount.namePlaceholder', { defaultValue: 'Enter service account name' })} />
      </Form.Item>

      <Form.Item
        label={t('serviceAccount.description', { defaultValue: 'Description' })}
        name="description"
      >
        <TextArea rows={4} placeholder={t('serviceAccount.descriptionPlaceholder', { defaultValue: 'Enter service account description (optional)' })} />
      </Form.Item>
    </Form>
  </Modal>
};

export default ServiceAccountForm;
