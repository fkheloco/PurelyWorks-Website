/**
 * HubSpot Contact Service
 * Handles all contact-related operations
 */

import { getHubSpotClient } from './hubspot-client';

export interface ContactData {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  company_domain?: string;
}

export interface EnrichmentReport {
  fitScore: number;
  serviceRecommendations: string[];
  keyOpportunities: string[];
  concerns: string[];
  engagementApproach: string;
  summary: string;
  generatedAt: string;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Create a new contact in HubSpot
 * If contact exists, returns existing contact ID
 */
export async function createContact(email: string): Promise<string> {
  const client = getHubSpotClient();

  try {
    const response = await client.crm.contacts.basicApi.create({
      properties: {
        email,
        contact_form_source: 'Website Contact Form',
      },
    });

    console.log('✅ Contact created:', response.id);
    return response.id;
  } catch (error: any) {
    // Handle duplicate contact (409 Conflict)
    if (error.code === 409 || error.statusCode === 409) {
      console.log('Contact already exists, fetching existing contact...');

      try {
        const searchResponse = await client.crm.contacts.searchApi.doSearch({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ' as any,
                  value: email,
                },
              ],
            },
          ],
          limit: 1,
        });

        if (searchResponse.results && searchResponse.results.length > 0) {
          console.log('✅ Existing contact found:', searchResponse.results[0].id);
          return searchResponse.results[0].id;
        }
      } catch (searchError) {
        console.error('❌ Error searching for existing contact:', searchError);
      }
    }

    console.error('❌ Error creating contact:', error);
    throw new Error('Failed to create contact. Please try again.');
  }
}

/**
 * Update contact with business details
 * Splits full name into first and last name
 */
export async function updateContactWithDetails(
  contactId: string,
  data: ContactData
): Promise<void> {
  const client = getHubSpotClient();

  try {
    // Split full name into first and last
    const nameParts = (data.firstname || '').trim().split(' ');
    const firstname = nameParts[0] || '';
    const lastname = nameParts.slice(1).join(' ') || undefined;

    const properties: any = {
      firstname,
      company: data.company,
      company_domain: data.company_domain,
    };

    // Only add lastname if it exists
    if (lastname) {
      properties.lastname = lastname;
    }

    await client.crm.contacts.basicApi.update(contactId, {
      properties,
    });

    console.log('✅ Contact updated:', contactId);
  } catch (error) {
    console.error('❌ Error updating contact:', error);
    throw new Error('Failed to update contact details. Please try again.');
  }
}

/**
 * Attach AI enrichment report to contact
 * Updates contact properties and creates a note
 */
export async function attachEnrichmentReport(
  contactId: string,
  report: EnrichmentReport
): Promise<void> {
  const client = getHubSpotClient();

  try {
    // Update contact properties
    await client.crm.contacts.basicApi.update(contactId, {
      properties: {
        ai_fit_score: report.fitScore.toString(),
        ai_enrichment_report: JSON.stringify(report, null, 2),
        enrichment_date: new Date().toISOString().split('T')[0],
      },
    });

    // Create a note with enrichment details
    const noteBody = `
AI Enrichment Report - ${new Date().toLocaleDateString()}

Fit Score: ${report.fitScore}/10

Service Recommendations:
${report.serviceRecommendations.map((s) => `• ${s}`).join('\n')}

Key Opportunities:
${report.keyOpportunities.map((o) => `• ${o}`).join('\n')}

Concerns:
${report.concerns.length > 0 ? report.concerns.map((c) => `• ${c}`).join('\n') : '• None identified'}

Engagement Approach:
${report.engagementApproach}

Summary:
${report.summary}
    `.trim();

    await client.crm.objects.notes.basicApi.create({
      properties: {
        hs_note_body: noteBody,
        hs_timestamp: new Date().toISOString(),
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED' as any,
              associationTypeId: 202, // Note to Contact association
            },
          ],
        },
      ],
    });

    console.log('✅ Enrichment report attached to contact:', contactId);
  } catch (error) {
    console.error('❌ Error attaching enrichment report:', error);
    // Don't throw - enrichment failure shouldn't block user progress
  }
}
