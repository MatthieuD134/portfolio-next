import { getTranslations } from 'next-intl/server';

import { NavButton } from '@/components/ui/nav-button';

export default async function Header({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'Header' });

  return (
    <header className="flex w-full max-w-[1200px] flex-col items-center justify-center font-mono">
      <h1 className="mb-4 text-center text-2xl md:text-4xl">{t('title')}</h1>
      <nav className="w-full">
        <ul className="flex justify-center gap-0">
          <span className="border-foreground w-full border-b-2" />
          <li>
            <NavButton
              exact
              className="border-foreground text-md after:bg-background relative border-b-2 px-5 before:absolute before:top-[50%] before:right-0 before:bottom-0 before:left-0 before:border-2 before:border-b-0 before:border-solid before:opacity-0 after:absolute after:inset-3 after:opacity-100 md:text-xl"
              activeClassName="border-b-0 text-foreground before:opacity-100"
              href="/"
            >
              <span className="z-10">{t('home')}</span>
            </NavButton>
          </li>
          <span className="border-foreground w-full border-b-2" />
          <li>
            <NavButton
              className="border-foreground text-md after:bg-background relative border-b-2 px-5 before:absolute before:top-[50%] before:right-0 before:bottom-0 before:left-0 before:border-2 before:border-b-0 before:border-solid before:opacity-0 after:absolute after:inset-3 after:opacity-100 md:text-xl"
              activeClassName="border-b-0 text-foreground before:opacity-100"
              href="/projects"
            >
              <span className="z-10">{t('projects')}</span>
            </NavButton>
          </li>
          <span className="border-foreground w-full border-b-2" />
          <li>
            <NavButton
              className="border-foreground text-md after:bg-background relative border-b-2 px-5 before:absolute before:top-[50%] before:right-0 before:bottom-0 before:left-0 before:border-2 before:border-b-0 before:border-solid before:opacity-0 after:absolute after:inset-3 after:opacity-100 md:text-xl"
              activeClassName="border-b-0 text-foreground before:opacity-100"
              href="/contact"
            >
              <span className="z-10">{t('contact')}</span>
            </NavButton>
          </li>
          <span className="border-foreground w-full border-b-2" />
        </ul>
      </nav>
    </header>
  );
}
