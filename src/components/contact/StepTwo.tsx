/**
 * Step Two - Business Details
 * Second step of the contact form - captures business information
 */

import { useState } from 'react';

interface StepTwoProps {
  email: string;
  contactId: string;
  onNext: (data: StepTwoData) => Promise<void>;
  onBack: () => void;
  isLoading?: boolean;
  error?: string;
  initialData?: StepTwoData;
}

export interface StepTwoData {
  fullName: string;
  companyName: string;
  companyDomain: string;
}

export function StepTwo({
  email,
  onNext,
  onBack,
  isLoading,
  error,
  initialData,
}: StepTwoProps) {
  const [formData, setFormData] = useState<StepTwoData>({
    fullName: initialData?.fullName || '',
    companyName: initialData?.companyName || '',
    companyDomain: initialData?.companyDomain || '',
  });

  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof StepTwoData, string>>
  >({});

  const handleChange = (field: keyof StepTwoData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof StepTwoData, string>> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name';
    }

    if (!formData.companyName.trim()) {
      errors.companyName = 'Please enter your company name';
    }

    if (!formData.companyDomain.trim()) {
      errors.companyDomain = 'Please enter your company website';
    } else {
      // Basic domain validation
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
      // Remove http/https and www if present
      let cleanDomain = formData.companyDomain
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '');

      if (!domainRegex.test(cleanDomain)) {
        errors.companyDomain = 'Please enter a valid domain (e.g., example.com)';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Clean domain before submitting
    const cleanDomain = formData.companyDomain
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '');

    await onNext({
      ...formData,
      companyDomain: cleanDomain,
    });
  };

  return (
    <div className="contact-step step-two">
      <div className="step-header">
        <h2 className="step-title">Tell us about your business</h2>
        <p className="step-description">
          We're collecting this to better understand how we can help
        </p>
        <p className="step-email-confirm">Sending to: {email}</p>
      </div>

      <form onSubmit={handleSubmit} className="step-form">
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={`form-input ${validationErrors.fullName ? 'form-input-error' : ''}`}
            placeholder="John Smith"
            disabled={isLoading}
            autoFocus
            required
          />
          {validationErrors.fullName && (
            <p className="form-error" role="alert">
              {validationErrors.fullName}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="companyName" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            className={`form-input ${validationErrors.companyName ? 'form-input-error' : ''}`}
            placeholder="Acme Inc."
            disabled={isLoading}
            required
          />
          {validationErrors.companyName && (
            <p className="form-error" role="alert">
              {validationErrors.companyName}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="companyDomain" className="form-label">
            Company Website
          </label>
          <input
            type="text"
            id="companyDomain"
            name="companyDomain"
            value={formData.companyDomain}
            onChange={(e) => handleChange('companyDomain', e.target.value)}
            className={`form-input ${validationErrors.companyDomain ? 'form-input-error' : ''}`}
            placeholder="example.com"
            disabled={isLoading}
            required
          />
          {validationErrors.companyDomain && (
            <p className="form-error" role="alert">
              {validationErrors.companyDomain}
            </p>
          )}
        </div>

        {error && (
          <div className="form-error-banner" role="alert">
            {error}
          </div>
        )}

        <div className="form-actions form-actions-two">
          <button
            type="button"
            onClick={onBack}
            className="btn btn-secondary btn-back"
            disabled={isLoading}
          >
            <span className="arrow">←</span>
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="btn btn-primary btn-submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit</span>
                <span className="arrow">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
