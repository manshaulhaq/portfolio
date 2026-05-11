import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

/* ── Pixel-art SVG Icons ──────────────────────── */

const FloppyIcon = ({ size = 28, active }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    {/* Outer casing */}
    <rect x="1" y="1" width="14" height="14" fill={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
    <rect x="2" y="2" width="12" height="12" fill={active ? 'var(--glass-2)' : 'var(--glass-3)'} />
    {/* Label area */}
    <rect x="3" y="2" width="8" height="5" fill={active ? 'var(--accent-purple)' : 'var(--pixel-border)'} />
    {/* Shutter */}
    <rect x="6" y="3" width="2" height="3" fill={active ? 'var(--accent-blue)' : 'var(--text-dim)'} />
    {/* Metal plate */}
    <rect x="3" y="9" width="10" height="4" fill={active ? 'var(--accent-purple)' : 'var(--pixel-border)'} />
    <rect x="10" y="2" width="3" height="5" fill={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
    {/* Highlights */}
    <rect x="1" y="1" width="14" height="1" fill="rgba(255,255,255,0.15)" />
    <rect x="1" y="1" width="1" height="14" fill="rgba(255,255,255,0.1)" />
  </svg>
);

const FolderIcon = ({ size = 28, active }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    {/* Tab */}
    <rect x="1" y="4" width="5" height="2" fill={active ? 'var(--accent-yellow)' : 'var(--text-secondary)'} />
    <rect x="6" y="5" width="9" height="1" fill={active ? 'var(--accent-yellow)' : 'var(--text-secondary)'} />
    {/* Body */}
    <rect x="1" y="5" width="14" height="9" fill={active ? 'var(--accent-orange)' : 'var(--pixel-border)'} />
    <rect x="2" y="6" width="12" height="7" fill={active ? 'var(--deep-space)' : 'var(--glass-3)'} />
    {/* Files inside */}
    <rect x="4" y="8" width="3" height="4" fill={active ? 'var(--accent-yellow)' : 'var(--text-secondary)'} />
    <rect x="8" y="9" width="3" height="3" fill={active ? 'var(--accent-yellow)' : 'var(--text-secondary)'} />
    {/* Highlights */}
    <rect x="1" y="5" width="14" height="1" fill="rgba(255,255,255,0.1)" />
  </svg>
);

const SatelliteIcon = ({ size = 28, active }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    {/* Dish base */}
    <rect x="7" y="12" width="2" height="3" fill={active ? 'var(--accent-green)' : 'var(--text-secondary)'} />
    <rect x="5" y="14" width="6" height="1" fill={active ? 'var(--accent-green)' : 'var(--text-secondary)'} />
    {/* Dish body */}
    <rect x="3" y="8" width="10" height="1" fill={active ? 'var(--accent-green)' : 'var(--pixel-border)'} />
    <rect x="2" y="9" width="12" height="2" fill={active ? 'var(--accent-green)' : 'var(--glass-3)'} />
    <rect x="3" y="11" width="10" height="1" fill={active ? 'var(--accent-green)' : 'var(--pixel-border)'} />
    <rect x="5" y="12" width="6" height="1" fill={active ? 'var(--accent-green)' : 'var(--text-secondary)'} />
    {/* Signal waves */}
    <rect x="11" y="4" width="1" height="1" fill={active ? 'var(--accent-green)' : 'var(--text-secondary)'} />
    <rect x="12" y="2" width="1" height="1" fill={active ? 'var(--accent-green)' : 'var(--text-secondary)'} />
    <rect x="13" y="5" width="1" height="1" fill={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
    <rect x="10" y="6" width="1" height="1" fill={active ? 'var(--accent-green)' : 'var(--pixel-border)'} />
    {/* Feed arm */}
    <rect x="7" y="5" width="1" height="4" fill={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
    <rect x="6" y="4" width="3" height="2" fill={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
    <rect x="7" y="3" width="1" height="2" fill={active ? 'var(--accent-blue)' : 'var(--text-dim)'} />
  </svg>
);

const HomeIcon = ({ size = 22, active }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    <rect x="7" y="1" width="2" height="2" fill={active ? 'var(--accent-purple)' : 'var(--text-secondary)'} />
    <rect x="5" y="3" width="6" height="2" fill={active ? 'var(--accent-purple)' : 'var(--text-secondary)'} />
    <rect x="3" y="5" width="10" height="2" fill={active ? 'var(--accent-purple)' : 'var(--pixel-border)'} />
    <rect x="1" y="7" width="14" height="1" fill={active ? 'var(--accent-purple)' : 'var(--text-secondary)'} />
    <rect x="3" y="7" width="10" height="7" fill={active ? 'var(--glass-2)' : 'var(--glass-3)'} />
    <rect x="6" y="10" width="4" height="4" fill={active ? 'var(--accent-purple)' : 'var(--pixel-border)'} />
  </svg>
);

const NAV_ITEMS = [
  { id: 'home',       to: '/',       label: 'HOME',    Icon: HomeIcon },
  { id: 'experience', to: '/experience', label: 'EXP',     Icon: FloppyIcon },
  { id: 'projects',   to: '/projects',   label: 'FILES',   Icon: FolderIcon },
  { id: 'contact',    to: '/contact',    label: 'SIGNAL',  Icon: SatelliteIcon },
];

export default function Sidebar({ theme, toggleTheme }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="sidebar" role="navigation" aria-label="Main Navigation">
      <div className="sidebar__logo">MH</div>
      <div className="sidebar__divider" />
      <div className="sidebar__nav">
        {NAV_ITEMS.map(({ id, to, label, Icon }) => (
          <NavLink
            key={id}
            id={`nav-${id}`}
            to={to}
            className={({ isActive }) => `sidebar__link${isActive ? ' active' : ''}`}
            aria-label={label}
            title={label}
          >
            {({ isActive }) => (
              <>
                <Icon size={26} active={isActive} />
                <span className="sidebar__link-label">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div className="sidebar__bottom">
        <a
          href="/resume.pdf"
          download="Mansha_Ul_Haq_Resume.pdf"
          className="sidebar__resume-btn"
          title="Download Resume"
          aria-label="Download Resume"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
            <rect x="3" y="1" width="10" height="1" fill="currentColor" />
            <rect x="2" y="2" width="12" height="8" fill="currentColor" opacity="0.3" />
            <rect x="3" y="2" width="10" height="7" fill="currentColor" opacity="0.5" />
            <rect x="5" y="4" width="6" height="1" fill="currentColor" />
            <rect x="5" y="6" width="6" height="1" fill="currentColor" />
            <rect x="7" y="9" width="2" height="3" fill="currentColor" />
            <rect x="5" y="11" width="6" height="1" fill="currentColor" />
            <rect x="6" y="12" width="4" height="1" fill="currentColor" />
            <rect x="7" y="13" width="2" height="1" fill="currentColor" />
          </svg>
          <span className="sidebar__link-label">CV</span>
        </a>
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title="Toggle Theme"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px', marginBottom: '8px', filter: 'grayscale(100%)', transition: 'transform 0.2s' }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <div className="sidebar__status-dot" title="Online" />
        <span className="sidebar__time">{time}</span>
      </div>
    </nav>
  );
}
