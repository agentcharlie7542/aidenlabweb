#!/usr/bin/env node
/**
 * i18n coverage audit.
 *
 * Renders every route in every non-Korean locale and reports any Korean text
 * that survived translation — i.e. dictionary keys that are missing. Run the
 * dev or prod server first, then: `node scripts/i18n-audit.mjs`
 */
const BASE = process.env.BASE_URL || 'http://localhost:3000';
const LOCALES = ['en', 'zh', 'ja'];
const ROUTES = ['', '/about', '/services', '/cases', '/brands', '/wasabi10', '/news', '/careers', '/contact'];

const HANGUL = /[가-힣]/;

/** Visible text only: drop scripts, styles, and Next's serialized RSC payload. */
function visibleText(html) {
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  return body
    .split(/<[^>]+>/)
    .map((s) => s.replace(/&#x27;/g, "'").replace(/&amp;/g, '&').trim())
    .filter(Boolean);
}

const findings = new Map();

for (const locale of LOCALES) {
  for (const route of ROUTES) {
    const url = `${BASE}/${locale}${route}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`✗ ${url} → ${res.status}`);
      continue;
    }
    for (const text of visibleText(await res.text())) {
      if (!HANGUL.test(text)) continue;
      const key = text;
      if (!findings.has(key)) findings.set(key, new Set());
      findings.get(key).add(`${locale}${route || '/'}`);
    }
  }
}

if (findings.size === 0) {
  console.log('✓ no untranslated Korean text found in en/zh/ja');
  process.exit(0);
}

console.log(`✗ ${findings.size} untranslated string(s):\n`);
for (const [text, where] of findings) {
  console.log(JSON.stringify(text));
  console.log(`    ${[...where].slice(0, 4).join(', ')}`);
}
process.exit(1);
