import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import './LegalPage.css';

const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    content: `<h2>Privacy Policy</h2>
<p>Last updated: February 2026</p>
<p>Fatima Ali Health Foundation ("we", "us", or "our") operates the website fahfoundation.org. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.</p>
<h3>Information We Collect</h3>
<p>We collect information you provide directly, such as when you make a donation, sign up for our newsletter, or contact us. This may include your name, email address, phone number, and payment information.</p>
<h3>How We Use Your Information</h3>
<p>We use your information to process donations, send you updates about our work, respond to inquiries, and improve our services. We never sell or rent your personal information to third parties.</p>
<h3>Data Security</h3>
<p>We implement industry-standard security measures to protect your data, including SSL/TLS encryption for all data transmission. Payment information is processed through PCI-DSS compliant payment processors and is never stored on our servers.</p>
<h3>Contact Us</h3>
<p>If you have questions about this privacy policy, please contact us at info@fahfoundation.org.</p>`,
  },
  terms: {
    title: 'Terms of Use',
    content: `<h2>Terms of Use</h2>
<p>Last updated: February 2026</p>
<p>By accessing and using the Fatima Ali Health Foundation website, you agree to be bound by these Terms of Use.</p>
<h3>Use of Website</h3>
<p>This website is provided for informational purposes and to facilitate charitable donations. You agree to use the website only for lawful purposes.</p>
<h3>Donations</h3>
<p>All donations are voluntary and non-refundable. Tax receipts are provided where applicable. Donations are used in accordance with the foundation's stated charitable purposes.</p>
<h3>Intellectual Property</h3>
<p>All content on this website, including text, images, logos, and design, is the property of Fatima Ali Health Foundation and is protected by copyright laws.</p>
<h3>Limitation of Liability</h3>
<p>We make reasonable efforts to ensure the accuracy of information on this website, but do not guarantee its completeness or accuracy. We are not liable for any damages arising from the use of this website.</p>`,
  },
  reports: {
    title: 'Financial Reports',
    content: `<h2>Financial Reports</h2>
<p>Transparency is one of our core values. We believe our donors and supporters have the right to know how their contributions are being used.</p>
<h3>Annual Reports</h3>
<ul>
<li>Annual Report 2025 — <em>Coming Soon</em></li>
<li>Annual Report 2024 — <a href="#">Download PDF</a></li>
<li>Annual Report 2023 — <a href="#">Download PDF</a></li>
</ul>
<h3>Audit Reports</h3>
<p>Our finances are audited annually by an independent chartered accountancy firm. Audit reports are available upon request.</p>
<h3>How Funds Are Used</h3>
<p>Approximately 85% of all funds received go directly to program delivery. The remaining 15% covers administrative and fundraising costs.</p>`,
  },
};

export default function LegalPage() {
  const { page } = useParams();
  const { t } = useLanguage();

  const content = legalContent[page] || legalContent.privacy;
  const pageTitle = content.title;

  return (
    <>
      <Helmet>
        <title>{pageTitle} — {t('site.name')}</title>
      </Helmet>

      <Breadcrumbs
        items={[
          { label: t('nav.legal'), path: '/legal' },
          { label: pageTitle, path: `/legal/${page}` },
        ]}
      />

      <section className="section legal-page">
        <div className="container container--narrow">
          {/* Navigation between legal pages */}
          <nav className="legal-page__nav" aria-label="Legal pages">
            <Link to="/legal/privacy" className={`legal-page__nav-link ${page === 'privacy' ? 'legal-page__nav-link--active' : ''}`}>
              {t('legal.privacy_title')}
            </Link>
            <Link to="/legal/terms" className={`legal-page__nav-link ${page === 'terms' ? 'legal-page__nav-link--active' : ''}`}>
              {t('legal.terms_title')}
            </Link>
            <Link to="/legal/reports" className={`legal-page__nav-link ${page === 'reports' ? 'legal-page__nav-link--active' : ''}`}>
              {t('legal.reports_title')}
            </Link>
          </nav>

          <div
            className="legal-page__content"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </div>
      </section>
    </>
  );
}
