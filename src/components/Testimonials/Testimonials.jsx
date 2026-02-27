import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import testimonials from '../../data/testimonials';
import './Testimonials.css';

export default function Testimonials() {
  const { t, language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  const [ref, isVisible] = useScrollAnimation(0.2);

  const total = testimonials.length;

  const goTo = (index) => {
    setCurrent((index + total) % total);
  };

  useEffect(() => {
    if (isPlaying && isVisible) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % total);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, isVisible, total]);

  const item = testimonials[current];
  const quote = language === 'ur' ? item.quoteUrdu : item.quote;
  const author = language === 'ur' ? item.authorUrdu : item.author;
  const role = language === 'ur' ? item.roleUrdu : item.role;

  return (
    <section className="testimonials section section--alt" ref={ref} aria-label={t('about.testimonials_title')}>
      <div className="container container--narrow">
        <div className="section-heading">
          <h2 className="section-heading__title">{t('about.testimonials_title')}</h2>
          <div className="section-heading__bar" />
        </div>

        <div
          className={`testimonials__card ${isVisible ? 'testimonials__card--visible' : ''}`}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          aria-live="polite"
        >
          <FaQuoteLeft className="testimonials__quote-icon" aria-hidden="true" />
          <blockquote className="testimonials__quote">
            <p>{quote}</p>
          </blockquote>
          <div className="testimonials__author">
            <img
              src={item.image}
              alt={`Photo of ${item.author}`}
              className="testimonials__avatar"
              loading="lazy"
              width="56"
              height="56"
            />
            <div>
              <strong className="testimonials__name">{author}</strong>
              <span className="testimonials__role">{role}</span>
            </div>
          </div>
        </div>

        <div className="testimonials__controls">
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Previous testimonial"
            className="testimonials__btn"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>

          <div className="testimonials__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
              />
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
            className="testimonials__btn"
          >
            {isPlaying ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
          </button>

          <button
            onClick={() => goTo(current + 1)}
            aria-label="Next testimonial"
            className="testimonials__btn"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
