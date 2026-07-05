/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 */

/**
 * Parses simple YAML frontmatter (key: value lines) into a record.
 * Handles single-line values only; keys are lowercased.
 */
import { load as loadYaml } from 'js-yaml';

function parseSimpleYamlFrontmatter(yamlBlock: string): Record<string, string> {
  try {
    return loadYaml(yamlBlock) as Record<string, string>;
  } catch (error) {
    console.error(error);
    return {};
  }
}

/**
 * Escapes a string for use in a markdown table cell (so | does not break the column).
 */
function escapeTableCell(s: string): string {
  return s.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

/**
 * Replaces the first YAML frontmatter block (--- ... ---) in markdown content
 * with a markdown table so the preview renders metadata in a readable way.
 * If no frontmatter is found, returns the original content.
 */
export function markdownWithMetadataAsTable(content: string): string {
  if (!content || !content.trim()) return content;
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
  const rows = keys.map((k) => '| ' + escapeTableCell(k) + ' | ' + escapeTableCell(meta[k] ?? '') + ' |').join('\n');
  const table = header + '\n' + separator + '\n' + rows;

  return table + '\n\n' + afterFrontmatter;
}
