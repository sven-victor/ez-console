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

import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Space, message, Tag, Tooltip, Switch, Progress } from 'antd';
import { ReloadOutlined, PlayCircleOutlined, HistoryOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '@/service/api';
import { Table as ProTable } from '@/components/Table';
import { TableRef } from '@/components/Table';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PermissionGuard } from '@/components/PermissionGuard';
import { PAGINATION } from '@/constants';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';

const statusColors: Record<API.TaskStatus, string> = {
  pending: 'default',
  running: 'processing',
  success: 'success',
  failed: 'error',
  cancelled: 'default',
};

const TaskScheduleList: React.FC = () => {
  const { t } = useTranslation('task');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const historyTableRef = useRef<TableRef<API.Task>>(null);

  const { data: schedulesResp, loading: schedulesLoading, refresh: refreshSchedules } = useRequest(
    () => api.taskSchedules.listTaskSchedules(),
    {
      onError: (error) => {
        message.error(t('scheduleListFailed', { defaultValue: 'Failed to list schedules: {{error}}', error: error }));
      },
    }
  );
  const scheduleList: API.ScheduledJobState[] = Array.isArray(schedulesResp) ? schedulesResp : (schedulesResp as API.ResponseArrayServiceScheduledJobState | undefined)?.data ?? [];

  const handleToggle = async (id: string, enabled: boolean) => {
    try {
      await api.taskSchedules.toggleTaskSchedule({ id }, { enabled });
      message.success(t('scheduleUpdated', { defaultValue: 'Schedule updated.' }));
      refreshSchedules();
    } catch {
      message.error(t('scheduleUpdateFailed', { defaultValue: 'Failed to update schedule.' }));
    }
  };

  useEffect(() => {
    if (selectedScheduleId) {
      historyTableRef.current?.reload?.();
    }
  }, [selectedScheduleId]);

  const handleTrigger = async (id: string) => {
    try {
      await api.taskSchedules.triggerTaskSchedule({ id });
      message.success(t('scheduleTriggered', { defaultValue: 'Task triggered.' }));
      setSelectedScheduleId(id);
    } catch {
      message.error(t('scheduleTriggerFailed', { defaultValue: 'Failed to trigger schedule.' }));
    }
  };

  const scheduleColumns: ColumnsType<API.ScheduledJobState> = [
    { title: t('scheduleName', { defaultValue: 'Name' }), dataIndex: 'name', key: 'name', width: 160 },
    { title: t('scheduleSpec', { defaultValue: 'Cron' }), dataIndex: 'spec', key: 'spec', width: 120 },
    { title: t('scheduleDescription', { defaultValue: 'Description' }), dataIndex: 'description', key: 'description', ellipsis: true },
    {
      title: t('scheduleTaskType', { defaultValue: 'Task Type' }),
      dataIndex: 'task_type',
      key: 'task_type',
      width: 300,
      render: (taskType: string) => {
        const taskTypeLabel = t(`task.type.${taskType}`, { defaultValue: taskType });
        return <Tag color="blue">{taskTypeLabel}</Tag>;
      },
    },
    {
      title: t('scheduleEnabled', { defaultValue: 'Enabled' }),
      dataIndex: 'enabled',
      key: 'enabled',
      width: 90,
      render: (enabled: boolean, record: API.ScheduledJobState) => (
        <PermissionGuard permission="task:schedule:update">
          <Switch checked={enabled} onChange={(checked) => handleToggle(record.id, checked)} size="small" />
        </PermissionGuard>
      ),
    },
    {
      title: t('scheduleNextRun', { defaultValue: 'Next Run' }),
      dataIndex: 'next_run',
      key: 'next_run',
      width: 170,
      render: (v: string) => (v ? new Date(v).toLocaleString() : '-'),
    },
    {
      title: t('scheduleLastRun', { defaultValue: 'Last Run' }),
      dataIndex: 'last_run',
      key: 'last_run',
      width: 170,
      render: (v: string) => (v ? new Date(v).toLocaleString() : '-'),
    },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_: unknown, record: API.ScheduledJobState) => (
        <Space size="small">
          <Tooltip title={t('viewHistory', { defaultValue: 'View history' })}>
            <Button
              type="text"
              size="small"
              icon={<HistoryOutlined />}
              onClick={() => {
                setSelectedScheduleId(record.id);
              }}
            />
          </Tooltip>
          <PermissionGuard permission="task:schedule:update">
            <Tooltip title={t('triggerNow', { defaultValue: 'Trigger now' })}>
              <Button
                type="text"
                size="small"
                icon={<PlayCircleOutlined />}
                onClick={() => handleTrigger(record.id)}
              />
            </Tooltip>
          </PermissionGuard>
        </Space>
      ),
    },
  ];

  const historyRequest = (params: API.PaginationRequest): Promise<API.PaginationResponseModelTask> => {
    console.log('historyRequest', selectedScheduleId, params);
    if (!selectedScheduleId) {
      return Promise.resolve({
        code: '0',
        data: [],
        total: 0,
        current: 1,
        page_size: 10,
        trace_id: '',
      });
    }
    return api.taskSchedules.getTaskScheduleHistory({
      id: selectedScheduleId,
      current: params.current ?? PAGINATION.DEFAULT_CURRENT,
      page_size: params.page_size ?? PAGINATION.DEFAULT_PAGE_SIZE,
    });
  };

  const handleDownload = async (fileKey: string) => {
    const res: { expires: number; signature: string } = await api.base.downloadFile({ fileKey }, { params: { method: 'sign' } });
    const url = `/api/files/${fileKey}?signature=${res.signature}&expires=${res.expires}`;
    window.open(url, '_blank');
  };

  const historyColumns: ColumnsType<API.Task> = [
    {
      title: t('scheduleTaskType', { defaultValue: 'Task Type' }),
      dataIndex: 'type',
      key: 'task_type',
      width: 300,
      render: (taskType: string) => {
        const taskTypeLabel = t(`task.type.${taskType}`, { defaultValue: taskType });
        return <Tag color="blue">{taskTypeLabel}</Tag>;
      },
    },
    {
      title: t('statusLabel', { defaultValue: 'Status' }),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: API.TaskStatus) => (
        <Tag color={statusColors[status] || 'default'}>{t(`status.${status}`, { defaultValue: status })}</Tag>
      ),
    },
    {
      title: t('progress', { defaultValue: 'Progress' }),
      dataIndex: 'progress',
      key: 'progress',
      width: 100,
      render: (progress: number, record: API.Task) =>
        record.status === 'running' || record.status === 'success' || record.status === 'pending' ? <Progress percent={progress} size="small" /> : '-',
    },
    { title: t('creatorId', { defaultValue: 'Creator' }), dataIndex: 'creator_id', key: 'creator_id', width: 120, ellipsis: true },
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
      width: 140,
      render: (_: unknown, record: API.Task) => (
        <Space size="small">
          <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => navigate(`/tasks/${record.id}`)} />
          {record.artifact_file_key && (
            <Button type="text" size="small" icon={<DownloadOutlined />} onClick={() => handleDownload(record.artifact_file_key)} />
          )}
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Card
        title={t('scheduledTasks', { defaultValue: 'Scheduled Tasks' })}
        extra={
          <Button icon={<ReloadOutlined />} onClick={() => refreshSchedules()}>
            {tCommon('refresh', { defaultValue: 'Refresh' })}
          </Button>
        }
      >
        <Table
          rowKey="id"
          columns={scheduleColumns}
          dataSource={scheduleList}
          loading={schedulesLoading}
          pagination={false}
          scroll={{ x: 900 }}
        />
      </Card>
      {selectedScheduleId && (
        <Card
          title={t('executionHistory', { defaultValue: 'Execution History' })}
          extra={
            <Button type="text" size="small" onClick={() => setSelectedScheduleId(null)}>
              {tCommon('close', { defaultValue: 'Close' })}
            </Button>
          }
        >
          <ProTable<API.Task>
            actionRef={historyTableRef}
            request={historyRequest}
            columns={historyColumns}
            rowKey="id"
            scroll={{ x: 800 }}
          />
        </Card>
      )}
    </Space>
  );
};

export default TaskScheduleList;
