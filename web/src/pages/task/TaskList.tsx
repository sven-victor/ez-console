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

import React, { useRef, useState } from 'react';
import { Card, Button, Space, message, Input, Tag, Tooltip } from 'antd';
import { ReloadOutlined, SearchOutlined, StopOutlined, RedoOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '@/service/api';
import { Table } from '@/components/Table';
import { TableRef } from '@/components/Table';
import { ColumnsType } from 'antd/es/table';
import { PermissionGuard } from '@/components/PermissionGuard';
import Actions from '@/components/Actions';
import { PAGINATION } from '@/constants';

const statusColors: Record<API.TaskStatus, string> = {
  pending: 'default',
  running: 'processing',
  success: 'success',
  failed: 'error',
  cancelled: 'default',
};

const TaskList: React.FC = () => {
  const { t } = useTranslation('task');
  const { t: tCommon } = useTranslation('common');
  const tableRef = useRef<TableRef<API.Task>>(null);
  const [search, setSearch] = useState('');

  const handleCancel = async (id: string) => {
    try {
      await api.tasks.cancelTask({ id });
      message.success(t('cancelSuccess', { defaultValue: 'Task cancelled.' }));
      tableRef.current?.reload?.();
    } catch {
      message.error(t('cancelFailed', { defaultValue: 'Failed to cancel task.' }));
    }
  };

  const handleRetry = async (id: string) => {
    try {
      await api.tasks.retryTask({ id });
      message.success(t('retrySuccess', { defaultValue: 'Task retry requested.' }));
      tableRef.current?.reload?.();
    } catch {
      message.error(t('retryFailed', { defaultValue: 'Failed to retry task.' }));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.tasks.deleteTask({ id });
      message.success(t('deleteSuccess', { defaultValue: 'Task deleted.' }));
      tableRef.current?.reload?.();
    } catch {
      message.error(t('deleteFailed', { defaultValue: 'Failed to delete task.' }));
    }
  };

  const handleDownload = async (fileKey: string) => {
    const res: { expires: number, signature: string } = await api.base.downloadFile({ fileKey }, { params: { method: 'sign' } });
    const url = `/api/files/${fileKey}?signature=${res.signature}&expires=${res.expires}`;
    window.open(url, '_blank');
  };

  const columns: ColumnsType<API.Task> = [
    {
      title: t('typeLabel', { defaultValue: 'Type' }),
      dataIndex: 'type',
      key: 'type',
      width: 120,
    },
    {
      title: t('statusLabel', { defaultValue: 'Status' }),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: API.TaskStatus) => (
        <Tag color={statusColors[status] || 'default'}>
          {t(`status.${status}`, { defaultValue: status })}
        </Tag>
      ),
    },
    {
      title: t('progress', { defaultValue: 'Progress' }),
      dataIndex: 'progress',
      key: 'progress',
      width: 100,
      render: (progress: number, record: API.Task) =>
        record.status === 'running' || record.status === 'pending' ? `${progress}%` : '-',
    },
    {
      title: t('creatorId', { defaultValue: 'Creator' }),
      dataIndex: 'creator_id',
      key: 'creator_id',
      width: 120,
      ellipsis: true,
    },
    {
      title: t('createdAt', { defaultValue: 'Created At' }),
      dataIndex: 'created_at',
      key: 'created_at',
      width: 170,
      render: (text: string) => (text ? new Date(text).toLocaleString() : '-'),
    },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'action',
      width: 220,
      fixed: 'right',
      render: (_: unknown, record: API.Task) => (
        <Space size="small">
          {(record.status === 'running' || record.status === 'pending') && (
            <PermissionGuard permission="task:cancel">
              <Actions
                actions={[
                  {
                    key: 'cancel',
                    label: t('cancel', { defaultValue: 'Cancel' }),
                    icon: <StopOutlined />,
                    confirm: {
                      title: t('cancelConfirm', { defaultValue: 'Cancel this task?' }),
                      onConfirm: () => handleCancel(record.id),
                    },
                  },
                ]}
              />
            </PermissionGuard>
          )}
          {(record.status === 'failed' || record.status === 'cancelled') && (
            <PermissionGuard permission="task:retry">
              <Tooltip title={t('retry', { defaultValue: 'Retry' })}>
                <Button
                  type="text"
                  size="small"
                  icon={<RedoOutlined />}
                  onClick={() => handleRetry(record.id)}
                />
              </Tooltip>
            </PermissionGuard>
          )}
          {record.artifact_file_key && (
            <PermissionGuard permission="task:view">
              <Tooltip title={t('download', { defaultValue: 'Download' })}>
                <Button
                  type="text"
                  size="small"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload(record.artifact_file_key)}
                />
              </Tooltip>
            </PermissionGuard>
          )}
          <PermissionGuard permission="task:delete">
            <Actions
              actions={[
                {
                  key: 'delete',
                  label: t('delete', { defaultValue: 'Delete' }),
                  icon: <DeleteOutlined />,
                  danger: true,
                  confirm: {
                    title: t('deleteConfirm', { defaultValue: 'Delete this task?' }),
                    onConfirm: () => handleDelete(record.id),
                  },
                },
              ]}
            />
          </PermissionGuard>
        </Space>
      ),
    },
  ];

  const request = (params: API.PaginationRequest) =>
    api.tasks.listTasks({
      current: params.current ?? PAGINATION.DEFAULT_CURRENT,
      page_size: params.page_size ?? PAGINATION.DEFAULT_PAGE_SIZE,
      search: search || undefined,
    });

  return (
    <Card title={t('listTitle', { defaultValue: 'Task List' })}>
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <Space wrap>
          <Input
            placeholder={t('searchPlaceholder', { defaultValue: 'Search by type or ID' })}
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={() => tableRef.current?.reload?.()}
            style={{ width: 220 }}
            allowClear
          />
          <Button icon={<SearchOutlined />} onClick={() => tableRef.current?.reload?.()}>
            {tCommon('search', { defaultValue: 'Search' })}
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => tableRef.current?.reload?.()}>
            {tCommon('refresh', { defaultValue: 'Refresh' })}
          </Button>
        </Space>
        <Table<API.Task>
          ref={tableRef}
          request={request}
          columns={columns}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </Space>
    </Card>
  );
};

export default TaskList;
