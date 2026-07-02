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

import React, { useState, useEffect } from 'react';
import { Button, Steps, Input, Alert, message, Result, QRCode, Space, Modal, Segmented, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import api from '@/service/api';
import { ClockCircleFilled, EyeInvisibleOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';

interface ProfileMFAProps {
  user?: API.User | null;
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
  const [disableModalOpen, setDisableModalOpen] = useState(false);
  const [disableMethod, setDisableMethod] = useState<'password' | 'totp' | 'email'>('password');
  const [disablePassword, setDisablePassword] = useState('');
  const [disableMfaCode, setDisableMfaCode] = useState('');
  const [disableEmailCode, setDisableEmailCode] = useState('');
  const [disableEmailToken, setDisableEmailToken] = useState('');
  const [sendCodeCountdown, setSendCodeCountdown] = useState(0);

  useEffect(() => {
    if (sendCodeCountdown <= 0) return;
    const timer = setTimeout(() => setSendCodeCountdown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [sendCodeCountdown]);

  const { run: handleEnableMFA, data: enableMFAData = { secret: '', qr_code: '', token: undefined } } = useRequest(
    () => api.authorization.enableMfa({ mfa_type: mfaType }),
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

  const closeDisableModal = () => {
    setDisableModalOpen(false);
    setDisableMethod('password');
    setDisablePassword('');
    setDisableMfaCode('');
    setDisableEmailCode('');
    setDisableEmailToken('');
    setSendCodeCountdown(0);
  };

  const { runAsync: runSendDisableCode, loading: sendCodeLoading } = useRequest(
    () => api.authorization.sendDisableMfaCode(),
    { manual: true },
  );

  const handleSendDisableCode = async () => {
    try {
      const data = await runSendDisableCode();
      setDisableEmailToken(data?.token ?? '');
      setDisableEmailCode('');
      setSendCodeCountdown(60);
      message.success(t('mfa.codeSent', { defaultValue: 'Verification code has been sent to your email' }));
    } catch (error) {
      message.error(error instanceof Error ? error.message : tCommon('operationFailed'));
      console.error('Failed to send disable-MFA code:', error);
    }
  };

  const handleDisableMFA = async () => {
    if (disableMethod === 'email') {
      if (!disableEmailToken) {
        message.warning(t('mfa.sendCodeFirst', { defaultValue: 'Please send the verification code first' }));
        return;
      }
      if (!disableEmailCode) {
        message.warning(t('mfa.enterVerificationCode'));
        return;
      }
    } else if (disableMethod === 'totp') {
      if (!disableMfaCode) {
        message.warning(t('mfa.enterVerificationCode'));
        return;
      }
    } else if (!disablePassword) {
      message.warning(t('mfa.enterPassword', { defaultValue: 'Enter your password' }));
      return;
    }
    const requestBody: API.DisableMFARequest = { password: '', mfa_code: '', email_code: '', email_token: '' };
    if (disableMethod === 'email') {
      requestBody.email_code = disableEmailCode;
      requestBody.email_token = disableEmailToken;
    } else if (disableMethod === 'totp') {
      requestBody.mfa_code = disableMfaCode;
    } else {
      requestBody.password = disablePassword;
    }
    try {
      setLoading(true);
      await api.authorization.disableMfa(requestBody);
      message.success(t('mfa.disableSuccess'));
      closeDisableModal();
      onSuccess();
    } catch (error) {
      message.error(error instanceof Error ? error.message : tCommon('operationFailed'));
      console.error('Failed to disable MFA:', error);
      if (disableMethod === 'email') {
        // The email code is single-use: after a failed attempt the token is
        // consumed, so let the user request a new code immediately.
        setDisableEmailToken('');
        setDisableEmailCode('');
        setSendCodeCountdown(0);
      }
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
            <Button danger onClick={() => setDisableModalOpen(true)}>
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
      <div>
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
    <div style={{ padding: 8 }}>
      {renderMFAStatus()}
      <Modal
        title={t('mfa.confirmDisable')}
        open={disableModalOpen}
        onOk={handleDisableMFA}
        okText={t('mfa.disable')}
        okButtonProps={{ danger: true, loading }}
        onCancel={closeDisableModal}
        destroyOnHidden
      >
        <Alert
          message={t('mfa.disableWarning')}
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <p>{t('mfa.disableVerifyDescription', { defaultValue: 'For security reasons, please verify your identity with your password or a verification code.' })}</p>
        <Segmented
          block
          value={disableMethod}
          onChange={(value) => setDisableMethod(value as 'password' | 'totp' | 'email')}
          options={[
            { value: 'password', label: t('mfa.methodPassword', { defaultValue: 'Password' }) },
            ...(user?.mfa_type === 'totp'
              ? [{ value: 'totp', label: t('mfa.totp', { defaultValue: 'TOTP' }) }]
              : []),
            { value: 'email', label: t('mfa.methodEmailCode', { defaultValue: 'Email code' }) },
          ]}
          style={{ marginBottom: 16 }}
        />
        {disableMethod === 'password' && (
          <Input.Password
            placeholder={t('mfa.enterPassword', { defaultValue: 'Enter your password' })}
            autoComplete="current-password"
            value={disablePassword}
            onChange={(e) => setDisablePassword(e.target.value)}
            onPressEnter={handleDisableMFA}
          />
        )}
        {disableMethod === 'totp' && (
          <Input
            placeholder={t('mfa.enterTotpCode', { defaultValue: 'Enter the 6-digit code from your authenticator app' })}
            maxLength={6}
            value={disableMfaCode}
            onChange={(e) => setDisableMfaCode(e.target.value)}
            onPressEnter={handleDisableMFA}
          />
        )}
        {disableMethod === 'email' && (
          <Space.Compact style={{ width: '100%' }}>
            <Input
              placeholder={t('mfa.enterEmailCode', { defaultValue: 'Enter the 6-digit code sent to your email' })}
              maxLength={6}
              value={disableEmailCode}
              onChange={(e) => setDisableEmailCode(e.target.value)}
              onPressEnter={handleDisableMFA}
            />
            <Button
              onClick={handleSendDisableCode}
              loading={sendCodeLoading}
              disabled={sendCodeCountdown > 0}
            >
              {sendCodeCountdown > 0
                ? t('mfa.resendIn', { defaultValue: 'Resend ({{seconds}}s)', seconds: sendCodeCountdown })
                : t('mfa.sendCode', { defaultValue: 'Send code' })}
            </Button>
          </Space.Compact>
        )}
      </Modal>
    </div>
  );
};

export default ProfileMFA; 