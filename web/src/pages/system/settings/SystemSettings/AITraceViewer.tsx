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

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Card,
  Button,
  Input,
  Switch,
  Space,
  Timeline,
  Tag,
  Typography,
  message,
  Empty,
  Spin,
  Descriptions,
  Modal,
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
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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

const JsonBlock: React.FC<{ content: string; maxHeight?: number }> = ({
  content,
  maxHeight,
}) => {
  const { parsed, isJSON } = tryParseJSON<object>(content);
  if (isJSON) {
    return (
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
        value={parsed}
      />
    );
  }
  return (
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
      {content}
    </pre>
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
}

type Translate = (key: string, options?: Record<string, unknown>) => string;

const TokenUsageBlock: React.FC<{ content: string; t: Translate, maxHeight?: number }> = ({
  content,
  t,
  maxHeight,
}) => {
  const { parsed, isJSON } = tryParseJSON<TokenUsageStats>(content);
  if (!isJSON) return <JsonBlock content={content} maxHeight={maxHeight} />;
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

const ToolCallBlock: React.FC<{ content: string; t: Translate, maxHeight?: number }> = ({
  content,
  t,
  maxHeight,
}) => {
  const { parsed, isJSON } = tryParseJSON<ToolCall>(content);
  if (!isJSON) return <JsonBlock content={content} maxHeight={maxHeight} />;
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
      {parsed.arguments && (
        <div>
          <Text strong>
            {t('trace.arguments', { defaultValue: 'Arguments' })}:
          </Text>
          <JsonBlock content={parsed.arguments} maxHeight={maxHeight} />
        </div>
      )}
    </div>
  );
};

const ToolResultBlock: React.FC<{ content: string; t: Translate, maxHeight?: number }> = ({
  content,
  t,
  maxHeight,
}) => {
  const { parsed, isJSON } = tryParseJSON<ToolResult>(content);
  if (!isJSON) return <JsonBlock content={content} maxHeight={maxHeight} />;
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
      {parsed.result && (
        <div style={{ overflow: 'auto' }}>
          <Text strong>
            {t('trace.result', { defaultValue: 'Result' })}:
          </Text>
          <JsonBlock content={parsed.result} maxHeight={maxHeight} />
        </div>
      )}
    </div>
  );
};

const EventContent: React.FC<{
  event: API.AITraceEvent;
  t: Translate;
  maxHeight?: number;
}> = ({ event, t, maxHeight }) => {
  switch (event.event_type) {
    case 'token_usage':
      return <TokenUsageBlock content={event.content} t={t} maxHeight={maxHeight} />;
    case 'tool_call':
      return <ToolCallBlock content={event.content} t={t} maxHeight={maxHeight} />;
    case 'tool_result':
      return <ToolResultBlock content={event.content} t={t} maxHeight={maxHeight} />;
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
      return <JsonBlock content={event.content} maxHeight={maxHeight} />;
  }
};

interface SeqMessage {
  id: string;
  event: API.AITraceEvent;
  from: ActorId;
  to: ActorId;
  label: string;
  kind: 'call' | 'return' | 'note';
  color: string;
}

function actorIndex(id: ActorId): number {
  return ACTORS.indexOf(id);
}

