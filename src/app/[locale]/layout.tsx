import './globals.css';

import type { Metadata } from 'next';
import { Share_Tech, Share_Tech_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { routing } from '@/i18n/routing';

const shareTechSans = Share_Tech({
  variable: '--font-share-tech-sans',
  subsets: ['latin'],
  weight: '400',
});

const shareTechMono = Share_Tech_Mono({
  variable: '--font-share-tech-mono',
  subsets: ['latin'],
  weight: '400',
});

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const routeParams = await params;
  const { locale } = routeParams;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for the locale
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${shareTechSans.variable} ${shareTechMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <div className="grid min-h-svh place-items-center p-2 md:p-8">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <Header params={routeParams} />
              <main className="h-full w-full max-w-[1200px] rounded-2xl border-2 p-2 font-sans">
                {children}
              </main>
              <Footer params={routeParams} />
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
  };
}
