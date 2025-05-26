import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { TypewriterMultiText } from '@/components/typewriter-multi-text';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return (
    <div>
      <TypewriterMultiText
        lines={[
          { text: `> ${t('loadingProfile')}`, speed: 50, className: '' },
          { text: `> ${t('welcomeMessage')}`, speed: 50, className: '' },
        ]}
        lineDelay={1000}
      />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    applicationName: t('applicationName'),
    authors: [
      {
        name: t('authorName'),
        url: t('authorUrl'),
      },
    ],
    keywords: t('keywords')
      .split(';')
      .map((keyword) => keyword.trim()),
  };
}
