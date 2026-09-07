/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 */

import { load as loadYaml } from 'js-yaml';

/**
 * Parses YAML frontmatter into a record. js-yaml returns native types
 * (numbers, booleans, arrays, nested objects), not only strings.
 */
function parseSimpleYamlFrontmatter(yamlBlock: string): Record<string, unknown> {
  try {
    const parsed = loadYaml(yamlBlock);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
    return {};
  } catch (error) {
    console.error(error);
    return {};
  }
}

/**
 * Flattens a YAML value to a single-line string for a markdown table cell.
 */
function formatYamlValue(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value);
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (Array.isArray(value)) {
    return value.map((item) => formatYamlValue(item)).join(', ');
  }
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return '';
    }
  }
  return String(value);
}

/**
 * Escapes a value for use in a markdown table cell (so | does not break the column).
 */
function escapeTableCell(value: unknown): string {
  return formatYamlValue(value).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

/**
 * Replaces the first YAML frontmatter block (--- ... ---) in markdown content
 * with a markdown table so the preview renders metadata in a readable way.
 * If no frontmatter is found, returns the original content.
 */
export function markdownWithMetadataAsTable(content: string): string {
  if (typeof content !== 'string' || !content.trim()) return content;
  const trimmed = content.trimStart();
  if (!trimmed.startsWith('---')) return content;

  const rest = trimmed.slice(3);
  const closeIdx = rest.indexOf('\n---');
  if (closeIdx === -1) return content;

  const yamlBlock = rest.slice(0, closeIdx).trim();
  const afterFrontmatter = rest.slice(closeIdx + 4).trimStart(); // after \n---

  const meta = parseSimpleYamlFrontmatter(yamlBlock);
  const keys = Object.keys(meta);
  if (keys.length === 0) return content;

  const header = '| Field | Value |';
  const separator = '| --- | --- |';
  const rows = keys.map((k) => '| ' + escapeTableCell(k) + ' | ' + escapeTableCell(meta[k]) + ' |').join('\n');
  const table = header + '\n' + separator + '\n' + rows;

  return table + '\n\n' + afterFrontmatter;
}
