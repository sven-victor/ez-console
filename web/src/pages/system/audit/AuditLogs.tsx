import React from 'react';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import UserAuditLogs from '@/components/authorization/UserAuditLogs';
import { getAllAuditLogs } from '@/api/system';

const AuditLogs: React.FC = () => {
  const { t } = useTranslation('system');

  return (
    <Card title={t('audit.title', { defaultValue: 'Audit Logs' })}>
      <UserAuditLogs request={getAllAuditLogs} columnsFilter={(columns) => {
        return [
          {
            title: t('audit.columns.username', { defaultValue: 'Username' }),
            dataIndex: 'username',
            key: 'username',
          },
          ...columns
        ]
      }} />
    </Card>
  );
};

export default AuditLogs; 