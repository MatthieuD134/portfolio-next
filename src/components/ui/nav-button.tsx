'use client';

import { type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Button, buttonVariants } from './button';

function NavButton({
  className,
  variant,
  size,
  href,
  exact = false,
  activeClassName = '',
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    href: string;
    exact?: boolean;
    isActive?: boolean;
    activeClassName?: string;
  }) {
  const locale = useLocale();
  const pathname = usePathname();

  let pathnameWithoutLocale = pathname;
  if (pathname.startsWith(`/${locale}`)) {
    if (pathname.length === locale.length + 1) {
      pathnameWithoutLocale = '/';
    } else {
      pathnameWithoutLocale = pathname.slice(locale.length + 1);
    }
  }

  const isActive = React.useMemo(
    () => (exact ? pathnameWithoutLocale === href : pathnameWithoutLocale.startsWith(href)),
    [exact, pathnameWithoutLocale, href],
  );

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className, isActive ? activeClassName : '')}
      asChild
      {...props}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export { NavButton };
