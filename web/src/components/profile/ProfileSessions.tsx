import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Popconfirm, message, Space, Card, Typography, Empty } from 'antd';
import { useTranslation } from 'react-i18next';
import api from '@/service/api';
import { GlobalOutlined, ClockCircleOutlined, LaptopOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Text } = Typography;


const ProfileSessions: React.FC = () => {
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const [sessions, setSessions] = useState<API.SessionInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [terminatingId, setTerminatingId] = useState<string | null>(null);
  const [terminatingAll, setTerminatingAll] = useState(false);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      // Use actual API to get session list
      const data = await api.authorization.getUserSessions({});
      setSessions(data);
    } catch (error) {
      message.error(t('session.getSessionsFailed', { error: error, defaultValue: 'Failed to get session list: {{error}}' }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleTerminateSession = async (sessionId: string) => {
    try {
      setTerminatingId(sessionId);
      // Call actual API to terminate session
      await api.authorization.terminateSession({ id: sessionId });

      // Update local status
      setSessions(sessions.filter(session => session.id !== sessionId));
      message.success(t('session.terminateSuccess', { defaultValue: 'Session terminated successfully' }));
    } catch (error) {
      message.error(t('session.terminateFailed', { error: error, defaultValue: 'Failed to terminate session: {{error}}' }));
    } finally {
      setTerminatingId(null);
    }
  };

  const handleTerminateOtherSessions = async () => {
    try {
      setTerminatingAll(true);
      // Call actual API to terminate all other sessions
      await api.authorization.terminateOtherSessions();

      // Update local status, only keep current session
      setSessions(sessions.filter(session => session.is_current));
      message.success(t('session.terminateAllSuccess', { defaultValue: 'All other sessions terminated successfully' }));
    } catch (error) {
      message.error(t('session.terminateAllFailed', { error: error, defaultValue: 'Failed to terminate all other sessions: {{error}}' }));
    } finally {
      setTerminatingAll(false);
    }
  };

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
      extra={
        sessions.length > 1 && (
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
        )
      }
    >
      {sessions.length === 0 ? (
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