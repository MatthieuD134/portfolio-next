import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/const';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['*'],
      disallow: [],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
