import React, { lazy, useState } from 'react';
import { FloatButton, Modal, Tooltip } from 'antd';
import { RobotOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { withSuspense } from '@/routes';

const AIChatDialog = lazy(() => import('./AIChat'));


const AIChatButton: React.FC = () => {
  const { t } = useTranslation('ai');
  const [chatVisible, setChatVisible] = useState(false);

  const handleOpenChat = () => {
    setChatVisible(true);
  };

  const handleCloseChat = () => {
    setChatVisible(false);
  };
  console.log(chatVisible)
  return (
    <>
      <Tooltip
        title={t('chat.openAssistant', { defaultValue: 'Open AI Assistant' })}
        placement="left"
      >
        <FloatButton
          icon={<RobotOutlined />}
          type="primary"
          onClick={handleOpenChat}
          style={{
            right: 24,
            bottom: 24,
          }}
        />
      </Tooltip>
      <Modal
        width={1200}
        open={chatVisible}
        onCancel={handleCloseChat}
        footer={null}
      >
        {withSuspense(AIChatDialog)}
      </Modal>
    </>
  );
};

export default AIChatButton;
