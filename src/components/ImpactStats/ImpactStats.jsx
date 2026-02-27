import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FaUsers, FaHandHoldingHeart, FaTint, FaProjectDiagram } from 'react-icons/fa';
import './ImpactStats.css';

const stats = [
  { icon: FaUsers, value: 500, labelKey: 'impact.volunteers', suffix: '+' },
  { icon: FaProjectDiagram, value: 25, labelKey: 'impact.projects_completed', suffix: '+' },
  { icon: FaHandHoldingHeart, value: 50000, labelKey: 'impact.lives_impacted', suffix: '+' },
  { icon: FaTint, value: 15, labelKey: 'impact.wells_built', suffix: '' },
];

function AnimatedCounter({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return (
    <span className="impact-stats__number">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function ImpactStats() {
  const { t } = useLanguage();
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <section className="impact-stats section" ref={ref} aria-label={t('impact.title')}>
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">{t('impact.title')}</h2>
          <p className="section-heading__subtitle">{t('impact.subtitle')}</p>
          <div className="section-heading__bar" />
        </div>

        <div className="impact-stats__grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.labelKey}
                className={`impact-stats__item ${isVisible ? 'impact-stats__item--visible' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="impact-stats__icon">
                  <Icon aria-hidden="true" />
                </div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                <span className="impact-stats__label">{t(stat.labelKey)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
