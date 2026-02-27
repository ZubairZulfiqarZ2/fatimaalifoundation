import { useLanguage } from '../../context/LanguageContext';
import './SkipLink.css';

export default function SkipLink() {
  const { t } = useLanguage();

  return (
    <a href="#main-content" className="skip-link">
      {t('nav.skipToContent')}
    </a>
  );
}
