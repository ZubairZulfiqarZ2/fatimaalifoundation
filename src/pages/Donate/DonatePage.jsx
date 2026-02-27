import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import DonateWidget from '../../components/DonateWidget/DonateWidget';
import './DonatePage.css';

export default function DonatePage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const preselectedProject = searchParams.get('project') || '';

  return (
    <>
      <Helmet>
        <title>{t('donate.title')} — {t('site.name')}</title>
        <meta name="description" content="Your generous donation helps us provide free medical care, relief for flood victims, and community health programs. Every contribution makes a difference." />
      </Helmet>

      <Breadcrumbs items={[{ label: t('donate.title'), path: '/donate' }]} />

      <section className="section donate-page">
        <div className="container">
          <div className="section-heading">
            <h1 className="section-heading__title">{t('donate.title')}</h1>
            <p className="section-heading__subtitle">{t('donate.subtitle')}</p>
            <div className="section-heading__bar" />
          </div>

          <DonateWidget preselectedProject={preselectedProject} />

          {/* Security Note */}
          <div className="donate-page__security">
            <p>🔒 Your donation is secure. We use industry-standard encryption (TLS/SSL) to protect your information. We never store raw card data.</p>
          </div>
        </div>
      </section>
    </>
  );
}
