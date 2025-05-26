// components/layout/Header.tsx
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';

export default async function Header({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'LandingPage' });

  return (
    <header className="flex max-w-[1200px] flex-col items-center justify-center font-mono">
      <h1>{t('welcome')}</h1>
      <nav>
        <ul className="flex gap-2 md:gap-4">
          <li>
            <Button variant="ghost">Home</Button>
          </li>
          <li>
            <Button>About</Button>
          </li>
          <li>
            <Button>Contact</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
