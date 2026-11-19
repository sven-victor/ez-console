/**
 * Copyright 2026 Sven Victor
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

import type { ChangeEvent, ComponentType, FocusEvent } from 'react';
import { Templates } from '@rjsf/antd';
import type { BaseInputTemplateProps, FormContextType, RJSFSchema, StrictRJSFSchema, WidgetProps } from '@rjsf/utils';
import { ariaDescribedByIds } from '@rjsf/utils';
import { Input } from 'antd';
import { useDraftValue } from './draftValue';

const { BaseInputTemplate } = Templates;

const INPUT_STYLE = { width: '100%' };

function emptyAs(raw: string, emptyValue: unknown) {
  return raw === '' ? emptyValue : raw;
}

/** Text keystrokes stay in the input. Number steppers and blur commit into the schema form. */
export default function DeferredBaseInputTemplate<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(props: BaseInputTemplateProps<T, S, F>) {
  const { value, onChange, onBlur, onFocus, options } = props;
  const { draft, updateDraft, flushDraft, markFocused } = useDraftValue(value);

  const handleText = ({ target }: ChangeEvent<HTMLInputElement>) => {
    updateDraft(emptyAs(target.value, options.emptyValue));
  };

  const handleBlur = (id: string, next: unknown) => {
    markFocused(false);
    flushDraft(onChange);
    onBlur(id, next);
  };

  const handleFocus = (id: string, next: unknown) => {
    markFocused(true);
    onFocus(id, next);
  };

  const InputTemplate = BaseInputTemplate as ComponentType<BaseInputTemplateProps<T, S, F>> | undefined;
  if (!InputTemplate) {
    return null;
  }

  return (
    <InputTemplate
      {...props}
      value={draft as T}
      onChangeOverride={handleText}
      onChange={(next: unknown) => updateDraft(next)}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
}

export function DeferredTextareaWidget<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>({
  disabled,
  registry,
  id,
  htmlName,
  onBlur,
  onChange,
  onFocus,
  options,
  placeholder,
  readonly,
  value,
}: WidgetProps<T, S, F>) {
  const { readonlyAsDisabled = true } = registry.formContext as { readonlyAsDisabled?: boolean };
  const { draft, updateDraft, flush, markFocused } = useDraftValue(value ?? '');

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    updateDraft(emptyAs(target.value, options.emptyValue));
  };

  const handleBlur = ({ target }: FocusEvent<HTMLTextAreaElement>) => {
    markFocused(false);
    const next = emptyAs(target.value, options.emptyValue);
    flush(next, onChange);
    onBlur(id, next);
  };

  const handleFocus = ({ target }: FocusEvent<HTMLTextAreaElement>) => {
    markFocused(true);
    onFocus(id, target.value);
  };

  return (
    <Input.TextArea
      disabled={disabled || (readonlyAsDisabled && readonly)}
      id={id}
      name={htmlName || id}
      onBlur={!readonly ? handleBlur : undefined}
      onChange={!readonly ? handleChange : undefined}
      onFocus={!readonly ? handleFocus : undefined}
      placeholder={placeholder}
      rows={options.rows || 4}
      style={INPUT_STYLE}
      value={typeof draft === 'string' ? draft : ''}
      aria-describedby={ariaDescribedByIds(id)}
    />
  );
}
