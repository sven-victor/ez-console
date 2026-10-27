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

import { Button, Collapse, Flex, Typography } from 'antd';
import { createStyles } from 'antd-style';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface HITLCardProps {
  card: API.HITLCard;
  /** True while this bubble's resume request is in flight. Every selected button shows loading. */
  submitting?: boolean;
  onSelect?: (optionId: string) => void;
}

const useStyle = createStyles(({ token, css }) => ({
  wrap: css`
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadiusLG}px;
    background: ${token.colorFillAlter};
  `,
  header: css`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px 8px;
    min-width: 0;
    margin-bottom: 4px;
  `,
  title: css`
    font-weight: 600;
    line-height: 1.4;
    word-break: break-word;
  `,
  description: css`
    font-size: 13px;
    line-height: 1.45;
    color: ${token.colorTextSecondary};
    word-break: break-word;
  `,
  toolName: css`
    font-size: 12px;
    font-weight: 400;
    word-break: break-all;
  `,
  arguments: css`
    .ant-collapse-header {
      padding-inline: 0 !important;
      padding-block: 4px !important;
    }
    .ant-collapse-content-box {
      padding-inline: 0 !important;
      padding-block: 4px 0 !important;
    }
  `,
  argsPre: css`
    margin: 0;
    max-height: 160px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 12px;
    line-height: 1.45;
  `,
  actions: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `,
  action: css`
    height: auto;
    min-height: 32px;
    padding-block: 4px;
    padding-inline: 12px;
    white-space: normal;
    text-align: left;
  `,
}));

function formatToolArguments(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    return '';
  }
  try {
    return JSON.stringify(JSON.parse(trimmed), null, 2);
  } catch {
    return trimmed;
  }
}

function cardDescription(card: API.HITLCard): string {
  const fromCard = (card as API.HITLCard & { description?: string }).description;
  if (typeof fromCard === 'string' && fromCard.trim()) {
    return fromCard.trim();
  }
  try {
    const parsed = JSON.parse(card.arguments || '{}') as { description?: unknown };
    return typeof parsed.description === 'string' ? parsed.description.trim() : '';
  } catch {
    return '';
  }
}

function selectedOptionLabel(card: API.HITLCard, selectedId: string): string {
  const selected = card.options?.find((option) => option.id === selectedId);
  return selected?.label || selectedId || '…';
}

/**
 * In-bubble approval or choice card. Buttons stay in the chat footer;
 * this component never opens a modal or confirmation popup.
 */
export const HITLCard: React.FC<HITLCardProps> = ({
  card,
  submitting = false,
  onSelect,
}) => {
  const { t } = useTranslation('ai');
  const { styles } = useStyle();
  const formattedArgs = formatToolArguments(card.arguments || '');
  // Local selection so the first of N cards highlights immediately, even if
  // Bubble.List has not re-rendered the store snapshot yet.
  const [localSelectedId, setLocalSelectedId] = useState(card.selected_option_id || '');
  useEffect(() => {
    setLocalSelectedId(card.selected_option_id || '');
  }, [card.selected_option_id, card.tool_call_id]);

  const selectedId = localSelectedId || card.selected_option_id || '';
  const heading = card.title?.trim() || card.tool_name;
  const showToolName = Boolean(card.title?.trim() && card.tool_name && card.title.trim() !== card.tool_name && card.tool_name !== 'ui_choose');
  const isChoice = card.kind === 'choice' || card.tool_name === 'ui_choose';
  const description = cardDescription(card);
  const showArguments = !isChoice && Boolean(formattedArgs);
  const showSummary = card.status === 'abandoned' || card.status === 'decided';

  let body: React.ReactNode;
  if (card.status === 'abandoned') {
    body = (
      <Typography.Text type="secondary">
        {t('chat.hitlAbandoned', { defaultValue: 'You continued without choosing.' })}
      </Typography.Text>
    );
  } else if (showSummary && selectedId) {
    body = (
      <Typography.Text>
        {t('chat.hitlChose', {
          defaultValue: 'You chose {{label}}.',
          label: selectedOptionLabel(card, selectedId),
        })}
      </Typography.Text>
    );
  } else if (showSummary) {
    body = (
      <Typography.Text>
        {t('chat.hitlChose', {
          defaultValue: 'You chose {{label}}.',
          label: '…',
        })}
      </Typography.Text>
    );
  } else {
    body = (
      <div className={styles.actions}>
        {(card.options ?? []).map((option) => {
          const selected = selectedId === option.id;
          return (
            <Button
              key={option.id}
              className={styles.action}
              type={selected ? 'primary' : 'default'}
              loading={submitting && selected}
              disabled={submitting}
              onClick={() => {
                setLocalSelectedId(option.id);
                onSelect?.(option.id);
              }}
            >
              <Flex vertical align="flex-start">
                <span>{option.label}</span>
                {option.description ? (
                  <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.85 }}>
                    {option.description}
                  </span>
                ) : null}
              </Flex>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.title}>{heading}</span>
        {showToolName ? (
          <Typography.Text className={styles.toolName} type="secondary" code>
            {card.tool_name}
          </Typography.Text>
        ) : null}
      </div>
      <Flex vertical gap={8}>
        {description ? (
          <div className={styles.description}>{description}</div>
        ) : null}
        {showArguments ? (
          <Collapse
            className={styles.arguments}
            ghost
            size="small"
            items={[{
              key: 'arguments',
              label: t('chat.hitlArguments', { defaultValue: 'Arguments' }),
              children: (
                <pre className={styles.argsPre}>
                  {formattedArgs}
                </pre>
              ),
            }]}
          />
        ) : null}
        {body}
      </Flex>
    </div>
  );
};

export default HITLCard;
