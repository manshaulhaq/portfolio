import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import PixelBackground from './components/PixelBackground';
import Sidebar from './components/Sidebar';
import HeroWindow from './components/HeroWindow';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import ZoroWidget from './components/ZoroWidget';

/* ── Boot Screen ─────────────────────────────── */
const BOOT_LINES = [
  'Initializing kernel...',
  'Loading ML modules...',
  'Mounting pixel renderer...',
  'Booting OP OS v2.4.1...',
];

function BootScreen({ onDone }) {
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (lineIdx < BOOT_LINES.length - 1) {
      const id = setTimeout(() => setLineIdx(i => i + 1), 380);
      return () => clearTimeout(id);
    } else {
      const id = setTimeout(onDone, 600);
      return () => clearTimeout(id);
    }
  }, [lineIdx, onDone]);

  return (
    <motion.div
      className="boot-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="boot-screen__logo">MANSHA.SYS</div>
      <div className="boot-screen__text">{BOOT_LINES[lineIdx]}<span className="cursor-blink" /></div>
      <div className="boot-screen__bar">
        <div className="boot-screen__bar-fill" />
      </div>
    </motion.div>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  // Add this useEffect to update page title
  useEffect(() => {
    const path = location.pathname;
    let pageName = 'Home';

    if (path === '/projects') pageName = 'Projects';
    else if (path === '/experience') pageName = 'Experience';
    else if (path === '/contact') pageName = 'Contact';
    else pageName = 'Home';

    document.title = `${pageName}`;
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HeroWindow /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><ProjectsSection /></PageWrapper>} />
        <Route path="/experience" element={<PageWrapper><ExperienceSection /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactSection /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <BrowserRouter>
      <div className="app">
        <AnimatePresence>
          {booting && <BootScreen onDone={() => setBooting(false)} />}
        </AnimatePresence>

        {!booting && (
          <>
            {/* Fixed background */}
            <PixelBackground theme={theme} />

            {/* Fixed chrome */}
            <Sidebar theme={theme} toggleTheme={toggleTheme} />
            <ZoroWidget />

            {/* Scrollable content */}
            <div className="app__content">
              <AnimatedRoutes />
            </div>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}
