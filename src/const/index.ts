export const LOCALES = ['en', 'fr', 'zh'] as const;
export const DEFAULT_LOCALE = 'en';
export const localesEnum = {
  en: 'en',
  fr: 'fr',
  zh: 'zh',
} as const;

export type LocalesEnum = (typeof localesEnum)[keyof typeof localesEnum];

export const SOCIAL_URLS = {
  linkedIn: 'https://www.linkedin.com/in/matthieudaulhiac/',
  github: 'https://github.com/MatthieuD134',
};

export const SITE_URL = 'https://www.matthieu-daulhiac.com';
