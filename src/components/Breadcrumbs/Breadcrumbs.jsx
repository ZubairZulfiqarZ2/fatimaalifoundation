import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Breadcrumbs.css';

export default function Breadcrumbs({ items = [] }) {
  const { t } = useLanguage();

  const breadcrumbs = [{ label: t('nav.home'), path: '/' }, ...items];

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list container" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li
              key={item.path || index}
              className="breadcrumbs__item"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span className="breadcrumbs__current" aria-current="page" itemProp="name">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link to={item.path} className="breadcrumbs__link" itemProp="item">
                    <span itemProp="name">{item.label}</span>
                  </Link>
                  <span className="breadcrumbs__separator" aria-hidden="true">/</span>
                </>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
