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

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  App,
  Card,
  Button,
  Input,
  Switch,
  Space,
  Timeline,
  Tag,
  Typography,
  Empty,
  Spin,
  Descriptions,
  Collapse,
  Segmented,
  Drawer,
} from 'antd';
import {
  ArrowLeftOutlined,
  SearchOutlined,
  DownloadOutlined,
  SendOutlined,
  MessageOutlined,
  ToolOutlined,
  WarningOutlined,
  FileTextOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  ApartmentOutlined,
  CloseCircleOutlined,
  AlignLeftOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import { LuMessageSquareText, LuCable } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import JsonView from '@uiw/react-json-view';
import { createStyles } from 'antd-style';
import api from '@/service/api';
import { tryParseJSON } from '@/utils';

const { Text, Title } = Typography;

type ViewMode = 'timeline' | 'sequence';
type ActorId = 'agent' | 'llm' | 'tool';

const ACTORS: ActorId[] = ['agent', 'llm', 'tool'];

const EVENT_TYPE_CONFIG: Record<
  string,
  { color: string; icon: React.ReactNode }
> = {
  llm_request: { color: 'blue', icon: <SendOutlined /> },
  llm_response: { color: 'green', icon: <MessageOutlined /> },
  token_usage: { color: 'purple', icon: <DashboardOutlined /> },
  tool_call: { color: 'orange', icon: <ToolOutlined /> },
  tool_result: { color: 'cyan', icon: <FileTextOutlined /> },
  error: { color: 'red', icon: <WarningOutlined /> },
  summary: { color: 'geekblue', icon: <FileTextOutlined /> },
};

const ACTOR_COLORS: Record<ActorId, string> = {
  agent: '#1677ff',
  llm: '#52c41a',
  tool: '#fa8c16',
};

const EVENT_ARROW_COLORS: Record<string, string> = {
  llm_request: '#1677ff',
  llm_response: '#52c41a',
  tool_call: '#fa8c16',
  tool_result: '#13c2c2',
  token_usage: '#722ed1',
  error: '#ff4d4f',
  summary: '#2f54eb',
};

const useRawBlockStyles = createStyles(({ css }) => ({
  rawToggleWrap: css`
  position: relative;
  .json-block-mode-toggle{
    right: 90px !important;
  }
`,

  rawToggleHeader: css`
    position: absolute;
    top: 6px;
    right: 20px;
    z-index: 2;
  `,

}));

const useStyles = createStyles(({ token, css }) => ({
  sequenceWrap: css`
    overflow-x: auto;
    padding: 8px 4px 16px;
  `,
  sequenceInner: css`
    min-width: 560px;
    position: relative;
  `,
  actorHeader: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    margin-bottom: 8px;
  `,
  actorBox: css`
    text-align: center;
    padding: 8px 12px;
    margin: 0 24px;
    border: 2px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
    background: ${token.colorBgContainer};
    font-weight: 600;
    font-size: 13px;
  `,
  messageList: css`
    position: relative;
  `,
  lifelineBg: css`
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    pointer-events: none;
    z-index: 0;
  `,
  lifeline: css`
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 0;
      border-left: 2px dashed ${token.colorBorderSecondary};
      transform: translateX(-50%);
    }
  `,
  messageRow: css`
    position: relative;
    z-index: 1;
    min-height: 52px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    cursor: pointer;
    border-radius: ${token.borderRadius}px;
    transition: background 0.15s;

    &:hover {
      background: ${token.colorFillTertiary};
    }
  `,
  messageRowActive: css`
    background: ${token.colorPrimaryBg} !important;
    outline: 1px solid ${token.colorPrimaryBorder};
  `,
  arrowTrack: css`
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 0;
    pointer-events: none;
  `,
  arrowLine: css`
    position: absolute;
    top: 0;
    height: 0;
    border-top-width: 2px;
    border-top-style: solid;
  `,
  arrowHead: css`
    position: absolute;
    top: -5px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  `,
  arrowLabel: css`
    position: absolute;
    top: -22px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 12px;
    line-height: 1.2;
    padding: 1px 8px;
    border-radius: 10px;
    background: ${token.colorBgElevated};
    border: 1px solid ${token.colorBorderSecondary};
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  `,
  arrowLabelFailed: css`
    background: ${token.colorErrorBg};
    border-color: ${token.colorErrorBorder};
    color: ${token.colorError} !important;
    font-weight: 600;
  `,
  noteBox: css`
    grid-column: 1 / -1;
    justify-self: center;
    max-width: 70%;
    padding: 6px 12px;
    border-radius: ${token.borderRadius}px;
    border: 1px dashed ${token.colorBorder};
    background: ${token.colorFillQuaternary};
    font-size: 12px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  `,
  noteBoxFailed: css`
    background: ${token.colorErrorBg};
    border-style: solid;
    border-color: ${token.colorErrorBorder};
    color: ${token.colorError};
    font-weight: 600;
  `,
  failIcon: css`
    font-size: 12px;
    flex-shrink: 0;
  `,
  stepMeta: css`
    position: absolute;
    left: 4px;
    top: 4px;
    font-size: 11px;
    color: ${token.colorTextSecondary};
    z-index: 2;
  `,
}));

interface JsonPayload {
  /** Text rendered by the default <pre> view. */
  text: string;
  /** Parsed object for the JsonView toggle; absent when text is not a JSON object/array. */
  value?: object;
}

/**
 * Trace event pre-parsed once per fetch (see buildParsedEvents), so render
 * components never call JSON.parse on the potentially multi-MB contents.
 */
interface ParsedTraceEvent {
  event: API.AITraceEvent;
  isJSON: boolean;
  /** Result of parsing event.content (null when not JSON). */
  parsed: unknown;
  /** Default display payload; for llm_response the wire-level raw fields are stripped. */
  display: JsonPayload;
  /** Wire-level request body, attached to llm_request from the paired llm_response. */
  rawRequest?: JsonPayload;
  /** Wire-level response body, kept on the llm_response event. */
  rawResponse?: JsonPayload;
}

function toJsonPayload(text: string): JsonPayload {
  const { parsed, isJSON } = tryParseJSON<unknown>(text);
  if (isJSON && typeof parsed === 'object' && parsed !== null) {
    return { text, value: parsed };
  }
  return { text };
}

function rawValueToPayload(value: unknown): JsonPayload {
  // Stream adapters store newline-joined SSE payloads as plain strings.
  if (typeof value === 'string') return { text: value };
  const text = JSON.stringify(value, null, 2);
  return typeof value === 'object' && value !== null
    ? { text, value }
    : { text };
}

interface LlmResponsePayload {
  raw_request?: unknown;
  raw_response?: unknown;
  [key: string]: unknown;
}

/**
 * Single preprocessing pass over the fetched events:
 * - parses each event.content exactly once;
 * - strips raw_request / raw_response from the llm_response default view;
 * - pairs raw_request with the nearest preceding llm_request so the
 *   wire-level request is browsable from the request event.
 */
function buildParsedEvents(events: API.AITraceEvent[]): ParsedTraceEvent[] {
  const entries: ParsedTraceEvent[] = events.map((event) => {
    const { parsed, isJSON } = tryParseJSON<unknown>(event.content);
    return {
      event,
      isJSON,
      parsed,
      display: {
        text: event.content,
        value:
          isJSON && typeof parsed === 'object' && parsed !== null
            ? parsed
            : undefined,
      },
    };
  });

  let pendingRequest: ParsedTraceEvent | null = null;
  for (const entry of entries) {
    const type = entry.event.event_type;
    if (type === 'llm_request') {
      pendingRequest = entry;
      continue;
    }
    if (type !== 'llm_response') continue;

    const payload = entry.display.value as LlmResponsePayload | undefined;
    if (payload && ('raw_request' in payload || 'raw_response' in payload)) {
      const { raw_request, raw_response, ...rest } = payload;
      entry.display = { text: JSON.stringify(rest, null, 2), value: rest };
      if (raw_request !== undefined && pendingRequest) {
        pendingRequest.rawRequest = rawValueToPayload(raw_request);
      }
      if (raw_response !== undefined) {
        entry.rawResponse = rawValueToPayload(raw_response);
      }
    }
    pendingRequest = null;
  }
  return entries;
}

/**
 * Defers rendering of heavy children until the browser has painted at least
 * one frame, so the loading fallback is visible before the expensive render.
 */
const DeferredRender: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ children, fallback }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Double rAF guarantees the fallback has been painted before we start
    // the expensive render.
    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => setReady(true));
    });
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, []);

  if (!ready) {
    return (
      <>
        {fallback ?? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <Spin size="small" />
          </div>
        )}
      </>
    );
  }
  return <>{children}</>;
};

const JsonBlock: React.FC<{ payload: JsonPayload; maxHeight?: number }> = ({
  payload,
  maxHeight,
}) => {
  const [mode, setMode] = useState<'raw' | 'json'>('raw');

  const preBlock = (
    <pre
      style={{
        background: 'var(--ant-color-bg-container)',
        border: '1px solid var(--ant-color-border)',
        borderRadius: 6,
        padding: 12,
        maxHeight,
        overflow: 'auto',
        fontSize: 12,
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        margin: 0,
      }}
    >
      {payload.text}
    </pre>
  );

  if (!payload.value) return preBlock;

  return (
    <div style={{ position: 'relative' }}>
      <div className='json-block-mode-toggle' style={{ position: 'absolute', top: 6, right: 6, zIndex: 2 }}>
        <Segmented
          size="small"
          value={mode}
          onChange={(v) => setMode(v as 'raw' | 'json')}
          options={[
            { value: 'raw', icon: <AlignLeftOutlined />, title: 'Raw' },
            { value: 'json', icon: <CodeOutlined />, title: 'JSON' },
          ]}
        />
      </div>
      {mode === 'json' ? (
        <DeferredRender>
          <JsonView
            style={{
              background: 'var(--ant-color-bg-container)',
              border: '1px solid var(--ant-color-border)',
              borderRadius: 6,
              padding: 12,
              maxHeight,
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              margin: 0,
            }}
            value={payload.value}
          />
        </DeferredRender>
      ) : (
        preBlock
      )}
    </div>
  );
};

interface TokenUsageStats {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  active_tokens: number;
}
interface ToolCall {
  tool_call_id?: string;
  tool: string;
  arguments: string;
}
interface ToolResult {
  tool_call_id: string;
  result: string;
  /** Present on newer traces; false means tool execution failed. */
  ok?: boolean;
}

const FAIL_COLOR = '#ff4d4f';

/** Heuristic for older tool_result events that lack an explicit `ok` field. */
function isToolResultFailed(parsed: ToolResult | null | undefined, isJSON: boolean): boolean {
  if (!isJSON || !parsed) return false;
  if (typeof parsed.ok === 'boolean') return !parsed.ok;
  const result = (parsed.result || '').trim();
  if (!result) return false;
  if (result === 'tool call failed') return true;
  if (/^unknown tool:/i.test(result)) return true;
  if (/^tool .+ failed:/i.test(result)) return true;
  return false;
}

type Translate = (key: string, options?: Record<string, unknown>) => string;

const TokenUsageBlock: React.FC<{ entry: ParsedTraceEvent; t: Translate, maxHeight?: number }> = ({
  entry,
  t,
  maxHeight,
}) => {
  if (!entry.isJSON) {
    return <JsonBlock payload={entry.display} maxHeight={maxHeight} />;
  }
  const parsed = entry.parsed as TokenUsageStats;
  return (
    <Descriptions size="small" column={2} bordered style={{ maxHeight: maxHeight, overflow: 'auto' }}>
      {parsed.prompt_tokens !== undefined && (
        <Descriptions.Item
          label={t('trace.promptTokens', { defaultValue: 'Prompt Tokens' })}
        >
          {parsed.prompt_tokens}
        </Descriptions.Item>
      )}
      {parsed.completion_tokens !== undefined && (
        <Descriptions.Item
          label={t('trace.completionTokens', {
            defaultValue: 'Completion Tokens',
          })}
        >
          {parsed.completion_tokens}
        </Descriptions.Item>
      )}
      {parsed.total_tokens !== undefined && (
        <Descriptions.Item
          label={t('trace.totalTokens', { defaultValue: 'Total Tokens' })}
        >
          {parsed.total_tokens}
        </Descriptions.Item>
      )}
      {parsed.active_tokens !== undefined && (
        <Descriptions.Item
          label={t('trace.activeTokens', { defaultValue: 'Active Tokens' })}
        >
          {parsed.active_tokens}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

const ToolCallBlock: React.FC<{ entry: ParsedTraceEvent; t: Translate, maxHeight?: number }> = ({
  entry,
  t,
  maxHeight,
}) => {
  const parsed = entry.isJSON ? (entry.parsed as ToolCall) : null;
  const argumentsPayload = useMemo(
    () => (parsed?.arguments ? toJsonPayload(parsed.arguments) : null),
    [parsed]
  );
  if (!parsed) {
    return <JsonBlock payload={entry.display} maxHeight={maxHeight} />;
  }
  return (
    <div>
      {parsed.tool_call_id && (
        <div style={{ marginBottom: 8, maxHeight: maxHeight, overflow: 'auto' }}>
          <Text strong >
            {t('trace.toolCallId', { defaultValue: 'Tool Call ID' })}:{' '}
          </Text>
          <Text code>{parsed.tool_call_id}</Text>
        </div>
      )}
      {parsed.tool && (
        <div style={{ marginBottom: 8, maxHeight: maxHeight, overflow: 'auto' }}>
          <Text strong>{t('trace.tool', { defaultValue: 'Tool' })}: </Text>
          <Tag color="blue">{parsed.tool}</Tag>
        </div>
      )}
      {argumentsPayload && (
        <div>
          <Text strong>
            {t('trace.arguments', { defaultValue: 'Arguments' })}:
          </Text>
          <JsonBlock payload={argumentsPayload} maxHeight={maxHeight} />
        </div>
      )}
    </div>
  );
};

const ToolResultBlock: React.FC<{ entry: ParsedTraceEvent; t: Translate, maxHeight?: number }> = ({
  entry,
  t,
  maxHeight,
}) => {
  const parsed = entry.isJSON ? (entry.parsed as ToolResult) : null;
  const resultPayload = useMemo(
    () => (parsed?.result ? toJsonPayload(parsed.result) : null),
    [parsed]
  );
  if (!parsed) {
    return <JsonBlock payload={entry.display} maxHeight={maxHeight} />;
  }
  const failed = isToolResultFailed(parsed, true);
  return (
    <div>
      {parsed.tool_call_id && (
        <div style={{ marginBottom: 8, maxHeight: maxHeight, overflow: 'auto' }}>
          <Text strong>
            {t('trace.toolCallId', { defaultValue: 'Tool Call ID' })}:{' '}
          </Text>
          <Text code>{parsed.tool_call_id}</Text>
        </div>
      )}
      {(typeof parsed.ok === 'boolean' || failed) && (
        <div style={{ marginBottom: 8 }}>
          <Text strong>{t('trace.status', { defaultValue: 'Status' })}: </Text>
          <Tag color={failed ? 'error' : 'success'}>
            {failed
              ? t('trace.failed', { defaultValue: 'Failed' })
              : t('trace.succeeded', { defaultValue: 'Succeeded' })}
          </Tag>
        </div>
      )}
      {resultPayload && (
        <div style={{ overflow: 'auto' }}>
          <Text strong>
            {t('trace.result', { defaultValue: 'Result' })}:
          </Text>
          <JsonBlock payload={resultPayload} maxHeight={maxHeight} />
        </div>
      )}
    </div>
  );
};

// Lucide icons are plain SVGs; nudge them onto the Segmented text baseline.
const rawToggleIconStyle: React.CSSProperties = { verticalAlign: '-2px' };

/**
 * llm_request event. When the paired llm_response carried a raw_request
 * (wire-level request body), offers a toggle between the normalized request
 * and the raw one.
 */
const LlmRequestBlock: React.FC<{
  entry: ParsedTraceEvent;
  t: Translate;
  maxHeight?: number;
}> = ({ entry, t, maxHeight }) => {
  const [view, setView] = useState<'request' | 'raw'>('request');

  const { styles } = useRawBlockStyles({ isRaw: view === 'raw' });

  if (!entry.rawRequest) {
    return <JsonBlock payload={entry.display} maxHeight={maxHeight} />;
  }


  return (
    <div className={styles.rawToggleWrap}>
      <div className={styles.rawToggleHeader}>
        <Segmented
          size="small"
          value={view}
          onChange={(v) => setView(v as 'request' | 'raw')}
          options={[
            {
              value: 'request',
              icon: <LuMessageSquareText style={rawToggleIconStyle} />,
              title: t('trace.request', { defaultValue: 'Request' }),
            },
            {
              value: 'raw',
              icon: <LuCable style={rawToggleIconStyle} />,
              title: t('trace.rawRequest', { defaultValue: 'Raw Request' }),
            },
          ]}
        />
      </div>
      {view === 'raw' ? (
        <DeferredRender>
          <JsonBlock payload={entry.rawRequest} maxHeight={maxHeight} />
        </DeferredRender>
      ) : (
        <JsonBlock payload={entry.display} maxHeight={maxHeight} />
      )}
    </div>
  );
};

/**
 * llm_response event. The default view shows the payload with wire-level
 * raw_request / raw_response stripped (raw_request is surfaced on the paired
 * llm_request instead); raw_response stays reachable via a toggle.
 */
const LlmResponseBlock: React.FC<{
  entry: ParsedTraceEvent;
  t: Translate;
  maxHeight?: number;
}> = ({ entry, t, maxHeight }) => {
  const [view, setView] = useState<'response' | 'raw'>('response');

  const { styles } = useRawBlockStyles({ isRaw: view === 'raw' });

  if (!entry.rawResponse) {
    return <JsonBlock payload={entry.display} maxHeight={maxHeight} />;
  }

  return (
    <div className={styles.rawToggleWrap}>
      <div className={styles.rawToggleHeader}>
        <Segmented
          size="small"
          value={view}
          onChange={(v) => setView(v as 'response' | 'raw')}
          options={[
            {
              value: 'response',
              icon: <LuMessageSquareText style={rawToggleIconStyle} />,
              title: t('trace.response', { defaultValue: 'Response' }),
            },
            {
              value: 'raw',
              icon: <LuCable style={rawToggleIconStyle} />,
              title: t('trace.rawResponse', { defaultValue: 'Raw Response' }),
            },
          ]}
        />
      </div>
      {view === 'raw' ? (
        <DeferredRender>
          <JsonBlock payload={entry.rawResponse} maxHeight={maxHeight} />
        </DeferredRender>
      ) : (
        <JsonBlock payload={entry.display} maxHeight={maxHeight} />
      )}
    </div>
  );
};

const EventContent: React.FC<{
  entry: ParsedTraceEvent;
  t: Translate;
  maxHeight?: number;
}> = ({ entry, t, maxHeight }) => {
  const { event } = entry;
  switch (event.event_type) {
    case 'llm_request':
      return <LlmRequestBlock entry={entry} t={t} maxHeight={maxHeight} />;
    case 'llm_response':
      return <LlmResponseBlock entry={entry} t={t} maxHeight={maxHeight} />;
    case 'token_usage':
      return <TokenUsageBlock entry={entry} t={t} maxHeight={maxHeight} />;
    case 'tool_call':
      return <ToolCallBlock entry={entry} t={t} maxHeight={maxHeight} />;
    case 'tool_result':
      return <ToolResultBlock entry={entry} t={t} maxHeight={maxHeight} />;
    case 'error':
      return (
        <pre
          style={{
            background: 'var(--ant-color-error-bg)',
            border: '1px solid var(--ant-color-error-border)',
            borderRadius: 6,
            padding: 12,
            maxHeight: maxHeight,
            overflow: 'auto',
            fontSize: 12,
            color: 'var(--ant-color-error)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            margin: 0,
          }}
        >
          {event.content}
        </pre>
      );
    default:
      return <JsonBlock payload={entry.display} maxHeight={maxHeight} />;
  }
};

interface SeqMessage {
  id: string;
  entry: ParsedTraceEvent;
  from: ActorId;
  to: ActorId;
  label: string;
  kind: 'call' | 'return' | 'note';
  color: string;
  failed?: boolean;
}

function actorIndex(id: ActorId): number {
  return ACTORS.indexOf(id);
}

function formatDurationSuffix(durationMs: number, t: Translate): string {
  if (!(durationMs > 0)) return '';
  return ` (${t('trace.durationMs', {
    ms: durationMs,
    defaultValue: `${durationMs}ms`,
  })})`;
}

function buildSequenceMessages(
  entries: ParsedTraceEvent[],
  t: Translate
): SeqMessage[] {
  const toolNameByCallId = new Map<string, string>();
  for (const entry of entries) {
    if (entry.event.event_type !== 'tool_call' || !entry.isJSON) continue;
    const parsed = entry.parsed as ToolCall;
    if (parsed.tool_call_id && parsed.tool) {
      toolNameByCallId.set(parsed.tool_call_id, parsed.tool);
    }
  }
  const failedLabel = t('trace.failed', { defaultValue: 'Failed' });

  return entries.map((entry, index) => {
    const { event } = entry;
    const typeLabel = t(`trace.eventTypes.${event.event_type}`, {
      defaultValue: event.event_type,
    });
    const color = EVENT_ARROW_COLORS[event.event_type] || '#8c8c8c';

    switch (event.event_type) {
      case 'llm_request':
        return {
          id: event.id,
          entry,
          from: 'agent',
          to: 'llm',
          label: typeLabel,
          kind: 'call',
          color,
        };
      case 'llm_response': {
        return {
          id: event.id,
          entry,
          from: 'llm',
          to: 'agent',
          label: `${typeLabel}${formatDurationSuffix(event.duration_ms, t)}`,
          kind: 'return',
          color,
        };
      }
      case 'tool_call': {
        const parsed = entry.isJSON ? (entry.parsed as ToolCall) : null;
        const toolName = parsed?.tool || typeLabel;
        return {
          id: event.id,
          entry,
          from: 'agent',
          to: 'tool',
          label: toolName,
          kind: 'call',
          color,
        };
      }
      case 'tool_result': {
        const parsed = entry.isJSON ? (entry.parsed as ToolResult) : null;
        const failed = isToolResultFailed(parsed, entry.isJSON);
        const toolName =
          (parsed?.tool_call_id &&
            toolNameByCallId.get(parsed.tool_call_id)) ||
          '';
        const label = toolName
          ? `${typeLabel}: ${toolName}`
          : typeLabel;
        return {
          id: event.id,
          entry,
          from: 'tool',
          to: 'agent',
          label: failed ? `${label} · ${failedLabel}` : label,
          kind: 'return',
          color: failed ? FAIL_COLOR : color,
          failed,
        };
      }
      case 'summary':
        return {
          id: event.id,
          entry,
          from: 'agent',
          to: 'llm',
          label: typeLabel,
          kind: 'call',
          color,
        };
      case 'token_usage': {
        const parsed = entry.isJSON ? (entry.parsed as TokenUsageStats) : null;
        const extra =
          parsed?.total_tokens != null ? ` · ${parsed.total_tokens}` : '';
        return {
          id: event.id,
          entry,
          from: 'agent',
          to: 'agent',
          label: `${typeLabel}${extra}`,
          kind: 'note',
          color,
        };
      }
      case 'error': {
        const prev = index > 0 ? entries[index - 1].event : undefined;
        // Model attempt failures are written instead of llm_response.
        const asFailedLlmReturn = prev?.event_type === 'llm_request';
        const label = `${typeLabel}${formatDurationSuffix(event.duration_ms, t)} · ${failedLabel}`;
        if (asFailedLlmReturn) {
          return {
            id: event.id,
            entry,
            from: 'llm',
            to: 'agent',
            label,
            kind: 'return',
            color: FAIL_COLOR,
            failed: true,
          };
        }
        return {
          id: event.id,
          entry,
          from: 'agent',
          to: 'agent',
          label,
          kind: 'note',
          color: FAIL_COLOR,
          failed: true,
        };
      }
      default:
        return {
          id: event.id,
          entry,
          from: 'agent',
          to: 'agent',
          label: typeLabel,
          kind: 'note',
          color,
        };
    }
  });
}

const SequenceArrow: React.FC<{
  from: ActorId;
  to: ActorId;
  label: string;
  color: string;
  kind: 'call' | 'return';
  failed?: boolean;
  styles: ReturnType<typeof useStyles>['styles'];
  cx: ReturnType<typeof useStyles>['cx'];
}> = ({ from, to, label, color, kind, failed, styles, cx }) => {
  const fromIdx = actorIndex(from);
  const toIdx = actorIndex(to);
  const leftPct = (Math.min(fromIdx, toIdx) + 0.5) * (100 / 3);
  const rightPct = (Math.max(fromIdx, toIdx) + 0.5) * (100 / 3);
  const widthPct = rightPct - leftPct;
  const goesRight = toIdx > fromIdx;
  const dashed = kind === 'return';

  return (
    <div className={styles.arrowTrack}>
      <div
        className={styles.arrowLine}
        style={{
          left: `${leftPct}%`,
          width: `${widthPct}%`,
          borderTopColor: color,
          borderTopStyle: dashed ? 'dashed' : 'solid',
        }}
      />
      <div
        className={styles.arrowHead}
        style={
          goesRight
            ? {
              left: `calc(${rightPct}% - 2px)`,
              borderLeft: `8px solid ${color}`,
            }
            : {
              left: `calc(${leftPct}% - 6px)`,
              borderRight: `8px solid ${color}`,
            }
        }
      />
      <div
        className={cx(styles.arrowLabel, failed && styles.arrowLabelFailed)}
        style={{ color, borderColor: color }}
        title={label}
      >
        {failed && <CloseCircleOutlined className={styles.failIcon} />}
        <span>{label}</span>
      </div>
    </div>
  );
};

const SequenceDiagram: React.FC<{
  entries: ParsedTraceEvent[];
  t: Translate;
  selectedId?: string;
  onSelect: (entry: ParsedTraceEvent) => void;
}> = ({ entries, t, selectedId, onSelect }) => {
  const { styles, cx } = useStyles();
  const messages = useMemo(
    () => buildSequenceMessages(entries, t),
    [entries, t]
  );

  const actorLabel = (id: ActorId) =>
    t(`trace.actors.${id}`, {
      defaultValue:
        id === 'agent' ? 'Agent' : id === 'llm' ? 'LLM' : 'Tool',
    });

  if (messages.length === 0) {
    return (
      <Empty
        description={t('trace.noEvents', {
          defaultValue: 'No trace events found for this trace ID',
        })}
      />
    );
  }

  return (
    <div className={styles.sequenceWrap}>
      <div className={styles.sequenceInner}>
        <div className={styles.actorHeader}>
          {ACTORS.map((id) => (
            <div
              key={id}
              className={styles.actorBox}
              style={{ borderColor: ACTOR_COLORS[id], color: ACTOR_COLORS[id] }}
            >
              {actorLabel(id)}
            </div>
          ))}
        </div>

        <div className={styles.messageList}>
          <div className={styles.lifelineBg}>
            {ACTORS.map((id) => (
              <div key={id} className={styles.lifeline} />
            ))}
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              role="button"
              tabIndex={0}
              className={cx(
                styles.messageRow,
                selectedId === msg.id && styles.messageRowActive
              )}
              onClick={() => onSelect(msg.entry)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(msg.entry);
                }
              }}
            >
              <span className={styles.stepMeta}>#{msg.entry.event.step_order}</span>
              {msg.kind === 'note' ? (
                <div
                  className={cx(
                    styles.noteBox,
                    msg.failed && styles.noteBoxFailed
                  )}
                  style={{ borderColor: msg.color, color: msg.color }}
                  title={msg.label}
                >
                  {msg.failed && (
                    <CloseCircleOutlined className={styles.failIcon} />
                  )}
                  <span>{msg.label}</span>
                </div>
              ) : (
                <SequenceArrow
                  from={msg.from}
                  to={msg.to}
                  label={msg.label}
                  color={msg.color}
                  kind={msg.kind}
                  failed={msg.failed}
                  styles={styles}
                  cx={cx}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AITraceViewer: React.FC = () => {
  const { message, modal } = App.useApp();

  const { t } = useTranslation('ai');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [traceId, setTraceId] = useState('');
  const [searchedTraceId, setSearchedTraceId] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('sequence');
  const [selectedEvent, setSelectedEvent] = useState<ParsedTraceEvent | null>(
    null
  );

  const {
    data: statusData,
    loading: statusLoading,
    refresh: refreshStatus,
  } = useRequest(() => api.ai.getAiTraceStatus(), {
    onError: () => {
      message.error(
        t('trace.statusFetchFailed', {
          defaultValue: 'Failed to fetch AI debug status',
        })
      );
    },
  });

  const debugEnabled = statusData?.enabled ?? false;

  const { loading: toggling, run: toggleTrace } = useRequest(
    (enabled: boolean) => api.ai.toggleAiTrace({ enabled }),
    {
      manual: true,
      onSuccess: (_, [enabled]) => {
        message.success(
          enabled
            ? t('trace.enableSuccess', {
              defaultValue: 'AI debug tracing enabled',
            })
            : t('trace.disableSuccess', {
              defaultValue: 'AI debug tracing disabled',
            })
        );
        refreshStatus();
        if (!enabled) {
          setSearchedTraceId('');
        }
      },
      onError: () => {
        message.error(
          t('trace.toggleFailed', {
            defaultValue: 'Failed to toggle AI debug tracing',
          })
        );
      },
    }
  );

  const {
    data: events,
    loading: eventsLoading,
    run: fetchEvents,
  } = useRequest(
    (tid: string) => api.ai.getAiTraceEvents({ trace_id: tid }),
    {
      manual: true,
      onError: () => {
        message.error(
          t('trace.fetchFailed', {
            defaultValue: 'Failed to fetch trace events',
          })
        );
      },
    }
  );

  const runSearch = useCallback(
    (tid: string) => {
      setSearchedTraceId(tid);
      setSelectedEvent(null);
      fetchEvents(tid);
    },
    [fetchEvents]
  );

  // On initial render, search right away when the URL carries a trace ID.
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const initialTraceId = searchParams.get('trace_id')?.trim();
    if (initialTraceId) {
      setTraceId(initialTraceId);
      runSearch(initialTraceId);
    }
    const initialView = searchParams.get('view')?.trim();
    if (initialView) {
      setViewMode(initialView as ViewMode);
    }
  }, [searchParams, runSearch, setViewMode]);

  const handleSearch = useCallback(() => {
    const tid = traceId.trim();
    if (!tid) return;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('trace_id', tid);
        return next;
      },
      { replace: true }
    );
    runSearch(tid);
  }, [traceId, runSearch, setSearchParams]);

  const handleToggle = useCallback(
    (checked: boolean) => {
      const confirmMsg = checked
        ? t('trace.enableConfirm', {
          defaultValue:
            'Enable AI debug tracing? This will record detailed AI interaction data.',
        })
        : t('trace.disableConfirm', {
          defaultValue:
            'Disable AI debug tracing? All stored trace data will be deleted.',
        });

      modal.confirm({
        title: checked
          ? t('trace.debugEnabled', { defaultValue: 'AI Debug Enabled' })
          : t('trace.debugDisabled', { defaultValue: 'AI Debug Disabled' }),
        content: confirmMsg,
        onOk: () => toggleTrace(checked),
      });
    },
    [t, toggleTrace, modal]
  );

  const handleDownload = useCallback(async () => {
    if (!searchedTraceId) return;
    try {
      const resp = await fetch(
        `/api/ai/trace/events/download?trace_id=${encodeURIComponent(searchedTraceId)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        }
      );
      if (!resp.ok) throw new Error('download failed');
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-trace-${searchedTraceId}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      message.error(
        t('trace.downloadFailed', {
          defaultValue: 'Failed to download trace data',
        })
      );
    }
  }, [searchedTraceId, t]);

  const eventList = useMemo(() => events ?? [], [events]);

  // One-shot preprocessing: parse every event content, strip raw fields from
  // llm_response and pair raw_request onto the preceding llm_request.
  const parsedEvents = useMemo(() => buildParsedEvents(eventList), [eventList]);

  useEffect(() => {
    setSelectedEvent(null);
  }, [searchedTraceId, viewMode]);

  const timelineItems = useMemo(
    () =>
      parsedEvents.map((entry) => {
        const { event } = entry;
        const config = EVENT_TYPE_CONFIG[event.event_type] || {
          color: 'gray',
          icon: <FileTextOutlined />,
        };
        const eventTypeLabel = t(`trace.eventTypes.${event.event_type}`, {
          defaultValue: event.event_type,
        });

        return {
          key: event.id,
          dot: config.icon,
          color: config.color,
          children: (
            <Collapse
              size="small"
              defaultActiveKey={[event.id]}
              items={[
                {
                  key: event.id,
                  label: (
                    <Space size="middle">
                      <Tag color={config.color}>{eventTypeLabel}</Tag>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        #{event.step_order}
                      </Text>
                      {event.duration_ms > 0 && (
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {t('trace.duration', { defaultValue: 'Duration' })}:{' '}
                          {event.duration_ms}ms
                        </Text>
                      )}
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {new Date(event.created_at).toLocaleString()}
                      </Text>
                    </Space>
                  ),
                  children: (
                    <DeferredRender>
                      <EventContent entry={entry} t={t} maxHeight={400} />
                    </DeferredRender>
                  ),
                },
              ]}
            />
          ),
        };
      }),
    [parsedEvents, t]
  );

  const selectedConfig = selectedEvent
    ? EVENT_TYPE_CONFIG[selectedEvent.event.event_type]
    : null;

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/system/settings#ai-models')}
            >
              {t('trace.back', { defaultValue: 'Back' })}
            </Button>
            <Title level={4} style={{ margin: 0 }}>
              {t('trace.title', { defaultValue: 'AI Trace Viewer' })}
            </Title>
          </Space>
          <Space>
            <Text>
              {debugEnabled
                ? t('trace.debugEnabled', {
                  defaultValue: 'AI Debug Enabled',
                })
                : t('trace.debugDisabled', {
                  defaultValue: 'AI Debug Disabled',
                })}
            </Text>
            <Switch
              checked={debugEnabled}
              loading={statusLoading || toggling}
              onChange={handleToggle}
            />
          </Space>
        </div>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder={t('trace.traceIdPlaceholder', {
              defaultValue: 'Enter trace ID to search',
            })}
            value={traceId}
            onChange={(e) => setTraceId(e.target.value)}
            onPressEnter={handleSearch}
            prefix={<SearchOutlined />}
            allowClear
          />
          <Button type="primary" onClick={handleSearch} loading={eventsLoading}>
            {t('trace.search', { defaultValue: 'Search' })}
          </Button>
          {searchedTraceId && eventList.length > 0 && (
            <Button icon={<DownloadOutlined />} onClick={handleDownload}>
              {t('trace.download', { defaultValue: 'Download' })}
            </Button>
          )}
        </Space.Compact>
      </Card>

      {eventsLoading ? (
        <Card>
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Spin size="large" />
          </div>
        </Card>
      ) : searchedTraceId && eventList.length === 0 ? (
        <Card>
          <Empty
            description={t('trace.noEvents', {
              defaultValue: 'No trace events found for this trace ID',
            })}
          />
        </Card>
      ) : eventList.length > 0 ? (
        <Card
          title={
            <Segmented
              value={viewMode}
              onChange={(v) => {
                setViewMode(v as ViewMode);
                setSearchParams(
                  (prev) => {
                    const next = new URLSearchParams(prev);
                    next.set('view', v as ViewMode);
                    return next;
                  },
                  { replace: true }
                );
              }}
              options={[
                {
                  label: t('trace.viewSequence', {
                    defaultValue: 'Sequence',
                  }),
                  value: 'sequence',
                  icon: <ApartmentOutlined />,
                },
                {
                  label: t('trace.viewTimeline', {
                    defaultValue: 'Timeline',
                  }),
                  value: 'timeline',
                  icon: <UnorderedListOutlined />,
                },
              ]}
            />
          }
        >
          {viewMode === 'sequence' ? (
            <SequenceDiagram
              entries={parsedEvents}
              t={t}
              selectedId={selectedEvent?.event.id}
              onSelect={setSelectedEvent}
            />
          ) : (
            <Timeline items={timelineItems} />
          )}
        </Card>
      ) : null}

      <Drawer
        title={
          selectedEvent ? (
            <Space>
              <Tag color={selectedConfig?.color || 'default'}>
                {t(`trace.eventTypes.${selectedEvent.event.event_type}`, {
                  defaultValue: selectedEvent.event.event_type,
                })}
              </Tag>
              <Text type="secondary">#{selectedEvent.event.step_order}</Text>
              {selectedEvent.event.duration_ms > 0 && (
                <Text type="secondary">
                  {t('trace.duration', { defaultValue: 'Duration' })}:{' '}
                  {selectedEvent.event.duration_ms}ms
                </Text>
              )}
            </Space>
          ) : null
        }
        open={viewMode === 'sequence' && !!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        width={560}
      >
        {selectedEvent && (
          <DeferredRender key={selectedEvent.event.id}>
            <EventContent entry={selectedEvent} t={t} />
          </DeferredRender>
        )}
      </Drawer>
    </div>
  );
};

export default AITraceViewer;
