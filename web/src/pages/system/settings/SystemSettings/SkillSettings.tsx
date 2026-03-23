/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  AutoComplete,
  message,
  Tag,
  Upload,
  Checkbox,
  Spin,
  Empty,
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
  CopyOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import api from '@/service/api';
import type { Skill, SkillAIToolBinding, ToolSet } from '@/service/api/typing';
import type { CloneSkillRequest, CreateSkillRequest, UpdateSkillRequest } from '@/service/api/typing';
import { PermissionGuard } from '@/components/PermissionGuard';
import Actions from '@/components/Actions';
import { useSite } from '@/contexts/SiteContext';

const { TextArea } = Input;

type PatternRow = { toolset_id: string; tool_name: string };

function mapBindingsToSelections(
  bindings: SkillAIToolBinding[],
  toolsets: ToolSet[],
): { selections: Record<string, string[]>; extraPatterns: PatternRow[] } {
  const selections: Record<string, string[]> = {};
  const extraPatterns: PatternRow[] = [];
  const toolsetById = new Map(toolsets.map((t) => [t.id, t]));

  for (const b of bindings) {
    if (b.toolset_id === '*') {
      extraPatterns.push({ toolset_id: b.toolset_id, tool_name: b.tool_name });
      continue;
    }
    const ts = toolsetById.get(b.toolset_id);
    if (!ts) {
      extraPatterns.push({ toolset_id: b.toolset_id, tool_name: b.tool_name });
      continue;
    }
    const names = (ts.tools || []).map((tool) => tool.name);
    if (b.tool_name === '*') {
      selections[b.toolset_id] = [...names];
      continue;
    }
    if (names.includes(b.tool_name)) {
      if (!selections[b.toolset_id]) {
        selections[b.toolset_id] = [];
      }
      if (!selections[b.toolset_id].includes(b.tool_name)) {
        selections[b.toolset_id].push(b.tool_name);
      }
    } else {
      extraPatterns.push({ toolset_id: b.toolset_id, tool_name: b.tool_name });
    }
  }
  return { selections, extraPatterns };
}

function mergeBindingsPayload(
  selections: Record<string, string[]>,
  extra: PatternRow[],
): { toolset_id: string; tool_name: string }[] {
  const out: { toolset_id: string; tool_name: string }[] = [];
  const seen = new Set<string>();
  for (const [toolsetId, names] of Object.entries(selections)) {
    for (const toolName of names) {
      const k = `${toolsetId}|${toolName}`;
      if (seen.has(k)) {
        continue;
      }
      seen.add(k);
      out.push({ toolset_id: toolsetId, tool_name: toolName });
    }
  }
  for (const row of extra) {
    const tid = row.toolset_id.trim();
    const tn = row.tool_name.trim();
    if (!tid || !tn) {
      continue;
    }
    const k = `${tid}|${tn}`;
    if (seen.has(k)) {
      continue;
    }
    seen.add(k);
    out.push({ toolset_id: tid, tool_name: tn });
  }
  return out;
}

type LabeledOption = { value: string; label: string };

function withAdHocOption(options: LabeledOption[], current: string): LabeledOption[] {
  const v = current.trim();
  if (!v || options.some((o) => o.value === v)) {
    return options;
  }
  return [...options, { value: v, label: v }];
}

function buildPatternToolNameOptions(
  toolsets: ToolSet[],
  toolsetId: string,
  currentToolName: string,
  allToolsLabel: string,
): LabeledOption[] {
  const star: LabeledOption = { value: '*', label: allToolsLabel };
  const out: LabeledOption[] = [star];
  const seen = new Set<string>(['*']);

  const pushName = (name: string, description?: string) => {
    if (seen.has(name)) {
      return;
    }
    seen.add(name);
    out.push({
      value: name,
      label: description ? `${name} — ${description}` : name,
    });
  };

  if (toolsetId && toolsetId !== '*') {
    const ts = toolsets.find((t) => t.id === toolsetId);
    for (const tool of ts?.tools || []) {
      pushName(tool.name, tool.description);
    }
  } else {
    for (const ts of toolsets) {
      for (const tool of ts.tools || []) {
        pushName(tool.name, tool.description);
      }
    }
  }

  return withAdHocOption(out, currentToolName);
}

