import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { NavButton } from '@/components/ui/nav-button';

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'ProjectsPage' });

  return (
    <div className="grid grid-cols-1 md:h-full md:grid-cols-2">
      <div className="flex items-center justify-end">
        <div className="relative h-full max-h-8/12 min-h-60 w-full max-w-full p-2 md:aspect-square md:w-auto">
          <Image
            className="p-8 opacity-90 hue-rotate-[135deg] invert"
            src="/vault-boy-matthieu-coding.webp"
            alt="Vault Boy - Matthieu Daulhiac coding"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center p-4">
        <h2 className="mb-8 text-cyan-400">{t('title')}</h2>
        <ul className="flex w-full flex-col gap-2">
          <NavButton
            href="/projects/on"
            className="relative w-full before:absolute before:top-0 before:bottom-0 before:left-0 before:w-2 before:border before:border-r-0 after:absolute after:top-0 after:right-0 after:bottom-0 after:w-2 after:border after:border-l-0"
          >
            <li className="w-full">
              <h3>FullStack Engineer @ On</h3>
            </li>
          </NavButton>
          <NavButton
            href="/projects/on"
            className="relative w-full before:absolute before:top-0 before:bottom-0 before:left-0 before:w-2 before:border before:border-r-0 after:absolute after:top-0 after:right-0 after:bottom-0 after:w-2 after:border after:border-l-0"
          >
            <li className="w-full">
              <h3>Blockchain Engineer @ Ozu</h3>
            </li>
          </NavButton>
          <NavButton
            href="/projects/on"
            className="relative w-full before:absolute before:top-0 before:bottom-0 before:left-0 before:w-2 before:border before:border-r-0 after:absolute after:top-0 after:right-0 after:bottom-0 after:w-2 after:border after:border-l-0"
          >
            <li className="w-full">
              <h3>Blockchain Engineer @ Blanknetwork</h3>
            </li>
          </NavButton>
        </ul>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProjectsPageMetadata' });

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
