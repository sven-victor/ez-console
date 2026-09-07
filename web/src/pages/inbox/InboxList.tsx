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
import { App, Button, Card, Select, Space, Tag, Typography } from 'antd';
import { CheckOutlined, ReloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '@/service/api';
import { Table } from '@/components/Table';
import { TableRef } from '@/components/Table';
import { ColumnsType } from 'antd/es/table';
import Actions from '@/components/Actions';
import { PAGINATION } from '@/constants';
import { useSite } from '@/contexts/SiteContext';
import { inboxMessageDescription, inboxMessageTitle, isInboxUnread } from '@/utils/inbox';

const InboxList: React.FC = () => {
  const { message } = App.useApp();
  const { t } = useTranslation('inbox');
  const { t: tCommon } = useTranslation('common');
  const tableRef = useRef<TableRef<API.InboxMessage>>(null);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const skipFilterReload = useRef(true);
  const skipRevisionReload = useRef(true);
  const { inboxRevision, setInboxUnreadCount, bumpInboxRevision } = useSite();

  useEffect(() => {
    if (skipFilterReload.current) {
      skipFilterReload.current = false;
      return;
    }
    tableRef.current?.reload?.();
  }, [unreadOnly]);

  useEffect(() => {
    if (skipRevisionReload.current) {
      skipRevisionReload.current = false;
      return;
    }
    tableRef.current?.reload?.();
  }, [inboxRevision]);

  const handleMarkRead = async (id: string) => {
    try {
      await api.inbox.markInboxMessageRead({ id });
      bumpInboxRevision();
      tableRef.current?.reload?.();
    } catch {
      message.error(tCommon('error', { defaultValue: 'Operation failed' }));
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.inbox.markAllInboxMessagesRead();
      setInboxUnreadCount(0);
      bumpInboxRevision();
      tableRef.current?.reload?.();
    } catch {
      message.error(tCommon('error', { defaultValue: 'Operation failed' }));
    }
  };

  const columns: ColumnsType<API.InboxMessage> = [
    {
      title: t('typeLabel', { defaultValue: 'Type' }),
      dataIndex: 'type',
      key: 'type',
      width: 240,
      render: (_: string, record: API.InboxMessage) => (
        <Typography.Text strong={isInboxUnread(record)}>{inboxMessageTitle(t, record)}</Typography.Text>
      ),
    },
    {
      title: t('title', { defaultValue: 'Inbox' }),
      key: 'payload',
      ellipsis: true,
      render: (_: unknown, record: API.InboxMessage) => inboxMessageDescription(t, record),
    },
    {
      title: t('unread', { defaultValue: 'Unread' }),
      dataIndex: 'read_at',
      key: 'read_at',
      width: 120,
      render: (_: string | undefined, record: API.InboxMessage) =>
        isInboxUnread(record) ? (
          <Tag color="blue">{t('unread', { defaultValue: 'Unread' })}</Tag>
        ) : (
          <Tag>{t('read', { defaultValue: 'Read' })}</Tag>
        ),
    },
    {
      title: t('createdAt', { defaultValue: 'Time' }),
      dataIndex: 'created_at',
      key: 'created_at',
      width: 180,
      render: (text: string) => (text ? new Date(text).toLocaleString() : '-'),
    },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'action',
      width: 80,
      fixed: 'right',
      render: (_: unknown, record: API.InboxMessage) => (
        <Actions
          actions={[
            {
              key: 'read',
              icon: <CheckOutlined />,
              tooltip: t('markRead', { defaultValue: 'Mark as read' }),
              hidden: !isInboxUnread(record),
              onClick: () => handleMarkRead(record.id),
            },
          ]}
        />
      ),
    },
  ];

  const request = (params: API.PaginationRequest) =>
    api.inbox.listInboxMessages({
      current: params.current ?? PAGINATION.DEFAULT_CURRENT,
      page_size: params.page_size ?? PAGINATION.DEFAULT_PAGE_SIZE,
      unread: unreadOnly || undefined,
    });

  return (
    <Card
      title={t('title', { defaultValue: 'Inbox' })}
      extra={
        <Button type="link" onClick={() => void handleMarkAllRead()}>
          {t('markAllRead', { defaultValue: 'Mark all as read' })}
        </Button>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <Space wrap>
          <Select
            value={unreadOnly}
            onChange={(value) => setUnreadOnly(value)}
            options={[
              { value: false, label: t('filterAll', { defaultValue: 'All' }) },
              { value: true, label: t('filterUnread', { defaultValue: 'Unread only' }) },
            ]}
            style={{ width: 200 }}
          />
          <Button icon={<ReloadOutlined />} onClick={() => tableRef.current?.reload?.()}>
            {tCommon('refresh', { defaultValue: 'Refresh' })}
          </Button>
        </Space>
        <Table<API.InboxMessage>
          actionRef={tableRef}
          request={request}
          columns={columns}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </Space>
    </Card>
  );
};

export default InboxList;
