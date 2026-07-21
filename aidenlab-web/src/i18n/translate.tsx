import React from 'react';
import dict from './dictionary.json';
import { DEFAULT_LOCALE, type Locale } from './config';

type Translated = Record<'en' | 'zh' | 'ja', string>;

/** JSX collapses newlines + indentation into single spaces, so keys are normalized. */
function normalize(s: string): string {
  return s.trim().replace(/\s+/g, ' ');
}

const MAP: Record<string, Partial<Translated>> = Object.fromEntries(
  Object.entries(dict.map as unknown as Record<string, Partial<Translated>>).map(([k, v]) => [
    normalize(k),
    v,
  ])
);

const missing = new Set<string>();

/**
 * Translate a single Korean source string.
 * Korean is the source of truth: an unknown key falls back to the Korean text
 * rather than rendering an empty node.
 */
export function t(ko: string, locale: Locale): string {
  const key = normalize(ko);
  if (!key) return ko;
  if (locale === DEFAULT_LOCALE) return ko;
  const value = MAP[key]?.[locale as 'en' | 'zh' | 'ja'];
  if (value == null) {
    if (process.env.NODE_ENV !== 'production' && /[가-힣]/.test(key) && !missing.has(key + locale)) {
      missing.add(key + locale);
      console.warn(`[i18n] missing ${locale}: ${key}`);
    }
    return ko;
  }
  return value;
}

/** `**…**` marks the gradient-highlighted part; each language places it itself. */
const MARKER = /\*\*(.+?)\*\*/g;

export function stripMarkers(s: string): string {
  return s.replace(MARKER, '$1');
}

function hasMarkup(s: string): boolean {
  return s.includes('**') || s.includes('\n');
}

/** Render a translated string, expanding `**highlight**` and newlines. */
export function rich(text: string, highlightClass = 'grad-text'): React.ReactNode {
  if (!hasMarkup(text)) return text;
  const out: React.ReactNode[] = [];
  let k = 0;
  text.split('\n').forEach((line, lineIndex) => {
    if (lineIndex > 0) out.push(<br key={`br${k++}`} />);
    let last = 0;
    for (const m of line.matchAll(MARKER)) {
      if (m.index! > last) out.push(line.slice(last, m.index));
      out.push(
        <span className={highlightClass} key={`h${k++}`}>
          {m[1]}
        </span>
      );
      last = m.index! + m[0].length;
    }
    if (last < line.length) out.push(line.slice(last));
  });
  return out;
}

/** Props whose string values are identifiers/URLs, never prose. */
const OPAQUE_PROPS = new Set([
  'style', 'className', 'href', 'src', 'srcSet', 'id', 'htmlFor', 'role', 'rel',
  'target', 'action', 'method', 'accept', 'autoComplete', 'type', 'name',
  'inputMode', 'pattern', 'variantClass', 'highlightClass', 'dotColor', 'key',
  'value', 'defaultValue',
  'locale', 'iconSrc', 'bgImageSrc', 'imageSrc', 'url',
]);

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && !React.isValidElement(v);
}

/**
 * Deep-translate a React tree at render time.
 *
 * Korean literals stay in the JSX (they are the dictionary keys), so pages read
 * naturally and a single wrap at the page root localizes the whole subtree —
 * including Korean strings passed as props to child components.
 */
export function tx(node: React.ReactNode, locale: Locale): React.ReactNode {
  if (node == null || typeof node === 'boolean' || typeof node === 'number') return node;

  if (typeof node === 'string') {
    const translated = t(node, locale);
    if (!hasMarkup(translated)) return translated;
    const [lead] = node.match(/^\s*/) ?? [''];
    const [trail] = node.match(/\s*$/) ?? [''];
    return (
      <>
        {lead}
        {rich(translated)}
        {trail}
      </>
    );
  }

  if (Array.isArray(node)) return node.map((child, i) => <React.Fragment key={i}>{tx(child, locale)}</React.Fragment>);

  if (React.isValidElement(node)) {
    const props = node.props as Record<string, unknown>;
    const next: Record<string, unknown> = {};
    let changed = false;

    for (const [key, value] of Object.entries(props)) {
      if (OPAQUE_PROPS.has(key) || typeof value === 'function') {
        next[key] = value;
        continue;
      }
      if (typeof value === 'string') {
        if (key === 'children') {
          next[key] = tx(value, locale);
          changed = true;
        } else {
          const translated = stripMarkers(t(value, locale));
          next[key] = translated;
          if (translated !== value) changed = true;
        }
        continue;
      }
      if (Array.isArray(value) || React.isValidElement(value) || isPlainObject(value)) {
        const translated = key === 'children' ? tx(value as React.ReactNode, locale) : txData(value, locale);
        next[key] = translated;
        changed = true;
        continue;
      }
      next[key] = value;
    }

    return changed ? React.cloneElement(node, next) : node;
  }

  return node;
}

/** Translate plain data structures (arrays of objects passed as props). */
function txData(value: unknown, locale: Locale): unknown {
  if (typeof value === 'string') return stripMarkers(t(value, locale));
  if (Array.isArray(value)) {
    if (value.some((v) => React.isValidElement(v))) return tx(value as React.ReactNode, locale);
    return value.map((v) => txData(v, locale));
  }
  if (React.isValidElement(value)) return tx(value, locale);
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = OPAQUE_PROPS.has(k) ? v : txData(v, locale);
    return out;
  }
  return value;
}
