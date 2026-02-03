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
import { Modal, Space, Button, Input, Form, message, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import api from '@/service/api';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSite } from "@/contexts/SiteContext";
import usePermission from "@/hooks/usePermission";

interface ServiceAccountFormProps {
  serviceAccountID?: string | null;
  onClose: () => void;
  open?: boolean;
  onSuccess?: () => void;
  enableMultiOrg?: boolean;
  organizations?: API.Organization[];
}

const ServiceAccountForm = ({
  serviceAccountID,
  onClose,
  open = false,
  onSuccess,
  enableMultiOrg = false,
  organizations = [],
}: ServiceAccountFormProps) => {
  const { hasGlobalPermission } = usePermission();
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const { currentOrgId } = useSite();
  const [form] = Form.useForm();
  const [loadingServiceAccount, setLoadingServiceAccount] = useState(false);
  const [scopeType, setScopeType] = useState<'global' | 'organization'>('global');
  const [selectedOrgId, setSelectedOrgId] = useState<string | undefined>(undefined);
  const [loadedOrgName, setLoadedOrgName] = useState<string | null>(null);

  const { run: saveServiceAccount, loading } = useRequest((values: any) => {
    if (serviceAccountID) {
      const { organization_id: _omit, ...updatePayload } = values;
      return api.authorization.updateServiceAccount({ id: serviceAccountID }, updatePayload);
    }
    const createPayload: API.CreateServiceAccountRequest = {
      name: values.name,
      description: values.description,
    };
    if (scopeType === 'organization' && selectedOrgId) {
      createPayload.organization_id = selectedOrgId;
    }
    return api.authorization.createServiceAccount(createPayload);
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
        const orgId = res.organization_id || '';
        setScopeType(orgId ? 'organization' : 'global');
        setSelectedOrgId(orgId || undefined);
        setLoadedOrgName(orgId ? (res.organization?.name ?? orgId) : null);
        form.setFieldsValue({
          name: res.name,
          description: res.description,
          organization_id: orgId || undefined,
        });
      } catch (error) {
        message.error(t('serviceAccount.loadError', { defaultValue: 'Failed to load service account.' }));
      } finally {
        setLoadingServiceAccount(false);
      }
    }
    if (open) {
      form.resetFields();
      const defaultOrgId = currentOrgId || (organizations.length > 0 ? organizations[0].id : '');
      const defaultScope = enableMultiOrg && defaultOrgId ? 'organization' : 'global';
      setScopeType(defaultScope);
      setSelectedOrgId(defaultScope === 'organization' ? defaultOrgId : undefined);
      if (serviceAccountID) {
        loadServiceAccount(serviceAccountID);
      } else {
        setLoadedOrgName(null);
        form.setFieldsValue({
          organization_id: defaultScope === 'organization' ? defaultOrgId : undefined,
        });
      }
    }
  }, [serviceAccountID, open, enableMultiOrg, organizations, currentOrgId]);

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
      {enableMultiOrg && !serviceAccountID && (
        <>
          <Form.Item label={t('serviceAccount.scope', { defaultValue: 'Scope' })}>
            <Radio.Group
              value={scopeType}
              onChange={(e) => {
                const v = e.target.value as 'global' | 'organization';
                setScopeType(v);
                const orgId = v === 'organization' ? (currentOrgId || organizations[0]?.id) : undefined;
                setSelectedOrgId(orgId);
                form.setFieldsValue({ organization_id: orgId });
              }}
              disabled={!hasGlobalPermission('authorization:service_account:create')}
            >
              <Radio value="global">{t('serviceAccount.global', { defaultValue: 'Global' })}</Radio>
              <Radio value="organization">{t('serviceAccount.organizationScoped', { defaultValue: 'Organization' })}</Radio>
            </Radio.Group>
          </Form.Item>
          {scopeType === 'organization' && (
            <Form.Item
              name="organization_id"
              label={t('serviceAccount.organization', { defaultValue: 'Organization' })}
              rules={[{ required: true, message: t('serviceAccount.organizationRequired', { defaultValue: 'Please select an organization.' }) }]}
            >
              <Select
                placeholder={t('serviceAccount.selectOrganization', { defaultValue: 'Select organization' })}
                options={organizations.map((org) => ({ value: org.id, label: org.name }))}
                value={selectedOrgId}
                onChange={(v) => setSelectedOrgId(v)}
              />
            </Form.Item>
          )}
        </>
      )}
      {enableMultiOrg && serviceAccountID && (
        <Form.Item label={t('serviceAccount.organization', { defaultValue: 'Organization' })}>
          <span>{loadedOrgName ?? t('serviceAccount.global', { defaultValue: 'Global' })}</span>
        </Form.Item>
      )}
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
