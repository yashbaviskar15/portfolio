import React, { useState } from 'react';

export default function ContactWindow() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yashbaviskar0215@outlook.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/40 select-none">
      {/* Mail Toolbar */}
      <div className="h-11 px-4 border-b border-white/15 bg-white/5 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2 text-white/80">
          <i className="bi bi-envelope-paper-fill text-sky-400 text-sm" />
          <span className="font-semibold text-white">New Message</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <i className={`bi ${copied ? 'bi-check-lg text-emerald-400' : 'bi-copy'}`} />
            <span>{copied ? 'Copied!' : 'Copy Email'}</span>
          </button>
        </div>
      </div>

      {/* Main Mail Form Body */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto macos-scrollbar space-y-4">
        {/* Quick Social Badges */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 font-medium">Available for Cloud Engineer & DevOps Roles</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://linkedin.com/in/yashbaviskar15"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-0.5 rounded-md bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/30 font-medium flex items-center gap-1.5 transition-colors"
            >
              <i className="bi bi-linkedin" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/yashbaviskar15"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium flex items-center gap-1.5 transition-colors"
            >
              <i className="bi bi-github" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Compose Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs">
            <span className="w-16 text-white/50 font-medium">To:</span>
            <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30 font-mono text-[11px]">
              Yash Baviskar &lt;yashbaviskar0215@outlook.com&gt;
            </span>
          </div>

          <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs">
            <span className="w-16 text-white/50 font-medium">From:</span>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none text-xs"
              />
              <input
                type="email"
                required
                placeholder="Your Email (e.g. recruiter@company.com)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs">
            <span className="w-16 text-white/50 font-medium">Subject:</span>
            <input
              type="text"
              placeholder="Opportunity / Collaboration Inquiry"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none text-xs"
            />
          </div>

          <div className="space-y-1 pt-1">
            <textarea
              required
              rows={6}
              placeholder="Hi Yash, I came across your portfolio and would like to discuss..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400 text-xs font-sans resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs">
              {status === 'sending' && (
                <span className="text-cyan-400 font-mono flex items-center gap-1.5">
                  <i className="bi bi-arrow-repeat animate-spin" />
                  <span>Transmitting message...</span>
                </span>
              )}
              {status === 'sent' && (
                <span className="text-emerald-400 font-mono flex items-center gap-1.5">
                  <i className="bi bi-check-circle-fill" />
                  <span>Message dispatched successfully!</span>
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <i className="bi bi-send-fill text-[11px]" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
