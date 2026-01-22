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
import { Table, Button, Tag, Popconfirm, message, Space, Card, Typography, Empty } from 'antd';
import { useTranslation } from 'react-i18next';
import api from '@/service/api';
import { GlobalOutlined, ClockCircleOutlined, LaptopOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';

const { Text } = Typography;


const ProfileSessions: React.FC = () => {
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const [terminatingId, setTerminatingId] = useState<string | null>(null);
  const [terminatingAll, setTerminatingAll] = useState(false);

  const { data: sessions = [], loading, run: fetchSessions } = useRequest(() => {
    return api.authorization.getUserSessions({});
  }, {
    onError: (error) => {
      message.error(t('session.getSessionsFailed', { error: error, defaultValue: 'Failed to get session list: {{error}}' }));
    },
  });

  const { run: handleTerminateSession } = useRequest((sessionId: string) => {
    return api.authorization.terminateSession({ id: sessionId });
  }, {
    onSuccess: () => {
      message.success(t('session.terminateSuccess', { defaultValue: 'Session terminated successfully' }));
      fetchSessions();
    },
    onError: (error) => {
      message.error(t('session.terminateFailed', { error: error, defaultValue: 'Failed to terminate session: {{error}}' }));
    },
    onFinally: () => {
      setTerminatingId(null);
    },
    onBefore: ([sessionId]) => {
      setTerminatingId(sessionId);
    },
    manual: true,
  });

  const { run: handleTerminateOtherSessions } = useRequest(() => {
    return api.authorization.terminateOtherSessions();
  }, {
    onSuccess: () => {
      message.success(t('session.terminateAllSuccess', { defaultValue: 'All other sessions terminated successfully' }));
      fetchSessions();
    },
    onError: (error) => {
      message.error(t('session.terminateAllFailed', { error: error, defaultValue: 'Failed to terminate all other sessions: {{error}}' }));
    },
    onFinally: () => {
      setTerminatingAll(false);
    },
    onBefore: () => {
      setTerminatingAll(true);
    },
    manual: true,
  });
  const columns = [
    {
      title: t('session.device'),
      dataIndex: 'user_agent',
      key: 'device',
      render: (userAgent: string, record: API.SessionInfo) => (
        <Space direction="vertical" size={0}>
          <Space>
            <LaptopOutlined />
            <Text strong>{userAgent}</Text>
          </Space>
          <Space>
            <EnvironmentOutlined />
            <Text type="secondary">{record.location}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: t('session.ipAddress'),
      dataIndex: 'ip_address',
      key: 'ip_address',
      render: (ip: string) => (
        <Space>
          <GlobalOutlined />
          <span>{ip}</span>
        </Space>
      ),
    },
    {
      title: t('session.lastActive'),
      dataIndex: 'last_active_at',
      key: 'last_active',
      render: (time: string) => (
        <Space>
          <ClockCircleOutlined />
          <span>{new Date(time).toLocaleString()}</span>
        </Space>
      ),
    },
    {
      title: t('session.status'),
      key: 'status',
      render: (record: API.SessionInfo) => (
        record.is_current ? (
          <Tag color="green">{t('session.current')}</Tag>
        ) : (
          <Tag color="blue">{t('session.active')}</Tag>
        )
      ),
    },
    {
      title: tCommon('actions'),
      key: 'action',
      render: (record: API.SessionInfo) => {
        if (record.is_current) {
          return <Text type="secondary">{t('session.currentSession')}</Text>;
        }
        return (
          <Popconfirm
            title={t('session.confirmTerminate')}
            onConfirm={() => handleTerminateSession(record.id)}
            okText={tCommon('confirm')}
            cancelText={tCommon('cancel')}
          >
            <Button
              type="link"
              danger
              loading={terminatingId === record.id}
            >
              {t('session.terminate')}
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <Card
      title={t('session.title')}
      loading={loading}
      extra={
        <Space>
          {sessions.length > 1 && (
            <Popconfirm
              title={t('session.confirmTerminateAll')}
              onConfirm={handleTerminateOtherSessions}
              okText={tCommon('confirm')}
              cancelText={tCommon('cancel')}
            >
              <Button
                danger
                loading={terminatingAll}
              >
                {t('session.terminateOthers')}
              </Button>
            </Popconfirm>
          )}
          <Button onClick={() => fetchSessions()} loading={loading}>{tCommon('refresh')}</Button>
        </Space>
      }
    >
      {!loading && sessions.length === 0 ? (
        <Empty description={t('session.noSessions')} />
      ) : (
        <Table
          columns={columns}
          dataSource={sessions}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      )}
    </Card>
  );
};

export default ProfileSessions; 