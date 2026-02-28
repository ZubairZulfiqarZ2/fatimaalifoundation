import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SEOHead from '../../components/SEO/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import blogPosts from '../../data/blogPosts';
import './BlogPostPage.css';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t, language } = useLanguage();

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return (
      <div className="container section text-center">
        <h1>Post Not Found</h1>
        <Link to="/blog" className="btn btn--primary">{t('common.back')}</Link>
      </div>
    );
  }

  const title = language === 'ur' ? post.titleUrdu : post.title;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.excerpt,
    'image': post.image,
    'datePublished': post.date,
    'author': {
      '@type': 'Person',
      'name': post.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Fatima Ali Health Foundation',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://fahfoundation.org/assets/images/new/logo_fatima_ali_foundation.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://fahfoundation.org/blog/${slug}`,
    },
  };

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        path={`/blog/${slug}`}
        image={post.image}
        type="article"
        jsonLd={[
          articleLd,
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://fahfoundation.org/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://fahfoundation.org/blog' },
              { '@type': 'ListItem', 'position': 3, 'name': post.title, 'item': `https://fahfoundation.org/blog/${slug}` },
            ],
          },
        ]}
      />

      <Breadcrumbs
        items={[
          { label: t('blog.title'), path: '/blog' },
          { label: title, path: `/blog/${slug}` },
        ]}
      />

      <article className="section blog-post">
        <div className="container container--narrow">
          <header className="blog-post__header">
            <h1 className="blog-post__title">{title}</h1>
            <div className="blog-post__meta">
              <span>{t('blog.posted_on')} {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>{t('blog.by')} {post.author}</span>
            </div>
          </header>

          <img
            src={post.image}
            alt={post.title}
            className="blog-post__image"
            width="800"
            height="400"
          />

          <div
            className="blog-post__content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="blog-post__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-post__tag">#{tag}</span>
            ))}
          </div>

          <Link to="/blog" className="btn btn--secondary">
            ← {t('common.back')}
          </Link>
        </div>
      </article>
    </>
  );
}
