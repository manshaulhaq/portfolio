import { motion } from 'framer-motion';
import './ExperienceSection.css';

const LOG_ENTRIES = [
  { ts: '09:00:01', level: 'info', msg: 'Reporting to Eziline Software House, Rawalpindi — ML Engineering Internship' },
  { ts: '09:05:12', level: 'ok', msg: 'Environment configured: Python 3.10, TensorFlow 2.13, CUDA 11.8' },
  { ts: '09:15:00', level: 'info', msg: 'Task assigned: Build regression/classification models (Boston Housing, Titanic)' },
  { ts: '10:45:00', level: 'ok', msg: 'Models evaluated using RMSE, R², and F1-score' },
  { ts: '11:30:00', level: 'info', msg: 'Optimizing performance via RFE and Hyperparameter Tuning' },
  { ts: '14:12:09', level: 'ok', msg: 'Grid/Randomized Search complete — accuracy improved' },
  { ts: '09:00:00', level: 'info', msg: 'Day 12: Developed CNNs for image classification in TensorFlow/Keras' },
  { ts: '11:00:00', level: 'info', msg: 'Day 18: LSTMs built for text generation tasks' },
  { ts: '13:45:00', level: 'ok', msg: 'Applied Transfer Learning: Fine-tuned pre-trained ResNet50 models' },
  { ts: '09:10:00', level: 'info', msg: 'Sprint 3: Customer segmentation using K-Means clustering' },
  { ts: '12:30:00', level: 'ok', msg: 'Clusters validated with Elbow and Silhouette methods' },
  { ts: '16:30:00', level: 'ok', msg: 'Internship complete — High predictive accuracy achieved ✓' },
];

/* Duplicate for seamless scroll */
const DOUBLED = [...LOG_ENTRIES, ...LOG_ENTRIES];

export default function ExperienceSection() {
  return (
    <section id="experience" className="experience-section">
      <h2 className="experience-section__title">[EXPERIENCE_LOG]</h2>

      <div className="experience-grid">

        {/* Detail cards */}
        <motion.div
          className="exp-detail"
          initial={{ opacity: 0, x: -20, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="exp-card pixel-border-glow">
            <div className="exp-card__company">EZILINE SOFTWARE HOUSE</div>
            <div className="exp-card__role">MACHINE LEARNING INTERN</div>
            <div className="exp-card__date">📅 Jul 2025 – Sep 2025 — Rawalpindi, Pakistan</div>
            <ul className="exp-card__achievements">
              <li>Built and evaluated regression/classification models (Boston Housing, Titanic) using RMSE, R², and F1-score.</li>
              <li>Optimized model performance via Recursive Feature Elimination (RFE) and Hyperparameter Tuning using Grid/Randomized Search.</li>
              <li>Developed Deep Learning models in TensorFlow/Keras, including CNNs for image classification and LSTMs for text generation.</li>
              <li>Applied Transfer Learning by fine-tuning pre-trained ResNet50 models and freezing layers to optimize training.</li>
              <li>Performed customer segmentation using K-Means clustering, validating clusters with Elbow and Silhouette methods.</li>
            </ul>
            <div className="exp-card__tech">
              {['Python', 'TensorFlow', 'Keras', 'Scikit-Learn', 'Pandas'].map(t => (
                <span key={t} className="pixel-badge pixel-badge--blue">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
      {/* Scrolling log */}
      <motion.div
        className="exp-log-window"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="exp-log-window__titlebar">
          <div className="pixel-window__dot pixel-window__dot--red" />
          <div className="pixel-window__dot pixel-window__dot--yellow" />
          <div className="pixel-window__dot pixel-window__dot--green" />
          <span>internship_log.txt — EZILINE SOFTWARE HOUSE</span>
        </div>
        <div className="exp-log-window__body">
          <div className="exp-log-scroll">
            {DOUBLED.map((entry, i) => (
              <div key={i} className="exp-log-entry">
                <span className="exp-log-entry__ts">[{entry.ts}]</span>
                <span className={`exp-log-entry__level exp-log-entry__level--${entry.level}`}>
                  {entry.level.toUpperCase()}
                </span>
                <span className="exp-log-entry__msg">{entry.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
