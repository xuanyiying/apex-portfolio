// Simple i18n types for client-side solution
// We use LanguageContext for client-side internationalization

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
