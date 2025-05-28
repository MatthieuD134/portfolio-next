import './globals.css';

import type { Metadata } from 'next';
import { Share_Tech, Share_Tech_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/sonner';
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
      <body
        className={`${shareTechSans.variable} ${shareTechMono.variable} bg-background antialiased`}
      >
        <NextIntlClientProvider>
          <div className="grid h-svh max-h-svh place-items-center">
            <div className="flex h-svh w-full flex-col items-center justify-center p-2 md:p-8">
              <Header params={routeParams} />
              <main className="border-foreground h-full max-h-9/12 w-full max-w-[1200px] overflow-scroll border-2 border-t-0 p-2 font-sans">
                {children}
              </main>
              <Footer params={routeParams} />
            </div>
          </div>
          <Toaster
            position="bottom-center"
            toastOptions={{
              classNames: {
                toast: '!rounded-none !border-cyan-800 !text-cyan-400 !font-sans',
                error: '!text-foreground !border-foreground/30',
              },
            }}
          />
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
