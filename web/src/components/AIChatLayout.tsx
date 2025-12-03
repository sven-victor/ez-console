import React, { lazy, useEffect, useState } from 'react';
import { FloatButton, Modal, Tooltip } from 'antd';
import { RobotOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAI } from '@/contexts/AIContext';
import { withSuspense } from '@/routes';
import ResizeDivider from './ResizeDivider';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
const AIChatDialog = lazy(() => import('./AIChat'));


const useStyle = createStyles(({ token, css }) => {
  return {
    siderLayout: css`
      position: relative;
      height: 100vh;
    `,
    floatSiderLayout: css`
      position: fixed;
      right: 16px;
      top: 16px;
      height: calc(100vh - 32px);
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
      z-index: 1000;
      overflow: hidden;
      backdrop-filter: blur(8px);
      border: 1px solid ${token.colorBorderSecondary};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1);
      }
    `,
  };
});

export const AIChatModal: React.FC = () => {
  const { visible: chatVisible, setVisible: setChatVisible, setLoaded } = useAI()
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);
  return (
    <Modal
      width={1200}
      open={chatVisible}
      closable={false}
      onCancel={() => setChatVisible(false)}
      footer={null}
    >
      {withSuspense(AIChatDialog)}
    </Modal>
  )
}



export const AIChatSider: React.FC = () => {
  const { styles } = useStyle();
  const { layout, visible } = useAI()
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    const saved = localStorage.getItem('ai-sidebar-width');
    return saved ? parseInt(saved, 10) : 400;
  });
  const { setLoaded } = useAI()
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  useEffect(() => {
    localStorage.setItem('ai-sidebar-width', sidebarWidth.toString());
  }, [sidebarWidth]);

  const handleSidebarResize = (newWidth: number) => {
    setSidebarWidth(newWidth);
  };
  return (
    <>
      <div

        style={{
          width: `${sidebarWidth}px`,
          display: visible ? 'flex' : 'none',
          overflow: 'hidden',
          flexShrink: 0,
        }}
        className={classNames("ai-sidebar-layout", layout === 'float-sidebar' ? styles.floatSiderLayout : styles.siderLayout)}
      >
        <ResizeDivider
          onResize={handleSidebarResize}
          minWidth={300}
          maxWidth={window.innerWidth * 0.5}
        />
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            borderRadius: layout === 'float-sidebar' ? '12px' : '0',
          }}
        >
          <div>

            {withSuspense(AIChatDialog)}
          </div>
        </div>
      </div>
    </>
  )
}


export const AIChatButton: React.FC = () => {
  const { setVisible, visible } = useAI()
  const { t } = useTranslation('ai');

  return (
    <>
      <Tooltip
        title={t('chat.openAssistant', { defaultValue: 'Open AI Assistant' })}
        placement="left"
        style={{ display: visible ? 'none' : 'block' }}
      >
        <FloatButton
          icon={<RobotOutlined />}
          type="primary"
          onClick={() => setVisible(true)}
          style={{
            right: 24,
            bottom: 24,
            display: visible ? 'none' : 'block'
          }}
        />
      </Tooltip>
    </>
  );
};

