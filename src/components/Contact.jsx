import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('yashbaviskar0215@outlook.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = t('contact.errName');
    if (!form.email.trim()) {
      newErrors.email = t('contact.errEmailReq');
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = t('contact.errEmailInvalid');
    }
    if (!form.message.trim()) newErrors.message = t('contact.errMessage');
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative bg-[#F8FAF9] border-t border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold tracking-wider uppercase font-heading">
            <i className="bi bi-chat-dots-fill" />
            <span>{t('contact.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Channels (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg font-bold border border-purple-100">
                    <i className="bi bi-envelope-fill" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-heading">
                      {t('contact.emailLabel')}
                    </span>
                    <a href="mailto:yashbaviskar0215@outlook.com" className="text-sm sm:text-base font-bold text-slate-900 hover:text-purple-600 transition-colors">
                      yashbaviskar0215@outlook.com
                    </a>
                  </div>
                </div>
                <button type="button" onClick={copyEmail} className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer">
                  <i className={`bi ${copiedEmail ? 'bi-check-lg text-emerald-600' : 'bi-clipboard'}`} />
                  <span>{copiedEmail ? '✓' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/yashbaviskar15" target="_blank" rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-300/80 transition-all flex items-center justify-between group block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold border border-blue-100"><i className="bi bi-linkedin" /></div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-heading">LinkedIn</span>
                  <strong className="text-sm sm:text-base text-slate-900 font-bold group-hover:text-blue-600 transition-colors">linkedin.com/in/yashbaviskar15</strong>
                </div>
              </div>
              <i className="bi bi-box-arrow-up-right text-xs text-slate-400 group-hover:text-blue-600 transition-colors" />
            </a>

            {/* GitHub */}
            <a href="https://github.com/yashbaviskar15" target="_blank" rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-300/80 transition-all flex items-center justify-between group block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center text-lg font-bold border border-slate-200"><i className="bi bi-github" /></div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-heading">GitHub</span>
                  <strong className="text-sm sm:text-base text-slate-900 font-bold group-hover:text-purple-600 transition-colors">github.com/yashbaviskar15</strong>
                </div>
              </div>
              <i className="bi bi-box-arrow-up-right text-xs text-slate-400 group-hover:text-purple-600 transition-colors" />
            </a>

            {/* Location */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold border border-emerald-100 shrink-0"><i className="bi bi-geo-alt-fill" /></div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-heading">{t('contact.locationLabel')}</span>
                  <strong className="text-sm sm:text-base text-slate-900 font-bold block">{t('contact.locationValue')}</strong>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5"
          >
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">{t('contact.formTitle')}</h3>
              <p className="text-xs sm:text-sm text-slate-500">{t('contact.subtitle')}</p>
            </div>

            {status === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5">
                <i className="bi bi-check-circle-fill text-emerald-600 text-base shrink-0" />
                <span>{t('contact.successMsg')}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label htmlFor="contact-name" className="text-xs font-bold text-slate-700 font-heading block">{t('contact.nameLabel')}</label>
                  <input type="text" id="contact-name" name="name" value={form.name} onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-slate-50 focus:bg-white transition-colors outline-hidden ${errors.name ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 focus:border-purple-500'}`} />
                  {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-1 text-left">
                  <label htmlFor="contact-email" className="text-xs font-bold text-slate-700 font-heading block">{t('contact.emailInputLabel')}</label>
                  <input type="email" id="contact-email" name="email" value={form.email} onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-slate-50 focus:bg-white transition-colors outline-hidden ${errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 focus:border-purple-500'}`} />
                  {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label htmlFor="contact-subject" className="text-xs font-bold text-slate-700 font-heading block">{t('contact.subjectLabel')}</label>
                <input type="text" id="contact-subject" name="subject" value={form.subject} onChange={handleChange} placeholder={t('contact.subjectPlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:border-purple-500 outline-hidden transition-colors" />
              </div>

              <div className="space-y-1 text-left">
                <label htmlFor="contact-message" className="text-xs font-bold text-slate-700 font-heading block">{t('contact.messageLabel')}</label>
                <textarea id="contact-message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder={t('contact.messagePlaceholder')}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-slate-50 focus:bg-white transition-colors outline-hidden resize-none ${errors.message ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 focus:border-purple-500'}`} />
                {errors.message && <p className="text-[11px] text-red-500">{errors.message}</p>}
              </div>

              <button type="submit" disabled={status === 'sending'}
                className="w-full py-3 rounded-xl gradient-btn text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-purple-500/20 transition-all cursor-pointer">
                {status === 'sending' ? (
                  <><span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" /><span>{t('contact.sendingBtn')}</span></>
                ) : (
                  <><i className="bi bi-send-fill text-xs" /><span>{t('contact.sendBtn')}</span></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
