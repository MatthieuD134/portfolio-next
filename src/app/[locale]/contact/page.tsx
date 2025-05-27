import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ContactForm } from '@/components/contact-form';

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return (
    <div className="mx-auto grid max-w-[900px] grid-cols-1 md:h-full md:grid-cols-[2fr_3fr]">
      <div className="flex items-center justify-end">
        <div className="relative h-full max-h-8/12 min-h-60 w-full max-w-full p-0 md:aspect-square md:w-auto md:p-4">
          <Image
            className="p-8 opacity-90 hue-rotate-[135deg] invert"
            src="/vault-boy-matthieu-contact.webp"
            alt="Illustration of Matthieu Daulhiac holding a phone in a vault-boy style"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center p-0 md:p-4">
        <h2 className="mb-8 text-xl text-cyan-400">{t('title')}</h2>
        <ContactForm />
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
  const t = await getTranslations({ locale, namespace: 'ContactPageMetadata' });

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