function buildSequenceMessages(
  events: API.AITraceEvent[],
  t: Translate
): SeqMessage[] {
  return events.map((event) => {
    const typeLabel = t(`trace.eventTypes.${event.event_type}`, {
      defaultValue: event.event_type,
    });
    const color = EVENT_ARROW_COLORS[event.event_type] || '#8c8c8c';

    switch (event.event_type) {
      case 'llm_request':
        return {
          id: event.id,
          event,
          from: 'agent',
          to: 'llm',
          label: typeLabel,
          kind: 'call',
          color,
        };
      case 'llm_response': {
        const dur =
          event.duration_ms > 0
            ? ` (${t('trace.durationMs', {
              ms: event.duration_ms,
              defaultValue: `${event.duration_ms}ms`,
            })})`
            : '';
        return {
          id: event.id,
          event,
          from: 'llm',
          to: 'agent',
          label: `${typeLabel}${dur}`,
          kind: 'return',
          color,
        };
      }
      case 'tool_call': {
        const { parsed, isJSON } = tryParseJSON<ToolCall>(event.content);
        const toolName = isJSON && parsed.tool ? parsed.tool : typeLabel;
        return {
          id: event.id,
          event,
          from: 'agent',
          to: 'tool',
          label: toolName,
          kind: 'call',
          color,
        };
      }
      case 'tool_result':
        return {
          id: event.id,
          event,
          from: 'tool',
          to: 'agent',
          label: typeLabel,
          kind: 'return',
          color,
        };
      case 'summary':
        return {
          id: event.id,
          event,
          from: 'agent',
          to: 'llm',
          label: typeLabel,
          kind: 'call',
          color,
        };
      case 'token_usage': {
        const { parsed, isJSON } = tryParseJSON<TokenUsageStats>(event.content);
        const extra =
          isJSON && parsed.total_tokens != null
            ? ` · ${parsed.total_tokens}`
            : '';
        return {
          id: event.id,
          event,
          from: 'agent',
          to: 'agent',
          label: `${typeLabel}${extra}`,
          kind: 'note',
          color,
        };
      }
      case 'error':
      default:
        return {
          id: event.id,
          event,
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
  styles: ReturnType<typeof useStyles>['styles'];
}> = ({ from, to, label, color, kind, styles }) => {
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
      <div className={styles.arrowLabel} style={{ color, borderColor: color }}>
        {label}
      </div>
    </div>
  );
};

const SequenceDiagram: React.FC<{
  events: API.AITraceEvent[];
  t: Translate;
  selectedId?: string;
  onSelect: (event: API.AITraceEvent) => void;
}> = ({ events, t, selectedId, onSelect }) => {
  const { styles, cx } = useStyles();
  const messages = useMemo(
    () => buildSequenceMessages(events, t),
    [events, t]
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
              onClick={() => onSelect(msg.event)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(msg.event);
                }
              }}
            >
              <span className={styles.stepMeta}>#{msg.event.step_order}</span>
              {msg.kind === 'note' ? (
                <div
                  className={styles.noteBox}
                  style={{ borderColor: msg.color, color: msg.color }}
                >
                  {msg.label}
                </div>
              ) : (
                <SequenceArrow
                  from={msg.from}
                  to={msg.to}
                  label={msg.label}
                  color={msg.color}
                  kind={msg.kind}
                  styles={styles}
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
  const { t } = useTranslation('ai');
  const navigate = useNavigate();
  const [traceId, setTraceId] = useState('');
  const [searchedTraceId, setSearchedTraceId] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('sequence');
  const [selectedEvent, setSelectedEvent] = useState<API.AITraceEvent | null>(
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

  const handleSearch = useCallback(() => {
    if (!traceId.trim()) return;
    setSearchedTraceId(traceId.trim());
    setSelectedEvent(null);
    fetchEvents(traceId.trim());
  }, [traceId, fetchEvents]);

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

      Modal.confirm({
        title: checked
          ? t('trace.debugEnabled', { defaultValue: 'AI Debug Enabled' })
          : t('trace.debugDisabled', { defaultValue: 'AI Debug Disabled' }),
        content: confirmMsg,
        onOk: () => toggleTrace(checked),
      });
    },
    [t, toggleTrace]
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

  useEffect(() => {
    setSelectedEvent(null);
  }, [searchedTraceId, viewMode]);

  const timelineItems = useMemo(
    () =>
      eventList.map((event: API.AITraceEvent) => {
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
                  children: <EventContent event={event} t={t} maxHeight={400} />,
                },
              ]}
            />
          ),
        };
      }),
    [eventList, t]
  );

  const selectedConfig = selectedEvent
    ? EVENT_TYPE_CONFIG[selectedEvent.event_type]
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
              onChange={(v) => setViewMode(v as ViewMode)}
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
              events={eventList}
              t={t}
              selectedId={selectedEvent?.id}
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
                {t(`trace.eventTypes.${selectedEvent.event_type}`, {
                  defaultValue: selectedEvent.event_type,
                })}
              </Tag>
              <Text type="secondary">#{selectedEvent.step_order}</Text>
              {selectedEvent.duration_ms > 0 && (
                <Text type="secondary">
                  {t('trace.duration', { defaultValue: 'Duration' })}:{' '}
                  {selectedEvent.duration_ms}ms
                </Text>
              )}
            </Space>
          ) : null
        }
        open={viewMode === 'sequence' && !!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        width={560}
      >
        {selectedEvent && <EventContent event={selectedEvent} t={t} />}
      </Drawer>
    </div>
  );
};

export default AITraceViewer;
