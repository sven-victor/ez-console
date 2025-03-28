import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
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
        status="404"
        title="404"
        subTitle={t('error.notFound', { defaultValue: 'Sorry, the page you visited does not exist.' })}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            {t('error.backHome', { defaultValue: 'Back Home' })}
          </Button>
        }
      />
    </div>
  );
};

export default NotFound; 