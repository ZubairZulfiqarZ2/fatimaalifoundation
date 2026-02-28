import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SEOHead from '../../components/SEO/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import events from '../../data/events';
import './EventsPage.css';

export default function EventsPage() {
  const { t, language } = useLanguage();
  const [tab, setTab] = useState('upcoming');
  const [ref, isVisible] = useScrollAnimation();

  const upcoming = events.filter((e) => !e.isPast);
  const past = events.filter((e) => e.isPast);
  const displayed = tab === 'upcoming' ? upcoming : past;

  return (
    <>
      <SEOHead
        title={t('events.title')}
        description="Browse upcoming and past events from Fatima Ali Health Foundation — free medical camps, blood donation drives, food distribution, community health programs in Pakistan."
        path="/events"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://fahfoundation.org/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Events', 'item': 'https://fahfoundation.org/events' },
            ],
          },
          ...events.slice(0, 5).map((ev) => ({
            '@context': 'https://schema.org',
            '@type': 'Event',
            'name': ev.title,
            'startDate': ev.date,
            'location': {
              '@type': 'Place',
              'name': ev.location,
              'address': { '@type': 'PostalAddress', 'addressCountry': 'PK' },
            },
            'description': ev.description,
            'organizer': {
              '@type': 'Organization',
              'name': 'Fatima Ali Health Foundation',
              'url': 'https://fahfoundation.org',
            },
            'image': ev.image,
          })),
        ]}
      />

      <Breadcrumbs items={[{ label: t('events.title'), path: '/events' }]} />

      <section className="section events-page" ref={ref}>
        <div className="container">
          <div className="section-heading">
            <h1 className="section-heading__title">{t('events.title')}</h1>
            <p className="section-heading__subtitle">{t('events.subtitle')}</p>
            <div className="section-heading__bar" />
          </div>

          {/* Tabs */}
          <div className="events-page__tabs" role="tablist">
            <button
              role="tab"
              aria-selected={tab === 'upcoming'}
              className={`events-page__tab ${tab === 'upcoming' ? 'events-page__tab--active' : ''}`}
              onClick={() => setTab('upcoming')}
            >
              {t('events.upcoming')} ({upcoming.length})
            </button>
            <button
              role="tab"
              aria-selected={tab === 'past'}
              className={`events-page__tab ${tab === 'past' ? 'events-page__tab--active' : ''}`}
              onClick={() => setTab('past')}
            >
              {t('events.past')} ({past.length})
            </button>
          </div>

          {/* Events List */}
          <div className="events-page__list" role="tabpanel">
            {displayed.map((event, i) => {
              const eventTitle = language === 'ur' ? event.titleUrdu : event.title;
              return (
                <article
                  key={event.id}
                  className={`events-page__card card ${isVisible ? 'animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${i * 100}ms`, opacity: isVisible ? 1 : 0 }}
                >
                  <div className="events-page__card-image">
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      width="300"
                      height="200"
                    />
                  </div>
                  <div className="events-page__card-body">
                    <h2 className="events-page__card-title">{eventTitle}</h2>
                    <div className="events-page__card-meta">
                      <span><FaCalendar aria-hidden="true" /> {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span><FaClock aria-hidden="true" /> {event.time}</span>
                      <span><FaMapMarkerAlt aria-hidden="true" /> {event.location}</span>
                    </div>
                    <p className="events-page__card-desc">{event.description}</p>
                    {event.rsvpLink && (
                      <Link to={event.rsvpLink} className="btn btn--primary">
                        {t('events.rsvp')}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}

            {displayed.length === 0 && (
              <p className="text-center" style={{ padding: 'var(--space-2xl)', color: 'var(--color-neutral-500)' }}>
                No events to display.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
