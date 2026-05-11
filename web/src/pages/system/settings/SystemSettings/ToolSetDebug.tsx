// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useState, lazy, Suspense, useCallback } from 'react';
import {
  Card,
  Button,
  Space,
  Select,
  Tag,
  Typography,
  message,
  Descriptions,
  Spin,
  Tooltip,
} from 'antd';
import {
  ArrowLeftOutlined,
  PlayCircleOutlined,
  AlignLeftOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import JsonView from '@uiw/react-json-view';
import api from '@/service/api';
import Loading from '@/components/Loading';

const JsonSchemaConfigForm = lazy(() => import('@/components/JsonSchemaConfigForm'));

const { Text, Title } = Typography;

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

const ToolSetDebug: React.FC = () => {
  const { t } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [selectedToolName, setSelectedToolName] = useState<string | undefined>(undefined);
  const [formMode, setFormMode] = useState<'schema' | 'code'>('schema');
  const [paramsFormData, setParamsFormData] = useState<Record<string, unknown>>({});
  const [paramsCodeValue, setParamsCodeValue] = useState<string>('{}');
  const [result, setResult] = useState<string | null>(null);
  const [codeParseError, setCodeParseError] = useState<string | null>(null);

  const { loading: loadingToolset, data: toolset } = useRequest(
    () => api.system.getToolSet({ id: id! }),
    {
      ready: !!id,
      onError: () => {
        message.error(t('settings.toolsets.fetchFailed', { defaultValue: 'Failed to fetch toolset' }));
      },
    }
  );

  const { loading: loadingTools, data: tools } = useRequest(
    () => api.system.getToolSetTools({ id: id! }),
    {
      ready: !!id,
      onError: () => {
        message.error(t('settings.toolsets.fetchToolsFailed', { defaultValue: 'Failed to fetch tools' }));
      },
    }
  );

  const selectedTool = tools?.find(
    (tool) => tool.function?.name === selectedToolName
  );

  const { loading: calling, run: callTool } = useRequest(
    (name: string, parameters: string) =>
      api.system.callTool({ id: id! }, { name, parameters }),
    {
      manual: true,
      onSuccess: (data) => {
        setResult(data?.result ?? '');
      },
      onError: (error: any) => {
        const errMsg =
          error?.response?.data?.message ||
          error?.message ||
          t('settings.toolsets.callToolFailed', { defaultValue: 'Tool call failed' });
        message.error(errMsg);
        setResult(null);
      },
    }
  );

  const handleToolChange = useCallback((value: string) => {
    setSelectedToolName(value);
    setParamsFormData({});
    setParamsCodeValue('{}');
    setResult(null);
    setCodeParseError(null);
  }, []);

  const handleFormModeToggle = useCallback(() => {
    if (formMode === 'schema') {
      setParamsCodeValue(JSON.stringify(paramsFormData, null, 2));
      setFormMode('code');
    } else {
      const { parsed, isJSON } = tryParseJSON(paramsCodeValue);
      if (isJSON) {
        setParamsFormData(parsed ?? {});
        setCodeParseError(null);
      }
      setFormMode('schema');
    }
  }, [formMode, paramsFormData, paramsCodeValue]);

  const handleCodeChange = useCallback((value: string) => {
    setParamsCodeValue(value);
    const { parsed, isJSON } = tryParseJSON(value);
    if (isJSON) {
      setParamsFormData(parsed ?? {});
      setCodeParseError(null);
    } else {
      setCodeParseError(t('settings.toolsets.invalidJSON', { defaultValue: 'Invalid JSON' }));
    }
  }, [t]);

  const handleSubmit = useCallback(() => {
    if (!selectedToolName) {
      message.warning(t('settings.toolsets.selectToolFirst', { defaultValue: 'Please select a tool first' }));
      return;
    }
    let parameters: string;
    if (formMode === 'code') {
      if (codeParseError) {
        message.error(t('settings.toolsets.invalidJSON', { defaultValue: 'Invalid JSON' }));
        return;
      }
      parameters = paramsCodeValue;
    } else {
      parameters = JSON.stringify(paramsFormData);
    }
    setResult(null);
    callTool(selectedToolName, parameters);
  }, [selectedToolName, formMode, paramsFormData, paramsCodeValue, codeParseError, callTool, t]);

  const toolsetData = toolset;
  const statusColor = toolsetData?.status === 'enabled' ? 'green' : 'red';
  const statusLabel = toolsetData?.status === 'enabled'
    ? tCommon('enabled', { defaultValue: 'Enabled' })
    : tCommon('disabled', { defaultValue: 'Disabled' });

  return (
    <div>
      {/* Header */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/system/settings#ai-toolsets')}
            >
              {t('settings.toolsets.backToList', { defaultValue: 'Back' })}
            </Button>
            <Title level={4} style={{ margin: 0 }}>
              {t('settings.toolsets.debugTitle', { defaultValue: 'Tool Debug' })}
            </Title>
          </Space>
        </div>
      </Card>

      {/* Toolset Info */}
      <Card style={{ marginBottom: 16 }} loading={loadingToolset}>
        {toolsetData && (
          <Descriptions column={2} size="small">
            <Descriptions.Item label={t('settings.toolsets.name', { defaultValue: 'Name' })}>
              <Text strong>{toolsetData.name}</Text>
            </Descriptions.Item>
            <Descriptions.Item label={t('settings.toolsets.type', { defaultValue: 'Type' })}>
              <Tag color="blue">{String(toolsetData.type).toUpperCase()}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label={t('settings.toolsets.description', { defaultValue: 'Description' })} span={2}>
              {toolsetData.description || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={t('settings.toolsets.status', { defaultValue: 'Status' })}>
              <Tag color={statusColor}>{statusLabel}</Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>

      {/* Debug Panel */}
      <Card>
        {/* Tool Selector */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>
            <Text strong>{t('settings.toolsets.selectTool', { defaultValue: 'Select Tool' })}</Text>
          </div>
          {loadingTools ? (
            <Spin size="small" />
          ) : (
            <Select
              style={{ width: '100%' }}
              placeholder={t('settings.toolsets.selectToolPlaceholder', { defaultValue: 'Select a tool to debug' })}
              value={selectedToolName}
              onChange={handleToolChange}
              optionLabelProp="label"
            >
              {(tools ?? []).map((tool) => {
                const name = tool.function?.name ?? '';
                const desc = tool.function?.description ?? '';
                const label = desc ? `${name} - ${desc}` : name;
                return (
                  <Select.Option key={name} value={name} label={label}>
                    <div
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      title={label}
                    >
                      {label}
                    </div>
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </div>

        {/* Parameters */}
        {selectedTool && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text strong>{t('settings.toolsets.parameters', { defaultValue: 'Parameters' })}</Text>
              <Tooltip
                title={
                  formMode === 'schema'
                    ? t('settings.toolsets.switchToCodeEditor', { defaultValue: 'Switch to JSON editor' })
                    : t('settings.toolsets.switchToFormEditor', { defaultValue: 'Switch to form editor' })
                }
              >
                <Button
                  size="small"
                  icon={formMode === 'schema' ? <CodeOutlined /> : <AlignLeftOutlined />}
                  onClick={handleFormModeToggle}
                />
              </Tooltip>
            </div>

            {formMode === 'schema' ? (
              selectedTool.function?.parameters ? (
                <Suspense fallback={<Loading />}>
                  <JsonSchemaConfigForm
                    schema={selectedTool.function.parameters as any}
                    value={paramsFormData}
                    onChange={setParamsFormData}
                  />
                </Suspense>
              ) : (
                <Text type="secondary">
                  {t('settings.toolsets.noParameters', { defaultValue: 'This tool has no parameters' })}
                </Text>
              )
            ) : (
              <div>
                <ReactCodeMirror
                  value={paramsCodeValue}
                  height="200px"
                  extensions={[json()]}
                  onChange={handleCodeChange}
                  basicSetup={{ lineNumbers: true, foldGutter: true }}
                />
                {codeParseError && (
                  <Text type="danger" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
                    {codeParseError}
                  </Text>
                )}
              </div>
            )}
          </div>
        )}

        {/* Submit */}
        <div style={{ marginBottom: result !== null ? 16 : 0 }}>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            loading={calling}
            disabled={!selectedToolName}
            onClick={handleSubmit}
          >
            {t('settings.toolsets.callTool', { defaultValue: 'Run' })}
          </Button>
        </div>

        {/* Result */}
        {result !== null && (
          <div>
            <div style={{ marginBottom: 8 }}>
              <Text strong>{t('settings.toolsets.result', { defaultValue: 'Result' })}</Text>
            </div>
            <JsonBlock content={result} maxHeight={300} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ToolSetDebug;
