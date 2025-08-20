import React, { useState } from 'react';
import { Card, Button, Steps, Input, Alert, message, Result, QRCode, Space, Modal, Segmented, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import api from '@/service/api';
import { ClockCircleFilled, EyeInvisibleOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';

interface ProfileMFAProps {
  user: API.User | null;
  onSuccess: () => void;
}

const ProfileMFA: React.FC<ProfileMFAProps> = ({ user, onSuccess }) => {
  const { t } = useTranslation('authorization');
  const { t: tCommon } = useTranslation('common');
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mfaSecretHidden, setMfaSecretHidden] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [mfaType, setMfaType] = useState<'totp' | 'email'>('totp');

  const { run: handleEnableMFA, data: enableMFAData = { secret: '', qr_code: '', token: undefined } } = useRequest(
    () => api.authorization.enableMfa(mfaType),
    {
      manual: true,
      onSuccess: () => {
        setCurrentStep(1);
      },
      onBefore: () => { setLoading(true); },
      onFinally: () => { setLoading(false); }
    }
  )

  const handleVerifyMFA = async () => {
    if (!verificationCode) {
      message.warning(t('mfa.enterVerificationCode'));
      return;
    }
    const data: API.VerifyAndActivateMFARequest = {
      code: verificationCode,
      mfa_type: mfaType,
    }
    if ('token' in enableMFAData) {
      data.token = enableMFAData.token
    }
    try {
      setLoading(true);
      await api.authorization.verifyAndActivateMfa(data);
      message.success(t('mfa.enableSuccess'));
      setCurrentStep(2);
      onSuccess();
    } catch (error) {
      message.error(t('mfa.verificationFailed'));
      console.error('Failed to verify MFA:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisableMFA = async () => {
    try {
      setLoading(true);
      await api.authorization.disableMfa();
      message.success(t('mfa.disableSuccess'));
      onSuccess();
    } catch (error) {
      message.error(tCommon('operationFailed'));
      console.error('Failed to disable MFA:', error);
    } finally {
      setLoading(false);
    }
  };

  // Render MFA status
  const renderMFAStatus = () => {
    if (!user) return null;

    if (user.mfa_enabled) {
      return (
        <Result
          status="success"
          title={t('mfa.enabled')}
          subTitle={t('mfa.enabledDescription')}
          extra={
            <Button
              danger
              onClick={() => {
                Modal.confirm({
                  title: t('mfa.confirmDisable'),
                  content: t('mfa.disableWarning'),
                  onOk: handleDisableMFA,
                  okButtonProps: { danger: true },
                });
              }}
            >
              {t('mfa.disable')}
            </Button>
          }
        />
      );
    }

    const renderMFACurrentStep = () => {
      switch (currentStep) {
        case 0:
          return <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Alert
              message={<div>
                <p>{t('mfa.setupInfo')}</p>
                <p>{mfaType === 'totp' ? t('mfa.totpDescription') : t('mfa.emailDescription')}</p>
              </div>}
              type="info"
              showIcon
              style={{ marginBottom: 20 }}
            />
            <Button
              type="primary"
              onClick={handleEnableMFA}
              loading={loading}
            >
              {t('mfa.startSetup')}
            </Button>
          </div>
        case 1:
          return <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Alert
              message={t('mfa.scanQrCode')}
              type="info"
              showIcon
              style={{ marginBottom: 20, display: mfaType === 'totp' ? 'block' : 'none' }}
            />
            <div style={{ display: mfaType === 'totp' ? 'flex' : 'none', justifyContent: 'center', marginBottom: 24 }}>
              <QRCode value={enableMFAData.qr_code ?? ''} size={200} />
            </div>
            <div style={{ marginBottom: 16, display: mfaType === 'email' ? 'block' : 'none' }}>
              <p>
                {t('user.email')}: <strong>{user?.email}</strong>
              </p>
            </div>
            <div style={{ marginBottom: 16, display: mfaType === 'totp' ? 'block' : 'none' }}>
              <p>
                {t('mfa.secretKey')}: <strong>{mfaSecretHidden ? '*'.repeat(enableMFAData.secret?.length ?? 0) : enableMFAData.secret}</strong>
                <Button
                  type="link"
                  onClick={() => setMfaSecretHidden(!mfaSecretHidden)}
                  icon={mfaSecretHidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                />
              </p>
            </div>

            <div style={{ marginBottom: 24 }}>
              <Input
                placeholder={t('mfa.enterCode')}
                style={{ width: 200 }}
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            <Space>
              <Button onClick={() => setCurrentStep(0)}>{tCommon('previous')}</Button>
              <Button
                type="primary"
                onClick={handleVerifyMFA}
                loading={loading}
              >
                {tCommon('verify')}
              </Button>
            </Space>
          </div>
        case 2:
          return <Result
            status="success"
            title={t('mfa.setupSuccess')}
            subTitle={t('mfa.setupSuccessDescription')}
            extra={
              <Button type="primary" onClick={() => setCurrentStep(0)}>
                {tCommon('done')}
              </Button>
            }
          />
        default:
          return null;
      }
    }

    return (
      <div >
        <div style={{ display: currentStep === 2 ? 'none' : 'unset' }}>
          <Segmented
            defaultValue="totp"
            onChange={(value) => {
              setMfaType(value as 'totp' | 'email')
              setCurrentStep(0)
            }}
            value={mfaType}
            options={[
              { value: 'totp', icon: <ClockCircleFilled />, label: t('mfa.totp', { defaultValue: 'TOTP' }) },
              { value: 'email', icon: <MailOutlined />, label: t('mfa.email', { defaultValue: 'E-Mail' }) },
            ]}
          />
          <Divider />
        </div>
        <Steps
          current={currentStep}
          items={[
            { title: mfaType === 'totp' ? t('mfa.totpStep1') : t('mfa.emailStep1'), description: mfaType === 'totp' ? t('mfa.totpStep1Description') : t('mfa.emailStep1Description') },
            { title: mfaType === 'totp' ? t('mfa.totpStep2') : t('mfa.emailStep2'), description: mfaType === 'totp' ? t('mfa.totpStep2Description') : t('mfa.emailStep2Description') },
            { title: mfaType === 'totp' ? t('mfa.totpStep3') : t('mfa.emailStep3'), description: mfaType === 'totp' ? t('mfa.totpStep3Description') : t('mfa.emailStep3Description') },
          ]}
          style={{ marginBottom: 30 }}
        />
        {renderMFACurrentStep()}
      </div>
    );
  };

  return (
    <Card title={t('mfa.title')}>
      {renderMFAStatus()}
    </Card>
  );
};

export default ProfileMFA; 