import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import en from '../i18n/en.json';
import ur from '../i18n/ur.json';

const translations = { en, ur };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('fahf-lang') || 'en';
  });

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'ur' : 'en';
      localStorage.setItem('fahf-lang', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let value = translations[language];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    },
    [language]
  );

  useEffect(() => {
    const dir = language === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
