import type { Metadata } from 'next';
import Image from 'next/image';
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
          { type: 'text', text: `> ${t('loadingProfile')}`, speed: 50, className: '' },
          { type: 'text', text: `▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮`, speed: 50, className: '', hideBlink: true },
          {
            type: 'component',
            content: (
              <span className="my-8 grid min-h-[300px] grid-cols-1 gap-0 md:grid-cols-2">
                <div className="flex justify-end">
                  <div className="relative m-2 min-h-48 w-full md:aspect-square md:w-auto">
                    <Image
                      className="opacity-90 hue-rotate-[135deg] invert"
                      src="/vault-boy-matthieu.webp"
                      alt="Vault Boy - Matthieu Daulhiac"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h2 className="mb-4">{t('welcomeMessage')}</h2>
                  <ul className="flex flex-col items-start gap-2">
                    <li>
                      <span className="mr-2 text-cyan-400">{t('name')}:</span>
                      <span className="text-foreground">{t('nameValue')}</span>
                    </li>
                    <li>
                      <span className="mr-2 text-cyan-400">{t('stack')}:</span>
                      <span className="text-foreground">{t('stackValue')}</span>
                    </li>
                    <li>
                      <span className="mr-2 text-cyan-400">{t('location')}:</span>
                      <span className="text-foreground">{t('locationValue')}</span>
                    </li>
                    <li>
                      <span className="mr-2 text-cyan-400">{t('status')}:</span>
                      <span className="text-foreground">{t('statusValue')}</span>
                    </li>
                  </ul>
                </div>
              </span>
            ),
          },
          { type: 'text', text: '> waiting for input . . .', speed: 50, className: '' },
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
