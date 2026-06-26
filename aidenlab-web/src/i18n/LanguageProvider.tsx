'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { usePathname } from 'next/navigation';
import dict from './dictionary.json';

export type Locale = 'ko' | 'en' | 'zh' | 'ja';
export const LOCALES: Locale[] = (dict.locales as Locale[]) ?? ['ko', 'en', 'zh', 'ja'];

type Entry = { en: string; zh: string; ja: string };
const MAP: Map<string, Entry> = new Map(
  Object.entries(dict.map as Record<string, Entry>)
);

const TRANSLATE_ATTRS = ['placeholder', 'title', 'alt', 'aria-label'];

const ORIG_TEXT = new WeakMap<Text, string>();
const ORIG_ATTR = new WeakMap<Element, Record<string, string>>();

function leadTrail(s: string): [string, string] {
  const lead = s.match(/^\s*/)?.[0] ?? '';
  const trail = s.match(/\s*$/)?.[0] ?? '';
  return [lead, trail];
}

function translateText(node: Text, locale: Locale) {
  let orig = ORIG_TEXT.get(node);
  if (orig === undefined) {
    orig = node.nodeValue ?? '';
    ORIG_TEXT.set(node, orig);
  }
  const key = orig.trim();
  if (!key) return;
  const entry = MAP.get(key);
  if (!entry) return;
  if (locale === 'ko') {
    if (node.nodeValue !== orig) node.nodeValue = orig;
    return;
  }
  const t = entry[locale];
  if (t == null) return;
  const [lead, trail] = leadTrail(orig);
  const next = lead + t + trail;
  if (node.nodeValue !== next) node.nodeValue = next;
}

function translateAttrs(el: Element, locale: Locale) {
  let store = ORIG_ATTR.get(el);
  for (const attr of TRANSLATE_ATTRS) {
    if (!el.hasAttribute(attr)) continue;
    let orig = store?.[attr];
    if (orig === undefined) {
      orig = el.getAttribute(attr) ?? '';
      if (!store) {
        store = {};
        ORIG_ATTR.set(el, store);
      }
      store[attr] = orig;
    }
    const key = orig.trim();
    if (!key) continue;
    const entry = MAP.get(key);
    if (!entry) continue;
    if (locale === 'ko') {
      if (el.getAttribute(attr) !== orig) el.setAttribute(attr, orig);
      continue;
    }
    const t = entry[locale];
    if (t == null) continue;
    const [lead, trail] = leadTrail(orig);
    el.setAttribute(attr, lead + t + trail);
  }
}

function applyTranslations(locale: Locale) {
  if (typeof document === 'undefined') return;
  const root = document.body;
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = (node as Text).parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT')
        return NodeFilter.FILTER_REJECT;
      if (parent.closest('[data-no-i18n]')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const texts: Text[] = [];
  let n = walker.nextNode();
  while (n) {
    texts.push(n as Text);
    n = walker.nextNode();
  }
  for (const t of texts) translateText(t, locale);

  const attrEls = document.querySelectorAll(
    TRANSLATE_ATTRS.map((a) => `[${a}]`).join(',')
  );
  attrEls.forEach((el) => {
    if (el.closest('[data-no-i18n]')) return;
    translateAttrs(el, locale);
  });

  document.documentElement.lang = locale;
}

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
}
const LanguageContext = createContext<Ctx>({
  locale: 'ko',
  setLocale: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>('ko');
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('locale') as Locale | null;
      if (saved && LOCALES.includes(saved)) setLocaleState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem('locale', l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => applyTranslations(locale));
    return () => window.cancelAnimationFrame(id);
  }, [locale, pathname]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}
