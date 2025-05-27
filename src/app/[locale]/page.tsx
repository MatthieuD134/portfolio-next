import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { TypewriterMultiText } from '@/components/typewriter-multi-text';
import { Button } from '@/components/ui/button';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return (
    <div>
      <TypewriterMultiText
        lines={[
          {
            type: 'text',
            text: `>> ${t('systemOnline').toLocaleUpperCase()}`,
            speed: 15,
            className: '',
          },
          { type: 'text', text: `>> ${t('loadingProfile')}`, speed: 15, className: '' },
          { type: 'text', text: `▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮`, speed: 30, className: '', hideBlink: true },
          {
            type: 'component',
            content: (
              <div className="mx-auto my-8 w-full max-w-[800px]">
                <div className="grid min-h-[250px] grid-cols-1 gap-0 md:grid-cols-[2fr_3fr]">
                  <div className="flex justify-center">
                    <div className="relative m-2 min-h-48 w-full md:aspect-square md:w-auto">
                      <Image
                        className="opacity-90 hue-rotate-[135deg] invert"
                        src="/vault-boy-matthieu.webp"
                        alt="Illustration of Matthieu Daulhiac in a vault-boy style"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-xl">{t('welcomeMessage')}</h2>
                    <div className="relative my-4 w-full p-4 before:absolute before:top-0 before:left-0 before:h-4 before:w-4 before:border before:border-r-0 before:border-b-0 after:absolute after:right-0 after:bottom-0 after:h-4 after:w-4 after:border after:border-t-0 after:border-l-0">
                      <p className="text-foreground w-full text-center">{t('intro')}</p>
                    </div>
                    <ul className="flex w-full flex-col items-start gap-2">
                      <li>
                        <span className="mr-2 text-cyan-400">{t('stack')}:</span>
                        <span className="text-foreground">{t('stackValue')}</span>
                      </li>
                      <li>
                        <span className="mr-2 text-cyan-400">{t('location')}:</span>
                        <span className="text-foreground">{t('locationValue')}</span>
                      </li>
                      <li>
                        <span className="mr-2 text-cyan-400">{t('availability')}:</span>
                        <span className="text-foreground">{t('availabilityValue')}</span>
                      </li>
                      <li>
                        <span className="mr-2 text-cyan-400">{t('languages')}:</span>
                        <span className="text-foreground">{t('languagesValue')}</span>
                      </li>
                    </ul>
                    <div className="mt-4 flex w-full justify-center">
                      <Button variant="primary" asChild>
                        <a href="/resume-en.pdf" target="_blank">
                          {t('resume')}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            ),
          },
          {
            type: 'text',
            text: `>> ${t('exitingProcess').toLocaleUpperCase()}`,
            speed: 15,
            className: 'my-8',
          },
        ]}
        lineDelay={500}
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
