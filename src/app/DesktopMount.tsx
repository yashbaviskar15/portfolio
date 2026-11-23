'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import HomeContent from './HomeContent';

// The desktop shell touches window/localStorage-width APIs on first render, so it is
// loaded client-side only (ssr: false) to guarantee zero hydration mismatches.
const GnomeDesktop = dynamic(
  () => import('../components/Gnome/GnomeDesktop').then((m) => m.GnomeDesktop),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function DesktopMount() {
  useEffect(() => {
    // Marks the document as hydrated so CSS can hide the static SEO fallback
    // and lock desktop scrolling. With JS disabled this never runs and the
    // server-rendered content stays fully readable.
    document.documentElement.setAttribute('data-hydrated', 'true');
    return () => {
      document.documentElement.removeAttribute('data-hydrated');
    };
  }, []);

  return (
    <>
      {/* Server-rendered, crawlable & JS-disabled fallback with the full content */}
      <div id="seo-fallback">
        <HomeContent />
      </div>
      <GnomeDesktop />
    </>
  );
}
