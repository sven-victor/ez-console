/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, Button, Space, Input, message, Tree, Modal, Form, Menu } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { FolderOutlined, FileOutlined, SaveOutlined, PlusOutlined, DeleteOutlined, EditOutlined, FolderAddOutlined, FileAddOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import api from '@/service/api';
import type { SkillTreeNode } from '@/service/api/typing';
import MarkdownViewer from '@/components/MarkdownViewer';
import { markdownWithMetadataAsTable } from '@/utils/skillPreview';

const { TextArea } = Input;

const isMarkdownFile = (path: string) => path.toLowerCase().endsWith('.md');

function treeNodesFromSkillTree(nodes: SkillTreeNode[]): DataNode[] {
  return nodes.map((n) => ({
    key: n.path,
    title: n.name,
    isLeaf: !n.is_dir,
    icon: n.is_dir ? <FolderOutlined /> : <FileOutlined />,
    children: n.children?.length ? treeNodesFromSkillTree(n.children) : undefined,
  }));
}

/** Parent path (directory) of a path; empty string for root-level */
function parentPath(path: string): string {
  return path.includes('/') ? path.replace(/\/[^/]+$/, '') : '';
}

const SkillEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('system');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [selectedNodeIsDir, setSelectedNodeIsDir] = useState(false);
  const [content, setContent] = useState('');
  const [dirty, setDirty] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [newFileModal, setNewFileModal] = useState(false);
  const [newDirModal, setNewDirModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [dirForm] = Form.useForm();
  const [contextMenu, setContextMenu] = useState<{ path: string; isDir: boolean; x: number; y: number } | null>(null);
  const [renameTarget, setRenameTarget] = useState<{ path: string; isDir: boolean } | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [renameForm] = Form.useForm();

  const { data: skill } = useRequest(
    () => (id ? api.system.getSkill({ id }) : Promise.reject(new Error('No id'))),
    { refreshDeps: [id], ready: !!id }
  );

  const { data: treeData, loading: filesLoading, refresh: refreshFiles } = useRequest(
    () => (id ? api.system.listSkillFilesTree({ id }) : Promise.reject(new Error('No id'))),
    {
      refreshDeps: [id],
      ready: !!id,
      onSuccess: (data) => {
        if (!selectedFile) {
          for (const node of data) {
            if (!node.is_dir && node.name === 'SKILL.md') {
              setSelectedNodeKey(node.path);
              setSelectedFile(node.path);
              setSelectedNodeIsDir(false);
              return
            }
          }
          for (const node of data) {
            if (!node.is_dir && node.name === 'SKILLS.md') {
              setSelectedNodeKey(node.path);
              setSelectedFile(node.path);
              setSelectedNodeIsDir(false);
              return
            }
          }
        }
      },
    }
  );

  const skillData = (skill as any)?.data ?? skill;
  const rawTree: SkillTreeNode[] = (treeData as any)?.data ?? treeData ?? [];
  const treeDataNodes = useMemo(() => treeNodesFromSkillTree(rawTree), [rawTree]);

  // Create-under: selected dir, or parent of selected file, or root
  const createBasePath = selectedNodeIsDir && selectedNodeKey
    ? selectedNodeKey
    : selectedFile
      ? parentPath(selectedFile)
      : '';

  useEffect(() => {
    if (selectedFile && id) {
      api.system
        .getSkillFile({ id, path: selectedFile })
        .then((res: any) => setContent(res?.data ?? res ?? ''))
        .catch(() => message.error(t('settings.skills.editor.failedToLoadFile', { defaultValue: 'Failed to load file' })));
      setDirty(false);
    } else {
      setContent('');
      setDirty(false);
    }
  }, [id, selectedFile, t]);

  const handleSave = () => {
    if (!id || !selectedFile) return;
    api.system.putSkillFile({ id, path: selectedFile }, content).then(() => {
      message.success(t('settings.skills.editor.saved', { defaultValue: 'Saved' }));
      setDirty(false);
    }).catch(() => message.error(t('settings.skills.editor.failedToSave', { defaultValue: 'Failed to save' })));
  };

  const onTreeSelect = (_: React.Key[], info: { node: DataNode }) => {
    const key = String(info.node.key);
    const isDir = !info.node.isLeaf;
    setSelectedNodeKey(key);
    setSelectedNodeIsDir(isDir);
    if (info.node.isLeaf) {
      setSelectedFile(key);
    } else {
      setSelectedFile(null);
    }
  };

  const onTreeRightClick = (e: { event: React.MouseEvent; node: DataNode }) => {
    e.event.preventDefault();
    setContextMenu({
      path: String(e.node.key),
      isDir: !e.node.isLeaf,
      x: e.event.clientX,
      y: e.event.clientY,
    });
  };

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const handleContextAction = useCallback(
    (action: string) => {
      if (!id || !contextMenu) return;
      const { path, isDir } = contextMenu;
      closeContextMenu();
      switch (action) {
        case 'open':
          setSelectedFile(path);
          setSelectedNodeKey(path);
          setSelectedNodeIsDir(false);
          break;
        case 'rename': {
          const baseName = path.includes('/') ? path.split('/').pop()! : path;
          setRenameTarget({ path, isDir });
          setRenameValue(baseName);
          setTimeout(() => renameForm.setFieldsValue({ name: baseName }), 0);
          break;
        }
        case 'delete':
          Modal.confirm({
            title: t('settings.skills.editor.deleteConfirm', { defaultValue: 'Delete?' }),
            content: isDir
              ? t('settings.skills.editor.deleteConfirmContentDir', { path, defaultValue: `Delete ${path}? This will remove the folder and all its contents.` })
              : t('settings.skills.editor.deleteConfirmContent', { path, defaultValue: `Delete ${path}?` }),
            onOk: () =>
              api.system.deleteSkillPath({ id, path }).then(() => {
                message.success(t('settings.skills.editor.deleted', { defaultValue: 'Deleted' }));
                if (selectedFile === path) {
                  setSelectedFile(null);
                  setContent('');
                }
                if (selectedNodeKey === path) {
                  setSelectedNodeKey(null);
                  setSelectedNodeIsDir(false);
                }
                refreshFiles();
              }).catch(() => message.error(t('settings.skills.editor.failedToDelete', { defaultValue: 'Failed to delete' }))),
          });
          break;
        case 'newFile':
          setSelectedNodeKey(path);
          setSelectedNodeIsDir(isDir);
          setNewFileModal(true);
          break;
        case 'newDir':
          setSelectedNodeKey(path);
          setSelectedNodeIsDir(isDir);
          setNewDirModal(true);
          break;
        default:
          break;
      }
    },
    [id, contextMenu, closeContextMenu, refreshFiles, selectedFile, selectedNodeKey, renameForm, t]
  );

  const handleRenameOk = () => {
    if (!id || !renameTarget) return;
    const name = (renameForm.getFieldValue('name') ?? renameValue).trim();
    if (!name) {
      message.error(t('settings.skills.editor.nameRequired', { defaultValue: 'Name is required' }));
      return;
    }
    if (!renameTarget.isDir && !/\.(md|txt)$/i.test(name)) {
      message.error(t('settings.skills.editor.fileNameExtension', { defaultValue: 'File name must end with .md or .txt' }));
      return;
    }
    const parent = parentPath(renameTarget.path);
    const toPath = parent ? `${parent}/${name}` : name;
    if (toPath === renameTarget.path) {
      setRenameTarget(null);
      return;
    }
    api.system
      .moveSkillPath({ id }, { from_path: renameTarget.path, to_path: toPath })
      .then(() => {
        message.success(t('settings.skills.editor.renamed', { defaultValue: 'Renamed' }));
        if (selectedFile === renameTarget.path) setSelectedFile(toPath);
        if (selectedNodeKey === renameTarget.path) setSelectedNodeKey(toPath);
        setRenameTarget(null);
        refreshFiles();
      })
      .catch(() => message.error(t('settings.skills.editor.failedToRename', { defaultValue: 'Failed to rename' })));
  };

  const handleDrop = (info: { node: DataNode; dragNode: DataNode; dropToGap: boolean }) => {
    if (!id) return;
    const fromPath = String(info.dragNode.key);
    const dragName = String(info.dragNode.title);
    let toPath: string;
    if (info.dropToGap) {
      const parent = parentPath(String(info.node.key));
      toPath = parent ? `${parent}/${dragName}` : dragName;
    } else {
      toPath = `${info.node.key}/${dragName}`;
    }
    if (toPath === fromPath) return;
    api.system
      .moveSkillPath({ id }, { from_path: fromPath, to_path: toPath })
      .then(() => {
        message.success(t('settings.skills.editor.moved', { defaultValue: 'Moved' }));
        if (selectedFile === fromPath) setSelectedFile(toPath);
        if (selectedNodeKey === fromPath) setSelectedNodeKey(toPath);
        refreshFiles();
      })
      .catch(() => message.error(t('settings.skills.editor.failedToMove', { defaultValue: 'Failed to move' })));
  };

  const handleCreateFile = () => {
    const name = newName.trim();
    if (!name || !id) return;
    const fullPath = createBasePath ? `${createBasePath}/${name}` : name;
    if (!/\.(md|txt)$/i.test(name)) {
      message.error(t('settings.skills.editor.onlyMdTxtAllowed', { defaultValue: 'Only .md and .txt files are allowed' }));
      return;
    }
    api.system.putSkillFile({ id, path: fullPath }, '').then(() => {
      message.success(t('settings.skills.editor.fileCreated', { defaultValue: 'File created' }));
      setNewFileModal(false);
      setNewName('');
      refreshFiles();
      setSelectedFile(fullPath);
      setContent('');
    }).catch(() => message.error(t('settings.skills.editor.failedToCreateFile', { defaultValue: 'Failed to create file' })));
  };

  const handleCreateDir = () => {
    const name = dirForm.getFieldValue('name')?.trim();
    if (!name || !id) return;
    const fullPath = createBasePath ? `${createBasePath}/${name}` : name;
    api.system.createSkillDir({ id }, { path: fullPath }).then(() => {
      message.success(t('settings.skills.editor.folderCreated', { defaultValue: 'Folder created' }));
      setNewDirModal(false);
      dirForm.resetFields();
      refreshFiles();
    }).catch(() => message.error(t('settings.skills.editor.failedToCreateFolder', { defaultValue: 'Failed to create folder' })));
  };

  const handleDelete = () => {
    const pathToDelete = selectedNodeKey || selectedFile;
    if (!id || !pathToDelete) return;
    Modal.confirm({
      title: t('settings.skills.editor.deleteConfirm', { defaultValue: 'Delete?' }),
      content: t('settings.skills.editor.deleteConfirmContent', { path: pathToDelete, defaultValue: `Delete ${pathToDelete}?` }),
      onOk: () =>
        api.system.deleteSkillPath({ id, path: pathToDelete }).then(() => {
          message.success(t('settings.skills.editor.deleted', { defaultValue: 'Deleted' }));
          if (selectedFile === pathToDelete) {
            setSelectedFile(null);
            setContent('');
          }
          if (selectedNodeKey === pathToDelete) {
            setSelectedNodeKey(null);
            setSelectedNodeIsDir(false);
          }
          refreshFiles();
        }).catch(() => message.error(t('settings.skills.editor.failedToDelete', { defaultValue: 'Failed to delete' }))),
    });
  };

  if (!id) return null;

  return (
    <Card
      title={skillData?.name ?? t('settings.skills.editor.skill', { defaultValue: 'Skill' })}
      extra={
        <Button type="link" onClick={() => navigate('/system/settings#skills')}>
          {t('settings.skills.editor.backToSkills', { defaultValue: 'Back to Skills' })}
        </Button>
      }
      style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 160px)' }}
      bodyStyle={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        <div style={{ width: 260, border: '1px solid #d9d9d9', borderRadius: 8, padding: 8, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Space style={{ marginBottom: 8, flexShrink: 0 }}>
            <Button size="small" icon={<PlusOutlined />} onClick={() => setNewFileModal(true)}>{t('settings.skills.editor.file', { defaultValue: 'File' })}</Button>
            <Button size="small" icon={<FolderOutlined />} onClick={() => setNewDirModal(true)}>{t('settings.skills.editor.folder', { defaultValue: 'Folder' })}</Button>
          </Space>
          {filesLoading ? <div>{t('settings.skills.editor.loading', { defaultValue: 'Loading...' })}</div> : (
            <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
              <Tree
                showIcon
                blockNode
                draggable
                expandedKeys={expandedKeys}
                onExpand={(keys) => setExpandedKeys(keys)}
                selectedKeys={selectedNodeKey ? [selectedNodeKey] : []}
                onSelect={onTreeSelect}
                onRightClick={onTreeRightClick}
                onDrop={handleDrop}
                treeData={treeDataNodes}
              />
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {selectedFile && (
            <>
              <Space style={{ marginBottom: 8, flexShrink: 0 }}>
                <span>{selectedFile}</span>
                <Button type="primary" icon={<SaveOutlined />} disabled={!dirty} onClick={handleSave}>{t('settings.skills.editor.save', { defaultValue: 'Save' })}</Button>
                <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>{t('settings.skills.editor.delete', { defaultValue: 'Delete' })}</Button>
              </Space>
              {isMarkdownFile(selectedFile) ? (
                <div style={{ flex: 1, minHeight: 0, minWidth: 0, display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1, minHeight: 0, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <TextArea
                      value={content}
                      onChange={(e) => { setContent(e.target.value); setDirty(true); }}
                      style={{ flex: 1, minHeight: 0, fontFamily: 'monospace', resize: 'none' }}
                      spellCheck={false}
                    />
                  </div>
                  <div style={{ flex: 1, minHeight: 0, minWidth: 0, overflow: 'auto', border: '1px solid #d9d9d9', borderRadius: 8, padding: 12 }}>
                    <MarkdownViewer content={markdownWithMetadataAsTable(content)} />
                  </div>
                </div>
              ) : (
                <TextArea
                  value={content}
                  onChange={(e) => { setContent(e.target.value); setDirty(true); }}
                  style={{ flex: 1, minHeight: 0, fontFamily: 'monospace', resize: 'none' }}
                  spellCheck={false}
                />
              )}
            </>
          )}
          {!selectedFile && <div style={{ color: '#999' }}>{t('settings.skills.editor.selectFileToEdit', { defaultValue: 'Select a file to edit' })}</div>}
        </div>
      </div>

      {contextMenu && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 999 }}
            onClick={closeContextMenu}
            onContextMenu={(e) => e.preventDefault()}
            aria-hidden
          />
          <div style={{ position: 'fixed', left: contextMenu.x, top: contextMenu.y, zIndex: 1000 }}>
            <Menu
              selectable={false}
              items={[
                ...(!contextMenu.isDir
                  ? [{ key: 'open', icon: <FileOutlined />, label: t('settings.skills.editor.open', { defaultValue: 'Open' }) }]
                  : []),
                { key: 'rename', icon: <EditOutlined />, label: t('settings.skills.editor.rename', { defaultValue: 'Rename' }) },
                { key: 'delete', icon: <DeleteOutlined />, label: t('settings.skills.editor.delete', { defaultValue: 'Delete' }), danger: true },
                { key: 'newFile', icon: <FileAddOutlined />, label: t('settings.skills.editor.newFile', { defaultValue: 'New file' }) },
                { key: 'newDir', icon: <FolderAddOutlined />, label: t('settings.skills.editor.newFolder', { defaultValue: 'New folder' }) },
              ]}
              onClick={({ key }) => handleContextAction(key)}
            />
          </div>
        </>
      )}

      <Modal title={t('settings.skills.editor.newFileTitle', { defaultValue: 'New file' })} open={newFileModal} onOk={handleCreateFile} onCancel={() => { setNewFileModal(false); setNewName(''); }} okText={t('settings.skills.editor.create', { defaultValue: 'Create' })}>
        <Input placeholder={t('settings.skills.editor.placeholderNewFile', { defaultValue: 'filename.md or filename.txt' })} value={newName} onChange={(e) => setNewName(e.target.value)} />
      </Modal>
      <Modal title={t('settings.skills.editor.newFolderTitle', { defaultValue: 'New folder' })} open={newDirModal} onOk={() => dirForm.validateFields().then(handleCreateDir)} onCancel={() => setNewDirModal(false)} okText={t('settings.skills.editor.create', { defaultValue: 'Create' })}>
        <Form form={dirForm} layout="vertical">
          <Form.Item name="name" label={t('settings.skills.editor.folderName', { defaultValue: 'Folder name' })} rules={[{ required: true }]}>
            <Input placeholder={t('settings.skills.editor.placeholderFolder', { defaultValue: 'folder-name' })} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={t('settings.skills.editor.renameTitle', { defaultValue: 'Rename' })}
        open={!!renameTarget}
        onOk={handleRenameOk}
        onCancel={() => setRenameTarget(null)}
        okText={t('settings.skills.editor.rename', { defaultValue: 'Rename' })}
        destroyOnClose
      >
        <Form form={renameForm} layout="vertical" onValuesChange={(_, v) => setRenameValue(v.name ?? '')}>
          <Form.Item name="name" label={renameTarget?.isDir ? t('settings.skills.editor.folderName', { defaultValue: 'Folder name' }) : t('settings.skills.editor.fileName', { defaultValue: 'File name' })} rules={[{ required: true }]}>
            <Input
              placeholder={renameTarget?.isDir ? t('settings.skills.editor.placeholderFolder', { defaultValue: 'folder-name' }) : t('settings.skills.editor.placeholderFileName', { defaultValue: 'name.md' })}
              onPressEnter={() => handleRenameOk()}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default SkillEditor;
