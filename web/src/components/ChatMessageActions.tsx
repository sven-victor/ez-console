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

import { Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface DisplayToolCall {
  id: string;
  name: string;
  arguments: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  title?: string;
}

function formatArguments(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
}

const useStyle = createStyles(({ token, css }) => ({
  root: css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    width: 100%;
    margin-top: 2px;
  `,
  rootEnd: css`
    align-items: flex-end;
  `,
  actions: css`
    display: flex;
    align-items: center;
    gap: 2px;
    width: fit-content;
  `,
  action: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: ${token.colorTextSecondary};
    cursor: pointer;
    &:hover {
      background: ${token.colorPrimaryBg};
      color: ${token.colorText};
    }
  `,
  chevron: css`
    transform: rotate(0deg);
    transition: transform 0.15s ease;
  `,
  chevronOpen: css`
    transform: rotate(90deg);
  `,
  rows: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
    &[hidden] {
      display: none;
    }
  `,
  run: css`
    width: 100%;
    margin: 0;
    color: ${token.colorTextSecondary};
    font-size: 12px;
  `,
  summary: css`
    display: flex;
    align-items: baseline;
    gap: 8px;
    min-width: 0;
    max-width: 100%;
    cursor: pointer;
  `,
  line: css`
    display: flex;
    align-items: baseline;
    gap: 8px;
    min-width: 0;
    max-width: 100%;
    margin: 0;
  `,
  name: css`
    flex: 0 0 auto;
    color: ${token.colorTextSecondary};
    font-family: ${token.fontFamilyCode};
    font-size: 11px;
  `,
  title: css`
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    color: ${token.colorText};
    font-weight: 650;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  status: css`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 6px;
    color: ${token.colorTextSecondary};
    font-size: 11px;
    &::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: ${token.colorPrimary};
    }
  `,
  statusRunning: css`
    color: ${token.colorPrimary};
    &::before {
      animation: chat-tool-pulse 1s ease-in-out infinite;
    }
    @keyframes chat-tool-pulse {
      50% { opacity: 0.35; }
    }
    @media (prefers-reduced-motion: reduce) {
      &::before { animation: none; }
    }
  `,
  statusFailed: css`
    color: ${token.colorError};
    &::before {
      background: ${token.colorError};
    }
  `,
  pre: css`
    margin: 4px 0 0;
    white-space: pre-wrap;
    color: ${token.colorText};
    font-size: 12px;
    font-family: ${token.fontFamilyCode};
  `,
}));

function Chevron({ open }: { open: boolean }) {
  const { styles, cx } = useStyle();
  return (
    <svg className={cx(styles.chevron, open && styles.chevronOpen)} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 4.5 10 8 6 11.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="6" y="6" width="7" height="7" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6V4.2A1.2 1.2 0 0 0 8.8 3H4.2A1.2 1.2 0 0 0 3 4.2v4.6A1.2 1.2 0 0 0 4.2 10H6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.2 6.4 11 12.5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ToolLabel({ call }: { call: DisplayToolCall }) {
  const { styles, cx } = useStyle();
  const { t } = useTranslation('ai');
  const pending = call.status === 'running' || call.status === 'pending';
  const failed = call.status === 'failed';
  const label = failed
    ? t('chat.toolFailed', { defaultValue: 'Failed' })
    : pending
      ? t('chat.toolRunning', { defaultValue: 'Running' })
      : t('chat.toolDone', { defaultValue: 'Done' });
  const title = call.title?.trim();
  return (
    <>
      <code className={styles.name}>{call.name}</code>
      {title ? <span className={styles.title} title={title}>{title}</span> : null}
      <span className={cx(styles.status, pending && styles.statusRunning, failed && styles.statusFailed)}>{label}</span>
    </>
  );
}

function ToolRun({ call }: { call: DisplayToolCall }) {
  const { styles } = useStyle();
  const pending = call.status === 'running' || call.status === 'pending';
  if (!call.arguments) {
    return (
      <section className={styles.run} aria-busy={pending}>
        <p className={styles.line}><ToolLabel call={call} /></p>
      </section>
    );
  }
  return (
    <section className={styles.run} aria-busy={pending}>
      <details className={styles.run}>
        <summary className={styles.summary}><ToolLabel call={call} /></summary>
        <pre className={styles.pre}>{formatArguments(call.arguments)}</pre>
      </details>
    </section>
  );
}

export function ChatMessageActions({
  text,
  tools = [],
  live = false,
  align = 'start',
}: {
  text: string;
  tools?: DisplayToolCall[];
  live?: boolean;
  align?: 'start' | 'end';
}) {
  const { styles, cx } = useStyle();
  const { t } = useTranslation('ai');
  const [open, setOpen] = useState(live);
  const [copied, setCopied] = useState(false);
  const copyTip = copied
    ? t('chat.copied', { defaultValue: 'Copied' })
    : t('chat.copyMessage', { defaultValue: 'Copy message' });
  const foldTip = open
    ? t('chat.hideToolCalls', { defaultValue: 'Hide tool calls' })
    : t('chat.showToolCalls', { defaultValue: 'Show tool calls' });

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  if (!text && tools.length === 0) {
    return null;
  }

  return (
    <div className={cx('chat-message-actions', styles.root, align === 'end' && styles.rootEnd, open && tools.length > 0 && 'has-tools')}>
      <div className={styles.actions}>
        {text ? (
          <Tooltip title={copyTip} placement="bottom">
            <button type="button" className={styles.action} aria-label={copyTip} onClick={() => void copyMessage()}>
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </Tooltip>
        ) : null}
        {tools.length > 0 ? (
          <Tooltip title={foldTip} placement="bottom">
            <button
              type="button"
              className={styles.action}
              aria-expanded={open}
              aria-label={foldTip}
              onClick={() => setOpen((value) => !value)}
            >
              <Chevron open={open} />
            </button>
          </Tooltip>
        ) : null}
      </div>
      {tools.length > 0 ? (
        <div className={cx('chat-tool-log', styles.rows)} hidden={!open}>
          {tools.map((call) => (
            <ToolRun key={call.id} call={call} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
