/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
  Select,
  message,
  Tag,
  Upload,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  UploadOutlined,
  EyeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import api from '@/service/api';
import type { Skill } from '@/service/api/typing';
import type { CreateSkillRequest, UpdateSkillRequest } from '@/service/api/typing';
import { PermissionGuard } from '@/components/PermissionGuard';

const { TextArea } = Input;

const SkillSettings: React.FC = () => {
  const { t } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [domainFilter, setDomainFilter] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [uploadForm] = Form.useForm();

  const { loading, data, refresh } = useRequest(
    () =>
      api.system.listSkills({
        current: 1,
        page_size: 100,
        search: searchText || undefined,
        domain: domainFilter,
      }),
    {
      refreshDeps: [searchText, domainFilter],
      onError: () => {
        message.error(t('settings.skills.fetchFailed', { defaultValue: 'Failed to fetch skills' }));
      },
    }
  );

  const { data: domainsData } = useRequest(() => api.system.listSkillDomains());
  const domainOptions: string[] = (domainsData as any) ?? [];

  const listData = (data as any)?.data ?? [];
  const total = (data as any)?.total ?? 0;

  const { loading: creating, run: createSkill } = useRequest(
    (body: CreateSkillRequest) => api.system.createSkill(body),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.skills.createSuccess', { defaultValue: 'Skill created' }));
        setModalVisible(false);
        form.resetFields();
        refresh();
      },
      onError: () => {
        message.error(t('settings.skills.createFailed', { defaultValue: 'Failed to create skill' }));
      },
    }
  );

  const { loading: updating, run: updateSkill } = useRequest(
    ({ id, body }: { id: string; body: UpdateSkillRequest }) =>
      api.system.updateSkill({ id }, body),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.skills.updateSuccess', { defaultValue: 'Skill updated' }));
        setModalVisible(false);
        setEditingSkill(null);
        form.resetFields();
        refresh();
      },
      onError: () => {
        message.error(t('settings.skills.updateFailed', { defaultValue: 'Failed to update skill' }));
      },
    }
  );

  const { run: deleteSkill } = useRequest(
    (id: string) => api.system.deleteSkill({ id }),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.skills.deleteSuccess', { defaultValue: 'Skill deleted' }));
        refresh();
      },
      onError: () => {
        message.error(t('settings.skills.deleteFailed', { defaultValue: 'Failed to delete skill' }));
      },
    }
  );

  const { loading: uploading, run: doUpload } = useRequest(
    (opts: { body: { category?: string; domain?: string }; file: File }) =>
      api.system.uploadSkill(opts.body, opts.file),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.skills.uploadSuccess', { defaultValue: 'Skill uploaded' }));
        setUploadModalVisible(false);
        uploadForm.resetFields();
        refresh();
      },
      onError: () => {
        message.error(t('settings.skills.uploadFailed', { defaultValue: 'Upload failed' }));
      },
    }
  );

  const handleCreate = () => {
    setEditingSkill(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: Skill) => {
    setEditingSkill(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      category: record.category,
      domain: record.domain,
    });
    setModalVisible(true);
  };

  const handleSubmit = () => {
    form.validateFields().then((values: Record<string, string>) => {
      if (editingSkill) {
        updateSkill({
          id: editingSkill.id,
          body: {
            name: values.name,
            description: values.description ?? '',
            category: values.category ?? '',
            domain: values.domain ?? '',
          },
        });
      } else {
        createSkill({
          name: values.name,
          description: values.description ?? '',
          category: values.category ?? '',
          domain: values.domain ?? '',
          content: values.content ?? '',
        });
      }
    });
  };

  const handleUpload = () => {
    const fileList = uploadForm.getFieldValue('file')?.fileList;
    const file = fileList?.[0]?.originFileObj ?? fileList?.[0];
    if (!file) {
      message.error(t('settings.skills.selectFile', { defaultValue: 'Please select a file' }));
      return;
    }
    const category = uploadForm.getFieldValue('category');
    const domain = uploadForm.getFieldValue('domain');
    doUpload({ body: { category, domain }, file });
  };

  const columns: ColumnsType<Skill> = [
    { title: t('settings.skills.name', { defaultValue: 'Name' }), dataIndex: 'name', key: 'name' },
    { title: t('settings.skills.description', { defaultValue: 'Description' }), dataIndex: 'description', key: 'description', ellipsis: true },
    { title: t('settings.skills.category', { defaultValue: 'Category' }), dataIndex: 'category', key: 'category', render: (v) => v ? <Tag>{v}</Tag> : '-' },
    { title: t('settings.skills.domain', { defaultValue: 'Domain' }), dataIndex: 'domain', key: 'domain', render: (v) => v ? <Tag color="blue">{v}</Tag> : '-' },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'actions',
      render: (_, record) => (
        <Space>
          <PermissionGuard permission="system:skills:edit_files">
            <Button type="link" size="small" icon={<FileTextOutlined />} onClick={() => navigate(`/system/settings/skills/${record.id}/edit`)}>
              {t('settings.skills.editFiles', { defaultValue: 'Edit files' })}
            </Button>
          </PermissionGuard>
          <PermissionGuard permission="system:skills:view">
            <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => navigate(`/system/settings/skills/${record.id}/preview`)}>
              {tCommon('preview', { defaultValue: 'Preview' })}
            </Button>
          </PermissionGuard>
          <PermissionGuard permission="system:skills:update">
            <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
              {tCommon('edit', { defaultValue: 'Edit' })}
            </Button>
          </PermissionGuard>
          <PermissionGuard permission="system:skills:delete">
            <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => Modal.confirm({ title: tCommon('confirmDelete', { defaultValue: 'Confirm delete?' }), onOk: () => deleteSkill(record.id) })}>
              {tCommon('delete', { defaultValue: 'Delete' })}
            </Button>
          </PermissionGuard>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={t('settings.skills.title', { defaultValue: 'AI Agent Skills' })}
      extra={
        <Space>
          <Input.Search
            placeholder={tCommon('search', { defaultValue: 'Search' })}
            allowClear
            onSearch={setSearchText}
            style={{ width: 200 }}
          />
          <Select
            placeholder={t('settings.skills.domain', { defaultValue: 'Domain' })}
            allowClear
            style={{ width: 120 }}
            value={domainFilter}
            onChange={setDomainFilter}
            options={domainOptions.map((d) => ({ value: d, label: d }))}
          />
          <Button icon={<ReloadOutlined />} onClick={() => refresh()}>
            {tCommon('refresh', { defaultValue: 'Refresh' })}
          </Button>
          <PermissionGuard permission="system:skills:create">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
              {t('settings.skills.create', { defaultValue: 'Create skill' })}
            </Button>
          </PermissionGuard>
          <PermissionGuard permission="system:skills:create">
            <Button icon={<UploadOutlined />} onClick={() => setUploadModalVisible(true)}>
              {t('settings.skills.upload', { defaultValue: 'Upload' })}
            </Button>
          </PermissionGuard>
        </Space>
      }
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={listData}
        pagination={{ total, pageSize: 10, showSizeChanger: true }}
      />

      <Modal
        title={editingSkill ? t('settings.skills.editSkill', { defaultValue: 'Edit skill' }) : t('settings.skills.createSkill', { defaultValue: 'Create skill' })}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => { setModalVisible(false); setEditingSkill(null); }}
        confirmLoading={creating || updating}
        width={560}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label={t('settings.skills.name', { defaultValue: 'Name' })} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label={t('settings.skills.description', { defaultValue: 'Description' })}>
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item name="category" label={t('settings.skills.category', { defaultValue: 'Category' })}>
            <Input />
          </Form.Item>
          <Form.Item name="domain" label={t('settings.skills.domain', { defaultValue: 'Domain' })}>
            <Select allowClear placeholder={tCommon('optional', { defaultValue: 'Optional' })} options={domainOptions.map((d) => ({ value: d, label: d }))} />
          </Form.Item>
          {!editingSkill && (
            <Form.Item name="content" label={t('settings.skills.initialContent', { defaultValue: 'Initial SKILL.md content (optional)' })}>
              <TextArea rows={6} placeholder="---&#10;name: my-skill&#10;description: ...&#10;---&#10;&#10;# My Skill" />
            </Form.Item>
          )}
        </Form>
      </Modal>

      <Modal
        title={t('settings.skills.upload', { defaultValue: 'Upload skill' })}
        open={uploadModalVisible}
        onOk={handleUpload}
        onCancel={() => setUploadModalVisible(false)}
        confirmLoading={uploading}
      >
        <Form form={uploadForm} layout="vertical">
          <Form.Item name="file" label={t('settings.skills.file', { defaultValue: 'File (.md or .zip)' })} rules={[{ required: true }]}>
            <Upload maxCount={1} beforeUpload={() => false} accept=".md,.zip">
              <Button icon={<UploadOutlined />}>{tCommon('selectFile', { defaultValue: 'Select file' })}</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="category" label={t('settings.skills.category', { defaultValue: 'Category' })}>
            <Input />
          </Form.Item>
          <Form.Item name="domain" label={t('settings.skills.domain', { defaultValue: 'Domain' })}>
            <Select allowClear placeholder={tCommon('optional', { defaultValue: 'Optional' })} options={domainOptions.map((d) => ({ value: d, label: d }))} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default SkillSettings;
