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

import React, { useState, useCallback, useMemo } from 'react';
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
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import ReactJson from 'react-json-view'
import api from '@/service/api';

const { Text, Title } = Typography;

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

function tryParseJSON(str: string): { parsed: any; isJSON: boolean } {
  try {
    const parsed = JSON.parse(str);
    return { parsed, isJSON: true };
  } catch {
    return { parsed: null, isJSON: false };
  }
}

const JsonBlock: React.FC<{ content: string; maxHeight?: number }> = ({
  content,
  maxHeight = 400,
}) => {
  const { parsed, isJSON } = tryParseJSON(content);
  if (isJSON) {
    return (
      <>
        <ReactJson
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
          src={parsed}
        />
      </>
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

const TokenUsageBlock: React.FC<{ content: string; t: any }> = ({
  content,
  t,
}) => {
  const { parsed, isJSON } = tryParseJSON(content);
  if (!isJSON) return <JsonBlock content={content} />;
  return (
    <Descriptions size="small" column={2} bordered>
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

const ToolCallBlock: React.FC<{ content: string; t: any }> = ({
  content,
  t,
}) => {
  const { parsed, isJSON } = tryParseJSON(content);
  if (!isJSON) return <JsonBlock content={content} />;
  return (
    <div>
      {parsed.tool && (
        <div style={{ marginBottom: 8 }}>
          <Text strong>{t('trace.tool', { defaultValue: 'Tool' })}: </Text>
          <Tag color="blue">{parsed.tool}</Tag>
        </div>
      )}
      {parsed.arguments && (
        <div>
          <Text strong>
            {t('trace.arguments', { defaultValue: 'Arguments' })}:
          </Text>
          <JsonBlock content={parsed.arguments} maxHeight={200} />
        </div>
      )}
    </div>
  );
};

const ToolResultBlock: React.FC<{ content: string; t: any }> = ({
  content,
  t,
}) => {
  const { parsed, isJSON } = tryParseJSON(content);
  if (!isJSON) return <JsonBlock content={content} />;
  return (
    <div>
      {parsed.tool_call_id && (
        <div style={{ marginBottom: 8 }}>
          <Text strong>
            {t('trace.toolCallId', { defaultValue: 'Tool Call ID' })}:{' '}
          </Text>
          <Text code>{parsed.tool_call_id}</Text>
        </div>
      )}
      {parsed.result && (
        <div>
          <Text strong>
            {t('trace.result', { defaultValue: 'Result' })}:
          </Text>
          <JsonBlock content={parsed.result} maxHeight={300} />
        </div>
      )}
    </div>
  );
};

const EventContent: React.FC<{
  event: API.AITraceEvent;
  t: any;
}> = ({ event, t }) => {
  switch (event.event_type) {
    case 'token_usage':
      return <TokenUsageBlock content={event.content} t={t} />;
    case 'tool_call':
      return <ToolCallBlock content={event.content} t={t} />;
    case 'tool_result':
      return <ToolResultBlock content={event.content} t={t} />;
    case 'error':
      return (
        <pre
          style={{
            background: 'var(--ant-color-error-bg)',
            border: '1px solid var(--ant-color-error-border)',
            borderRadius: 6,
            padding: 12,
            maxHeight: 300,
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
      return <JsonBlock content={event.content} />;
  }
};

const AITraceViewer: React.FC = () => {
  const { t } = useTranslation('ai');
  const navigate = useNavigate();
  const [traceId, setTraceId] = useState('');
  const [searchedTraceId, setSearchedTraceId] = useState('');

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

  const timelineItems = useMemo(
    () =>
      eventList.map((event: API.AITraceEvent) => {
        const config = EVENT_TYPE_CONFIG[event.event_type] || {
          color: 'gray',
          icon: <FileTextOutlined />,
        };
        const eventTypeLabel = t(
          `trace.eventTypes.${event.event_type}`,
          { defaultValue: event.event_type }
        );

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
                  children: <EventContent event={event} t={t} />,
                },
              ]}
            />
          ),
        };
      }),
    [eventList, t]
  );

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
        <Card>
          <Timeline items={timelineItems} />
        </Card>
      ) : null}
    </div>
  );
};

export default AITraceViewer;
