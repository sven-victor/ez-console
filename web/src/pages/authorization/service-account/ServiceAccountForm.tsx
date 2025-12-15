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

import { useRequest } from "ahooks";
import { Modal, Space, Button, Input, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import api from '@/service/api';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

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
  const [loadingServiceAccount, setLoadingServiceAccount] = useState(false);

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
    const loadServiceAccount = async (id: string) => {
      setLoadingServiceAccount(true);
      try {
        const res = await api.authorization.getServiceAccountById({ id });
        form.setFieldsValue({
          name: res.name,
          description: res.description,
        });
      } catch (error) {
        message.error(t('serviceAccount.loadError', { defaultValue: 'Failed to load service account.' }));
      } finally {
        setLoadingServiceAccount(false);
      }
    }
    if (open) {
      form.resetFields();
      if (serviceAccountID) {
        loadServiceAccount(serviceAccountID);
      }
    }
  }, [serviceAccountID, open]);

  return <Modal
    title={serviceAccountID ? t('serviceAccount.edit', { defaultValue: 'Edit Service Account' }) : t('serviceAccount.create', { defaultValue: 'Create Service Account' })}
    width={500}
    onClose={() => {
      form.resetFields();
      onClose()
    }}
    onCancel={() => {
      form.resetFields();
      onClose()
    }}
    open={open}
    footer={
      <Space>
        <Button onClick={onClose}>{tCommon('cancel', { defaultValue: 'Cancel' })}</Button>
        <Button
          type="primary"
          onClick={form.submit}
          loading={loading || loadingServiceAccount}
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
