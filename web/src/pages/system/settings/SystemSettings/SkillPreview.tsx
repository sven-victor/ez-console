/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 */

import React, { useMemo, lazy, Suspense } from 'react';
import { Card, Button, Spin, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import api from '@/service/api';
import { markdownWithMetadataAsTable } from '@/utils/skillPreview';
import { Loading } from '@/index';

const MarkdownViewer = lazy(() => import('@/components/MarkdownViewer'));

const SkillPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('system');

  const { data: skill, loading: skillLoading } = useRequest(
    () => (id ? api.system.getSkill({ id }) : Promise.reject(new Error('No id'))),
    { refreshDeps: [id], ready: !!id }
  );

  const { data: previewRes, loading: previewLoading, mutate } = useRequest(
    () => (id ? api.system.previewSkill({ id }) : Promise.reject(new Error('No id'))),
    {
      refreshDeps: [id],
      ready: !!id,
      onError: () => message.error(t('settings.skills.previewFailed', { defaultValue: 'Failed to load preview' })),
      onBefore: () => mutate(),
    }
  );

  const skillData = (skill as any)?.data ?? skill;

  const contentTabs = useMemo(() => {
    return previewRes?.map((preview) => {
      return {
        key: preview.file_name,
        label: preview.file_name,
        children: <Suspense fallback={<Loading />}>
          <MarkdownViewer content={markdownWithMetadataAsTable(preview.content)} />
        </Suspense>
      }
    })
  }, [previewRes])

  if (!id) return null;

  const loading = skillLoading || previewLoading;


  return (
    <Spin spinning={loading}  >
      <Card
        title={skillData?.name ?? t('settings.skills.editor.previewTitle', { defaultValue: 'Skill Preview' })}
        extra={
          <Button type="link" onClick={() => navigate('/system/settings#skills')}>
            {t('settings.skills.editor.backToSkills', { defaultValue: 'Back to Skills' })}
          </Button>
        }
        tabList={contentTabs}
      />
    </Spin>
  );
};

export default SkillPreview;
