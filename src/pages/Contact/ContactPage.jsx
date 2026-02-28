import { useLanguage } from '../../context/LanguageContext';
import SEOHead from '../../components/SEO/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ContactForm from '../../components/ContactForm/ContactForm';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './ContactPage.css';

export default function ContactPage() {
  const { t } = useLanguage();

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    'name': 'Fatima Ali Health Foundation',
    'url': 'https://fahfoundation.org',
    'telephone': '+92-336-6006010',
    'email': 'info@fahfoundation.org',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Liaqatabad, Post Office Ismail Nagar',
      'addressLocality': 'Lahore',
      'addressRegion': 'Punjab',
      'addressCountry': 'PK',
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+92-336-6006010',
      'contactType': 'customer service',
      'availableLanguage': ['English', 'Urdu'],
    },
  };

  return (
    <>
      <SEOHead
        title={t('contact.title')}
        description="Contact Fatima Ali Health Foundation — reach out for questions, volunteering opportunities, or to donate. Phone: 03366006010. Liaqatabad, Lahore, Pakistan."
        path="/contact"
        jsonLd={[
          localBusinessLd,
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://fahfoundation.org/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Contact', 'item': 'https://fahfoundation.org/contact' },
            ],
          },
        ]}
      />

      <Breadcrumbs items={[{ label: t('contact.title'), path: '/contact' }]} />

      <section className="section contact-page">
        <div className="container">
          <div className="section-heading">
            <h1 className="section-heading__title">{t('contact.title')}</h1>
            <p className="section-heading__subtitle">{t('contact.subtitle')}</p>
            <div className="section-heading__bar" />
          </div>

          <div className="contact-page__grid">
            {/* Form */}
            <div className="contact-page__form-col">
              <ContactForm />
            </div>

            {/* Info Sidebar */}
            <aside className="contact-page__info">
              <div className="contact-page__info-card card">
                <h3>{t('contact.address_title')}</h3>
                <ul className="contact-page__details">
                  <li>
                    <FaMapMarkerAlt aria-hidden="true" />
                    <span>{t('contact.address')}</span>
                  </li>
                  <li>
                    <FaPhone aria-hidden="true" />
                    <a href="tel:03366006010">{t('contact.phone')}</a>
                  </li>
                  <li>
                    <FaEnvelope aria-hidden="true" />
                    <a href={`mailto:${t('contact.email_address')}`}>{t('contact.email_address')}</a>
                  </li>
                </ul>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/923366006010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--whatsapp contact-page__whatsapp"
                >
                  <FaWhatsapp aria-hidden="true" />
                  <span>{t('contact.whatsapp')}</span>
                </a>

                <h4>Follow Us</h4>
                <div className="contact-page__social">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="contact-page__social-link">
                    <FaFacebookF aria-hidden="true" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="contact-page__social-link">
                    <FaInstagram aria-hidden="true" />
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="contact-page__social-link">
                    <FaXTwitter aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="contact-page__map card">
                <div className="contact-page__map-placeholder" role="img" aria-label="Map showing office location in Liaqatabad, Lahore">
                  <span>📍 Fatima Ali Health Foundation, Liaqatabad, Post Office Ismail Nagar, Lahore</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
