/**
 * Step Three - Success Confirmation
 * Final step showing success message and next steps
 */

interface StepThreeProps {
  contactName: string;
}

export function StepThree({ contactName }: StepThreeProps) {
  return (
    <div className="contact-step step-three">
      <div className="success-container">
        <div className="success-icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="32" fill="#10B981" fillOpacity="0.1" />
            <circle cx="32" cy="32" r="24" fill="#10B981" />
            <path
              d="M44 24L28 40L20 32"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="success-title">Thanks, {contactName}!</h2>
        <p className="success-message">
          We've received your information and our team will review it shortly.
        </p>

        <div className="next-steps">
          <h3 className="next-steps-title">What happens next:</h3>
          <ul className="next-steps-list">
            <li className="next-step-item">
              <span className="step-number">1</span>
              <span className="step-text">
                We'll analyze your company's AI readiness
              </span>
            </li>
            <li className="next-step-item">
              <span className="step-number">2</span>
              <span className="step-text">
                A member of our team will reach out within 1-2 business days
              </span>
            </li>
            <li className="next-step-item">
              <span className="step-number">3</span>
              <span className="step-text">
                We'll discuss how Purely Works can help automate your processes
              </span>
            </li>
          </ul>
        </div>

        <div className="cta-section">
          <p className="cta-text">
            In the meantime, feel free to explore our work or schedule a quick call:
          </p>
          <div className="cta-buttons">
            <a
              href="#projects"
              className="btn btn-secondary"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Our Work
            </a>
            <a
              href="https://calendly.com/purelyworks"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
