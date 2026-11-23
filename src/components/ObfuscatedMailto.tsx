'use client';

import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';

interface ObfuscatedMailtoProps {
  /**
   * Email is passed in two parts so the raw address never appears as a single
   * contiguous string in the static HTML, which cuts down trivial scrapers.
   */
  user: string;
  domain: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Client-only mailto link. The `href` is assembled in the browser after mount,
 * so the address is not present verbatim in the server-rendered markup.
 */
export default function ObfuscatedMailto({
  user,
  domain,
  label = 'Email me',
  className,
  children,
}: ObfuscatedMailtoProps) {
  const [href, setHref] = useState<string | undefined>(undefined);

  useEffect(() => {
    setHref(`mailto:${user}@${domain}`);
  }, [user, domain]);

  return (
    <a
      href={href}
      aria-label={label}
      className={
        className ??
        'inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-neutral-100 hover:bg-white/10 transition-colors'
      }
    >
      <Mail className="h-4 w-4" aria-hidden="true" />
      <span>{children ?? label}</span>
    </a>
  );
}
