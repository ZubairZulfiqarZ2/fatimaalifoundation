import { useLanguage } from '../../context/LanguageContext';
import SEOHead from '../../components/SEO/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import './DonatePage.css';

export default function DonatePage() {
  const { t } = useLanguage();

  const donateLd = {
    '@context': 'https://schema.org',
    '@type': 'DonateAction',
    'name': 'Donate to Fatima Ali Health Foundation',
    'description': 'Your generous donation helps us provide free medical care, relief for flood victims, and community health programs.',
    'recipient': {
      '@type': 'NGO',
      'name': 'Fatima Ali Health Foundation',
      'url': 'https://fahfoundation.org',
    },
  };

  return (
    <>
      <SEOHead
        title={t('donate.title')}
        description="Donate to Fatima Ali Health Foundation — support free medical camps, flood relief, clean water projects, and community healthcare programs across Pakistan. Every contribution saves lives."
        path="/donate"
        jsonLd={[
          donateLd,
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://fahfoundation.org/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Donate', 'item': 'https://fahfoundation.org/donate' },
            ],
          },
        ]}
      />

      <Breadcrumbs items={[{ label: t('donate.title'), path: '/donate' }]} />

      <section className="section donate-page">
        <div className="container">
          <div className="section-heading">
            <h1 className="section-heading__title">{t('donate.title')}</h1>
            <p className="section-heading__subtitle">Bank Details</p>
            <div className="section-heading__bar" />
          </div>

          <div className="donate-page__bank card">
            <h2 className="donate-page__bank-title">Bank Details</h2>
            <p className="donate-page__bank-line">Meezan Bank — Model Town C-Block, Lahore</p>
            <p className="donate-page__bank-line"><strong>Account No:</strong> 02870110584994</p>
            <p className="donate-page__bank-line"><strong>IBAN:</strong> PK96MEZN0002870110584994</p>
          </div>
        </div>
      </section>
    </>
  );
}
