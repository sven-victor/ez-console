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

import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import * as systemApi from '@/service/api/system';
import Actions from '@/components/Actions';
import { Select } from 'antd';
import { PermissionGuard } from '@/components/PermissionGuard';

const { TextArea } = Input;



interface OrganizationFormData {
  name: string;
  description?: string;
  status: 'active' | 'disabled';
}

const OrganizationSettings: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrg, setEditingOrg] = useState<API.Organization | null>(null);
  const [searchText, setSearchText] = useState('');
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch organizations
  const { loading, data, refresh } = useRequest(
    () => systemApi.listOrganizations({ current, page_size: pageSize, search: searchText }),
    {
      refreshDeps: [current, pageSize, searchText],
      onError: (error) => {
        message.error(t('settings.organizations.fetchFailed', { defaultValue: 'Failed to fetch organizations' }));
        console.error('Failed to fetch organizations:', error);
      },
    }
  );

  // Create organization
  const { loading: creating, run: createOrg } = useRequest(
    (data: OrganizationFormData) => systemApi.createOrganization(data),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.organizations.createSuccess', { defaultValue: 'Organization created successfully' }));
        setIsModalVisible(false);
        form.resetFields();
        setEditingOrg(null);
        refresh();
      },
      onError: (error: any) => {
        message.error(error?.err || t('settings.organizations.createFailed', { defaultValue: 'Failed to create organization' }));
      },
    }
  );

  // Update organization
  const { loading: updating, run: updateOrg } = useRequest(
    ({ id, ...data }: OrganizationFormData & { id: string }) => systemApi.updateOrganization({ id }, data),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.organizations.updateSuccess', { defaultValue: 'Organization updated successfully' }));
        setIsModalVisible(false);
        form.resetFields();
        setEditingOrg(null);
        refresh();
      },
      onError: (error: any) => {
        message.error(error?.err || t('settings.organizations.updateFailed', { defaultValue: 'Failed to update organization' }));
      },
    }
  );

  // Delete organization
  const { run: deleteOrg } = useRequest(
    (id: string) => systemApi.deleteOrganization({ id }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.organizations.deleteSuccess', { defaultValue: 'Organization deleted successfully' }));
        refresh();
      },
      onError: (error: any) => {
        message.error(error?.err || t('settings.organizations.deleteFailed', { defaultValue: 'Failed to delete organization' }));
      },
    }
  );

  const handleCreate = () => {
    setEditingOrg(null);
    form.resetFields();
    form.setFieldsValue({ status: 'active' });
    setIsModalVisible(true);
  };

  const handleEdit = (org: API.Organization) => {
    setEditingOrg(org);
    form.setFieldsValue({
      name: org.name,
      description: org.description,
      status: org.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (org: API.Organization) => {
    Modal.confirm({
      title: t('settings.organizations.deleteConfirm', { defaultValue: 'Delete Organization' }),
      content: t('settings.organizations.deleteConfirmContent', {
        defaultValue: `Are you sure you want to delete organization "${org.name}"? This action cannot be undone.`
      }),
      onOk: () => deleteOrg(org.id),
    });
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingOrg) {
        updateOrg({ id: editingOrg.id, ...values });
      } else {
        createOrg(values);
      }
    });
  };

  const columns: ColumnsType<API.Organization> = [
    {
      title: t('settings.organizations.name', { defaultValue: 'Name' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('settings.organizations.description', { defaultValue: 'Description' }),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('settings.organizations.status', { defaultValue: 'Status' }),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? t('settings.organizations.active', { defaultValue: 'Active' }) : t('settings.organizations.disabled', { defaultValue: 'Disabled' })}
        </Tag>
      ),
    },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'actions',
      render: (_, record) => (
        <Actions
          actions={[
            {
              key: 'view',
              label: tCommon('view', { defaultValue: 'View' }),
              icon: <EyeOutlined />,
              onClick: async () => navigate(`/system/settings/organizations/${record.id}`),
              permission: 'system:organization:view',
            },
            {
              key: 'edit',
              label: tCommon('edit', { defaultValue: 'Edit' }),
              icon: <EditOutlined />,
              onClick: async () => handleEdit(record),
              permission: 'system:organization:update',
            },
            {
              key: 'delete',
              label: tCommon('delete', { defaultValue: 'Delete' }),
              icon: <DeleteOutlined />,
              danger: true,
              onClick: async () => handleDelete(record),
              permission: 'system:organization:delete',
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Card
      title={t('settings.organizations.title', { defaultValue: 'Organization Management' })}
      extra={
        <Space>
          <Button icon={<ReloadOutlined />} onClick={refresh}>
            {tCommon('refresh', { defaultValue: 'Refresh' })}
          </Button>
          <PermissionGuard permission="system:organization:create">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
              {t('settings.organizations.create', { defaultValue: 'Create Organization' })}
            </Button>
          </PermissionGuard>
        </Space>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <Input.Search
          placeholder={t('settings.organizations.searchPlaceholder', { defaultValue: 'Search organizations...' })}
          allowClear
          onSearch={(value) => {
            setSearchText(value);
            setCurrent(1);
          }}
          style={{ width: 300 }}
        />
        <Table<API.Organization>
          columns={columns}
          dataSource={data?.data || []}
          loading={loading}
          rowKey="id"
          pagination={{
            current,
            pageSize,
            total: data?.total || 0,
            showSizeChanger: true,
            showTotal: (total) => tCommon('pagination.total', { defaultValue: `Total ${total} items` }),
            onChange: (page, size) => {
              setCurrent(page);
              setPageSize(size);
            },
          }}
        />
      </Space>

      <Modal
        title={
          editingOrg
            ? t('settings.organizations.edit', { defaultValue: 'Edit Organization' })
            : t('settings.organizations.create', { defaultValue: 'Create Organization' })
        }
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingOrg(null);
        }}
        confirmLoading={creating || updating}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label={t('settings.organizations.name', { defaultValue: 'Name' })}
            rules={[{ required: true, message: t('settings.organizations.nameRequired', { defaultValue: 'Please enter organization name' }) }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label={t('settings.organizations.description', { defaultValue: 'Description' })}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="status"
            label={t('settings.organizations.status', { defaultValue: 'Status' })}
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="active">{t('settings.organizations.active', { defaultValue: 'Active' })}</Select.Option>
              <Select.Option value="disabled">{t('settings.organizations.disabled', { defaultValue: 'Disabled' })}</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default OrganizationSettings;

