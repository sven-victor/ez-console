/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 */

import React from 'react';
import { Card, Button, Spin, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import api from '@/service/api';
import MarkdownViewer from '@/components/MarkdownViewer';
import { skillPreviewContentWithMetadataAsTable } from '@/utils/skillPreview';

const SkillPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('system');

  const { data: skill, loading: skillLoading } = useRequest(
    () => (id ? api.system.getSkill({ id }) : Promise.reject(new Error('No id'))),
    { refreshDeps: [id], ready: !!id }
  );

  const { data: previewRes, loading: previewLoading } = useRequest(
    () => (id ? api.system.previewSkill({ id }) : Promise.reject(new Error('No id'))),
    { refreshDeps: [id], ready: !!id, onError: () => message.error(t('settings.skills.previewFailed', { defaultValue: 'Failed to load preview' })) }
  );

  const skillData = (skill as any)?.data ?? skill;
  const rawContent = (previewRes as any)?.data?.content ?? (previewRes as any)?.content ?? '';
  const content = skillPreviewContentWithMetadataAsTable(rawContent);

  if (!id) return null;

  const loading = skillLoading || previewLoading;

  return (
    <Card
      title={skillData?.name ?? t('settings.skills.editor.previewTitle', { defaultValue: 'Skill Preview' })}
      extra={
        <Button type="link" onClick={() => navigate('/system/settings#skills')}>
          {t('settings.skills.editor.backToSkills', { defaultValue: 'Back to Skills' })}
        </Button>
      }
    >
      <Spin spinning={loading}>
        <div style={{ minHeight: 200 }}>
          {!loading && <MarkdownViewer content={content} />}
        </div>
      </Spin>
    </Card>
  );
};

export default SkillPreview;
