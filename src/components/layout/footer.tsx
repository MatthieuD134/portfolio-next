// components/layout/Footer.tsx
import LanguageSwitcher from '@/components/language-switcher';

export default async function Footer({ params: _params }: { params: { locale: string } }) {
  return (
    <footer className="font-mono">
      <LanguageSwitcher />
    </footer>
  );
}
