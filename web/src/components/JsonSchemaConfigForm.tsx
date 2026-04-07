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

import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Form from '@rjsf/antd';
import { FieldProps, RJSFSchema, Widget } from '@rjsf/utils/lib';
import validator from '@rjsf/validator-ajv8';
import { createStyles } from 'antd-style';
import { useRequest } from 'ahooks';
import api from '@/service/api';
import { request } from '@/service/client';
import { Select, Form as AntForm, type FormItemProps } from 'antd';
import axios from 'axios';
import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import classNames from 'classnames';

/** Default indent for JSON stringify */
const JSON_EDITOR_INDENT = 2;

const useStyle = createStyles(({ css }) => {
  return {
    jsonSchemaForm: css`
      .ant-form-item-control-input-content>#root {
        border-width: 0;
        padding: 0px;
      }
      >.ant-btn-submit{
        display: none;
      }
      >.field-object>.ant-form-item{
        margin-bottom: 0px;
      }
      .ant-col:empty{
        display: none; 
      }
      .ant-form-item{
        margin-bottom: 0px;
      }
      .ant-form-item-additional{
        height: 24px;
      }
      .ant-form-item-additional:has(>.ant-form-item-explain){
        >.ant-form-item-extra{
          display: none;
        }
      }
    `,
  };
});

export interface JsonSchemaConfigFormProps {
  /** JSON Schema for the config object (type: object with properties) */
  schema: RJSFSchema;
  /** Current config values */
  value?: Record<string, unknown>;
  /** Called when config changes */
  onChange?: (config: Record<string, unknown>) => void;
  /** Optional UI schema for layout hints */
  uiSchema?: Record<string, unknown>;
  disabled?: boolean;
  formRef?: React.Ref<JsonSchemaConfigFormRef>;
}

const ToolsetsSelectWidget: Widget = (props) => {
  return <RemoteSelectWidget {...props}
    schema={{
      ...(props.schema || {}),
      'x-data-source': {
        ...((props.schema as any)?.['x-data-source'] || {}),
        type: 'toolsets'
      }
    }}
  />;
}


function formatJson(value: unknown): string {
  if (value === undefined || value === null) {
    return '';
  }
  try {
    return JSON.stringify(value, null, JSON_EDITOR_INDENT);
  } catch {
    return '';
  }
}

function parseJson(str: string): unknown {
  const trimmed = str.trim();
  if (trimmed === '') {
    return undefined;
  }
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return undefined;
  }
}

