import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import logoImg from '../../assets/images/Gemini_Generated_Image_m456wlm456wlm456.png';
import './Header.css';

const navItems = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/projects', labelKey: 'nav.projects' },
  { path: '/events', labelKey: 'nav.events' },
  { path: '/blog', labelKey: 'nav.blog' },
  { path: '/contact', labelKey: 'nav.contact' },
];

export default function Header() {
  const { t, language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if we're on the home page (has hero section)
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // On non-home pages, always use scrolled state (white background, dark text)
    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    // On home page, check scroll position
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Check initial scroll position on home page
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} role="banner">
      <div className="header__inner container">
        <Link to="/" className="header__logo" aria-label={t('site.name')}>
          <img src={logoImg} alt="Fatima Ali Health Foundation Logo" className="header__logo-img" />
          <span className="header__logo-text">{t('site.name')}</span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className={`header__nav-list ${menuOpen ? 'header__nav-list--open' : ''}`} role="menubar">
            {navItems.map((item) => (
              <li key={item.path} role="none">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  end={item.path === '/'}
                >
                  {t(item.labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button
            className="header__lang-btn"
            onClick={toggleLanguage}
            aria-label={`Switch to ${language === 'en' ? 'Urdu' : 'English'}`}
            title={`Switch to ${language === 'en' ? 'Urdu' : 'English'}`}
          >
            <FaGlobe aria-hidden="true" />
            <span>{language === 'en' ? 'UR' : 'EN'}</span>
          </button>

          <Link to="/donate" className="btn btn--donate header__donate-btn">
            {t('nav.donate')}
          </Link>

          <button
            className="header__menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="header__overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
