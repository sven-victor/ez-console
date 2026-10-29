import { useMemo } from 'react';
import type { FormContextType, GenericObjectType, RJSFSchema, StrictRJSFSchema, WidgetProps } from '@rjsf/utils';
import { ariaDescribedByIds } from '@rjsf/utils';
import type { TreeSelectProps } from 'antd';
import { TreeSelect } from 'antd';

const TREE_SELECT_STYLE = {
  width: '100%',
};

type TreeDataNode = NonNullable<TreeSelectProps['treeData']>[number];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Map schema `x-tree-options` into Ant Design tree data. */
function treeDataFromOptions(raw: unknown, leafOnly: boolean): TreeDataNode[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  const nodes: TreeDataNode[] = [];
  for (const item of raw) {
    if (!isRecord(item) || item.value == null || item.value === '') {
      continue;
    }
    const children = treeDataFromOptions(item.children, leafOnly);
    const value = String(item.value);
    nodes.push({
      value,
      title: item.label == null || item.label === '' ? value : String(item.label),
      disabled: item.disabled === true || (leafOnly && children.length > 0),
      children: children.length > 0 ? children : undefined,
    });
  }
  return nodes;
}

/** value -> leaf descendants. A leaf maps to itself. A parent maps to its selectable leaves. */
function leafIndex(nodes: TreeDataNode[]): Map<string, string[]> {
  const leavesOf = new Map<string, string[]>();
  const walk = (node: TreeDataNode): string[] => {
    const value = String(node.value ?? '');
    const children = node.children ?? [];
    const leaves = children.length === 0
      ? (node.disabled || value === '' ? [] : [value])
      : children.flatMap((child) => walk(child));
    if (value !== '') {
      leavesOf.set(value, leaves);
    }
    return leaves;
  };
  nodes.forEach(walk);
  return leavesOf;
}

/**
 * Ant Design may return `{ value, label, halfChecked }` objects.
 * A parent stands for its leaves, so `platform` becomes `api` and `worker`.
 */
function selectedTreeValues(next: unknown, leavesOf: Map<string, string[]>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const add = (value: string) => {
    const leaves = leavesOf.get(value);
    const resolved = leaves === undefined ? [value] : leaves;
    for (const item of resolved) {
      if (item !== '' && !seen.has(item)) {
        seen.add(item);
        out.push(item);
      }
    }
  };
  const visit = (item: unknown) => {
    if (Array.isArray(item)) {
      item.forEach(visit);
      return;
    }
    if (item == null || item === '') {
      return;
    }
    if (isRecord(item)) {
      if (item.halfChecked === true) {
        return;
      }
      if ('value' in item) {
        visit(item.value);
      }
      return;
    }
    add(String(item));
  };
  visit(next);
  return out;
}

const filterTreeNode: TreeSelectProps['filterTreeNode'] = (input, node) => {
  const title = node.title;
  return typeof title === 'string' && title.toLowerCase().includes(input.toLowerCase());
};

const getPopupContainer = (node: HTMLElement) => node.parentElement ?? document.body;

/** Tree select whose options come from schema `x-tree-options`. */
export default function TreeSelectWidget<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>({
  autofocus,
  disabled,
  registry,
  id,
  multiple,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  readonly,
  value,
  schema,
}: WidgetProps<T, S, F>) {
  const { formContext } = registry;
  const { readonlyAsDisabled = true } = formContext as GenericObjectType;
  const isMultiple = Boolean(multiple) || schema.type === 'array';
  const treeData = useMemo(
    () => treeDataFromOptions((schema as { 'x-tree-options'?: unknown })['x-tree-options'], !isMultiple),
    [schema, isMultiple],
  );
  const leavesOf = useMemo(() => leafIndex(treeData), [treeData]);
  const selected = selectedTreeValues(value, leavesOf);
  const selectValue = isMultiple ? selected : selected[0];

  const handleChange = (next: unknown) => {
    const nextValues = selectedTreeValues(next, leavesOf);
    onChange(isMultiple ? nextValues : nextValues[0]);
  };

  return (
    <TreeSelect
      id={id}
      autoFocus={autofocus}
      allowClear
      disabled={disabled || (readonlyAsDisabled && readonly)}
      getPopupContainer={getPopupContainer}
      placeholder={placeholder}
      showSearch
      style={TREE_SELECT_STYLE}
      treeData={treeData}
      treeDefaultExpandAll
      treeCheckable={isMultiple || undefined}
      showCheckedStrategy={isMultiple ? TreeSelect.SHOW_CHILD : undefined}
      maxTagCount={isMultiple ? 'responsive' : undefined}
      value={selectValue}
      filterTreeNode={filterTreeNode}
      onBlur={!readonly ? () => onBlur(id, value) : undefined}
      onChange={!readonly ? handleChange : undefined}
      onFocus={!readonly ? () => onFocus(id, value) : undefined}
      aria-describedby={ariaDescribedByIds(id)}
    />
  );
}
