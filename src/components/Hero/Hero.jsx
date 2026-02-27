import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import heroBg from '../../assets/images/WhatsApp Image 2026-02-24 at 15.24.21.jpeg';
import './Hero.css';

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (contentRef.current) contentRef.current.classList.add('hero__content--visible');
      return;
    }

    // Fade in content
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && contentRef.current) {
          contentRef.current.classList.add('hero__content--visible');
        }
      },
      { threshold: 0.3 }
    );
    if (heroRef.current) observer.observe(heroRef.current);

    // Parallax background
    const handleScroll = () => {
      if (!bgRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.bottom > 0) {
        const offset = window.scrollY * 0.25;
        bgRef.current.style.transform = `translateY(${Math.min(offset, rect.height * 0.15)}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef} aria-label="Main hero section">
      <div
        className="hero__bg"
        ref={bgRef}
        role="img"
        aria-label="Fatima Ali Health Foundation representatives launching the safe drinking water project with children"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="hero__overlay" />

      <div className="hero__content" ref={contentRef}>
        <p className="hero__founder">{t('hero.founder')}</p>
        <h1 className="hero__title">{t('hero.title')}</h1>
        <p className="hero__subtitle">{t('hero.subtitle')}</p>
        <div className="hero__ctas">
          <Link to="/donate" className="btn btn--primary btn--lg hero__cta">
            {t('hero.cta_donate')}
          </Link>
          <Link to="/projects" className="btn btn--secondary btn--lg hero__cta hero__cta--outline">
            {t('hero.cta_projects')}
          </Link>
        </div>
      </div>

      <nav className="hero__social" aria-label="Social media links">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hero__social-link"
          aria-label="Facebook"
        >
          <FaFacebookF aria-hidden="true" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hero__social-link"
          aria-label="Instagram"
        >
          <FaInstagram aria-hidden="true" />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hero__social-link"
          aria-label="X (Twitter)"
        >
          <FaXTwitter aria-hidden="true" />
        </a>
      </nav>
    </section>
  );
}
