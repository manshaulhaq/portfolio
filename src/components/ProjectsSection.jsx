import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectsSection.css';

const PROJECTS = [
  {
    id: 'FILE-001',
    name: 'REAL-TIME HELMET DETECTION SYSTEM',
    icon: '🪖',
    stamp: 'ACTIVE',
    desc: 'Curated and augmented a Roboflow dataset (640×640, grayscale, brightness) for robust training. Trained a YOLOv8 Nano model over 50 epochs, validating with confusion matrices and precision-recall curves. Configured optimal 0.48 confidence threshold and deployed a Streamlit web app with live webcam inference.',
    tech: [
      { label: 'Python', color: 'blue' },
      { label: 'YOLOv8', color: 'orange' },
      { label: 'OpenCV', color: 'purple' },
      { label: 'Streamlit', color: 'green' },
    ],
    metrics: [
      { label: 'mAP@0.5', value: 77, display: '77.1%' },
      { label: 'ACCURACY', value: 86, display: '86%' },
    ],
    links: [
      { label: 'GITHUB', href: 'https://github.com/manshaulhaq/career_launchpad/tree/main/week5', color: 'blue' },
    ],
  },
  {
    id: 'FILE-002',
    name: 'SOCIAL MEDIA SENTIMENT ANALYSIS',
    icon: '📊',
    stamp: 'CLASSIFIED',
    desc: 'Fine-tuned bert-base-uncased on cleaned social media data with lowercasing, URL/strip, and mention removal. Deployed a FastAPI REST API with asynchronous lifespan management for low-latency inference. Built a TF-IDF module to extract key drivers behind positive and negative sentiments.',
    tech: [
      { label: 'Python', color: 'blue' },
      { label: 'BERT', color: 'orange' },
      { label: 'FastAPI', color: 'green' },
      { label: 'Hugging Face', color: 'purple' },
    ],
    metrics: [
      { label: 'LATENCY', value: 92, display: '<50ms' },
      { label: 'ACCURACY', value: 94, display: '94%' },
    ],
    links: [
      { label: 'GITHUB', href: 'https://github.com/manshaulhaq/career_launchpad/tree/main/week4', color: 'blue' },
    ],
  },
  {
    id: 'FILE-003',
    name: 'CREDIT RISK & LOAN DEFAULT PREDICTION',
    icon: '🏦',
    stamp: 'VERIFIED',
    desc: 'Built a complete data pipeline with missing value imputation, categorical encoding, and feature scaling. Trained an ensemble classifier (Random Forest/XGBoost) optimized for ROC-AUC and precision-recall curves. Serialized the model using joblib and deployed a REST API for real-time risk grading (A–D).',
    tech: [
      { label: 'Python', color: 'blue' },
      { label: 'Scikit-learn', color: 'orange' },
      { label: 'XGBoost', color: 'purple' },
      { label: 'FastAPI', color: 'green' },
    ],
    metrics: [
      { label: 'ROC-AUC', value: 89, display: '0.89' },
      { label: 'RECALL', value: 85, display: '85%' },
    ],
    links: [
      { label: 'GITHUB', href: 'https://github.com/manshaulhaq/career_launchpad/tree/main/week3', color: 'blue' },
    ],
  },
  {
    id: 'FILE-004',
    name: 'EDUBOT',
    icon: '🤖',
    stamp: 'ACTIVE',
    desc: 'Built a user-friendly interface using Streamlit for seamless interaction. Designed to assist with academic and coding-related queries. Integrated media upload functionality to enhance query context.',
    tech: [
      { label: 'Python', color: 'blue' },
      { label: 'Gemini API', color: 'purple' },
      { label: 'Streamlit', color: 'green' },
    ],
    metrics: [
      { label: 'RESPONSE', value: 95, display: '<2s' },
      { label: 'UPTIME', value: 99, display: '99.9%' },
    ],
    links: [
      { label: 'GITHUB', href: 'https://github.com/manshaulhaq/edubot', color: 'blue' },
    ],
  },
  {
    id: 'FILE-005',
    name: 'RETAIL SALES FORECASTING',
    icon: '🚀',
    stamp: 'VERIFIED',
    desc: 'Aggregated daily sales data, created lag features (lag_1, lag_7), and used exogenous features (Price, Discount). Selected Random Forest Regressor with MAPE of 0.53%, outperforming SARIMAX. Saved model to pickle file and deployed a Flask API with web GUI for user predictions. Created forecast comparison dashboard.',
    tech: [
      { label: 'Python', color: 'blue' },
      { label: 'Random Forest', color: 'green' },
      { label: 'Flask', color: 'sky' },
      { label: 'SARIMAX', color: 'purple' },
    ],
    metrics: [
      { label: 'MAPE', value: 53, display: '0.53%' },
    ],
    links: [
      { label: 'GITHUB', href: 'https://github.com/manshaulhaq/career_launchpad/tree/main/week1', color: 'blue' },
    ],
  },
  {
    id: 'FILE-006',
    name: 'TELECOM CUSTOMER CHURN PREDICTOR',
    icon: '📞',
    stamp: 'VERIFIED',
    desc: 'End-to-end ML project structured across four phases: EDA, feature engineering, baseline model training, and hyperparameter tuning with SHAP explainability. Built an interactive Streamlit web application for predicting customer churn using the trained model pipeline.',
    tech: [
      { label: 'Python', color: 'blue' },
      { label: 'Scikit-learn', color: 'orange' },
      { label: 'Streamlit', color: 'red' },
      { label: 'SHAP', color: 'purple' },
      { label: 'Pandas', color: 'green' },
    ],
    metrics: [
      { label: 'ACCURACY', value: 88, display: '88%' },
    ],
    links: [
      { label: 'GITHUB', href: 'https://github.com/manshaulhaq/career_launchpad/tree/main/week2', color: 'blue' },
    ],
  },
  {
    id: 'FILE-007',
    name: 'E-COMMERCE FRAUD DETECTION SIMULATOR',
    icon: '🛡️',
    stamp: 'VERIFIED',
    desc: 'Real-time fraud detection pipeline with anomaly detection (Isolation Forest) and supervised ensemble models (Random Forest). Features velocity-based feature engineering, live transaction stream simulation via Streamlit dashboard, and dynamic business KPIs including Net Savings, ROI, Fraud Recall, and Operational Costs.',
    tech: [
      { label: 'Python', color: 'blue' },
      { label: 'Scikit-learn', color: 'orange' },
      { label: 'Streamlit', color: 'red' },
      { label: 'Plotly', color: 'green' },
      { label: 'Pandas', color: 'purple' },
    ],
    metrics: [
      { label: 'FRAUD RECALL', value: 12, display: '12%' },
      { label: 'ROI', value: 40, display: '40%' },
    ],
    links: [
      { label: 'GITHUB', href: 'https://github.com/manshaulhaq/career_launchpad/tree/main/week6', color: 'blue' },
    ],
  },
  {
    id: 'FILE-008',
    name: 'PERSONALIZED MOVIE DISCOVERY ENGINE',
    icon: '🎬',
    stamp: 'VERIFIED',
    desc: 'Recommendation system progressing from baseline Collaborative Filtering to advanced Neural Collaborative Filtering (NCF) architecture. Includes FastAPI for serving Top-K recommendations, Streamlit dashboard for comparing CF vs NCF outputs, and comprehensive analysis notebook covering Business KPIs, model training, and API integration.',
    tech: [
      { label: 'Python', color: 'blue' },
      { label: 'PyTorch', color: 'orange' },
      { label: 'FastAPI', color: 'green' },
      { label: 'Streamlit', color: 'red' },
      { label: 'Scikit-learn', color: 'purple' },
    ],
    metrics: [
      { label: 'CF RMSE', value: 70, display: '0.91' },
      { label: 'NCF HIT@10', value: 85, display: '85%' },
    ],
    links: [
      { label: 'GITHUB', href: 'https://github.com/manshaulhaq/career_launchpad/tree/main/week7', color: 'blue' },
    ],
  },
  {
    id: 'FILE-009',
    name: 'DIABETES RISK CLASSIFICATION SYSTEM',
    icon: '🩺',
    stamp: 'VERIFIED',
    desc: 'Machine learning pipeline for predicting diabetes risk using Pima Indians dataset with emphasis on algorithmic explainability and ethical bias auditing. Compares SVM with RBF kernel vs 3-layer PyTorch MLP. Features SHAP explainability (summary/force plots) and slicing analysis evaluating False Negative Rates across demographic cohorts. Streamlit dashboard enables interactive bias auditing by adjusting age thresholds.',
    tech: [
      { label: 'Python', color: 'blue' },
      { label: 'PyTorch', color: 'orange' },
      { label: 'SVM', color: 'purple' },
      { label: 'SHAP', color: 'red' },
      { label: 'Streamlit', color: 'green' },
      { label: 'Scikit-learn', color: 'sky' },
    ],
    metrics: [
      { label: 'SVM AUC', value: 82, display: '0.82' },
      { label: 'MLP AUC', value: 85, display: '0.85' },
    ],
    links: [
      { label: 'GITHUB', href: 'https://github.com/manshaulhaq/career_launchpad/tree/main/week8', color: 'blue' },
    ],
  },
  {
    id: 'FILE-010',
    name: 'NLP CUSTOMER SUPPORT BOT',
    icon: '💬',
    stamp: 'VERIFIED',
    desc: 'Rasa 3.x based FAQ agent trained on Bitext Customer Support dataset. Classifies 27 intents with rule-based dispatch and multi-turn flow for track_order including slot filling. Streamlit UI connects via REST webhook. Includes mock order database and handles intent misclassification with fallback rate monitoring.',
    tech: [
      { label: 'Python', color: 'blue' },
      { label: 'Rasa', color: 'purple' },
      { label: 'Streamlit', color: 'red' },
      { label: 'NLP', color: 'green' },
    ],
    metrics: [
      { label: 'INTENT ACC', value: 89, display: '89%' },
      { label: 'GOAL RATE', value: 40, display: '40%' },
      { label: 'FALLBACK', value: 12, display: '12%' },
    ],
    links: [
      { label: 'GITHUB', href: 'https://github.com/manshaulhaq/career_launchpad/tree/main/week9', color: 'blue' },
    ],
  },
];

