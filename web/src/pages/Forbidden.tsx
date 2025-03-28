import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Forbidden: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Result
        status="403"
        title="403"
        subTitle={t('error.forbidden', { defaultValue: 'Sorry, you are not authorized to access this page.' })}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            {t('error.backHome', { defaultValue: 'Back Home' })}
          </Button>
        }
      />
    </div>
  );
};

export default Forbidden; 