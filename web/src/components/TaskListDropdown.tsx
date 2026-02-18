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
import { UnorderedListOutlined, DownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { List, Tag, Progress, Button, Typography } from 'antd';
import HeaderDropdown from './HeaderDropdown';
import { useSite } from '@/contexts/SiteContext';
import api from '@/service/api';

const statusColors: Record<API.TaskStatus, string> = {
  pending: 'default',
  running: 'processing',
  success: 'success',
  failed: 'error',
  cancelled: 'default',
};

const TaskListDropdown: React.FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation('task');
  const navigate = useNavigate();

  const { tasks, tasksDropdownOpen, setTasksDropdownOpen } = useSite();

  const handleDownload = async (fileKey: string) => {
    const res: { expires: number, signature: string } = await api.base.downloadFile({ fileKey }, { params: { method: 'sign' } });
    const url = `/api/files/${fileKey}?signature=${res.signature}&expires=${res.expires}`;
    window.open(url, '_blank');
  };
  const overlay = () => (
    <div style={{ width: 520, maxHeight: 500, overflow: 'auto', padding: 8 }}>
      <List
        size="small"
        dataSource={tasks}
        renderItem={(item: API.Task) => (
          <List.Item
            key={item.id}
            extra={
              <Tag color={statusColors[item.status]} style={{ marginLeft: 6 }}>
                {t(`status.${item.status}`, { defaultValue: item.status })}
              </Tag>
            }
            actions={[
              item.artifact_file_key && (
                <Button
                  type="text"
                  size="small"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload(item.artifact_file_key)}
                />
              ),
            ].filter(Boolean)}
          >
            <List.Item.Meta
              title={
                <span style={{ fontSize: 13 }}>
                  <Typography.Text ellipsis={{ tooltip: true }}>
                    {t(`type.${item.type}`, { defaultValue: item.type })} {item.artifact_file_name && `- ${item.artifact_file_name}`}
                  </Typography.Text>
                </span>
              }
              description={
                (item.status === 'running' || item.status === 'pending') && (
                  <Progress percent={item.progress ?? 0} size="small" style={{ marginTop: 4 }} />
                )
              }
            />
          </List.Item>
        )}
      />
      <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 8, marginTop: 8, textAlign: 'center' }}>
        <Button type="link" size="small" onClick={() => navigate('/tasks')}>
          {t('more', { defaultValue: 'More' })}
        </Button>
      </div>
    </div>
  );
  if (!tasks || tasks.length === 0) {
    return null;
  }
  return (
    <HeaderDropdown className={className} overlay={overlay} placement="bottomRight" open={tasksDropdownOpen} onOpenChange={setTasksDropdownOpen}>
      <UnorderedListOutlined style={{ marginRight: 4 }} />
      <span style={{ height: '1em', lineHeight: '1em', marginLeft: 2 }}>{t('tasks', { defaultValue: 'Tasks' })}</span>
    </HeaderDropdown>
  );
};

export default TaskListDropdown;
