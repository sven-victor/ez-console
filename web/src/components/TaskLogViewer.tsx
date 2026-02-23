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
import { Card, Spin, Empty, Typography } from 'antd';
import { useRequest } from 'ahooks';
import api from '@/service/api';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface TaskLogViewerProps {
  taskId: string;
  /** When true, poll logs every 2 seconds (e.g. while task is running) */
  poll?: boolean;
}

const levelColors: Record<string, string> = {
  debug: 'default',
  info: 'processing',
  warn: 'warning',
  error: 'error',
};

const TaskLogViewer: React.FC<TaskLogViewerProps> = ({ taskId, poll }) => {
  const { t } = useTranslation('task');

  const { data: logs = [], loading } = useRequest(
    () => (taskId ? api.tasks.getTaskLogs({ id: taskId }) : Promise.reject(new Error('No task id'))),
    {
      refreshDeps: [taskId],
      ready: !!taskId,
      pollingInterval: poll ? 2000 : 0,
    }
  );

  return (
    <Card
      title={t('logsTitle', { defaultValue: 'Task logs' })}
      size="small"
      style={{ marginTop: 16 }}
    >
      {loading && !logs.length ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <Spin />
        </div>
      ) : !logs.length ? (
        <Empty description={t('noLogs', { defaultValue: 'No logs yet.' })} />
      ) : (
        <pre
          style={{
            margin: 0,
            padding: 12,
            maxHeight: 320,
            overflow: 'auto',
            fontSize: 12,
            background: 'var(--ant-colorFillTertiary)',
            borderRadius: 6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}
        >
          {logs.map((entry) => (
            <div key={entry.id} style={{ marginBottom: 4 }}>
              <Text type="secondary" style={{ fontSize: 11 }}>
                {entry.created_at}
              </Text>
              {entry.level && (
                <Text type={levelColors[entry.level] as 'secondary' | 'warning' | 'danger' | undefined} style={{ marginLeft: 8, fontSize: 11 }}>
                  [{entry.level}]
                </Text>
              )}
              <div style={{ display: 'inline', marginLeft: 8 }}>{entry.message}</div>
            </div>
          ))}
        </pre>
      )}
    </Card>
  );
};

export default TaskLogViewer;
