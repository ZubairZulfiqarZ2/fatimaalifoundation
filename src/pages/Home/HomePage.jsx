import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SEOHead from '../../components/SEO/SEOHead';
import Hero from '../../components/Hero/Hero';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ImpactStats from '../../components/ImpactStats/ImpactStats';
import Testimonials from '../../components/Testimonials/Testimonials';
import projects from '../../data/projects';
import officialBannerImg from '../../assets/images/84x33 star file.jpg';
import './HomePage.css';

export default function HomePage() {
  const { t } = useLanguage();
  const featuredProjects = projects.slice(0, 4);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://fahfoundation.org/',
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={null}
        description="Founded by Dr. Muhammad Maqsood, the Fatima Ali Health Foundation has been serving humanity since 2003 through free medical camps, healthcare services, and flood relief across Pakistan."
        path="/"
        jsonLd={breadcrumbLd}
      />

      <Hero />

      {/* Featured Projects */}
      <section className="section" aria-label={t('projects.title')}>
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">{t('projects.title')}</h2>
            <p className="section-heading__subtitle">{t('projects.subtitle')}</p>
            <div className="section-heading__bar" />
          </div>

          <div className="home-projects__grid">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-xl)' }}>
            <Link to="/projects" className="btn btn--secondary btn--lg">
              {t('projects.title')} →
            </Link>
          </div>
        </div>
      </section>

      <ImpactStats />

      {/* Mission CTA */}
      <section className="section home-mission" aria-label="Our Mission">
        <div className="container container--narrow text-center">
          <h2 className="section-heading__title">{t('about.vision_title')}</h2>
          <p className="home-mission__text">{t('about.vision_text')}</p>
          <Link to="/about" className="btn btn--primary btn--lg">
            {t('nav.about')} →
          </Link>
        </div>
      </section>

      <Testimonials />

      {/* Official Credentials Banner */}
      <section className="section home-credentials" aria-label="Official registration and credentials">
        <div className="container text-center">
          <h2 className="section-heading__title">Registered & Government Certified</h2>
          <div className="section-heading__bar" />
          <img
            src={officialBannerImg}
            alt="Fatima Ali Health Foundation — Registered with Punjab Charity Commission, Punjab Healthcare Commission (PHC), Federal Board of Revenue (FBR), and Registrar Joint Stock Companies Lahore. CEO: Dr. Muhammad Maqsood."
            className="home-credentials__img"
            loading="lazy"
          />
        </div>
      </section>

      {/* Donate CTA Strip */}
      <section className="home-donate-cta section" aria-label="Donate call to action">
        <div className="container text-center">
          <h2 className="home-donate-cta__title">{t('donate.subtitle')}</h2>
          <Link to="/donate" className="btn btn--donate btn--lg">
            {t('hero.cta_donate')} →
          </Link>
        </div>
      </section>
    </>
  );
}
