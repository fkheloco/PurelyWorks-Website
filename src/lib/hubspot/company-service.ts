/**
 * HubSpot Company Service
 * Handles all company-related operations
 */

import { getHubSpotClient } from './hubspot-client';
import type { EnrichmentReport } from './contact-service';

export interface CompanyData {
  name: string;
  domain: string;
}

/**
 * Create or update a company in HubSpot
 * Searches for existing company by domain first
 */
export async function createOrUpdateCompany(data: CompanyData): Promise<string> {
  const client = getHubSpotClient();

  try {
    // First, try to find existing company by domain
    const searchResponse = await client.crm.companies.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'domain',
              operator: 'EQ' as any,
              value: data.domain,
            },
          ],
        },
      ],
      limit: 1,
    });

    // If company exists, update and return ID
    if (searchResponse.results && searchResponse.results.length > 0) {
      const companyId = searchResponse.results[0].id;
      console.log('✅ Existing company found:', companyId);

      // Update company name in case it changed
      await client.crm.companies.basicApi.update(companyId, {
        properties: {
          name: data.name,
          domain: data.domain,
        },
      });

      console.log('✅ Company updated:', companyId);
      return companyId;
    }

    // Company doesn't exist, create new one
    const response = await client.crm.companies.basicApi.create({
      properties: {
        name: data.name,
        domain: data.domain,
      },
    });

    console.log('✅ Company created:', response.id);
    return response.id;
  } catch (error) {
    console.error('❌ Error creating/updating company:', error);
    throw new Error('Failed to create or update company. Please try again.');
  }
}

/**
 * Associate a contact with a company
 */
export async function associateContactWithCompany(
  contactId: string,
  companyId: string
): Promise<void> {
  const client = getHubSpotClient();

  try {
    // Use the batch associations API
    await (client.crm.contacts as any).associationsApi.create(
      contactId,
      'companies',
      companyId,
      [
        {
          associationCategory: 'HUBSPOT_DEFINED' as any,
          associationTypeId: 1, // Contact to Company association
        },
      ]
    );

    console.log('✅ Contact associated with company:', { contactId, companyId });
  } catch (error: any) {
    // If association already exists, don't throw error
    if (error.statusCode === 409 || error.code === 409) {
      console.log('ℹ️ Contact already associated with company');
      return;
    }

    console.error('❌ Error associating contact with company:', error);
    // Don't throw - association failure shouldn't block user progress
    console.log('⚠️ Continuing without association');
  }
}

/**
 * Attach AI enrichment report to company
 * Updates company properties and creates a note
 */
export async function attachCompanyEnrichment(
  companyId: string,
  report: EnrichmentReport
): Promise<void> {
  const client = getHubSpotClient();

  try {
    // Update company properties
    await client.crm.companies.basicApi.update(companyId, {
      properties: {
        ai_fit_score: report.fitScore.toString(),
        ai_fit_report: JSON.stringify(report, null, 2),
        enrichment_date: new Date().toISOString().split('T')[0],
        key_opportunities: report.keyOpportunities.join('\n'),
        engagement_approach: report.engagementApproach,
      },
    });

    // Create a note with enrichment details attached to company
    const noteBody = `
AI Company Enrichment Report - ${new Date().toLocaleDateString()}

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
          to: { id: companyId },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED' as any,
              associationTypeId: 190, // Note to Company association
            },
          ],
        },
      ],
    });

    console.log('✅ Enrichment report attached to company:', companyId);
  } catch (error) {
    console.error('❌ Error attaching company enrichment:', error);
    // Don't throw - enrichment failure shouldn't block user progress
  }
}
