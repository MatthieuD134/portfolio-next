import type { MetadataRoute } from 'next';

import { LOCALES, SITE_URL } from '@/const';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      alternates: {
        languages: LOCALES.reduce(
          (acc, locale) => {
            acc[locale] = `${SITE_URL}/${locale}`;
            return acc;
          },
          {} as Record<string, string>,
        ),
      },
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      alternates: {
        languages: LOCALES.reduce(
          (acc, locale) => {
            acc[locale] = `${SITE_URL}/${locale}/projects`;
            return acc;
          },
          {} as Record<string, string>,
        ),
      },
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects/b2bCommerce`,
      lastModified: new Date(),
      alternates: {
        languages: LOCALES.reduce(
          (acc, locale) => {
            acc[locale] = `${SITE_URL}/${locale}/projects/b2bCommerce`;
            return acc;
          },
          {} as Record<string, string>,
        ),
      },
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/projects/wrappedPunks`,
      lastModified: new Date(),
      alternates: {
        languages: LOCALES.reduce(
          (acc, locale) => {
            acc[locale] = `${SITE_URL}/${locale}/projects/wrappedPunks`;
            return acc;
          },
          {} as Record<string, string>,
        ),
      },
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/projects/ozu`,
      lastModified: new Date(),
      alternates: {
        languages: LOCALES.reduce(
          (acc, locale) => {
            acc[locale] = `${SITE_URL}/${locale}/projects/ozu`;
            return acc;
          },
          {} as Record<string, string>,
        ),
      },
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      alternates: {
        languages: LOCALES.reduce(
          (acc, locale) => {
            acc[locale] = `${SITE_URL}/${locale}/contact`;
            return acc;
          },
          {} as Record<string, string>,
        ),
      },
      priority: 0.8,
    },
  ];
}