/** Object field that renders a CodeMirror JSON editor; supports schema.examples dropdown in top-right. */
function ObjectField(props: FieldProps) {
  const { formData, schema, onChange, disabled, id, required, name, fieldPathId } = props;
  const examples = Array.isArray((schema as { examples?: unknown[] }).examples)
    ? (schema as { examples: unknown[] }).examples
    : [];
  const lastFormDataRef = useRef<unknown>(undefined);
  const isInternalChangeRef = useRef(false);

  const [localValue, setLocalValue] = useState(() => formatJson(formData));
  const [parseError, setParseError] = useState<string | null>(null);

  // Keep editor in sync when formData changes from outside (e.g. form reset)
  useEffect(() => {
    if (isInternalChangeRef.current) {
      isInternalChangeRef.current = false;
      return;
    }
    if (lastFormDataRef.current === formData) {
      return;
    }
    lastFormDataRef.current = formData;
    setLocalValue(formatJson(formData));
    setParseError(null);
  }, [formData]);

  const handleEditorChange = useCallback(
    (value: string) => {
      setLocalValue(value);
      const parsed = parseJson(value);
      if (parsed === undefined && value.trim() !== '') {
        setParseError('Invalid JSON');
        return;
      }
      setParseError(null);
      lastFormDataRef.current = parsed;
      isInternalChangeRef.current = true;
      onChange(parsed as Record<string, unknown>, fieldPathId.path);
    },
    [onChange, fieldPathId],
  );

  const handleExampleSelect = useCallback(
    (index: number) => {
      const example = examples[index];
      if (example === undefined) return;
      const obj = typeof example === 'string' ? parseJson(example) : example;
      const str = formatJson(obj);
      setLocalValue(str);
      setParseError(null);
      lastFormDataRef.current = obj;
      isInternalChangeRef.current = true;
      onChange(obj as Record<string, unknown>, fieldPathId.path);
    },
    [onChange, examples, fieldPathId],
  );

  return (
    <div id={id} style={{ position: 'relative' }}>
      {examples.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
          }}
        >
          <Select
            placeholder="Load example…"
            allowClear
            style={{ minWidth: 160 }}
            disabled={disabled}
            options={examples.map((ex, i) => ({
              label:
                typeof ex === 'object' && ex !== null && 'title' in ex
                  ? String((ex as { title: string }).title)
                  : `Example ${i + 1}`,
              value: i,
            }))}
            onChange={(value) =>
              value !== undefined && value !== null && handleExampleSelect(value)
            }
          />
        </div>
      )}
      <div className='ant-form-item-label'>
        <label className={required ? "ant-form-item-required" : "ant-form-item-optional"}>{name}</label>
      </div>
      <ReactCodeMirror
        value={localValue}
        height="200px"
        extensions={[json()]}
        onChange={handleEditorChange}
        editable={!disabled}
        basicSetup={{ lineNumbers: true, foldGutter: true }}
      />
      {parseError && (
        <div className="ant-form-item-additional" >
          <div className="ant-form-item-explain ant-form-item-explain-connected">
            <div className="ant-form-item-explain-error">
              <div id="root_args__error"><div>{parseError}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export interface DataSource {
  /** Cache control */
  cache: boolean;
  /** Cache TTL in seconds (0 = no expiration) */
  cache_ttl: number;
  /** DependsOn specifies field dependencies (field names that this field depends on)
When dependent fields change, this field's options should be reloaded */
  depends_on: string[];
  /** Filter conditions (flexible filtering for different source types)
For toolsets: {"type": "webhook"} to filter by toolset type
For internal: {"status": "active"} to filter by status, etc. */
  filter: Record<string, any>;
  /** Response mapping fields (for API and other sources) */
  label_key: string;
  /** HTTP method (GET, POST, etc.) */
  method: string;
  /** Parameters for API requests (query params or request body) */
  params: Record<string, any>;
  /** Type specifies the data source type */
  type: DataSourceType;
  /** API-specific fields (when Type = "api") */
  url: string;
  /** JSON key for option value */
  value_key: string;
}

export type DataSourceType = "static" | "api" | "toolsets" | "internal";


const RemoteSelectWidget: Widget = (props) => {
  const { schema, value, onChange } = props;
  const source: DataSource = schema["x-data-source"];

  const { data: options, loading: loadingOptions } = useRequest(async () => {
    switch (source.type) {
      case 'toolsets':
        return (await api.system.listToolSets({
          current: 1,
          page_size: 1000,
        })).data.map((item: any) => ({ label: item[source.label_key || 'name'], value: item[source.value_key || 'id'] }));
      case 'api':
        if (source.url.startsWith("/")) {
          return (await request(source.url, {
            method: source.method,
            params: source.params,
          })).data.map((item: any) => ({ label: item[source.label_key], value: item[source.value_key] }));
        }
        return (await axios(source.url, {
          params: source.params,
          method: source.method,
        })).data.map((item: any) => ({ label: item[source.label_key], value: item[source.value_key] }));
      default:
        return [];
    }
  }, {
    cacheKey: `${source.type}:${source.method}:${source.url}:${JSON.stringify(source.params)}`,
    cacheTime: source.cache_ttl * 1000,
    staleTime: source.cache_ttl * 1000,
  });

  return (
    <Select
      options={options}
      value={value}
      loading={loadingOptions}
      onChange={(value) => onChange?.(value)}
      style={{ width: "100%" }}
    />
  );
}


export function buildUiSchema(schema: any) {
  const defs = schema.$defs || schema.definitions || {}

  function resolveRef(ref: string) {
    if (!ref.startsWith("#/$defs/") && !ref.startsWith("#/definitions/")) {
      return null
    }

    const key = ref.split("/").pop()
    if (!key) return null
    return defs[key]
  }

  function walk(node: any): any {
    if (!node) return {}

    if (node.$ref) {
      const resolved = resolveRef(node.$ref)
      return walk(resolved)
    }

    const ui: any = {}

    Object.keys(node).forEach(key => {
      if (key.startsWith("x-ui-")) {
        ui[`ui:${key.slice(5)}`] = node[key]
      }
    })

    // -------- x-hidden --------
    if (node["x-hidden"]) {
      ui["ui:widget"] = "hidden"
    }

    // -------- x-disabled --------
    if (node["x-disabled"]) {
      ui["ui:disabled"] = true
    }

    // -------- object --------
    if (node.type === "object") {
      if (node.properties) {
        for (const [key, value] of Object.entries<any>(node.properties)) {
          const child = walk(value)
          if (Object.keys(child).length > 0) {
            ui[key] = child
          }
        }
      }
      if (node.dependencies) {
        Object.keys(node.dependencies).forEach(key => {
          const dependency = node.dependencies[key]
          if (dependency.properties) {
            Object.keys(dependency.properties).forEach(dependencyKey => {
              const child = walk(dependency.properties[dependencyKey])
              if (Object.keys(child).length > 0) {
                ui[key] = child
              }

            })
          } else if (dependency.oneOf) {
            dependency.oneOf.forEach((oneOf: any) => {
              if (oneOf.properties) {
                Object.keys(oneOf.properties).forEach(oneOfKey => {

                  const child = walk(oneOf.properties[oneOfKey])
                  ui[oneOfKey] = child
                })
              }
            })
          }
        })
      }
    }

    // -------- array --------
    if (node.type === "array" && node.items) {
      ui.items = walk(node.items)
    }

    // -------- oneOf / anyOf --------
    if (node.oneOf) {
      ui["ui:options"] = {
        ...(ui["ui:options"] || {}),
        oneOf: node.oneOf.map((x: any) => walk(x))
      }
    }

    if (node.anyOf) {
      ui["ui:options"] = {
        ...(ui["ui:options"] || {}),
        anyOf: node.anyOf.map((x: any) => walk(x))
      }
    }

    if (node.allOf) {
      ui["ui:options"] = {
        ...(ui["ui:options"] || {}),
        allOf: node.allOf.map((x: any) => walk(x))
      }
    }

    return ui
  }

  if (schema.$ref) {
    const resolved = resolveRef(schema.$ref)
    return walk(resolved)
  }

  return walk(schema)
}

interface JsonSchemaConfigFormRef {
  validate: (value: Record<string, unknown>) => Promise<void>;
}

/**
 * Renders a form from a JSON Schema. Use inside Ant Design Form with
 * Form.Item name={['config']} so value/onChange are provided by the parent form.
 */
export const JsonSchemaConfigForm: React.FC<JsonSchemaConfigFormProps> = ({
  schema,
  value,
  onChange,
  uiSchema,
  disabled = false,
  formRef,
}) => {
  const { styles } = useStyle();
  const formData = value ?? {};

  useImperativeHandle(formRef, () => ({
    validate: (value: Record<string, unknown>): Promise<void> => {
      const result = validator.validateFormData(value, schema, undefined, undefined, mergedUiSchema);
      if (result.errors.filter(error => error.message !== 'must NOT have additional properties').length > 0) {
        return Promise.reject(result.errors[0].message);
      }
      return Promise.resolve();
    }
  }));

  const handleChange = useCallback(
    ({ formData: next }: { formData?: Record<string, unknown> }) => {
      onChange?.(next ?? {});
    },
    [onChange]
  );
  const mergedUiSchema = React.useMemo(() => {
    if (!schema) {
      return {};
    }
    const autoUi = buildUiSchema(schema)
    return {
      ...autoUi || {},
      ...uiSchema || {}
    }
  }, [schema, uiSchema]);
  return (
    <Form
      className={classNames(styles.jsonSchemaForm, 'json-schema-config-form')}
      schema={schema || {}}
      formData={formData}
      onChange={handleChange}
      validator={validator}
      uiSchema={mergedUiSchema || {}}
      disabled={disabled}
      showErrorList={false}
      liveValidate="onChange"
      fields={{
        objectEditor: ObjectField,
      }}
      transformErrors={(errors) => {
        return errors.filter(error => error.message !== 'must NOT have additional properties')
      }}
      widgets={{
        remoteSelect: RemoteSelectWidget,
        toolsetsSelect: ToolsetsSelectWidget,
      }}
    />
  );
};

interface JsonSchemaConfigFormItemProps extends FormItemProps {
  schema: RJSFSchema;
  uiSchema?: Record<string, unknown>;
}

export const JsonSchemaConfigFormItem = ({ schema, uiSchema, ...props }: JsonSchemaConfigFormItemProps) => {
  const formRef = useRef<JsonSchemaConfigFormRef>(null);
  return <AntForm.Item
    noStyle
    {...props}
    rules={[{
      validator: (_, value) => {
        return formRef.current?.validate(value);
      },
      message: "",
    }]} >
    <JsonSchemaConfigForm schema={schema} formRef={formRef} uiSchema={uiSchema} />
  </AntForm.Item>;
}

export default JsonSchemaConfigForm;
