import { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactSection.css';

const CONTACTS = [
  {
    icon: '📧',
    title: 'EMAIL',
    value: 'manshaulhaq2005@gmail.com',
    hint: 'RESPONSE TIME: < 24H',
    href: 'mailto:manshaulhaq2005@gmail.com',
    id: 'contact-email',
  },
  {
    icon: '💼',
    title: 'LINKEDIN',
    value: 'linkedin.com/in/manshauh',
    hint: 'PROFESSIONAL NETWORK',
    href: 'https://linkedin.com/in/manshauh',
    id: 'contact-linkedin',
  },
  {
    icon: '🐙',
    title: 'GITHUB',
    value: 'github.com/manshaulhaq',
    hint: 'CODE REPOSITORIES',
    href: 'https://github.com/manshaulhaq',
    id: 'contact-github',
  },
  {
    icon: '📡',
    title: 'SIGNAL FROM',
    value: 'Islamabad, Pakistan',
    hint: 'PKT (UTC+5)',
    href: null,
    id: 'contact-location',
  },
];

const AVAILABILITY = [
  { label: 'FULL-TIME',   status: 'OPEN',   color: 'green' },
  { label: 'PART-TIME',   status: 'OPEN',   color: 'green' },
  { label: 'FREELANCE',   status: 'OPEN',   color: 'green' },
  { label: 'INTERNSHIP',  status: 'OPEN',   color: 'green' },
  { label: 'REMOTE',      status: 'PREFERRED', color: 'blue' },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:manshaulhaq2005@gmail.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.msg)}%0A%0AFrom%3A%20${encodeURIComponent(form.email)}`;
    window.open(mailto, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-section__title">[OPEN_CHANNEL]</h2>

      <div className="contact-layout">
        {/* Left: cards + availability */}
        <div className="contact-left">
          <div className="contact-grid">
            {CONTACTS.map((c, i) => (
              <motion.a
                key={c.id}
                id={c.id}
                href={c.href || '#'}
                className="contact-card"
                target={c.href?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
              >
                <div className="contact-card__icon">{c.icon}</div>
                <div className="contact-card__title">{c.title}</div>
                <div className="contact-card__value">{c.value}</div>
                <div className="contact-card__hint">{c.hint}</div>
              </motion.a>
            ))}
          </div>

          {/* Availability terminal */}
          <motion.div
            className="availability-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="availability-box__titlebar">
              <div className="pixel-window__dot pixel-window__dot--red" />
              <div className="pixel-window__dot pixel-window__dot--yellow" />
              <div className="pixel-window__dot pixel-window__dot--green" />
              <span>availability_status.sh</span>
            </div>
            <div className="availability-box__body">
              {AVAILABILITY.map(a => (
                <div key={a.label} className="availability-row">
                  <span className="availability-row__label">{a.label}</span>
                  <span className="availability-row__dots">···</span>
                  <span className={`availability-row__status availability-row__status--${a.color}`}>
                    ● {a.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: message form */}
        <motion.div
          className="contact-form-box"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="contact-form-box__titlebar">
            <div className="pixel-window__dot pixel-window__dot--red" />
            <div className="pixel-window__dot pixel-window__dot--yellow" />
            <div className="pixel-window__dot pixel-window__dot--green" />
            <span>compose_message.exe</span>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__field">
              <label className="contact-form__label">NAME</label>
              <input
                className="contact-form__input"
                type="text"
                placeholder="Your name..."
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div className="contact-form__field">
              <label className="contact-form__label">EMAIL</label>
              <input
                className="contact-form__input"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div className="contact-form__field">
              <label className="contact-form__label">MESSAGE</label>
              <textarea
                className="contact-form__input contact-form__textarea"
                placeholder="Write your message here..."
                rows={5}
                value={form.msg}
                onChange={e => setForm(f => ({ ...f, msg: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="pixel-btn pixel-btn--primary contact-form__btn">
              {sent ? '✓ SIGNAL SENT' : '▶ TRANSMIT'}
            </button>
            {sent && <div className="contact-form__success">Message opened in your mail client!</div>}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
