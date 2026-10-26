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

import { Button, Card, Collapse, Flex, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface HITLCardProps {
  card: API.HITLCard;
  /** Option id whose button should show a loading state while the resume request is in flight. */
  submittingOptionId?: string;
  /** Disable every button, used for sibling cards while one resume is in flight. */
  disabled?: boolean;
  onSelect?: (optionId: string) => void;
}

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

function selectedOptionLabel(card: API.HITLCard): string {
  const selected = card.options?.find((option) => option.id === card.selected_option_id);
  return selected?.label || card.selected_option_id || '…';
}

/**
 * In-bubble approval or choice card. Buttons stay in the chat footer;
 * this component never opens a modal or confirmation popup.
 */
export const HITLCard: React.FC<HITLCardProps> = ({ card, submittingOptionId, disabled = false, onSelect }) => {
  const { t } = useTranslation('ai');
  const formattedArgs = formatToolArguments(card.arguments || '');
  const submitting = Boolean(submittingOptionId);

  let body: React.ReactNode;
  if (card.status === 'abandoned') {
    body = (
      <Typography.Text type="secondary">
        {t('chat.hitlAbandoned', { defaultValue: 'You continued without choosing.' })}
      </Typography.Text>
    );
  } else if (card.status === 'decided' && !submitting) {
    body = (
      <Typography.Text>
        {t('chat.hitlChose', {
          defaultValue: 'You chose {{label}}.',
          label: selectedOptionLabel(card),
        })}
      </Typography.Text>
    );
  } else {
    body = (
      <Flex vertical gap={8}>
        {(card.options ?? []).map((option) => {
          const selected = card.selected_option_id === option.id;
          const emphasized = card.selected_option_id ? selected : option.primary;
          return (
            <Button
              key={option.id}
              block
              type={emphasized ? 'primary' : 'default'}
              loading={submittingOptionId === option.id}
              disabled={disabled || (submitting && submittingOptionId !== option.id)}
              onClick={() => onSelect?.(option.id)}
            >
              <Flex vertical align="flex-start" style={{ width: '100%' }}>
                <span>{option.label}</span>
                {option.description ? (
                  <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.85, whiteSpace: 'normal', textAlign: 'left' }}>
                    {option.description}
                  </span>
                ) : null}
              </Flex>
            </Button>
          );
        })}
      </Flex>
    );
  }

  return (
    <Card
      size="small"
      style={{ maxWidth: 480 }}
      title={(
        <Flex vertical gap={0}>
          <span>{card.title}</span>
          <Typography.Text type="secondary" style={{ fontSize: 12, fontWeight: 400 }}>
            {card.tool_name}
          </Typography.Text>
        </Flex>
      )}
    >
      <Flex vertical gap={8}>
        {formattedArgs ? (
          <Collapse
            ghost
            size="small"
            items={[{
              key: 'arguments',
              label: t('chat.hitlArguments', { defaultValue: 'Arguments' }),
              children: (
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: 12 }}>
                  {formattedArgs}
                </pre>
              ),
            }]}
          />
        ) : null}
        {body}
      </Flex>
    </Card>
  );
};

export default HITLCard;
