import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import SkipLink from './components/SkipLink/SkipLink';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ProjectDetailPage from './pages/Projects/ProjectDetailPage';
import EventsPage from './pages/Events/EventsPage';
import DonatePage from './pages/Donate/DonatePage';
import ContactPage from './pages/Contact/ContactPage';
import BlogPage from './pages/Blog/BlogPage';
import BlogPostPage from './pages/Blog/BlogPostPage';
import LegalPage from './pages/Legal/LegalPage';

import './styles/global.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <SkipLink />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/legal/:page" element={<LegalPage />} />
          <Route
            path="*"
            element={
              <div className="container section text-center">
                <h1>404 — Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <a href="/" className="btn btn--primary" style={{ marginTop: '1rem' }}>
                  Go Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}
