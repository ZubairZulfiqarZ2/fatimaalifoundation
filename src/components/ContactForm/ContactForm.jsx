import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './ContactForm.css';

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    // Simulate server call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In production: const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Analytics placeholder
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'form_submit', { form_name: 'contact' });
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {status === 'success' && (
        <div className="contact-form__alert contact-form__alert--success" role="alert">
          {t('contact.success')}
        </div>
      )}
      {status === 'error' && (
        <div className="contact-form__alert contact-form__alert--error" role="alert">
          {t('common.error')} {t('common.retry')}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="contact-name" className="form-label">{t('contact.name')}</label>
        <input
          type="text"
          id="contact-name"
          className={`form-input ${errors.name ? 'form-input--error' : ''}`}
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name && <p className="form-error" id="contact-name-error" role="alert">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="contact-email" className="form-label">{t('contact.email')}</label>
        <input
          type="email"
          id="contact-email"
          className={`form-input ${errors.email ? 'form-input--error' : ''}`}
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email && <p className="form-error" id="contact-email-error" role="alert">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="contact-subject" className="form-label">{t('contact.subject')}</label>
        <input
          type="text"
          id="contact-subject"
          className={`form-input ${errors.subject ? 'form-input--error' : ''}`}
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          required
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
        />
        {errors.subject && <p className="form-error" id="contact-subject-error" role="alert">{errors.subject}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">{t('contact.message')}</label>
        <textarea
          id="contact-message"
          className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
          rows="5"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && <p className="form-error" id="contact-message-error" role="alert">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="btn btn--primary btn--lg contact-form__submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? t('common.loading') : t('contact.submit')}
      </button>
    </form>
  );
}
