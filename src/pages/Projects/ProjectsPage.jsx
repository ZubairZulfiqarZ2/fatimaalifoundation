import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import SEOHead from '../../components/SEO/SEOHead';
import projects, { projectCategories } from '../../data/projects';
import './ProjectsPage.css';

export default function ProjectsPage() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visible.length < filtered.length;

  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t('projects.title'),
    "description": t('projects.subtitle'),
    "url": "https://fahfoundation.org/projects",
    "publisher": {
      "@type": "Organization",
      "name": t('site.name'),
      "url": "https://fahfoundation.org/",
      "logo": "https://fahfoundation.org/assets/logo_fatima_ali_foundation-Bb2v1ZVI.png"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": projects.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://fahfoundation.org/projects/${project.slug}`,
        "name": language === 'ur' ? project.titleUrdu : project.title,
        "description": language === 'ur' ? project.summaryUrdu : project.summary
      }))
    }
  };

  return (
    <>
      <SEOHead
        title={t('projects.title')}
        description={t('projects.subtitle')}
        path="/projects"
        jsonLd={projectsJsonLd}
      />

      <Breadcrumbs items={[{ label: t('projects.title'), path: '/projects' }]} />

      <section className="section projects-page">
        <div className="container">
          <div className="section-heading">
            <h1 className="section-heading__title">{t('projects.title')}</h1>
            <p className="section-heading__subtitle">{t('projects.subtitle')}</p>
            <div className="section-heading__bar" />
          </div>

          {/* Category Filters */}
          <div className="projects-page__filters" role="tablist" aria-label="Project categories">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`projects-page__filter ${activeCategory === cat.id ? 'projects-page__filter--active' : ''}`}
                onClick={() => { setActiveCategory(cat.id); setVisibleCount(6); }}
              >
                {language === 'ur' ? cat.labelUrdu : cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="projects-page__grid" role="tabpanel">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center" style={{ marginTop: 'var(--space-xl)' }}>
              <button
                className="btn btn--secondary btn--lg"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                aria-label="Load more projects"
              >
                Load More
              </button>
            </div>
          )}

          {visible.length === 0 && (
            <p className="text-center" style={{ color: 'var(--color-neutral-500)', padding: 'var(--space-2xl)' }}>
              No projects found in this category.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
