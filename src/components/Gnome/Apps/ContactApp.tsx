import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Copy, Check, ExternalLink, CheckCircle2, Phone, MapPin, Globe, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { portfolioData } from '../../../data/portfolio';
import { useGnomeStore } from '../../../store/useGnomeStore';

export const ContactApp: React.FC = () => {
  const { themeMode, accentColor, t } = useGnomeStore();
  const strings = t();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contact.email);
    setCopiedEmail(true);
    toast.success(strings.contact.copied);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(portfolioData.contact.phone);
    setCopiedPhone(true);
    toast.success(strings.contact.copied);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      toast.success(strings.contact.sent, {
        description: `Thank you ${form.name}, Yash will reply to ${form.email} promptly.`,
      });
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1200);
  };

  if (isLoading) {
    return (
      <div className={`p-6 space-y-4 ${themeMode === 'dark' ? 'bg-[#1a1a1a]' : 'bg-neutral-100'}`}>
        <div className="h-6 w-44 rounded-lg bg-neutral-800 animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-16 rounded-xl bg-neutral-800/60 animate-pulse" />
          <div className="h-16 rounded-xl bg-neutral-800/60 animate-pulse" />
        </div>
        <div className="h-48 rounded-xl bg-neutral-800/60 animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-full select-none ${
        themeMode === 'dark' ? 'bg-[#1e1e1e] text-neutral-200' : 'bg-neutral-100 text-neutral-800'
      }`}
    >
      {/* Top Mail Client Toolbar */}
      <div
        className={`h-10 px-3 sm:px-4 border-b flex items-center justify-between text-xs shrink-0 ${
          themeMode === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-300'
        }`}
      >
        <div className="flex items-center gap-2 font-mono">
          <Mail className="w-4 h-4 text-blue-400" />
          <span className={`font-semibold ${themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
            {strings.contact.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border focus-visible:ring-2 focus-visible:ring-orange-500 ${
              themeMode === 'dark'
                ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-white/10'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300'
            }`}
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEmail ? strings.contact.copied : strings.contact.copyEmail}</span>
          </button>
        </div>
      </div>

      {/* Main Mail Form Body */}
      <div
        className={`flex-1 p-4 sm:p-6 overflow-y-auto gnome-scrollbar space-y-4 ${
          themeMode === 'dark' ? 'bg-[#1a1a1a]' : 'bg-neutral-50'
        }`}
      >
        {/* Direct Channels Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Email */}
          <div
            className={`p-3 rounded-xl border flex items-center justify-between ${
              themeMode === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-mono block">{strings.contact.directEmail}</span>
                <span
                  className={`font-medium font-mono text-[11px] truncate ${
                    themeMode === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {portfolioData.contact.email}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
              title="Copy"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Phone */}
          <div
            className={`p-3 rounded-xl border flex items-center justify-between ${
              themeMode === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-mono block">{strings.contact.phoneNumber}</span>
                <span
                  className={`font-medium font-mono text-[11px] ${
                    themeMode === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {portfolioData.contact.phone}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
              title="Copy"
            >
              {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Social Links Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <a
            href={portfolioData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span>linkedin.com/in/yashbaviskar15</span>
          </a>

          <a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors border cursor-pointer ${
              themeMode === 'dark'
                ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-white/10'
                : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300'
            }`}
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>github.com/yashbaviskar15</span>
          </a>
        </div>

        {/* Mail Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs">
            <span className="w-16 text-neutral-500 font-medium font-mono">{strings.contact.to}</span>
            <span className="px-2 py-0.5 rounded bg-orange-600/20 text-orange-400 border border-orange-500/30 font-mono text-[11px] truncate">
              {portfolioData.developer.name} &lt;{portfolioData.contact.email}&gt;
            </span>
          </div>

          <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs">
            <span className="w-16 text-neutral-500 font-medium font-mono">{strings.contact.from}</span>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder={strings.contact.namePlaceholder}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full bg-transparent p-1.5 rounded-lg border border-transparent focus:border-orange-500 focus:outline-none text-xs transition-colors ${
                  themeMode === 'dark' ? 'text-white placeholder:text-neutral-600' : 'text-neutral-900 placeholder:text-neutral-400'
                }`}
              />
              <input
                type="email"
                required
                placeholder={strings.contact.emailPlaceholder}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full bg-transparent p-1.5 rounded-lg border border-transparent focus:border-orange-500 focus:outline-none text-xs font-mono transition-colors ${
                  themeMode === 'dark' ? 'text-white placeholder:text-neutral-600' : 'text-neutral-900 placeholder:text-neutral-400'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs">
            <span className="w-16 text-neutral-500 font-medium font-mono">{strings.contact.subject}</span>
            <input
              type="text"
              placeholder={strings.contact.subjectPlaceholder}
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className={`w-full bg-transparent p-1.5 rounded-lg border border-transparent focus:border-orange-500 focus:outline-none text-xs transition-colors ${
                themeMode === 'dark' ? 'text-white placeholder:text-neutral-600' : 'text-neutral-900 placeholder:text-neutral-400'
              }`}
            />
          </div>

          <div className="space-y-1 pt-1">
            <textarea
              required
              rows={5}
              placeholder={strings.contact.messagePlaceholder}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`w-full p-3.5 rounded-xl border text-xs font-sans resize-none transition-colors focus:outline-none focus:border-orange-500 ${
                themeMode === 'dark'
                  ? 'bg-neutral-900 border-white/10 text-white placeholder:text-neutral-600'
                  : 'bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400'
              }`}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs">
              {status === 'sending' && (
                <span className="text-orange-400 font-mono flex items-center gap-1.5">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
                  <span>{strings.contact.sending}</span>
                </span>
              )}
              {status === 'sent' && (
                <span className="text-emerald-400 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{strings.contact.sent}</span>
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg flex items-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-orange-500"
              style={{ backgroundColor: accentColor }}
            >
              {status === 'sending' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status === 'sent' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>{status === 'sending' ? strings.contact.sending : status === 'sent' ? strings.contact.sent : strings.contact.sendMessage}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
