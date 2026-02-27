import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FaCreditCard, FaPaypal, FaUniversity } from 'react-icons/fa';
import projects from '../../data/projects';
import './DonateWidget.css';

const presetAmounts = [10, 25, 50, 100, 250, 500];

export default function DonateWidget({ preselectedProject = '' }) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1); // 1: form, 2: summary, 3: processing, 4: success/error
  const [formData, setFormData] = useState({
    amount: 50,
    customAmount: '',
    frequency: 'one-time',
    paymentMethod: 'credit-card',
    project: preselectedProject,
    reference: '',
    name: '',
    email: '',
  });
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const selectedAmount = formData.customAmount ? Number(formData.customAmount) : formData.amount;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAmountClick = (amount) => {
    setFormData((prev) => ({ ...prev, amount, customAmount: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    // Simulate payment
    setStep(3);
    setTimeout(() => {
      // Simulate 90% success rate
      const isSuccess = Math.random() > 0.1;
      setStatus(isSuccess ? 'success' : 'error');
      setStep(4);
      // Track analytics event (placeholder)
      if (typeof window.gtag === 'function') {
        window.gtag('event', isSuccess ? 'donation_completed' : 'donation_failed', {
          value: selectedAmount,
          currency: 'USD',
          project: formData.project || 'general',
        });
      }
    }, 2000);
  };

  const resetForm = () => {
    setStep(1);
    setStatus(null);
    setFormData({
      amount: 50,
      customAmount: '',
      frequency: 'one-time',
      paymentMethod: 'credit-card',
      project: preselectedProject,
      reference: '',
      name: '',
      email: '',
    });
  };

  // Step 4: Success / Error
  if (step === 4) {
    return (
      <div className="donate-widget">
        <div className={`donate-widget__result donate-widget__result--${status}`}>
          {status === 'success' ? (
            <>
              <div className="donate-widget__result-icon">✅</div>
              <h3>{t('donate.success_title')}</h3>
              <p>
                {t('donate.success_message')
                  .replace('{amount}', `$${selectedAmount}`)
                  .replace('{email}', formData.email)}
              </p>
            </>
          ) : (
            <>
              <div className="donate-widget__result-icon">❌</div>
              <h3>{t('common.error')}</h3>
              <p>{t('donate.error_message')}</p>
            </>
          )}
          <button className="btn btn--primary" onClick={resetForm}>
            {status === 'error' ? t('common.retry') : t('nav.donate')}
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Processing
  if (step === 3) {
    return (
      <div className="donate-widget">
        <div className="donate-widget__processing">
          <div className="donate-widget__spinner" role="status">
            <span className="sr-only">{t('donate.processing')}</span>
          </div>
          <p>{t('donate.processing')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="donate-widget">
      <form onSubmit={handleSubmit} noValidate>
        {step === 1 && (
          <div className="donate-widget__step">
            {/* Amount Selection */}
            <fieldset className="donate-widget__fieldset">
              <legend className="donate-widget__legend">{t('donate.amount_label')}</legend>
              <div className="donate-widget__amounts">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`donate-widget__amount-btn ${formData.amount === amt && !formData.customAmount ? 'donate-widget__amount-btn--active' : ''}`}
                    onClick={() => handleAmountClick(amt)}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <div className="form-group">
                <label htmlFor="custom-amount" className="form-label">{t('donate.custom_amount')}</label>
                <input
                  type="number"
                  id="custom-amount"
                  className="form-input"
                  placeholder="$0"
                  min="1"
                  value={formData.customAmount}
                  onChange={(e) => handleChange('customAmount', e.target.value)}
                />
              </div>
            </fieldset>

            {/* Frequency */}
            <fieldset className="donate-widget__fieldset">
              <legend className="sr-only">Donation frequency</legend>
              <div className="donate-widget__toggle">
                <button
                  type="button"
                  className={`donate-widget__toggle-btn ${formData.frequency === 'one-time' ? 'donate-widget__toggle-btn--active' : ''}`}
                  onClick={() => handleChange('frequency', 'one-time')}
                >
                  {t('donate.one_time')}
                </button>
                <button
                  type="button"
                  className={`donate-widget__toggle-btn ${formData.frequency === 'monthly' ? 'donate-widget__toggle-btn--active' : ''}`}
                  onClick={() => handleChange('frequency', 'monthly')}
                >
                  {t('donate.monthly')}
                </button>
              </div>
            </fieldset>

            {/* Payment Method */}
            <fieldset className="donate-widget__fieldset">
              <legend className="donate-widget__legend">{t('donate.payment_method')}</legend>
              <div className="donate-widget__methods">
                {[
                  { id: 'credit-card', icon: FaCreditCard, label: t('donate.credit_card') },
                  { id: 'paypal', icon: FaPaypal, label: t('donate.paypal') },
                  { id: 'bank-transfer', icon: FaUniversity, label: t('donate.bank_transfer') },
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      className={`donate-widget__method-btn ${formData.paymentMethod === method.id ? 'donate-widget__method-btn--active' : ''}`}
                      onClick={() => handleChange('paymentMethod', method.id)}
                    >
                      <Icon aria-hidden="true" />
                      <span>{method.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Bank Transfer Details */}
            {formData.paymentMethod === 'bank-transfer' && (
              <div className="donate-widget__bank-info">
                <h4>{t('donate.bank_title')}</h4>
                <p>{t('donate.bank_name')}</p>
                <p>{t('donate.bank_account')}</p>
                <p>{t('donate.bank_iban')}</p>
                <p><em>{t('donate.bank_instructions')}</em></p>
              </div>
            )}

            {/* Project Selection */}
            <div className="form-group">
              <label htmlFor="donate-project" className="form-label">{t('donate.project_label')}</label>
              <select
                id="donate-project"
                className="form-select"
                value={formData.project}
                onChange={(e) => handleChange('project', e.target.value)}
              >
                <option value="">{t('donate.general_fund')}</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {language === 'ur' ? p.titleUrdu : p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Personal Info */}
            <div className="form-group">
              <label htmlFor="donate-name" className="form-label">{t('donate.name_label')}</label>
              <input
                type="text"
                id="donate-name"
                className="form-input"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="donate-email" className="form-label">{t('donate.email_label')}</label>
              <input
                type="email"
                id="donate-email"
                className="form-input"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="donate-reference" className="form-label">{t('donate.reference_label')}</label>
              <input
                type="text"
                id="donate-reference"
                className="form-input"
                value={formData.reference}
                onChange={(e) => handleChange('reference', e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn--donate btn--lg donate-widget__submit" disabled={!selectedAmount || !formData.name || !formData.email}>
              {t('donate.confirm')} — ${selectedAmount || 0}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="donate-widget__step donate-widget__summary">
            <h3>{t('donate.summary')}</h3>
            <dl className="donate-widget__summary-list">
              <dt>{t('donate.amount_label')}</dt>
              <dd>${selectedAmount} ({formData.frequency === 'monthly' ? t('donate.monthly') : t('donate.one_time')})</dd>
              <dt>{t('donate.payment_method')}</dt>
              <dd>{formData.paymentMethod === 'credit-card' ? t('donate.credit_card') : formData.paymentMethod === 'paypal' ? t('donate.paypal') : t('donate.bank_transfer')}</dd>
              <dt>{t('donate.project_label')}</dt>
              <dd>{formData.project ? projects.find((p) => p.id === formData.project)?.title : t('donate.general_fund')}</dd>
              <dt>{t('donate.name_label')}</dt>
              <dd>{formData.name}</dd>
              <dt>{t('donate.email_label')}</dt>
              <dd>{formData.email}</dd>
            </dl>
            <div className="donate-widget__summary-actions">
              <button type="button" className="btn btn--secondary" onClick={() => setStep(1)}>
                {t('common.back')}
              </button>
              <button type="submit" className="btn btn--donate btn--lg">
                {t('donate.confirm')}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
