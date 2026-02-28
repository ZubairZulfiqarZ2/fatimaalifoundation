import { useLanguage } from '../../context/LanguageContext';
import SEOHead from '../../components/SEO/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Testimonials from '../../components/Testimonials/Testimonials';
import ImpactStats from '../../components/ImpactStats/ImpactStats';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import team from '../../data/team';

// Import gallery images
import heroImg from '../../assets/images/WhatsApp Image 2026-02-24 at 15.24.21.jpeg';
import medicalCampImg from '../../assets/images/WhatsApp Image 2026-02-24 at 15.24.16 (1).jpeg';
import doctorChildImg from '../../assets/images/WhatsApp Image 2026-02-24 at 16.00.19.jpeg';
import ladyDoctorsImg from '../../assets/images/WhatsApp Image 2026-02-24 at 15.24.17 (1).jpeg';
import waterPlantImg from '../../assets/images/WhatsApp Image 2026-02-24 at 16.00.26.jpeg';
import floodReliefImg from '../../assets/images/WhatsApp Image 2026-02-24 at 16.00.26 (1).jpeg';
import drMaqsoodClinicImg from '../../assets/images/WhatsApp Image 2026-02-24 at 15.24.17.jpeg';
import officialBannerImg from '../../assets/images/84x33 star file.jpg';

// Import new gallery images
import motherChildClinic from '../../assets/images/new/WhatsApp Image 2026-02-28 at 16.05.32.jpeg';
import motherBabyOPD from '../../assets/images/new/WhatsApp Image 2026-02-28 at 16.06.18.jpeg';
import bpCheckLadyDoctor from '../../assets/images/new/WhatsApp Image 2026-02-28 at 16.06.40.jpeg';
import childWeighingImg from '../../assets/images/new/WhatsApp Image 2026-02-28 at 16.07.08.jpeg';
import orphanageDistribution from '../../assets/images/new/WhatsApp Image 2026-02-28 at 16.07.13.jpeg';
import ribbonCuttingImg from '../../assets/images/new/WhatsApp Image 2026-02-28 at 16.09.26.jpeg';

// Import videos
import video1 from '../../assets/images/WhatsApp Video 2026-02-24 at 16.00.24.mp4';
import video2 from '../../assets/images/WhatsApp Video 2026-02-24 at 16.21.46.mp4';

import './AboutPage.css';

const galleryImages = [
  { src: heroImg, alt: 'Fatima Ali Health Foundation representatives launching the safe drinking water project with children' },
  { src: drMaqsoodClinicImg, alt: 'True leadership is service — Dr. Muhammad Maqsood personally caring for those in need' },
  { src: ladyDoctorsImg, alt: 'Caring hands, compassionate hearts — our lady doctors bringing hope and healing to every patient' },
  { src: medicalCampImg, alt: 'From gate to clinic, patients await help — committed to serving every soul' },
  { src: doctorChildImg, alt: 'Healthy kids, happy future – our foundation at work' },
  { src: waterPlantImg, alt: 'Clean water, healthy communities — R.O. Water Filtration Plant' },
  { src: floodReliefImg, alt: 'Free Medical Camp for flood victims — medicine distribution' },
  { src: motherChildClinic, alt: 'Mother with infant receiving healthcare at our free medical camp' },
  { src: motherBabyOPD, alt: 'Mother and baby at the OPD counter — accessible healthcare for all' },
  { src: bpCheckLadyDoctor, alt: 'Lady doctor performing blood pressure check-up at community medical camp' },
  { src: childWeighingImg, alt: 'Child health screening — weighing and nutritional assessment at our medical camp' },
  { src: orphanageDistribution, alt: 'Distribution of care packages to children at orphanage — spreading joy and hope' },
  { src: ribbonCuttingImg, alt: 'Inauguration ceremony — community leaders celebrating the launch of a new project by Fatima Ali Health Foundation' },
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
      <SEOHead
        title={t('about.title')}
        description="Founded by Dr. Muhammad Maqsood in 2003, the Fatima Ali Health Foundation organizes free medical camps, healthcare services, and flood relief across Pakistan."
        path="/about"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://fahfoundation.org/' },
            { '@type': 'ListItem', 'position': 2, 'name': 'About', 'item': 'https://fahfoundation.org/about' },
          ],
        }}
      />

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

      {/* Official Credentials Banner */}
      <section className="section about-credentials">
        <div className="container text-center">
          <h2 className="section-heading__title">Official Registration & Credentials</h2>
          <div className="section-heading__bar" />
          <img
            src={officialBannerImg}
            alt="Fatima Ali Health Foundation — Official credentials banner showing Punjab Charity Commission (REG NO 12033-1484162-1256), Punjab Healthcare Commission PHC (REG.NO 84783), FBR Pakistan (REG.NO D-826348), Registrar Joint Stock Companies Lahore (REG NO RP/907-L/SO3). CEO: Dr. Muhammad Maqsood."
            className="about-credentials__img about-credentials__img--banner"
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
                  height="400"
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
