import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { NavButton } from '@/components/ui/nav-button';
import { Separator } from '@/components/ui/separator';

import { projects } from './const';

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'ProjectsPage' });

  return (
    <div className="mx-auto grid max-w-[900px] grid-cols-1 md:h-full md:grid-cols-[2fr_3fr]">
      <div className="flex items-center justify-end">
        <div className="relative h-full max-h-8/12 min-h-60 w-full max-w-full p-2 md:aspect-square md:w-auto">
          <Image
            className="p-8 opacity-90 hue-rotate-[135deg] invert"
            src="/vault-boy-matthieu-coding.webp"
            alt="Illustration of Matthieu Daulhiac working on a computer in a vault-boy style"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center p-4">
        <h2 className="mb-8 text-cyan-400">{t('title')}</h2>
        <ul className="flex w-full flex-col gap-2">
          {projects.map((project, index) => (
            <NavButton
              key={index}
              href={`projects/${project.projectId}`}
              variant="primary"
              className="h-fit"
            >
              <li className="flex w-full flex-col gap-0">
                <div className="flex justify-between">
                  <h3 className="text-md m-0">{t(project.titleKey)}</h3>
                  <h4 className="text-md m-0">{t(project.roleKey)}</h4>
                </div>
                <div className="text-foreground/70 flex items-center gap-2 text-xs">
                  <p>{t(project.dateKey)}</p>
                  <Separator orientation="vertical" className="bg-foreground/70 h-3" />
                  <p>{t(project.detailsKey)}</p>
                </div>
              </li>
            </NavButton>
          ))}
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
