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

import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Form, { Templates } from '@rjsf/antd';
import { FieldProps, FieldTemplateProps, RJSFSchema } from '@rjsf/utils/lib';
import { customizeValidator } from '@rjsf/validator-ajv8';
import { createStyles, useTheme } from 'antd-style';
import { Select, Form as AntForm, type FormItemProps } from 'antd';
import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import classNames from 'classnames';
import { TFunction } from 'i18next';
import { isNumber } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import localizer from 'ajv-i18n';
import SelectWidget from './SelectWidget';
import TreeSelectWidget from './TreeSelectWidget';
import PasswordWidget from './PasswordWidget';
import RemoteSelectWidget, { ToolsetsSelectWidget } from './RemoteSelectWidget';
import DeferredBaseInputTemplate, { DeferredTextareaWidget } from './DeferredInputs';

const { FieldTemplate: FieldTemplateAntd } = Templates

/** Default indent for JSON stringify */
const JSON_EDITOR_INDENT = 2;
/** Wait until typing pauses before pushing the JSON editor into the schema form. */
const JSON_COMMIT_DELAY_MS = 300;

const useStyle = createStyles(({ css }) => {
  return {
    jsonSchemaForm: css`
      .ant-form-item-control-input-content>#root {
        border-width: 0;
        padding: 0px;
        display: contents;
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
        >.ant-form-item-with-help,.ant-form-item-has-feedback.ant-form-item-has-error{
          margin-bottom: 0px;
        }
      }
      .ant-form-item-additional{
        height: 24px;
        overflow: hidden;
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
  t?: TFunction;
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
function ObjectField({ t, ...props }: FieldProps & { t?: TFunction }) {
  const { isDarkMode } = useTheme();
  const { formData, schema, onChange, disabled, id, required, name, fieldPathId } = props;
  const examples = Array.isArray((schema as { examples?: unknown[] }).examples)
    ? (schema as { examples: unknown[] }).examples
    : [];
  const lastFormDataRef = useRef<unknown>(undefined);
  const isInternalChangeRef = useRef(false);
  const pendingRef = useRef<unknown>(undefined);
  const pendingValidRef = useRef(false);
  const commitTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const onChangeRef = useRef(onChange);
  const pathRef = useRef(fieldPathId.path);
  onChangeRef.current = onChange;
  pathRef.current = fieldPathId.path;

  const [localValue, setLocalValue] = useState(() => formatJson(formData));
  const [parseError, setParseError] = useState<string | null>(null);
  const keyPrefix = serializeKey(props.fieldPathId.path);

  const flushEditor = useCallback(() => {
    if (commitTimerRef.current) {
      clearTimeout(commitTimerRef.current);
      commitTimerRef.current = undefined;
    }
    if (!pendingValidRef.current) {
      return;
    }
    pendingValidRef.current = false;
    isInternalChangeRef.current = true;
    lastFormDataRef.current = pendingRef.current;
    onChangeRef.current(pendingRef.current as Record<string, unknown>, pathRef.current);
  }, []);

  useEffect(() => () => flushEditor(), [flushEditor]);

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
        pendingValidRef.current = false;
        if (commitTimerRef.current) {
          clearTimeout(commitTimerRef.current);
          commitTimerRef.current = undefined;
        }
        return;
      }
      setParseError(null);
      pendingRef.current = parsed;
      pendingValidRef.current = true;
      if (commitTimerRef.current) {
        clearTimeout(commitTimerRef.current);
      }
      commitTimerRef.current = setTimeout(flushEditor, JSON_COMMIT_DELAY_MS);
    },
    [flushEditor],
  );

  const handleExampleSelect = useCallback(
    (index: number) => {
      const example = examples[index];
      if (example === undefined) return;
      let obj: unknown =
        typeof example === 'string' ? parseJson(example) : example;
      // Support { title, value } wrappers so labels stay out of form data.
      if (
        obj &&
        typeof obj === 'object' &&
        !Array.isArray(obj) &&
        'value' in (obj as Record<string, unknown>) &&
        (obj as Record<string, unknown>).value !== undefined
      ) {
        obj = (obj as { value: unknown }).value;
      }
      const str = formatJson(obj);
      setLocalValue(str);
      setParseError(null);
      if (commitTimerRef.current) {
        clearTimeout(commitTimerRef.current);
        commitTimerRef.current = undefined;
      }
      pendingValidRef.current = false;
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
        <label className={required ? "ant-form-item-required" : "ant-form-item-optional"}>
          {keyPrefix ? t?.(`${keyPrefix}.label`, { defaultValue: schema.title || name }) : schema.title || name}
        </label>
      </div>
      <ReactCodeMirror
        value={localValue}
        height="200px"
        theme={isDarkMode ? 'dark' : 'light'}
        extensions={[json()]}
        onChange={handleEditorChange}
        onBlur={flushEditor}
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

const I18nObjectField: (t?: TFunction) => React.FC<FieldProps> = (t) => {
  return (props) => {
    return <ObjectField {...props} t={t} />
  }
}



type JsonSchemaNode = {
  $ref?: string;
  type?: string;
  properties?: Record<string, JsonSchemaNode>;
  dependencies?: Record<string, JsonSchemaNode & { oneOf?: JsonSchemaNode[] }>;
  items?: JsonSchemaNode;
  oneOf?: JsonSchemaNode[];
  anyOf?: JsonSchemaNode[];
  allOf?: JsonSchemaNode[];
  'x-hidden'?: boolean;
  'x-disabled'?: boolean;
  [key: string]: unknown;
};

type UiSchemaNode = Record<string, unknown>;

export function buildUiSchema(schema: JsonSchemaNode) {
  const defs = (schema.$defs || schema.definitions || {}) as Record<string, JsonSchemaNode>

  function resolveRef(ref: string) {
    if (!ref.startsWith("#/$defs/") && !ref.startsWith("#/definitions/")) {
      return null
    }

    const key = ref.split("/").pop()
    if (!key) return null
    return defs[key]
  }

  function walk(node: JsonSchemaNode | null | undefined): UiSchemaNode {
    if (!node) return {}

    if (node.$ref) {
      const resolved = resolveRef(node.$ref)
      return walk(resolved)
    }

    const ui: UiSchemaNode = {}

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
        for (const [key, value] of Object.entries(node.properties)) {
          const child = walk(value)
          if (Object.keys(child).length > 0) {
            ui[key] = child
          }
        }
      }
      if (node.dependencies) {
        Object.keys(node.dependencies).forEach(key => {
          const dependency = node.dependencies![key]
          if (dependency.properties) {
            Object.keys(dependency.properties).forEach(dependencyKey => {
              const child = walk(dependency.properties![dependencyKey])
              if (Object.keys(child).length > 0) {
                ui[key] = child
              }

            })
          } else if (dependency.oneOf) {
            dependency.oneOf.forEach((oneOf) => {
              if (oneOf.properties) {
                Object.keys(oneOf.properties).forEach(oneOfKey => {

                  const child = walk(oneOf.properties![oneOfKey])
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
        ...((ui["ui:options"] as Record<string, unknown>) || {}),
        oneOf: node.oneOf.map((x) => walk(x))
      }
    }

    if (node.anyOf) {
      ui["ui:options"] = {
        ...((ui["ui:options"] as Record<string, unknown>) || {}),
        anyOf: node.anyOf.map((x) => walk(x))
      }
    }

    if (node.allOf) {
      ui["ui:options"] = {
        ...((ui["ui:options"] as Record<string, unknown>) || {}),
        allOf: node.allOf.map((x) => walk(x))
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

const serializeKey = (fieldPath: (string | number)[]) => {
  return fieldPath.filter(item => !isNumber(item)).join('.');
}

const I18nFieldTemplate: (t?: TFunction) => React.FC<FieldTemplateProps<unknown, RJSFSchema, Record<string, unknown>>> = (t) => {
  return ({ uiSchema, label, ...props }) => {
    if (!FieldTemplateAntd) return null;
    const keyPrefix = serializeKey(props.fieldPathId.path);
    if (!t || !keyPrefix) return <FieldTemplateAntd {...props} label={label} uiSchema={uiSchema} />
    const placeholder = uiSchema?.['ui:placeholder'];
    const description = () => {
      if (!props.description?.props) return;
      return <props.registry.templates.DescriptionFieldTemplate
        {...props.description?.props}
        description={t?.(`${keyPrefix}.description`, { defaultValue: props.description?.props?.description })}
      />
    }
    return <FieldTemplateAntd
      {...props}
      label={t?.(`${keyPrefix}.label`, { defaultValue: label })}
      description={description()}
      uiSchema={{
        ...uiSchema,
        ...(placeholder ? { 'ui:placeholder': t?.(`${keyPrefix}.placeholder`, { defaultValue: placeholder }) } : {}),
      }} />
  }
}

const EMPTY_SCHEMA: RJSFSchema = {};
const EMPTY_FORM_DATA: Record<string, unknown> = {};

const FORM_WIDGETS = {
  remoteSelect: RemoteSelectWidget,
  toolsetsSelect: ToolsetsSelectWidget,
  select: SelectWidget,
  treeSelect: TreeSelectWidget,
  password: PasswordWidget,
  TextareaWidget: DeferredTextareaWidget,
};

const getLocalizer = (language: string) => {
  const simpleLanguage = language.split('-')[0];
  return localizer[language as keyof typeof localizer] || localizer[simpleLanguage as keyof typeof localizer];
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
  t,
}) => {
  const { styles } = useStyle();
  const formValuesRef = useRef(value ?? EMPTY_FORM_DATA);
  const formValueListenersRef = useRef(new Set<() => void>());
  // Last object given to the parent. Antd echoes that same reference on the next render.
  const emittedRef = useRef(value);
  const [seed, setSeed] = useState(value);
  const [formInstance, setFormInstance] = useState(0);
  if (value !== emittedRef.current) {
    emittedRef.current = value;
    formValuesRef.current = value ?? EMPTY_FORM_DATA;
    setSeed(value);
    setFormInstance((instance) => instance + 1);
  }

  const { i18n } = useTranslation()

  const i18nValidator = useMemo(() => customizeValidator({}, getLocalizer(i18n.language)), [i18n.language]);

  useImperativeHandle(formRef, () => ({
    validate: (value: Record<string, unknown>): Promise<void> => {
      const result = i18nValidator.validateFormData(value, schema, undefined, undefined, mergedUiSchema);
      if (result.errors.filter(error => error.name !== 'additionalProperties').length > 0) {
        console.error(result.errors);
        return Promise.reject(result.errors[0].message);
      }
      return Promise.resolve();
    }
  }));

  const handleChange = useCallback(
    ({ formData: next }: { formData?: Record<string, unknown> }) => {
      const data = next ?? {};
      emittedRef.current = data;
      formValuesRef.current = data;
      formValueListenersRef.current.forEach((listener) => listener());
      onChange?.(data);
    },
    [onChange]
  );

  // formContext must stay referentially stable. RJSF rebuilds its registry when this
  // value changes, and a new registry remounts fields, which drops input focus.
  const formContext = useMemo(() => ({
    descriptionLocation: 'tooltip' as const,
    getFormValues: () => formValuesRef.current,
    subscribeFormValues: (listener: () => void) => {
      formValueListenersRef.current.add(listener);
      return () => {
        formValueListenersRef.current.delete(listener);
      };
    },
  }), []);

  const mergedUiSchema = React.useMemo(() => {
    if (!schema) {
      return {};
    }
    const autoUi = buildUiSchema(schema as JsonSchemaNode)
    return {
      ...autoUi || {},
      ...uiSchema || {}
    }
  }, [schema, uiSchema]);

  const fields = useMemo(() => ({ objectEditor: I18nObjectField(t) }), [t]);
  const templates = useMemo(() => ({
    FieldTemplate: I18nFieldTemplate(t),
    BaseInputTemplate: DeferredBaseInputTemplate,
  }), [t]);

  return (
    <Form
      // Uncontrolled while typing. Echoing formData makes RJSF resolve the schema again on every commit.
      // Remount only when the parent value is not the object we just emitted.
      key={formInstance}
      // Render as div so this can nest inside an outer antd <Form> without invalid nested <form>s.
      tagName="div"
      className={classNames(styles.jsonSchemaForm, 'json-schema-config-form')}
      schema={schema || EMPTY_SCHEMA}
      initialFormData={seed}
      onChange={handleChange}
      validator={i18nValidator}
      uiSchema={mergedUiSchema || {}}
      disabled={disabled}
      showErrorList={false}
      liveValidate="onBlur"
      liveOmit="onBlur"
      autoComplete='off'
      fields={fields}
      widgets={FORM_WIDGETS}
      templates={templates}
      formContext={formContext}
    />
  );
};

export interface JsonSchemaConfigFormItemProps extends FormItemProps {
  schema: RJSFSchema;
  uiSchema?: Record<string, unknown>;
  t?: TFunction;
}

export const JsonSchemaConfigFormItem = ({ schema, uiSchema, t, ...props }: JsonSchemaConfigFormItemProps) => {
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
    <JsonSchemaConfigForm schema={schema} formRef={formRef} uiSchema={uiSchema} t={t} />
  </AntForm.Item>;
}

export default JsonSchemaConfigForm;
