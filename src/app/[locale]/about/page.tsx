import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return <div>{t('title')}</div>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPageMetadata' });

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
