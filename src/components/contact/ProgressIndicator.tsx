/**
 * Progress Indicator
 * Visual tracker showing current step in the contact form
 */

interface ProgressIndicatorProps {
  currentStep: 1 | 2 | 3;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { number: 1, label: 'Email' },
    { number: 2, label: 'Details' },
    { number: 3, label: 'Done' },
  ];

  return (
    <div className="progress-indicator">
      <div className="progress-steps">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div key={step.number} className="progress-step-wrapper">
              <div
                className={`progress-step ${
                  isCompleted
                    ? 'progress-step-completed'
                    : isCurrent
                      ? 'progress-step-current'
                      : 'progress-step-upcoming'
                }`}
              >
                <div className="progress-step-circle">
                  {isCompleted ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 4L6 11L3 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span className="progress-step-number">{step.number}</span>
                  )}
                </div>
                <div className="progress-step-label">{step.label}</div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`progress-connector ${
                    isCompleted ? 'progress-connector-completed' : ''
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
