import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
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
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-[#F8FAF9] border-t border-slate-200/60 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1000 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold tracking-wider uppercase font-heading">
            <i className="bi bi-envelope-check-fill" />
            <span>{t('contact.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards & Links */}
          <motion.div
            initial={{ opacity: 0, x: -25, rotateX: 6 }}
            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-4">
              <a
                href="mailto:yashbaviskar0215@outlook.com"
                className="glass-card-hover rounded-2xl p-5 flex items-center gap-4 group block bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
                  <i className="bi bi-envelope-fill" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-heading">{t('contact.emailLabel')}</span>
                  <strong className="text-sm sm:text-base text-slate-900 font-semibold group-hover:text-purple-600 transition-colors">
                    yashbaviskar0215@outlook.com
                  </strong>
                </div>
              </a>

              <a
                href="tel:+919623166585"
                className="glass-card-hover rounded-2xl p-5 flex items-center gap-4 group block bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center text-xl font-bold group-hover:bg-violet-600 group-hover:text-white transition-colors shrink-0">
                  <i className="bi bi-telephone-fill" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-heading">{t('contact.phoneLabel')}</span>
                  <strong className="text-sm sm:text-base text-slate-900 font-semibold group-hover:text-violet-600 transition-colors">
                    +91 96231 66585
                  </strong>
                </div>
              </a>

              <a
                href="https://yashbaviskar.me"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-hover rounded-2xl p-5 flex items-center gap-4 group block bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <i className="bi bi-globe" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-heading">{t('contact.websiteLabel')}</span>
                  <strong className="text-sm sm:text-base text-slate-900 font-semibold group-hover:text-blue-600 transition-colors">
                    yashbaviskar.me
                  </strong>
                </div>
              </a>

              <div className="glass-card rounded-2xl p-5 flex items-center gap-4 bg-white border border-slate-200/80 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold shrink-0">
                  <i className="bi bi-geo-alt-fill" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-heading">{t('contact.locationLabel')}</span>
                  <strong className="text-sm sm:text-base text-slate-900 font-semibold">
                    {t('contact.locationValue')}
                  </strong>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading block mb-3">
                {t('contact.socialsHeader')}
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { href: 'https://linkedin.com/in/yashbaviskar15', icon: 'bi-linkedin', label: 'LinkedIn', color: 'text-purple-600 hover:border-purple-300' },
                  { href: 'https://github.com/yashbaviskar15', icon: 'bi-github', label: 'GitHub', color: 'text-slate-900 hover:border-slate-400' },
                  { href: 'https://dev.to/yashbaviskar15', icon: 'bi-journal-code', label: 'Dev.to', color: 'text-slate-900 hover:border-slate-400' },
                  { href: 'https://instagram.com/mryash.__', icon: 'bi-instagram', label: 'Instagram', color: 'text-pink-600 hover:border-pink-300' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-700 font-semibold text-xs flex items-center gap-2 shadow-2xs ${s.color} transition-all hover:-translate-y-0.5`}
                  >
                    <i className={`bi ${s.icon} text-base`} />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 25, rotateX: 6 }}
            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} noValidate className="glass-card rounded-3xl p-6 sm:p-10 bg-white border border-slate-200/90 shadow-md space-y-5">
              <h3 className="text-2xl font-bold font-heading text-slate-900 border-b border-slate-100 pb-4">
                {t('contact.formTitle')}
              </h3>

              {/* Validation Success Banner */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-sm font-medium"
                >
                  <i className="bi bi-check-circle-fill text-xl text-emerald-600 shrink-0" />
                  <span>{t('contact.successMsg')}</span>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 font-heading">
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                      errors.name ? 'border-rose-500 ring-2 ring-rose-500/10' : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20'
                    } text-slate-900 text-sm focus:outline-none transition-all duration-200`}
                  />
                  {errors.name && <p className="text-xs text-rose-600 font-medium">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 font-heading">
                    {t('contact.emailInputLabel')}
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                      errors.email ? 'border-rose-500 ring-2 ring-rose-500/10' : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20'
                    } text-slate-900 text-sm focus:outline-none transition-all duration-200`}
                  />
                  {errors.email && <p className="text-xs text-rose-600 font-medium">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 font-heading">
                  {t('contact.subjectLabel')}
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder={t('contact.subjectPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 text-slate-900 text-sm focus:outline-none transition-all duration-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 font-heading">
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t('contact.messagePlaceholder')}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                    errors.message ? 'border-rose-500 ring-2 ring-rose-500/10' : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20'
                  } text-slate-900 text-sm focus:outline-none transition-all duration-200 resize-none`}
                />
                {errors.message && <p className="text-xs text-rose-600 font-medium">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm sm:text-base gradient-btn shadow-md hover:shadow-purple-500/25 hover:-translate-y-1 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>
                    <i className="bi bi-arrow-repeat text-lg animate-spin" />
                    <span>{t('contact.sendingBtn')}</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-fill text-sm" />
                    <span>{t('contact.sendBtn')}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
