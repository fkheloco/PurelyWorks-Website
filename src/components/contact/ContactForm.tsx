/**
 * Contact Form - Main Orchestrator
 * Manages the 3-step contact form flow with HubSpot integration
 */

import { useState } from 'react';
import './ContactForm.css';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { ProgressIndicator } from './ProgressIndicator';
import {
  createContact,
  updateContactWithDetails,
  attachEnrichmentReport,
  type ContactData,
} from '../../lib/hubspot/contact-service';
import {
  createOrUpdateCompany,
  associateContactWithCompany,
  attachCompanyEnrichment,
  type CompanyData,
} from '../../lib/hubspot/company-service';
import { enrichCompanyData } from '../../lib/hubspot/enrichment-service';

interface FormData {
  // Step 1
  email: string;
  contactId?: string;

  // Step 2
  fullName: string;
  companyName: string;
  companyDomain: string;
  companyId?: string;

  // Meta
  currentStep: 1 | 2 | 3;
  isLoading: boolean;
  error?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    fullName: '',
    companyName: '',
    companyDomain: '',
    currentStep: 1,
    isLoading: false,
  });

  /**
   * Handle Step 1: Email submission
   * Creates contact in HubSpot and moves to Step 2
   */
  const handleStepOne = async (email: string) => {
    setFormData((prev) => ({ ...prev, isLoading: true, error: undefined }));

    try {
      // Create contact in HubSpot
      const contactId = await createContact(email);

      // Move to Step 2
      setFormData((prev) => ({
        ...prev,
        email,
        contactId,
        currentStep: 2,
        isLoading: false,
      }));
    } catch (error: any) {
      setFormData((prev) => ({
        ...prev,
        error: error.message || 'Something went wrong. Please try again.',
        isLoading: false,
      }));
    }
  };

  /**
   * Handle Step 2: Business details submission
   * Updates contact, creates/updates company, associates them, and runs AI enrichment
   */
  const handleStepTwo = async (data: {
    fullName: string;
    companyName: string;
    companyDomain: string;
  }) => {
    if (!formData.contactId) {
      setFormData((prev) => ({
        ...prev,
        error: 'Contact ID not found. Please start over.',
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, isLoading: true, error: undefined }));

    try {
      // 1. Update contact with name and company details
      const contactData: ContactData = {
        email: formData.email,
        firstname: data.fullName,
        company: data.companyName,
        company_domain: data.companyDomain,
      };

      await updateContactWithDetails(formData.contactId, contactData);

      // 2. Create or update company
      const companyData: CompanyData = {
        name: data.companyName,
        domain: data.companyDomain,
      };

      const companyId = await createOrUpdateCompany(companyData);

      // 3. Associate contact with company
      await associateContactWithCompany(formData.contactId, companyId);

      // 4. Run AI enrichment in background (don't block user)
      enrichCompanyData(
        data.companyName,
        data.companyDomain,
        data.fullName,
        formData.email
      )
        .then(async (report) => {
          // Save enrichment to HubSpot
          await attachEnrichmentReport(formData.contactId!, report);
          await attachCompanyEnrichment(companyId, report);
          console.log('✅ Enrichment completed and saved to HubSpot');
        })
        .catch((error) => {
          console.error('⚠️ Enrichment failed but user flow continues:', error);
        });

      // 5. Move to Step 3 (don't wait for enrichment)
      setFormData((prev) => ({
        ...prev,
        fullName: data.fullName,
        companyName: data.companyName,
        companyDomain: data.companyDomain,
        companyId,
        currentStep: 3,
        isLoading: false,
      }));
    } catch (error: any) {
      setFormData((prev) => ({
        ...prev,
        error: error.message || 'Something went wrong. Please try again.',
        isLoading: false,
      }));
    }
  };

  /**
   * Handle going back to previous step
   */
  const handleBack = () => {
    setFormData((prev) => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1) as 1 | 2 | 3,
      error: undefined,
    }));
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-wrapper">
        <ProgressIndicator currentStep={formData.currentStep} />

        {formData.currentStep === 1 && (
          <StepOne
            onNext={handleStepOne}
            isLoading={formData.isLoading}
            error={formData.error}
            initialEmail={formData.email}
          />
        )}

        {formData.currentStep === 2 && (
          <StepTwo
            email={formData.email}
            contactId={formData.contactId!}
            onNext={handleStepTwo}
            onBack={handleBack}
            isLoading={formData.isLoading}
            error={formData.error}
            initialData={{
              fullName: formData.fullName,
              companyName: formData.companyName,
              companyDomain: formData.companyDomain,
            }}
          />
        )}

        {formData.currentStep === 3 && (
          <StepThree contactName={formData.fullName.split(' ')[0] || 'there'} />
        )}
      </div>
    </div>
  );
}
