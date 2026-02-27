import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './ProjectCard.css';

export default function ProjectCard({ project, index = 0 }) {
  const { t, language } = useLanguage();
  const [ref, isVisible] = useScrollAnimation(0.1);

  const title = language === 'ur' ? project.titleUrdu : project.title;
  const summary = language === 'ur' ? project.summaryUrdu : project.summary;
  const progress = Math.round((project.currentAmount / project.targetAmount) * 100);

  return (
    <article
      ref={ref}
      className={`project-card card ${isVisible ? 'project-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="project-card__image-wrap">
        <img
          src={project.image}
          alt={project.imageAlt || `${project.title} — ${project.impactStat}`}
          className="project-card__image"
          loading="lazy"
          width="400"
          height="250"
        />
        <span className="project-card__badge">{project.impactStat}</span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__summary">{summary}</p>

        <div className="project-card__progress">
          <div className="project-card__progress-bar">
            <div
              className="project-card__progress-fill"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${progress}% funded`}
            />
          </div>
          <div className="project-card__progress-info">
            <span>{t('projects.raised')}: ${project.currentAmount.toLocaleString()}</span>
            <span>{t('projects.goal')}: ${project.targetAmount.toLocaleString()}</span>
          </div>
        </div>

        <Link to={`/projects/${project.slug}`} className="btn btn--primary project-card__cta">
          {t('projects.learn_more')}
        </Link>
      </div>
    </article>
  );
}
