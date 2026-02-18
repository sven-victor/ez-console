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

import React from 'react';
import { Card, Descriptions, Button, Tag, Space, Progress, Spin, message } from 'antd';
import { ArrowLeftOutlined, StopOutlined, RedoOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import api from '@/service/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import Actions from '@/components/Actions';

const statusColors: Record<API.TaskStatus, string> = {
  pending: 'default',
  running: 'processing',
  success: 'success',
  failed: 'error',
  cancelled: 'default',
};

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('task');
  const { t: tCommon } = useTranslation('common');

  const { data: task, loading, refresh } = useRequest(
    () => (id ? api.tasks.getTask({ id }) : Promise.reject(new Error('No id'))),
    {
      refreshDeps: [id],
      ready: !!id,
    }
  );

  React.useEffect(() => {
    if (!id || !task || (task.status !== 'running' && task.status !== 'pending')) return;
    const timer = setInterval(refresh, 2000);
    return () => clearInterval(timer);
  }, [id, task?.status, refresh]);

  const handleCancel = async () => {
    if (!id) return;
    try {
      await api.tasks.cancelTask({ id });
      message.success(t('cancelSuccess', { defaultValue: 'Task cancelled.' }));
      refresh();
    } catch {
      message.error(t('cancelFailed', { defaultValue: 'Failed to cancel task.' }));
    }
  };

  const handleRetry = async () => {
    if (!id) return;
    try {
      await api.tasks.retryTask({ id });
      message.success(t('retrySuccess', { defaultValue: 'Task retry requested.' }));
      refresh();
    } catch {
      message.error(t('retryFailed', { defaultValue: 'Failed to retry task.' }));
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await api.tasks.deleteTask({ id });
      message.success(t('deleteSuccess', { defaultValue: 'Task deleted.' }));
      navigate('/tasks');
    } catch {
      message.error(t('deleteFailed', { defaultValue: 'Failed to delete task.' }));
    }
  };

  const handleDownload = () => {
    if (!task?.artifact_file_key) return;
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    window.open(`${baseUrl}/api/files/${task.artifact_file_key}`, '_blank');
  };

  if (loading && !task) {
    return (
      <Card>
        <Spin spinning />
      </Card>
    );
  }

  if (!task) {
    return (
      <Card>
        <p>{t('notFound', { defaultValue: 'Task not found.' })}</p>
        <Button type="primary" onClick={() => navigate('/tasks')}>
          {t('backToList', { defaultValue: 'Back to list' })}
        </Button>
      </Card>
    );
  }

  const canCancel = task.status === 'running' || task.status === 'pending';
  const canRetry = task.status === 'failed' || task.status === 'cancelled';

  return (
    <Card
      title={t('detailTitle', { defaultValue: 'Task Detail' })}
      extra={
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/tasks')}>
          {tCommon('back', { defaultValue: 'Back' })}
        </Button>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label={t('typeLabel', { defaultValue: 'Type' })}>{t(`type.${task.type}`, { defaultValue: task.type })}</Descriptions.Item>
          <Descriptions.Item label={t('statusLabel', { defaultValue: 'Status' })}>
            <Tag color={statusColors[task.status] || 'default'}>
              {t(`status.${task.status}`, { defaultValue: task.status })}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t('progress', { defaultValue: 'Progress' })}>
            {(task.status === 'running' || task.status === 'pending') && (
              <Progress percent={task.progress ?? 0} size="small" style={{ maxWidth: 200 }} />
            )}
            {task.status !== 'running' && task.status !== 'pending' && '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('creatorId', { defaultValue: 'Creator' })}>{task.creator_id}</Descriptions.Item>
          <Descriptions.Item label={t('createdAt', { defaultValue: 'Created At' })}>
            {task.created_at ? new Date(task.created_at).toLocaleString() : '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('startedAt', { defaultValue: 'Started At' })}>
            {task.started_at ? new Date(task.started_at).toLocaleString() : '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('finishedAt', { defaultValue: 'Finished At' })}>
            {task.finished_at ? new Date(task.finished_at).toLocaleString() : '-'}
          </Descriptions.Item>
          {task.error && (
            <Descriptions.Item label={t('error', { defaultValue: 'Error' })}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: 'var(--ant-color-error)' }}>{task.error}</pre>
            </Descriptions.Item>
          )}
          {task.result && (
            <Descriptions.Item label={t('result', { defaultValue: 'Result' })}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', maxHeight: 200, overflow: 'auto' }}>{task.result}</pre>
            </Descriptions.Item>
          )}
        </Descriptions>

        {task.artifact_file_key && (
          <Space>
            <PermissionGuard permission="task:view">
              <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownload}>
                {t('downloadArtifact', { defaultValue: 'Download artifact' })}
              </Button>
            </PermissionGuard>
          </Space>
        )}

        <Space wrap>
          {canCancel && (
            <PermissionGuard permission="task:cancel">
              <Button icon={<StopOutlined />} onClick={handleCancel}>
                {t('cancel', { defaultValue: 'Cancel' })}
              </Button>
            </PermissionGuard>
          )}
          {canRetry && (
            <PermissionGuard permission="task:retry">
              <Button icon={<RedoOutlined />} onClick={handleRetry}>
                {t('retry', { defaultValue: 'Retry' })}
              </Button>
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
                    onConfirm: handleDelete,
                  },
                },
              ]}
            />
          </PermissionGuard>
        </Space>
      </Space>
    </Card>
  );
};

export default TaskDetail;
