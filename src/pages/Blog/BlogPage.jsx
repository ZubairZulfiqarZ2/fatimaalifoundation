import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SEOHead from '../../components/SEO/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import blogPosts from '../../data/blogPosts';
import './BlogPage.css';

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [ref, isVisible] = useScrollAnimation();

  return (
    <>
      <SEOHead
        title={t('blog.title')}
        description="Latest news, updates, and stories from Fatima Ali Health Foundation — medical camp reports, flood relief updates, community health stories from Pakistan."
        path="/blog"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://fahfoundation.org/' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://fahfoundation.org/blog' },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: t('blog.title'), path: '/blog' }]} />

      <section className="section blog-page" ref={ref}>
        <div className="container">
          <div className="section-heading">
            <h1 className="section-heading__title">{t('blog.title')}</h1>
            <p className="section-heading__subtitle">{t('blog.subtitle')}</p>
            <div className="section-heading__bar" />
          </div>

          <div className="blog-page__grid">
            {blogPosts.map((post, i) => {
              const postTitle = language === 'ur' ? post.titleUrdu : post.title;
              return (
                <article
                  key={post.id}
                  className={`blog-page__card card ${isVisible ? 'animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${i * 100}ms`, opacity: isVisible ? 1 : 0 }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-page__card-image"
                    loading="lazy"
                    width="400"
                    height="220"
                  />
                  <div className="blog-page__card-body">
                    <div className="blog-page__card-meta">
                      <span>{t('blog.posted_on')} {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span>{t('blog.by')} {post.author}</span>
                    </div>
                    <h2 className="blog-page__card-title">{postTitle}</h2>
                    <p className="blog-page__card-excerpt">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="btn btn--link">
                      {t('blog.read_more')} →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
