import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Testimonials from '../../components/Testimonials/Testimonials';
import ImpactStats from '../../components/ImpactStats/ImpactStats';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import team, { officeHoldersImg } from '../../data/team';

// Import gallery images
import heroImg from '../../assets/images/WhatsApp Image 2026-02-24 at 15.24.21.jpeg';
import medicalCampImg from '../../assets/images/WhatsApp Image 2026-02-24 at 15.24.16 (1).jpeg';
import doctorChildImg from '../../assets/images/WhatsApp Image 2026-02-24 at 16.00.19.jpeg';
import ladyDoctorsImg from '../../assets/images/WhatsApp Image 2026-02-24 at 15.24.17 (1).jpeg';
import waterPlantImg from '../../assets/images/WhatsApp Image 2026-02-24 at 16.00.26.jpeg';
import floodReliefImg from '../../assets/images/WhatsApp Image 2026-02-24 at 16.00.26 (1).jpeg';
import drMaqsoodClinicImg from '../../assets/images/WhatsApp Image 2026-02-24 at 15.24.17.jpeg';
import registrationImg from '../../assets/images/WhatsApp Image 2026-02-24 at 15.24.20.jpeg';

// Import videos
import video1 from '../../assets/images/WhatsApp Video 2026-02-24 at 16.00.24.mp4';
import video2 from '../../assets/images/WhatsApp Video 2026-02-24 at 16.21.46.mp4';

import './AboutPage.css';

const galleryImages = [
  { src: heroImg, alt: 'Fatima Ali Health Foundation representatives launching the safe drinking water project with children' },
  { src: drMaqsoodClinicImg, alt: 'True leadership is service — Dr. Maqsood personally caring for those in need' },
  { src: ladyDoctorsImg, alt: 'Caring hands, compassionate hearts — our lady doctors bringing hope and healing to every patient' },
  { src: medicalCampImg, alt: 'From gate to clinic, patients await help — committed to serving every soul' },
  { src: doctorChildImg, alt: 'Healthy kids, happy future – our foundation at work' },
  { src: waterPlantImg, alt: 'Clean water, healthy communities — R.O. Water Filtration Plant' },
  { src: floodReliefImg, alt: 'Free Medical Camp for flood victims — medicine distribution' },
];

export default function AboutPage() {
  const { t, language } = useLanguage();
  const [visionRef, visionVisible] = useScrollAnimation();
  const [missionRef, missionVisible] = useScrollAnimation();
  const [teamRef, teamVisible] = useScrollAnimation();
  const [galleryRef, galleryVisible] = useScrollAnimation();
  const [videoRef, videoVisible] = useScrollAnimation();

  return (
    <>
      <Helmet>
        <title>{t('about.title')} — {t('site.name')}</title>
        <meta name="description" content="Founded by Dr. Muhammad Maqsood in 2003, the Fatima Ali Health Foundation organizes free medical camps, healthcare services, and flood relief across Pakistan." />
      </Helmet>

      <Breadcrumbs items={[{ label: t('about.title'), path: '/about' }]} />

      {/* Vision */}
      <section
        className={`section about-vision ${visionVisible ? 'animate-fade-in-up' : ''}`}
        ref={visionRef}
        style={{ opacity: visionVisible ? 1 : 0 }}
      >
        <div className="container container--narrow text-center">
          <h1 className="section-heading__title">{t('about.title')}</h1>
          <p className="about-vision__founded">{t('about.founded')}</p>
          <div className="section-heading__bar" />
          <div className="about-vision__content">
            <h2>{t('about.vision_title')}</h2>
            <p>{t('about.vision_text')}</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        className={`section section--alt about-mission ${missionVisible ? 'animate-fade-in-up' : ''}`}
        ref={missionRef}
        style={{ opacity: missionVisible ? 1 : 0 }}
      >
        <div className="container container--narrow text-center">
          <h2 className="section-heading__title">{t('about.mission_title')}</h2>
          <div className="section-heading__bar" />
          <p className="about-mission__text">{t('about.mission_text')}</p>
        </div>
      </section>

      {/* Registration & Credentials */}
      <section className="section about-credentials">
        <div className="container text-center">
          <img
            src={registrationImg}
            alt="Fatima Ali Health Foundation official registration and credentials — Punjab Healthcare Commission, FBR registered"
            className="about-credentials__img"
            loading="lazy"
          />
        </div>
      </section>

      <ImpactStats />

      {/* Team */}
      <section
        className={`section about-team ${teamVisible ? 'animate-fade-in-up' : ''}`}
        ref={teamRef}
        style={{ opacity: teamVisible ? 1 : 0 }}
      >
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">{t('about.team_title')}</h2>
            <div className="section-heading__bar" />
          </div>

          <div className="about-team__grid">
            {team.map((member) => (
              <article key={member.id} className="about-team__card card">
                <img
                  src={member.image}
                  alt={`Photo of ${member.name}`}
                  className="about-team__photo"
                  loading="lazy"
                  width="300"
                  height="300"
                />
                <div className="about-team__info">
                  <h3 className="about-team__name">
                    {language === 'ur' ? member.nameUrdu : member.name}
                  </h3>
                  <p className="about-team__role">
                    {language === 'ur' ? member.roleUrdu : member.role}
                  </p>
                  <p className="about-team__bio">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Office Holders */}
          <div className="about-team__office-holders">
            <img
              src={officeHoldersImg}
              alt="Fatima Ali Health Foundation Office Holders 2026 — Dr. M. Maqsood (President), Medical Advisor Waqas Mehmood (Vice President), Advocate M. Amir Iqbal Gondal (General Secretary)"
              className="about-team__holders-img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section
        className={`section about-gallery ${galleryVisible ? 'animate-fade-in-up' : ''}`}
        ref={galleryRef}
        style={{ opacity: galleryVisible ? 1 : 0 }}
      >
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">Our Work in Action</h2>
            <div className="section-heading__bar" />
          </div>

          <div className="about-gallery__grid">
            {galleryImages.map((img, i) => (
              <figure key={i} className="about-gallery__item">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="about-gallery__img"
                  loading="lazy"
                />
                <figcaption className="about-gallery__caption">{img.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section
        className={`section section--alt about-videos ${videoVisible ? 'animate-fade-in-up' : ''}`}
        ref={videoRef}
        style={{ opacity: videoVisible ? 1 : 0 }}
      >
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">See Our Impact</h2>
            <div className="section-heading__bar" />
          </div>

          <div className="about-videos__grid">
            <div className="about-videos__item">
              <video
                controls
                preload="metadata"
                className="about-videos__video"
                poster={medicalCampImg}
                aria-label="Fatima Ali Health Foundation medical camp video"
              >
                <source src={video1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="about-videos__caption">Free Medical Camp — Serving communities with care</p>
            </div>
            <div className="about-videos__item">
              <video
                controls
                preload="metadata"
                className="about-videos__video"
                poster={heroImg}
                aria-label="Fatima Ali Health Foundation community outreach video"
              >
                <source src={video2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="about-videos__caption">Community Outreach — Making a difference every day</p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
