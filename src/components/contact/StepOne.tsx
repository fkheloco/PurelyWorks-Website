/**
 * Step One - Email Capture
 * First step of the contact form - captures user's email
 */

import { useState } from 'react';
import { isValidEmail } from '../../lib/hubspot/contact-service';

interface StepOneProps {
  onNext: (email: string) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  initialEmail?: string;
}

export function StepOne({ onNext, isLoading, error, initialEmail = '' }: StepOneProps) {
  const [email, setEmail] = useState(initialEmail);
  const [validationError, setValidationError] = useState<string | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(undefined);

    // Validate email format
    if (!email.trim()) {
      setValidationError('Please enter your email');
      return;
    }

    if (!isValidEmail(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }

    // Submit email
    await onNext(email.trim());
  };

  return (
    <div className="contact-step step-one">
      <div className="step-header">
        <h2 className="step-title">Let's get started</h2>
        <p className="step-description">Enter your email to begin</p>
      </div>

      <form onSubmit={handleSubmit} className="step-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-input ${validationError || error ? 'form-input-error' : ''}`}
            placeholder="you@company.com"
            disabled={isLoading}
            autoFocus
            required
          />
          {validationError && (
            <p className="form-error" role="alert">
              {validationError}
            </p>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-next"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <span className="arrow">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
