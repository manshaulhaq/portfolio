import { useEffect, useRef } from 'react';
import './PixelBackground.css';

/* ── Pixel-art Moon SVG ─────────────────────── */
const PixelMoon = () => (
  <svg width="100" height="100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    {/* Main moon disc */}
    <rect x="6" y="2" width="8" height="2" fill="#e8f4f8" />
    <rect x="4" y="4" width="12" height="2" fill="#e8f4f8" />
    <rect x="2" y="6" width="14" height="6" fill="#e8f4f8" />
    <rect x="4" y="12" width="12" height="2" fill="#d0e8f4" />
    <rect x="6" y="14" width="8" height="2" fill="#d0e8f4" />
    <rect x="8" y="16" width="4" height="1" fill="#b8d8ec" />
    {/* Craters */}
    <rect x="6" y="7" width="2" height="2" fill="#c8dcea" />
    <rect x="12" y="9" width="3" height="2" fill="#c8dcea" />
    <rect x="9" y="12" width="2" height="1" fill="#c8dcea" />
    {/* Glow halo */}
    <rect x="4" y="1" width="12" height="1" fill="rgba(200,230,255,0.2)" />
    <rect x="1" y="5" width="2" height="10" fill="rgba(200,230,255,0.1)" />
    <rect x="17" y="5" width="2" height="10" fill="rgba(200,230,255,0.1)" />
  </svg>
);

/* ── Pixel-art Sun SVG ─────────────────────── */
const PixelSun = () => (
  <svg width="100" height="100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="6" y="2" width="8" height="16" fill="#fef08a" />
    <rect x="2" y="6" width="16" height="8" fill="#fef08a" />
    <rect x="4" y="4" width="12" height="12" fill="#fde047" />
    <rect x="6" y="6" width="8" height="8" fill="#fff" />
    {/* Rays */}
    <rect x="9" y="0" width="2" height="2" fill="#fef08a" />
    <rect x="9" y="18" width="2" height="2" fill="#fef08a" />
    <rect x="0" y="9" width="2" height="2" fill="#fef08a" />
    <rect x="18" y="9" width="2" height="2" fill="#fef08a" />
    <rect x="3" y="3" width="2" height="2" fill="#fef08a" />
    <rect x="15" y="3" width="2" height="2" fill="#fef08a" />
    <rect x="3" y="15" width="2" height="2" fill="#fef08a" />
    <rect x="15" y="15" width="2" height="2" fill="#fef08a" />
  </svg>
);

/* ── Pixel-art Cloud SVG ────────────────────── */
const PixelCloud = ({ width = 80, color = '#1e3a5f' }) => (
  <svg width={width} height={Math.round(width * 0.55)} viewBox="0 0 16 9"
    xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="4" y="4" width="8" height="2" fill={color} />
    <rect x="2" y="5" width="12" height="3" fill={color} />
    <rect x="1" y="6" width="14" height="2" fill={color} />
    <rect x="6" y="2" width="4" height="2" fill={color} />
    <rect x="5" y="3" width="6" height="2" fill={color} />
    <rect x="0" y="7" width="16" height="1" fill={color} />
    {/* Highlight */}
    <rect x="3" y="5" width="4" height="1" fill="rgba(255,255,255,0.2)" />
  </svg>
);

export default function PixelBackground({ theme }) {
  const moonRef = useRef(null);
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const cloud3Ref = useRef(null);
  const cloud4Ref = useRef(null);

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (moonRef.current)   moonRef.current.style.transform   = `translateY(${y * 0.08}px)`;
        if (cloud1Ref.current) cloud1Ref.current.style.transform = `translateY(${y * 0.18}px) translateX(${y * 0.04}px)`;
        if (cloud2Ref.current) cloud2Ref.current.style.transform = `translateY(${y * 0.14}px) translateX(${-y * 0.03}px)`;
        if (cloud3Ref.current) cloud3Ref.current.style.transform = `translateY(${y * 0.10}px)`;
        if (cloud4Ref.current) cloud4Ref.current.style.transform = `translateY(${y * 0.06}px) translateX(${y * 0.02}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafId); };
  }, []);

  const isLight = theme === 'light';

  return (
    <div className="pixel-bg" aria-hidden="true">
      <div className="pixel-bg__stars" />
      <div className="pixel-bg__moon" ref={moonRef}>
        <div style={{
          filter: isLight 
            ? 'drop-shadow(0 0 18px rgba(253, 224, 71, 0.6)) drop-shadow(0 0 40px rgba(253, 224, 71, 0.25))'
            : 'drop-shadow(0 0 18px rgba(200,230,255,0.6)) drop-shadow(0 0 40px rgba(88,166,255,0.25))',
        }}>
          {isLight ? <PixelSun /> : <PixelMoon />}
        </div>
      </div>
      <div className="pixel-bg__cloud pixel-bg__cloud--1" ref={cloud1Ref}>
        <PixelCloud width={120} color={isLight ? "#ffffff" : "#1a3050"} />
      </div>
      <div className="pixel-bg__cloud pixel-bg__cloud--2" ref={cloud2Ref}>
        <PixelCloud width={90} color={isLight ? "#f8fafc" : "#152840"} />
      </div>
      <div className="pixel-bg__cloud pixel-bg__cloud--3" ref={cloud3Ref}>
        <PixelCloud width={140} color={isLight ? "#f1f5f9" : "#1c3458"} />
      </div>
      <div className="pixel-bg__cloud pixel-bg__cloud--4" ref={cloud4Ref}>
        <PixelCloud width={70} color={isLight ? "#e2e8f0" : "#122030"} />
      </div>
      <div className="pixel-bg__ground" />
    </div>
  );
}
