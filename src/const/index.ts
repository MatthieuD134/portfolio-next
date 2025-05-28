export const LOCALES = ['en-US', 'fr-FR', 'zh-CN'] as const;
export const DEFAULT_LOCALE = 'en-US';
export const localesEnum = {
  en: 'en-US',
  fr: 'fr-FR',
  zh: 'zh-CN',
} as const;

export type LocalesEnum = (typeof localesEnum)[keyof typeof localesEnum];

export const SOCIAL_URLS = {
  linkedIn: 'https://www.linkedin.com/in/matthieudaulhiac/',
  github: 'https://github.com/MatthieuD134',
};
