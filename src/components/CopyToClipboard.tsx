'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface CopyToClipboardProps {
  value: string;
  label?: string;
  copiedLabel?: string;
  toastMessage?: string;
  className?: string;
}

/**
 * Client-only helper used by the server-rendered SEO section and by desktop apps.
 * Keeps the raw phone number out of the markup while still allowing one-click copy.
 */
export default function CopyToClipboard({
  value,
  label = 'Copy',
  copiedLabel = 'Copied',
  toastMessage,
  className,
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (toastMessage) toast.success(toastMessage);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      if (toastMessage) toast.error('Copy failed — please copy manually.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      className={
        className ??
        'inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-neutral-200 hover:bg-white/10 transition-colors'
      }
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
}