function ClassifiedFile({ project }) {
  const [open, setOpen] = useState(true);

  return (
    <motion.div
      className={`classified-file${open ? ' open' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      id={`project-${project.id.toLowerCase().replace('-', '')}`}
    >
      <div className="classified-file__header" onClick={() => setOpen(o => !o)} role="button" aria-expanded={open}>
        <div className="classified-file__icon">{project.icon}</div>
        <div className="classified-file__meta">
          <div className="classified-file__id">{project.id}</div>
          <div className="classified-file__name">{project.name}</div>
        </div>
        <div className="classified-file__chevron">▶</div>
      </div>
      <div className="classified-file__stamp">{project.stamp}</div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="classified-file__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="classified-file__content">
              <p className="classified-file__desc">{project.desc}</p>

              {/* Metrics */}
              {project.metrics && project.metrics.map(m => (
                <div key={m.label} className="classified-file__metric">
                  <span className="classified-file__metric-label">{m.label}</span>
                  <div className="classified-file__metric-bar">
                    <div
                      className="classified-file__metric-fill"
                      style={{ width: `${Math.min(m.value, 100)}%` }}
                    />
                  </div>
                  <span className="classified-file__metric-val">{m.display}</span>
                </div>
              ))}

              {/* Tech */}
              <div className="classified-file__tech">
                {project.tech.map(t => (
                  <span key={t.label} className={`pixel-badge pixel-badge--${t.color}`}>{t.label}</span>
                ))}
              </div>

              {/* Links */}
              <div className="classified-file__links">
                {project.links.map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`pixel-btn pixel-btn--${l.color === 'blue' ? 'primary' : 'secondary'}`}
                    style={l.color === 'green' ? { borderColor: 'var(--accent-green)', color: 'var(--accent-green)' } : {}}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-section__header">
        <h2 className="projects-section__title">[CLASSIFIED_FILES]</h2>
        <span className="projects-section__count">{PROJECTS.length} ITEMS</span>
      </div>
      <div className="projects-grid">
        {PROJECTS.map(p => <ClassifiedFile key={p.id} project={p} />)}
      </div>
    </section>
  );
}