const SkillSettings: React.FC = () => {
  const { t } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const { enableSkillToolBinding } = useSite();
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [domainFilter, setDomainFilter] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [cloneSourceSkill, setCloneSourceSkill] = useState<Skill | null>(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [uploadForm] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const [aiToolsets, setAiToolsets] = useState<ToolSet[]>([]);
  const [aiToolSelections, setAiToolSelections] = useState<Record<string, string[]>>({});
  const [extraPatterns, setExtraPatterns] = useState<PatternRow[]>([]);
  const [aiToolsetsLoading, setAiToolsetsLoading] = useState(false);

  const patternToolsetBaseOptions = useMemo((): LabeledOption[] => {
    return [
      {
        value: '*',
        label: t('settings.skills.patternToolsetAll', { defaultValue: '* (all toolsets)' }),
      },
      ...aiToolsets.map((ts) => ({
        value: ts.id,
        label: `${ts.name} (${ts.id})`,
      })),
    ];
  }, [aiToolsets, t]);

  const resetAiToolState = useCallback(() => {
    setAiToolsets([]);
    setAiToolSelections({});
    setExtraPatterns([]);
  }, []);

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

  const { data: domainOptions = [] } = useRequest(() => api.system.listSkillDomains());

  const listData = (data as { data?: Skill[] })?.data ?? [];
  const total = (data as { total?: number })?.total ?? 0;

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

  const loadAiToolsForSkill = useCallback(
    async (skillId: string) => {
      setAiToolsetsLoading(true);
      try {
        const [tsRes, bindRes] = await Promise.all([
          api.system.listToolSets(
            { page_size: 1000, include_tools: true },
          ),
          api.system.listSkillAiToolBindings(
            { id: skillId, current: 1, page_size: 1000 },
          ),
        ]);
        const toolsets = ((tsRes as { data?: ToolSet[] }).data || []).filter((item) => item.status === 'enabled');
        setAiToolsets(toolsets);
        const bindings = (bindRes as { data?: SkillAIToolBinding[] }).data || [];
        const { selections, extraPatterns: extra } = mapBindingsToSelections(bindings, toolsets);
        setAiToolSelections(selections);
        setExtraPatterns(extra);
      } catch {
        message.error(t('settings.skills.aiToolsLoadFailed', { defaultValue: 'Failed to load AI tool bindings' }));
        resetAiToolState();
      } finally {
        setAiToolsetsLoading(false);
      }
    },
    [resetAiToolState, t],
  );

  useEffect(() => {
    if (!modalVisible || !editingSkill || !enableSkillToolBinding) {
      return;
    }
    void loadAiToolsForSkill(editingSkill.id);
  }, [modalVisible, editingSkill?.id, enableSkillToolBinding, loadAiToolsForSkill]);

  const handleAiToolSelectionChange = (toolsetId: string, checked: string[]) => {
    setAiToolSelections((prev) => ({ ...prev, [toolsetId]: checked }));
  };

  const handleToolsetSelectAll = (toolsetId: string, allToolNames: string[], checked: boolean) => {
    setAiToolSelections((prev) => ({
      ...prev,
      [toolsetId]: checked ? [...allToolNames] : [],
    }));
  };

  const handleCreate = () => {
    setEditingSkill(null);
    setCloneSourceSkill(null);
    form.resetFields();
    resetAiToolState();
    setModalVisible(true);
  };

  const handleEdit = (record: Skill) => {
    setEditingSkill(record);
    setCloneSourceSkill(null);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      category: record.category,
      domain: record.domain,
    });
    resetAiToolState();
    setModalVisible(true);
  };

  const handleClone = (record: Skill) => {
    setEditingSkill(null);
    setCloneSourceSkill(record);
    form.setFieldsValue({
      name: t('settings.skills.cloneNameDefault', { name: record.name, defaultValue: '{{name}} (copy)' }),
      description: record.description,
      category: record.category,
      domain: record.domain,
    });
    resetAiToolState();
    setModalVisible(true);
  };

  const handleSubmit = () => {
    void form.validateFields().then(async (values: Record<string, string>) => {
      setSubmitLoading(true);
      try {
        if (editingSkill) {
          const body: UpdateSkillRequest = {
            name: values.name,
            description: values.description ?? '',
            category: values.category ?? '',
            domain: values.domain ?? '',
          };
          await api.system.updateSkill({ id: editingSkill.id }, body);
          if (enableSkillToolBinding) {
            const bindings = mergeBindingsPayload(aiToolSelections, extraPatterns);
            await api.system.replaceSkillAiToolBindings(
              { id: editingSkill.id },
              { bindings },
            );
          }
          message.success(t('settings.skills.updateSuccess', { defaultValue: 'Skill updated' }));
        } else if (cloneSourceSkill) {
          const body: CloneSkillRequest = {
            source_id: cloneSourceSkill.id,
            name: values.name,
            description: values.description ?? '',
            category: values.category ?? '',
            domain: values.domain ?? '',
          };
          const { id: newId } = await api.system.cloneSkill(body);
          message.success(t('settings.skills.cloneSuccess', { defaultValue: 'Skill cloned' }));
          setModalVisible(false);
          setCloneSourceSkill(null);
          form.resetFields();
          resetAiToolState();
          refresh();
          if (newId) {
            navigate(`/system/settings/skills/${newId}/edit`);
          }
          return;
        } else {
          const body: CreateSkillRequest = {
            name: values.name,
            description: values.description ?? '',
            category: values.category ?? '',
            domain: values.domain ?? '',
            content: values.content ?? '',
          };
          await api.system.createSkill(body);
          message.success(t('settings.skills.createSuccess', { defaultValue: 'Skill created' }));
        }
        setModalVisible(false);
        setEditingSkill(null);
        setCloneSourceSkill(null);
        form.resetFields();
        resetAiToolState();
        refresh();
      } catch {
        message.error(
          editingSkill
            ? t('settings.skills.updateFailed', { defaultValue: 'Failed to update skill' })
            : cloneSourceSkill
              ? t('settings.skills.cloneFailed', { defaultValue: 'Failed to clone skill' })
              : t('settings.skills.createFailed', { defaultValue: 'Failed to create skill' }),
        );
      } finally {
        setSubmitLoading(false);
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

  const showAiToolsSection = enableSkillToolBinding && editingSkill;
  const modalWidth = showAiToolsSection ? 720 : 560;
  const isCreateOnlyModal = !editingSkill && !cloneSourceSkill;

  const columns: ColumnsType<Skill> = [
    { title: t('settings.skills.name', { defaultValue: 'Name' }), dataIndex: 'name', key: 'name' },
    { title: t('settings.skills.description', { defaultValue: 'Description' }), dataIndex: 'description', key: 'description', ellipsis: true },
    { title: t('settings.skills.category', { defaultValue: 'Category' }), dataIndex: 'category', key: 'category', render: (v) => (v ? <Tag>{v}</Tag> : '-') },
    { title: t('settings.skills.domain', { defaultValue: 'Domain' }), dataIndex: 'domain', key: 'domain', render: (v) => (v ? <Tag color="blue">{v}</Tag> : '-') },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'actions',
      width: 220,
      render: (_, record) => (
        <Actions
          actions={[
            {
              key: 'edit_files',
              icon: <FileTextOutlined />,
              tooltip: t('settings.skills.actionManageFiles', { defaultValue: 'Manage files' }),
              onClick: async () => navigate(`/system/settings/skills/${record.id}/edit`),
              permission: 'system:skills:edit_files',
            },
            {
              key: 'view',
              icon: <EyeOutlined />,
              tooltip: t('settings.skills.actionPreview', { defaultValue: 'Preview' }),
              onClick: async () => navigate(`/system/settings/skills/${record.id}/preview`),
              permission: 'system:skills:view',
            },
            {
              key: 'update',
              icon: <EditOutlined />,
              tooltip: t('settings.skills.actionEditMetadata', { defaultValue: 'Edit metadata' }),
              onClick: async () => handleEdit(record),
              permission: 'system:skills:update',
            },
            {
              key: 'clone',
              icon: <CopyOutlined />,
              tooltip: t('settings.skills.actionClone', { defaultValue: 'Clone' }),
              onClick: async () => handleClone(record),
              permission: 'system:skills:create',
            },
            {
              key: 'delete',
              icon: <DeleteOutlined />,
              tooltip: t('settings.skills.actionDelete', { defaultValue: 'Delete' }),
              danger: true,
              confirm: {
                title: t('settings.skills.deleteSkillConfirm', { defaultValue: 'Delete this skill?' }),
                description: t('settings.skills.deleteSkillConfirmDescription', {
                  defaultValue: 'The skill and all its files will be removed. This cannot be undone.',
                }),
                okText: tCommon('confirm', { defaultValue: 'Confirm' }),
                cancelText: tCommon('cancel', { defaultValue: 'Cancel' }),
                onConfirm: async () => deleteSkill(record.id),
              },
              permission: 'system:skills:delete',
            },
          ]}
        />
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
              {t('settings.skills.upload', { defaultValue: 'Upload skill' })}
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
        title={
          editingSkill
            ? t('settings.skills.editSkill', { defaultValue: 'Edit skill' })
            : cloneSourceSkill
              ? t('settings.skills.cloneSkill', { defaultValue: 'Clone skill' })
              : t('settings.skills.createSkill', { defaultValue: 'Create skill' })
        }
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setModalVisible(false);
          setEditingSkill(null);
          setCloneSourceSkill(null);
          resetAiToolState();
        }}
        confirmLoading={submitLoading}
        width={modalWidth}
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
          {isCreateOnlyModal && (
            <Form.Item name="content" label={t('settings.skills.initialContent', { defaultValue: 'Initial SKILL.md content (optional)' })}>
              <TextArea rows={6} placeholder="---&#10;name: my-skill&#10;description: ...&#10;---&#10;&#10;# My Skill" />
            </Form.Item>
          )}
          {showAiToolsSection && (
            <>
              <Spin spinning={aiToolsetsLoading}>
                {aiToolsets.length > 0 ? (
                  <div>
                    <Space direction="vertical" size="middle" style={{
                      width: '100%',
                      overflow: 'auto',
                      maxHeight: 'calc(100vh - 800px)',
                      minHeight: 'calc(300px)'
                    }}>
                      {aiToolsets.map((toolset) => {
                        const allToolNames = (toolset.tools || []).map((tool) => tool.name);
                        const selectedToolNames = aiToolSelections[toolset.id] || [];
                        const allSelected = allToolNames.length > 0 && selectedToolNames.length === allToolNames.length;
                        const someSelected = selectedToolNames.length > 0 && selectedToolNames.length < allToolNames.length;
                        return (
                          <Card
                            key={toolset.id}
                            size="small"
                            title={
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Checkbox
                                  checked={allSelected}
                                  indeterminate={someSelected}
                                  onChange={(e) => handleToolsetSelectAll(toolset.id, allToolNames, e.target.checked)}
                                />
                                <span>{toolset.name}</span>
                              </div>
                            }
                            extra={toolset.description ? <span>{toolset.description}</span> : undefined}
                          >
                            {(toolset.tools || []).length > 0 ? (
                              <Checkbox.Group style={{ width: '100%' }} value={selectedToolNames} onChange={(v) => handleAiToolSelectionChange(toolset.id, v as string[])}>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                  {(toolset.tools || []).map((tool) => (
                                    <Checkbox value={tool.name} key={tool.name}>
                                      <div>
                                        <div>{tool.name}</div>
                                        {tool.description && (
                                          <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>{tool.description}</div>
                                        )}
                                      </div>
                                    </Checkbox>
                                  ))}
                                </Space>
                              </Checkbox.Group>
                            ) : (
                              <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={t('settings.skills.aiToolsetNoTools', { defaultValue: 'No tools available in this toolset.' })}
                              />
                            )}
                          </Card>
                        );
                      })}
                    </Space>
                    <div style={{ marginTop: 12 }}>
                      <div style={{ marginBottom: 8 }}>{t('settings.skills.wildcardPatterns', { defaultValue: 'Wildcard patterns (optional)' })}</div>
                      <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12, marginBottom: 8 }}>
                        {t('settings.skills.wildcardPatternsHelp', {
                          defaultValue: 'Use * for toolset_id or tool_name (e.g. *:sleep for all toolsets, uuid:* for all tools in one toolset).',
                        })}
                      </div>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        {extraPatterns.map((row, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              width: '100%',
                            }}
                          >
                            <AutoComplete
                              allowClear
                              style={{ flex: 1, minWidth: 0 }}
                              placeholder={t('settings.skills.patternToolsetPlaceholder', { defaultValue: 'Toolset ID' })}
                              value={row.toolset_id}
                              options={withAdHocOption(patternToolsetBaseOptions, row.toolset_id)}
                              filterOption={(input, option) => {
                                const opt = option as { value?: string; label?: string };
                                const hay = `${opt?.value ?? ''} ${opt?.label ?? ''}`.toLowerCase();
                                return hay.includes(input.toLowerCase());
                              }}
                              onChange={(v) => {
                                const next = typeof v === 'string' ? v : '';
                                setExtraPatterns((prev) =>
                                  prev.map((r, i) => (i === idx ? { ...r, toolset_id: next } : r)),
                                );
                              }}
                            />
                            <AutoComplete
                              allowClear
                              style={{ flex: 1, minWidth: 0 }}
                              placeholder={t('settings.skills.patternToolNamePlaceholder', { defaultValue: 'Tool name' })}
                              value={row.tool_name}
                              options={buildPatternToolNameOptions(
                                aiToolsets,
                                row.toolset_id,
                                row.tool_name,
                                t('settings.skills.patternToolNameAll', { defaultValue: '* (all tools)' }),
                              )}
                              filterOption={(input, option) => {
                                const opt = option as { value?: string; label?: string };
                                const hay = `${opt?.value ?? ''} ${opt?.label ?? ''}`.toLowerCase();
                                return hay.includes(input.toLowerCase());
                              }}
                              onChange={(v) => {
                                const next = typeof v === 'string' ? v : '';
                                setExtraPatterns((prev) =>
                                  prev.map((r, i) => (i === idx ? { ...r, tool_name: next } : r)),
                                );
                              }}
                            />
                            <Button
                              type="default"
                              danger
                              style={{ flexShrink: 0 }}
                              onClick={() => setExtraPatterns((prev) => prev.filter((_, i) => i !== idx))}
                            >
                              {tCommon('delete', { defaultValue: 'Delete' })}
                            </Button>
                          </div>
                        ))}
                        <Button type="dashed" onClick={() => setExtraPatterns((prev) => [...prev, { toolset_id: '', tool_name: '' }])} block>
                          {t('settings.skills.addWildcardRow', { defaultValue: 'Add pattern row' })}
                        </Button>
                      </Space>
                    </div>
                  </div>
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={t('settings.skills.aiToolsetsEmpty', { defaultValue: 'No AI toolsets available for this organization.' })}
                  />
                )}
              </Spin>
            </>
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
