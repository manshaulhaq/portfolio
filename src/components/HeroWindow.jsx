import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './HeroWindow.css';

/* ── Typewriter Hook ─────────────────────────── */
function useTypewriter(text, speed = 60) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return { displayed, done };
}

/* ── Live Clock ─────────────────────────────── */
function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime(`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const SKILLS = [
  { label: 'Python', color: 'blue' },
  { label: 'TensorFlow/Keras', color: 'orange' },
  { label: 'PyTorch', color: 'red' },
  { label: 'Scikit-Learn', color: 'orange' },
  { label: 'FastAPI', color: 'green' },
  { label: 'Docker', color: 'blue' },
  { label: 'SQL', color: 'green' },
  { label: 'Arch Linux', color: 'purple' },
];

const SYS_ROWS = [
  { label: 'USER',   value: 'mansha@portfolio' },
  { label: 'ROLE',   value: 'AI Engineer' },
  { label: 'OS',     value: 'Arch Linux' },
  { label: 'STACK',  value: 'Python · PyTorch · FastAPI' },
  { label: 'STATUS', value: '● AVAILABLE', accent: true },
  { label: 'MAIL',   value: 'manshaulhaq2005@gmail.com' },
  { label: 'LOC',    value: 'Islamabad, PK (UTC+5)' },
];

function SysInfo({ time }) {
  return (
    <motion.div
      className="hero-sysinfo"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="hero-sysinfo__titlebar">
        <div className="pixel-window__dot pixel-window__dot--red" />
        <div className="pixel-window__dot pixel-window__dot--yellow" />
        <div className="pixel-window__dot pixel-window__dot--green" />
        <span>sys_info.sh</span>
      </div>
      <div className="hero-sysinfo__body">
        {SYS_ROWS.map(r => (
          <div key={r.label} className="hero-sysinfo__row">
            <span className="hero-sysinfo__key">{r.label}</span>
            <span className="hero-sysinfo__sep">▸</span>
            <span className={`hero-sysinfo__val${r.accent ? ' hero-sysinfo__val--accent' : ''}`}>{r.value}</span>
          </div>
        ))}
        <div className="hero-sysinfo__row">
          <span className="hero-sysinfo__key">TIME</span>
          <span className="hero-sysinfo__sep">▸</span>
          <span className="hero-sysinfo__val hero-sysinfo__val--time">{time}</span>
        </div>
        <div className="hero-sysinfo__prompt">
          <span className="hero-sysinfo__cursor-line">$ _<span className="cursor-blink" /></span>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroWindow() {
  const bioText = 'AI Engineer building production-grade ML systems that bridge research and reality. Architecting full pipelines—curating data, training deep learning models, and deploying low-latency APIs.';
  const { displayed, done } = useTypewriter(bioText, 20);
  const time = useClock();

  const floatVariants = {
    animate: {
      y: [0, -8, 0],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-layout">
        {/* Main profile window */}
        <motion.div
          className="hero-window scanlines pixel-noise"
          variants={floatVariants}
          animate="animate"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Title bar */}
          <div className="hero-window__titlebar">
            <div className="pixel-window__dot pixel-window__dot--red" />
            <div className="pixel-window__dot pixel-window__dot--yellow" />
            <div className="pixel-window__dot pixel-window__dot--green" />
            <span className="hero-window__titlebar-title">WHO_AM_I.exe</span>
          </div>

          {/* Body */}
          <div className="hero-window__body">
            {/* Avatar */}
            <div className="hero-avatar">
              <div className="hero-avatar__frame">
                <img src="/gojo_nobg.png" alt="Gojo Avatar" className="hero-gojo" />
              </div>
              <span className="hero-avatar__status">● ONLINE</span>
            </div>

            {/* Content */}
            <div className="hero-content">
              <div className="hero-content__tag">&gt; PROFILE LOADED</div>
              <h1 className="hero-content__name">
                <span>MANSHA</span>
                <br />UL HAQ
              </h1>
              <div className="hero-content__title">AI ENGINEER</div>

              <p className="hero-content__bio">
                <span className="hero-typewriter">{displayed}</span>
                {!done && <span className="hero-typewriter__cursor" />}
              </p>

              <div className="hero-content__skills">
                {SKILLS.map(s => (
                  <span key={s.label} className={`pixel-badge pixel-badge--${s.color}`}>
                    {s.label}
                  </span>
                ))}
              </div>

              <div className="hero-content__cta">
                <Link to="/projects" className="pixel-btn pixel-btn--primary" id="hero-cta-projects">
                  VIEW FILES
                </Link>
                <Link to="/contact" className="pixel-btn pixel-btn--secondary" id="hero-cta-contact">
                  SEND SIGNAL
                </Link>
                <a
                  href="/resume.pdf"
                  download="Mansha_Ul_Haq_Resume.pdf"
                  className="pixel-btn pixel-btn--download"
                  id="hero-cta-resume"
                >
                  ↓ RESUME
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SysInfo panel */}
        <SysInfo time={time} />
      </div>
    </section>
  );
}
