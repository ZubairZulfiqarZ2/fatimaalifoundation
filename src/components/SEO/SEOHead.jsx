import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://fahfoundation.org';
const SITE_NAME = 'Fatima Ali Health Foundation';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/WhatsApp%20Image%202026-02-24%20at%2015.24.21.jpeg`;

/**
 * SEOHead — Reusable meta tag injector for all pages.
 * Handles title, description, OG, Twitter cards, canonical, hreflang, and JSON-LD.
 *
 * @param {string} title — Page title (appended with site name)
 * @param {string} description — Meta description (max ~155 chars recommended)
 * @param {string} path — Route path (e.g., "/about") for canonical URL
 * @param {string} [image] — OG image URL (defaults to hero image)
 * @param {string} [type] — OG type (default: "website")
 * @param {object|object[]} [jsonLd] — JSON-LD structured data object(s)
 * @param {boolean} [noIndex] — If true, adds noindex
 */
export default function SEOHead({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd = null,
  noIndex = false,
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Nurturing Care, Changing Lives`;
  const canonicalUrl = `${SITE_URL}${path}`;

  // Normalize JSON-LD to array
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang */}
      <link rel="alternate" hreflang="en" href={canonicalUrl} />
      <link rel="alternate" hreflang="ur" href={`${canonicalUrl}${path.includes('?') ? '&' : '?'}lang=ur`} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ur_PK" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {jsonLdArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
