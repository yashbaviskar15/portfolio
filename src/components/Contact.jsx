import { useEffect, useRef, useState } from 'react';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('visible', entry.isIntersecting)),
      { threshold: 0.08 }
    );

    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.message.trim()) next.message = 'Message is required';
    return next;
  };

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
    setErrors((current) => ({ ...current, [target.name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    const subject = encodeURIComponent(form.subject || `Cloud Engineer opportunity - ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:yashbaviskar0215@outlook.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact section" id="contact" ref={ref}>
      <div className="container">
        <div className="contact__layout">
          <div className="contact__copy reveal-left">
            <span className="section-label"><i className="bi bi-chat-left-text-fill" aria-hidden="true" /> Contact</span>
            <h2>Available for Cloud Engineer and DevOps opportunities.</h2>
            <p>
              I am open to Cloud Engineer, DevOps Engineer, Cloud Support,
              and infrastructure automation roles where I can contribute and keep growing.
            </p>

            <div className="contact__cards">
              <a href="mailto:yashbaviskar0215@outlook.com">
                <i className="bi bi-envelope-fill" aria-hidden="true" />
                <span>Email</span>
                <strong>yashbaviskar0215@outlook.com</strong>
              </a>
              <a href="tel:+919623166585">
                <i className="bi bi-telephone-fill" aria-hidden="true" />
                <span>Phone</span>
                <strong>+91 96231 66585</strong>
              </a>
              <div>
                <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                <span>Location</span>
                <strong>Jalgaon, Maharashtra, India</strong>
              </div>
            </div>
          </div>

          <form className="contact__form reveal-right" onSubmit={handleSubmit} noValidate>
            <h3>Send a message</h3>
            <div className="contact__row">
              <label>
                <span>Name *</span>
                <input name="name" value={form.name} onChange={handleChange} autoComplete="name" aria-invalid={Boolean(errors.name)} />
                {errors.name && <small>{errors.name}</small>}
              </label>
              <label>
                <span>Email *</span>
                <input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" aria-invalid={Boolean(errors.email)} />
                {errors.email && <small>{errors.email}</small>}
              </label>
            </div>
            <label>
              <span>Subject</span>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="Role, referral, project, or collaboration" />
            </label>
            <label>
              <span>Message *</span>
              <textarea name="message" rows="6" value={form.message} onChange={handleChange} placeholder="Write your message..." aria-invalid={Boolean(errors.message)} />
              {errors.message && <small>{errors.message}</small>}
            </label>
            <button className="btn-primary" type="submit">
              <i className="bi bi-envelope-paper-fill" aria-hidden="true" />
              Open Email Draft
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
