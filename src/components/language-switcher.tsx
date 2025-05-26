'use client';

import { LocalesEnum, localesEnum } from '../const';
import { Button } from './ui/button';

const LanguageSwitcher = () => {
  const changeLanguage = (locale: LocalesEnum) => {
    // add implementation for changing the locale in nextjs with next-intl
    const url = new URL(window.location.href);
    url.pathname = `/${locale}`;
    window.history.pushState({}, '', url.toString());
    window.location.reload(); // reload to apply the new locale
  };

  return (
    <div className="z-10 flex items-center gap-2">
      <Button onClick={() => changeLanguage(localesEnum.en)}>English</Button>
      <Button onClick={() => changeLanguage(localesEnum.fr)}>Français</Button>
      <Button onClick={() => changeLanguage(localesEnum.zh)}>中文</Button>
    </div>
  );
};

export default LanguageSwitcher;
