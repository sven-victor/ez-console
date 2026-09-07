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
import { BellOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, List, Space, Typography } from 'antd';
import HeaderDropdown from './HeaderDropdown';
import { useSite } from '@/contexts/SiteContext';
import api from '@/service/api';
import { useRequest } from 'ahooks';
import { useAuth } from '@/hooks/useAuth';
import { inboxMessageDescription, inboxMessageTitle, isInboxUnread } from '@/utils/inbox';

const DROPDOWN_PAGE_SIZE = 20;

const InboxDropdown: React.FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation('inbox');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { inboxUnreadCount, inboxRevision, setInboxUnreadCount, bumpInboxRevision } = useSite();
  const [open, setOpen] = useState(false);

  const { data: messages = [], loading, run: fetchMessages } = useRequest(
    async () => {
      const res = await api.inbox.listInboxMessages({
        current: 1,
        page_size: DROPDOWN_PAGE_SIZE,
      });
      return res.data ?? [];
    },
    {
      ready: !!user,
      refreshDeps: [user?.id, inboxRevision],
    },
  );

  const handleMarkRead = async (id: string) => {
    await api.inbox.markInboxMessageRead({ id });
    bumpInboxRevision();
    fetchMessages();
  };

  const handleMarkAllRead = async () => {
    await api.inbox.markAllInboxMessagesRead();
    setInboxUnreadCount(0);
    bumpInboxRevision();
    fetchMessages();
  };

  const overlay = () => (
    <div style={{ width: 420, maxHeight: 500, overflow: 'auto', padding: 8 }}>
      <List
        size="small"
        dataSource={messages}
        loading={loading}
        locale={{ emptyText: t('empty', { defaultValue: 'No messages' }) }}
        renderItem={(item: API.InboxMessage) => {
          const unread = isInboxUnread(item);
          return (
            <List.Item
              key={item.id}
              style={{ cursor: unread ? 'pointer' : 'default' }}
              onClick={() => {
                if (unread) {
                  void handleMarkRead(item.id);
                }
              }}
            >
              <List.Item.Meta
                title={
                  <Typography.Text strong={unread} ellipsis={{ tooltip: true }}>
                    {inboxMessageTitle(t, item)}
                  </Typography.Text>
                }
                description={
                  <Space direction="vertical" size={0} style={{ width: '100%' }}>
                    <Typography.Text type="secondary" ellipsis={{ tooltip: true }}>
                      {inboxMessageDescription(t, item)}
                    </Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {item.created_at ? new Date(item.created_at).toLocaleString() : ''}
                    </Typography.Text>
                  </Space>
                }
              />
            </List.Item>
          );
        }}
      />
      <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 8, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
        <Button type="link" size="small" disabled={inboxUnreadCount <= 0} onClick={() => void handleMarkAllRead()}>
          {t('markAllRead', { defaultValue: 'Mark all as read' })}
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            setOpen(false);
            navigate('/inbox');
          }}
        >
          {t('viewAll', { defaultValue: 'View all' })}
        </Button>
      </div>
    </div>
  );

  return (
    <HeaderDropdown className={className} overlay={overlay} placement="bottomRight" open={open} onOpenChange={setOpen}>
      <Badge count={inboxUnreadCount} size="small" overflowCount={99} >
        <BellOutlined style={{ marginRight: 4, height: 18, width: 18, fontSize: 18 }} />
      </Badge>
      {/* <span style={{ height: '1em', lineHeight: '1em', marginLeft: 2 }}>{t('bell', { defaultValue: 'Notifications' })}</span> */}
    </HeaderDropdown>
  );
};

export default InboxDropdown;
