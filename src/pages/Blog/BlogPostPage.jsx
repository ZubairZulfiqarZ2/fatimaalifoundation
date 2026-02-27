import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';
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

  return (
    <>
      <Helmet>
        <title>{post.title} — {t('site.name')}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
      </Helmet>

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
