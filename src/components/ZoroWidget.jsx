import { motion } from 'framer-motion';
import './ZoroWidget.css';

export default function ZoroWidget() {
  return (
    <motion.div
      className="zoro-widget"
      id="zoro-widget"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      whileHover={{ scale: 1.04 }}
    >
      <div className="zoro-widget__titlebar">
        ⚔ ZORO_TRAINING.exe
      </div>
      <div className="zoro-widget__body">
        <img src="/zoro.png" alt="Zoro Santoryu" className="zoro-sprite" />
        <div className="zoro-widget__label">SANTORYU TRAINING</div>
        <div className="zoro-widget__status">● ACTIVE</div>
      </div>
    </motion.div>
  );
}
