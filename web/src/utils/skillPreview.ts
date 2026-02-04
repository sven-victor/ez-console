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
function parseSimpleYamlFrontmatter(yamlBlock: string): Record<string, string> {
  const out: Record<string, string> = {};
  const lines = yamlBlock.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx <= 0) continue;
    const key = trimmed.slice(0, colonIdx).trim();
    const value = trimmed.slice(colonIdx + 1).trim();
    // Remove optional surrounding quotes
    const cleanValue = (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))
      ? value.slice(1, -1)
      : value;
    out[key] = cleanValue;
  }
  return out;
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

/**
 * Transforms full skill preview content: replaces every frontmatter block
 * (---\n...\n---) that appears at the start of a section with a markdown table.
 * Used when the preview may contain multiple concatenated markdown parts (e.g. SKILL.md + other files).
 */
export function skillPreviewContentWithMetadataAsTable(content: string): string {
  if (!content || !content.trim()) return content;

  let result = content;
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/m;
  let match = result.match(frontmatterRegex);
  while (match) {
    const yamlBlock = match[1].trim();
    const afterFrontmatter = result.slice((match.index ?? 0) + match[0].length);
    const meta = parseSimpleYamlFrontmatter(yamlBlock);
    const keys = Object.keys(meta);
    if (keys.length > 0) {
      const header = '| Field | Value |';
      const separator = '| --- | --- |';
      const rows = keys.map((k) => '| ' + escapeTableCell(k) + ' | ' + escapeTableCell(meta[k] ?? '') + ' |').join('\n');
      const table = header + '\n' + separator + '\n' + rows;
      result = result.slice(0, match.index) + table + '\n\n' + afterFrontmatter;
    } else {
      result = result.slice(0, match.index) + afterFrontmatter;
    }
    match = result.match(frontmatterRegex);
  }
  return result;
}
