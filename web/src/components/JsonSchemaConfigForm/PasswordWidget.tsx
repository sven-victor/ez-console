import type { ChangeEvent, FocusEvent } from 'react';
import type { FormContextType, RJSFSchema, StrictRJSFSchema, WidgetProps, GenericObjectType } from '@rjsf/utils';
import { ariaDescribedByIds, getInputProps } from '@rjsf/utils';
import { Input } from 'antd';

/** The `PasswordWidget` component uses the `BaseInputTemplate` changing the type to `password`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function PasswordWidget<
  T = never,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = never,
>(props: WidgetProps<T, S, F>) {
  const { disabled, registry, id, onBlur, onChange, onFocus, options, placeholder, readonly, value } = props;
  const { formContext } = registry;
  const { readonlyAsDisabled = true } = formContext as GenericObjectType;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type: _, ...inputProps } = getInputProps<T, S, F>(props.schema, 'password', options, false);

  const emptyValue = options.emptyValue || '';

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    onChange(target.value === '' ? emptyValue : target.value);

  const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) => onBlur(id, target.value);

  const handleFocus = ({ target }: FocusEvent<HTMLInputElement>) => onFocus(id, target.value);

  return (
    <Input.Password
      {...inputProps}
      disabled={disabled || (readonlyAsDisabled && readonly)}
      id={id}
      name={id}
      onBlur={!readonly ? handleBlur : undefined}
      onChange={!readonly ? handleChange : undefined}
      onFocus={!readonly ? handleFocus : undefined}
      placeholder={placeholder}
      value={value || ''}
      aria-describedby={ariaDescribedByIds(id)}
    />
  );
}