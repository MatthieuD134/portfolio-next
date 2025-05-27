import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { NavButton } from '@/components/ui/nav-button';
import { Separator } from '@/components/ui/separator';

import { projects } from '../const';

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string; locale: string }>;
}) {
  const { projectId, locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: `ProjectsPage.${projectId}` });

  const stack: string[] = t('stack')
    .split(';')
    .map((item: string) => item.trim());

  const descriptions: string[] = t('description')
    .split(';')
    .map((item: string) => item.trim());

  return (
    <div>
      <NavButton
        href="/projects"
        className="text-primary/80 hover:text-primary"
      >{`<< ${t('backToProjects')}`}</NavButton>
      <div className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-2 p-4">
        <h2 className="text-xl text-cyan-400">{t('title').toLocaleUpperCase()}</h2>
        <Separator className="bg-cyan-800" />
        <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col">
            <ul className="relative flex flex-col border border-cyan-800 px-6 py-4">
              <h3 className="bg-background absolute -top-3 left-4 px-2 text-cyan-400">
                {t('detailsName')}
              </h3>
              <li className="flex gap-1">
                <span className="text-cyan-400">{t('dateName')}</span>
                <span>{t('date')}</span>
              </li>
              <li className="flex gap-1">
                <span className="text-cyan-400">{t('typeName')}</span>
                <span>{t('type')}</span>
              </li>
              <li className="flex gap-1">
                <span className="text-cyan-400">{t('locationName')}</span>
                <span>{t('location')}</span>
              </li>
              <li className="flex gap-1">
                <span className="text-cyan-400">{t('visibilityName')}</span>
                <span>{t('visibility')}</span>
              </li>
            </ul>
            <div className="mx-6 my-4">
              <h3 className="mb-1 text-cyan-400">{t('stackName').toLocaleUpperCase()}</h3>
              <ul className="grid grid-cols-2">
                {stack.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="mr-2">[✓]</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative w-full p-4 before:absolute before:top-0 before:left-0 before:h-4 before:w-4 before:border before:border-r-0 before:border-b-0 before:border-cyan-800 after:absolute after:right-0 after:bottom-0 after:h-4 after:w-4 after:border after:border-t-0 after:border-l-0 after:border-cyan-800">
            {descriptions.map((desc, index) => (
              <p key={index} className="text-foreground mb-2 w-full">
                {desc}
              </p>
            ))}
          </div>
        </div>
        <Button asChild variant="primary" className="mt-4">
          <a href={t('link')} target="_blank" rel="noopener noreferrer">
            {t('linkText')}
          </a>
        </Button>
      </div>
    </div>
  );
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return projects.map((project) => ({
    projectId: project.projectId,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; projectId: string }>;
}): Promise<Metadata> {
  const { locale, projectId } = await params;
  const t = await getTranslations({ locale, namespace: `ProjectsPageMetadata.${projectId}` });

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
