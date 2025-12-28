'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import enMessages from '../messages/en.json';
import zhMessages from '../messages/zh.json';

// Define locales type
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  messages: Record<string, unknown>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);



const messagesCache: Record<Locale, Record<string, unknown>> = {
  en: enMessages,
  zh: zhMessages
};

// Simple translation function
function translate(messages: Record<string, unknown>, key: string): string {
  const keys = key.split('.');
  let result: unknown = messages;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof result === 'string' ? result : key;
}

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale: Locale;
}

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [messages, setMessages] = useState<Record<string, unknown>>(messagesCache[initialLocale]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMessages(messagesCache[locale]);
  }, [locale]);

  useEffect(() => {
    // Update locale on client side and sync with localStorage
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale;
      if (savedLocale && locales.includes(savedLocale)) {
        setLocaleState(savedLocale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
      document.documentElement.lang = newLocale;
    }
    setMessages(messagesCache[newLocale]);
  };

  const t = (key: string): string => {
    if (!mounted) return key;
    return translate(messages, key);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}