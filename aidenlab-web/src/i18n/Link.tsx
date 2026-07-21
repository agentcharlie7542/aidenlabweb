'use client';

import NextLink from 'next/link';
import React from 'react';
import { localizePath } from './config';
import { useLocale } from './LocaleProvider';

type Props = Omit<React.ComponentProps<typeof NextLink>, 'href'> & { href: string };

/**
 * Drop-in replacement for `next/link` that keeps the visitor inside their
 * locale. Pages keep writing plain paths (`/services`); the prefix is added here
 * so no route string has to know about languages.
 */
export default function Link({ href, ...rest }: Props) {
  const locale = useLocale();
  const isInternal = href.startsWith('/') && !href.startsWith('//');
  return <NextLink href={isInternal ? localizePath(href, locale) : href} {...rest} />;
}
