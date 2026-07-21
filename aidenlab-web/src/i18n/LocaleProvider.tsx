'use client';

import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { DEFAULT_LOCALE, type Locale } from './config';
import { t as translate, tx as deepTranslate } from './translate';

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export default function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/**
 * Client-side twin of the server `tx()` — same dictionary, same markers.
 * `t` translates one string, `tx` deep-translates a whole JSX subtree.
 */
export function useT() {
  const locale = useLocale();
  const t = useCallback((ko: string) => translate(ko, locale), [locale]);
  const tx = useCallback((node: React.ReactNode) => deepTranslate(node, locale), [locale]);
  return useMemo(() => ({ locale, t, tx }), [locale, t, tx]);
}
