import React, { useState } from 'react';
import { Mail, Send, Copy, Check, ExternalLink, CheckCircle2, Phone, MapPin, Globe, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { portfolioData } from '../../../data/portfolio';
import { useGnomeStore } from '../../../store/useGnomeStore';
import { Tooltip } from '../Tooltip';

export const ContactApp: React.FC = () => {
  const { themeMode, accentColor, t } = useGnomeStore();
  const strings = t();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [lastSentTimestamp, setLastSentTimestamp] = useState<number>(0);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contact.email);
    setCopiedEmail(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(portfolioData.contact.phone);
    setCopiedPhone(true);
    toast.success('Phone number copied to clipboard!');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const validate = (): boolean => {
    const nextErrors: { name?: string; email?: string; message?: string } = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Please provide your name.';
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email format (e.g., name@domain.com).';
    }
    if (!form.message.trim()) {
      nextErrors.message = 'Please provide a message.';
    } else if (form.message.trim().length < 5) {
      nextErrors.message = 'Message must be at least 5 characters long.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastSentTimestamp < 30000) {
      toast.error('Rate limit reached', {
        description: 'Please wait a moment before sending another message.',
      });
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('sent');
        setLastSentTimestamp(Date.now());
        toast.success('Message delivered successfully!', {
          description: `Thank you ${form.name}, Yash will respond to ${form.email} promptly.`,
        });
        setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
        setErrors({});
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        throw new Error(data.error || 'Failed to dispatch message');
      }
    } catch (err: any) {
      console.warn('[Contact Dispatch Fallback]', err);
      // Fallback: Open mailto client
      const mailtoLink = `mailto:${portfolioData.contact.email}?subject=${encodeURIComponent(
        form.subject || `Inquiry from ${form.name}`
      )}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;

      window.open(mailtoLink, '_blank');
      setStatus('sent');
      toast.info('Opened in mail client', {
        description: 'Direct mailto draft generated for your default email app.',
      });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div
      className={`flex flex-col h-full select-none ${
        themeMode === 'dark' ? 'bg-[#1e1e1e] text-neutral-200' : 'bg-neutral-100 text-neutral-800'
      }`}
    >
      {/* Top Mail Client Toolbar */}
      <div
        className={`h-11 px-3 sm:px-4 border-b flex items-center justify-between text-xs shrink-0 ${
          themeMode === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-300'
        }`}
      >
        <div className="flex items-center gap-2 font-mono">
          <Mail className="w-4 h-4 text-orange-400" />
          <span className={`font-semibold ${themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
            Contact & Outreach
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border ${
              themeMode === 'dark'
                ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-white/10'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300'
            }`}
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
          </button>
        </div>
      </div>

      {/* Main Mail Form Body */}
      <div
        className={`flex-1 p-4 sm:p-5 overflow-y-auto gnome-scrollbar space-y-4 ${
          themeMode === 'dark' ? 'bg-[#1a1a1a]' : 'bg-neutral-50'
        }`}
      >
        {/* Direct Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Email */}
          <div
            className={`p-3 rounded-2xl border flex items-center justify-between ${
              themeMode === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-1">
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="truncate min-w-0">
                <span className="text-[10px] text-neutral-400 font-mono block">Primary Email</span>
                <span
                  className={`font-medium font-mono text-xs truncate block ${
                    themeMode === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {portfolioData.contact.email}
                </span>
              </div>
            </div>
            <Tooltip content={copiedEmail ? 'Copied!' : 'Copy email address'} side="left">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer shrink-0"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </Tooltip>
          </div>

          {/* Phone */}
          <div
            className={`p-3 rounded-2xl border flex items-center justify-between ${
              themeMode === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-1">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="truncate min-w-0">
                <span className="text-[10px] text-neutral-400 font-mono block">Direct Phone</span>
                <span
                  className={`font-medium font-mono text-xs truncate block ${
                    themeMode === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {portfolioData.contact.phone}
                </span>
              </div>
            </div>
            <Tooltip content={copiedPhone ? 'Copied!' : 'Copy phone number'} side="left">
              <button
                type="button"
                onClick={handleCopyPhone}
                className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer shrink-0"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Compose Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-3 pt-1">
          {/* Honeypot */}
          <input
            type="text"
            name="_gotcha"
            value={form.honeypot}
            onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-400 block font-mono">
                  Your Name <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Miller"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full p-2.5 rounded-xl border text-xs transition-colors focus:outline-none ${
                    errors.name
                      ? 'border-rose-500 bg-rose-500/10 text-white'
                      : themeMode === 'dark'
                      ? 'bg-neutral-900 border-white/10 text-white placeholder:text-neutral-600 focus:border-orange-500'
                      : 'bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-[10.5px] text-rose-400 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-400 block font-mono">
                  Your Email <span className="text-orange-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full p-2.5 rounded-xl border text-xs font-mono transition-colors focus:outline-none ${
                    errors.email
                      ? 'border-rose-500 bg-rose-500/10 text-white'
                      : themeMode === 'dark'
                      ? 'bg-neutral-900 border-white/10 text-white placeholder:text-neutral-600 focus:border-orange-500'
                      : 'bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-[10.5px] text-rose-400 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-400 block font-mono">
                Subject
              </label>
              <input
                type="text"
                placeholder="Cloud / DevOps Opportunity"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs transition-colors focus:outline-none ${
                  themeMode === 'dark'
                    ? 'bg-neutral-900 border-white/10 text-white placeholder:text-neutral-600 focus:border-orange-500'
                    : 'bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500'
                }`}
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-400 block font-mono">
                Message <span className="text-orange-400">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Hello Yash, we have an open role for a Junior Cloud/DevOps Engineer..."
                value={form.message}
                onChange={(e) => {
                  setForm({ ...form, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: undefined });
                }}
                className={`w-full p-3 rounded-2xl border text-xs font-sans resize-none transition-colors focus:outline-none ${
                  errors.message
                    ? 'border-rose-500 bg-rose-500/10 text-white'
                    : themeMode === 'dark'
                    ? 'bg-neutral-900 border-white/10 text-white placeholder:text-neutral-600 focus:border-orange-500'
                    : 'bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500'
                }`}
              />
              {errors.message && (
                <p className="text-[10.5px] text-rose-400 flex items-center gap-1 pt-0.5">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* Sticky Send Footer */}
          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <div className="text-xs">
              {status === 'sending' && (
                <span className="text-orange-400 font-mono flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Transmitting message...</span>
                </span>
              )}
              {status === 'sent' && (
                <span className="text-emerald-400 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Message sent!</span>
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg flex items-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: accentColor }}
            >
              {status === 'sending' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : status === 'sent' ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>{status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent' : 'Send Message'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
