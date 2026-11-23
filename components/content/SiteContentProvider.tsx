'use client';
import React, { createContext, useContext } from 'react';
import { contentDefaults, safeContentValue } from '@/lib/content/catalog';
const SiteContext = createContext<Record<string, string>>({});
export function SiteContentProvider({ children, content }: { children: React.ReactNode; content: Record<string, string> }) {
  return <SiteContext.Provider value={content}>{children}</SiteContext.Provider>;
}
export function useSiteText() {
  const content = useContext(SiteContext);
  return (key: string) => safeContentValue(key, content[key] ?? contentDefaults[key] ?? '');
}
