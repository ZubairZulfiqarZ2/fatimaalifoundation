import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import projects from '../../data/projects';
import './ProjectDetailPage.css';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const [ref, isVisible] = useScrollAnimation();

  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return (
      <div className="container section text-center">
        <h1>Project Not Found</h1>
        <Link to="/projects" className="btn btn--primary">{t('projects.back_to_projects')}</Link>
      </div>
    );
  }

  const title = language === 'ur' ? project.titleUrdu : project.title;
  const progress = Math.round((project.currentAmount / project.targetAmount) * 100);
  const related = projects.filter((p) => project.relatedProjects.includes(p.slug));

  return (
    <>
      <Helmet>
        <title>{project.title} — {t('site.name')}</title>
        <meta name="description" content={project.summary} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.summary} />
      </Helmet>

      <Breadcrumbs
        items={[
          { label: t('projects.title'), path: '/projects' },
          { label: title, path: `/projects/${slug}` },
        ]}
      />

      <article className="project-detail section" ref={ref}>
        <div className="container">
          {/* Hero Image */}
          <div className="project-detail__hero">
            <img
              src={project.image}
              alt={`${project.title} — project photo`}
              className="project-detail__hero-image"
              loading="eager"
              width="1200"
              height="500"
            />
            <div className="project-detail__hero-overlay">
              <h1 className="project-detail__title">{title}</h1>
              <p className="project-detail__location">📍 {project.location}</p>
            </div>
          </div>

          <div className={`project-detail__content ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ opacity: isVisible ? 1 : 0 }}>
            <div className="project-detail__main">
              {/* Description */}
              <div className="project-detail__text">
                <p>{project.description}</p>
              </div>

              {/* Image Gallery */}
              {project.images.length > 1 && (
                <div className="project-detail__gallery">
                  {project.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${project.title} gallery image ${i + 1}`}
                      className="project-detail__gallery-img"
                      loading="lazy"
                      width="400"
                      height="300"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="project-detail__sidebar">
              {/* Progress Card */}
              <div className="project-detail__progress-card card">
                <h3>Fundraising Progress</h3>
                <div className="project-detail__progress-bar">
                  <div
                    className="project-detail__progress-fill"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <div className="project-detail__progress-stats">
                  <div>
                    <span className="project-detail__stat-value">${project.currentAmount.toLocaleString()}</span>
                    <span className="project-detail__stat-label">{t('projects.raised')}</span>
                  </div>
                  <div>
                    <span className="project-detail__stat-value">${project.targetAmount.toLocaleString()}</span>
                    <span className="project-detail__stat-label">{t('projects.goal')}</span>
                  </div>
                  <div>
                    <span className="project-detail__stat-value">{project.volunteers}</span>
                    <span className="project-detail__stat-label">{t('projects.volunteers')}</span>
                  </div>
                </div>

                <Link to={`/donate?project=${project.id}`} className="btn btn--donate btn--lg" style={{ width: '100%', marginTop: 'var(--space-md)' }}>
                  {t('hero.cta_donate')}
                </Link>
              </div>

              {/* Impact Badge */}
              <div className="project-detail__impact card">
                <span className="project-detail__impact-badge">🏆</span>
                <span>{project.impactStat}</span>
              </div>
            </aside>
          </div>

          {/* Related Projects */}
          {related.length > 0 && (
            <section className="project-detail__related">
              <h2 className="section-heading__title">{t('projects.related')}</h2>
              <div className="section-heading__bar" style={{ margin: 'var(--space-md) 0 var(--space-xl)' }} />
              <div className="project-detail__related-grid">
                {related.map((rp, i) => (
                  <ProjectCard key={rp.id} project={rp} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
