import type { VisibleCondition } from '@/service/api/typing';

/**
 * Check if a field should be visible based on the visibility condition
 * @param condition - The visibility condition
 * @param formValues - Current form values
 * @returns true if the field should be visible, false otherwise
 */
export const checkVisibilityCondition = (
  condition: VisibleCondition | undefined,
  formValues: Record<string, any>
): boolean => {
  // If no condition, always visible
  if (!condition) {
    return true;
  }

  const { field, operator, value } = condition;

  // Get the field value from form (support nested config fields)
  const fieldValue = formValues.config?.[field] ?? formValues[field];

  // If the field doesn't exist yet, hide by default
  if (fieldValue === undefined || fieldValue === null) {
    return false;
  }

  switch (operator) {
    case 'eq':
      // Equal comparison
      return fieldValue === value;

    case 'ne':
      // Not equal comparison
      return fieldValue !== value;

    case 'in':
      // Check if value is in array
      if (!Array.isArray(value)) {
        console.warn('VisibleCondition: "in" operator requires an array value');
        return false;
      }
      return value.includes(fieldValue);

    case 'not_in':
      // Check if value is not in array
      if (!Array.isArray(value)) {
        console.warn('VisibleCondition: "not_in" operator requires an array value');
        return false;
      }
      return !value.includes(fieldValue);

    case 'contains':
      // Check if string contains substring
      if (typeof fieldValue !== 'string') {
        return false;
      }
      if (typeof value !== 'string') {
        console.warn('VisibleCondition: "contains" operator requires a string value');
        return false;
      }
      return fieldValue.includes(value);

    default:
      console.warn(`Unknown visibility operator: ${operator}`);
      return true;
  }
};

