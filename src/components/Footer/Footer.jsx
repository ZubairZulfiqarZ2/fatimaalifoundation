import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';
import logoImg from '../../assets/images/new/logo_fatima_ali_foundation.png';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription
      setSubscribed(true);
      setEmail('');
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'newsletter_subscribe');
      }
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__main container">
        {/* Column 1: About */}
        <div className="footer__col">
          <div className="footer__brand">
            <img src={logoImg} alt="Fatima Ali Health Foundation Logo" className="footer__logo-img" />
            <span className="footer__logo-text">{t('site.name')}</span>
          </div>
          <p className="footer__about">{t('site.tagline')}</p>
          <nav className="footer__social" aria-label="Social media">
            <a href="https://www.facebook.com/profile.php?id=61588570877535" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
              <FaFacebookF aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/fatima_health_foundation/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
              <FaInstagram aria-hidden="true" />
            </a>
            <a href="https://x.com/fatimalihealth" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="X (Twitter)">
              <FaXTwitter aria-hidden="true" />
            </a>
            <a href="https://www.tiktok.com/@fatimaalihealth" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="TikTok">
              <FaTiktok aria-hidden="true" />
            </a>
            <a href="https://wa.me/923204028874" target="_blank" rel="noopener noreferrer" className="footer__social-link footer__social-link--whatsapp" aria-label="WhatsApp">
              <FaWhatsapp aria-hidden="true" />
            </a>
          </nav>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer__col">
          <h3 className="footer__heading">{t('footer.quick_links')}</h3>
          <nav aria-label="Footer quick links">
            <ul className="footer__links">
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/projects">{t('nav.projects')}</Link></li>
              <li><Link to="/events">{t('nav.events')}</Link></li>
              <li><Link to="/donate">{t('nav.donate')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
              <li><Link to="/blog">{t('nav.blog')}</Link></li>
            </ul>
          </nav>
        </div>

        {/* Column 3: Bank Details */}
        <div className="footer__col">
          <h3 className="footer__heading">{t('footer.bank_details')}</h3>
          <div className="footer__bank">
            <p>{t('donate.bank_name')}</p>
            <p>{t('donate.bank_account')}</p>
            <p>{t('donate.bank_iban')}</p>
            <p className="footer__registration">{t('footer.registration')}</p>
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer__col">
          <h3 className="footer__heading">{t('footer.newsletter_title')}</h3>
          {subscribed ? (
            <p className="footer__subscribed">Thank you for subscribing! ✉️</p>
          ) : (
            <form className="footer__newsletter" onSubmit={handleSubscribe}>
              <label htmlFor="footer-email" className="sr-only">{t('footer.newsletter_placeholder')}</label>
              <input
                type="email"
                id="footer-email"
                className="footer__newsletter-input"
                placeholder={t('footer.newsletter_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn--primary footer__newsletter-btn">
                <FaEnvelope aria-hidden="true" />
                <span>{t('footer.newsletter_cta')}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.designed_by')}</p>
          <nav className="footer__legal" aria-label="Legal links">
            <Link to="/legal/privacy">{t('legal.privacy_title')}</Link>
            <Link to="/legal/terms">{t('legal.terms_title')}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
