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

import React, { useMemo } from 'react';
import { Form, Input, InputNumber, Select, Switch, Checkbox, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDynamicDataSource } from '@/hooks/useDynamicDataSource';
import { checkVisibilityCondition } from '@/utils/visibilityCondition';
import type { ConfigField } from '@/service/api/typing';

const { TextArea } = Input;
const { Option } = Select;

interface DynamicConfigFieldProps {
  field: ConfigField;
  selectedType: string;
  dependentValues?: Record<string, any>;
  formValues?: Record<string, any>;
}

/**
 * Component to render a dynamic config field with support for various data sources
 */
const DynamicConfigField: React.FC<DynamicConfigFieldProps> = ({
  field,
  selectedType,
  dependentValues,
  formValues = {},
}) => {
  const { t } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');

  // Check if field should be visible based on condition
  const isVisible = useMemo(() => {
    return checkVisibilityCondition(field.visible_when, formValues);
  }, [field.visible_when, formValues]);

  // Load options from data source if configured
  const { options: dynamicOptions, loading: loadingOptions } = useDynamicDataSource(
    field.data_source,
    field.options,
    dependentValues
  );

  // Determine which options to use
  const effectiveOptions = useMemo(() => {
    // If data_source is configured, use dynamic options
    if (field.data_source && field.data_source.type !== 'static') {
      return dynamicOptions;
    }
    // Otherwise use static options
    return field.options || [];
  }, [field.data_source, field.options, dynamicOptions]);

  const hasOptions = effectiveOptions && effectiveOptions.length > 0;

  // If field is not visible, don't render anything
  if (!isVisible) {
    return null;
  }

  // Build validation rules
  const rules = [
    {
      required: field.required,
      message: t('settings.toolsets.fieldRequired', {
        defaultValue: `Please enter ${field.name}`,
        field: field.name,
      }),
    },
  ];

  // Helper to get translated field labels
  const getFieldLabel = () => {
    return t(`settings.toolsets.${selectedType}.${field.name}`, {
      defaultValue: field.display_name || field.name,
    });
  };

  const getFieldPlaceholder = () => {
    return t(`settings.toolsets.${selectedType}.${field.name}Placeholder`, {
      defaultValue: field.placeholder || `${tCommon('enter', { defaultValue: 'Enter' })} ${field.name}`,
    });
  };

  const getFieldTooltip = () => {
    if (!field.description) return undefined;
    return t(`settings.toolsets.${selectedType}.${field.name}Tooltip`, {
      defaultValue: field.description,
    });
  };

  // If field is not visible, don't render anything
  if (!isVisible) {
    return null;
  }

  // If field type is select or has data_source, render as select
  if (field.type === 'select' || field.data_source) {
    return (
      <Form.Item
        key={field.name}
        name={['config', field.name]}
        label={getFieldLabel()}
        rules={rules}
        tooltip={getFieldTooltip()}
      >
        <Select<string>
          loading={loadingOptions}
          allowClear
          placeholder={getFieldPlaceholder()}
          showSearch
          filterOption={(input, option) =>
            (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
          }
        >
          {effectiveOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
  }

  // Render based on field type
  switch (field.type) {
    case 'text':
      return (
        <Form.Item
          key={field.name}
          name={['config', field.name]}
          label={getFieldLabel()}
          rules={rules}
        >
          <TextArea placeholder={getFieldPlaceholder()} rows={4} />
        </Form.Item>
      );

    case 'string':
      // If has options, render as select
      if (hasOptions) {
        return (
          <Form.Item
            key={field.name}
            name={['config', field.name]}
            label={getFieldLabel()}
            rules={rules}
            tooltip={getFieldTooltip()}
          >
            <Select allowClear placeholder={getFieldPlaceholder()}>
              {effectiveOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
      }
      // Otherwise render as input
      return (
        <Form.Item
          key={field.name}
          name={['config', field.name]}
          label={getFieldLabel()}
          rules={rules}
          tooltip={getFieldTooltip()}
        >
          <Input placeholder={getFieldPlaceholder()} />
        </Form.Item>
      );

    case 'password':
      return (
        <Form.Item
          key={field.name}
          name={['config', field.name]}
          label={getFieldLabel()}
          rules={rules}
          tooltip={getFieldTooltip()}
        >
          <Input.Password placeholder={getFieldPlaceholder()} autoComplete="new-password" />
        </Form.Item>
      );

    case 'number':
      // If has options, render as select
      if (hasOptions) {
        return (
          <Form.Item
            key={field.name}
            name={['config', field.name]}
            label={getFieldLabel()}
            rules={rules}
            tooltip={getFieldTooltip()}
          >
            <Select allowClear placeholder={getFieldPlaceholder()}>
              {effectiveOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
      }
      // Otherwise render as number input
      return (
        <Form.Item
          key={field.name}
          name={['config', field.name]}
          label={getFieldLabel()}
          rules={rules}
          tooltip={getFieldTooltip()}
        >
          <InputNumber style={{ width: '100%' }} placeholder={getFieldPlaceholder()} />
        </Form.Item>
      );

    case 'boolean':
      return (
        <Form.Item
          key={field.name}
          name={['config', field.name]}
          label={getFieldLabel()}
          valuePropName="checked"
          tooltip={getFieldTooltip()}
        >
          <Switch />
        </Form.Item>
      );

    case 'array':
      // If has options, render as checkbox group or multi-select
      if (hasOptions) {
        return (
          <Form.Item
            key={field.name}
            name={['config', field.name]}
            label={getFieldLabel()}
            rules={rules}
            tooltip={getFieldTooltip()}
          >
            <Checkbox.Group style={{ width: '100%' }}>
              <Space direction="vertical">
                {effectiveOptions.map((option) => (
                  <Checkbox key={option.value} value={option.value}>
                    {option.label}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
        );
      }
      // Otherwise render as tags select
      return (
        <Form.Item
          key={field.name}
          name={['config', field.name]}
          label={getFieldLabel()}
          rules={rules}
          tooltip={getFieldTooltip()}
        >
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder={getFieldPlaceholder()}
            tokenSeparators={[',']}
          />
        </Form.Item>
      );

    case 'object':
      return (
        <Form.Item
          key={field.name}
          name={['config', field.name]}
          label={getFieldLabel()}
          rules={[
            ...rules,
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                try {
                  JSON.parse(value);
                  return Promise.resolve();
                } catch (e) {
                  return Promise.reject(
                    new Error(
                      t('settings.toolsets.invalidJSON', { defaultValue: 'Invalid JSON format' })
                    )
                  );
                }
              },
            },
          ]}
          tooltip={getFieldTooltip()}
        >
          <TextArea
            rows={4}
            placeholder={getFieldPlaceholder()}
          />
        </Form.Item>
      );

    default:
      return null;
  }
};

export default DynamicConfigField;

