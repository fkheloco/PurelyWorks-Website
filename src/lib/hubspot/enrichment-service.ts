/**
 * AI Enrichment Service
 * Uses Claude AI to analyze company fit for Purely Works services
 */

import Anthropic from '@anthropic-ai/sdk';
import type { EnrichmentReport } from './contact-service';

let anthropicClient: Anthropic | null = null;

/**
 * Get or initialize Anthropic client
 */
function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error(
        'Anthropic API key not found. Please set VITE_ANTHROPIC_API_KEY in your .env file.'
      );
    }

    anthropicClient = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true, // Note: In production, this should be done server-side
    });
  }

  return anthropicClient;
}

/**
 * Check if AI enrichment is configured
 */
export function isEnrichmentConfigured(): boolean {
  return !!import.meta.env.VITE_ANTHROPIC_API_KEY;
}

/**
 * Analyze company fit using Claude AI
 * Returns a detailed enrichment report with fit score and recommendations
 */
export async function enrichCompanyData(
  companyName: string,
  companyDomain: string,
  contactName: string,
  email: string
): Promise<EnrichmentReport> {
  try {
    const client = getAnthropicClient();

    const prompt = `
You are analyzing a potential customer for Purely Works, an AI consulting and automation company.

Company Information:
- Name: ${companyName}
- Domain: ${companyDomain}
- Contact: ${contactName} (${email})

Purely Works Services:
1. AI-powered process automation
2. Custom CRM and software development
3. Offshore development teams (Pakistan + US expertise)
4. AI consulting and strategy
5. Fractional team support

Ideal Customer Profile:
- Startups and SMEs
- Construction management firms
- Companies with 10-500 employees
- Budget range: $5K-50K per project
- Looking to automate repetitive tasks
- Need custom software or AI integration

Analyze this company and provide a structured assessment.

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks, just raw JSON):
{
  "fitScore": <number 1-10>,
  "serviceRecommendations": ["service1", "service2"],
  "keyOpportunities": ["opportunity1", "opportunity2"],
  "concerns": ["concern1"],
  "engagementApproach": "suggested approach",
  "summary": "2-3 sentence summary"
}
`.trim();

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract JSON from response
    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse JSON (handle code blocks if present)
    let jsonText = responseText.trim();

    // Remove markdown code blocks if present
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    }

    // Find JSON object in response
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in AI response');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    const report: EnrichmentReport = {
      fitScore: analysis.fitScore || 5,
      serviceRecommendations: analysis.serviceRecommendations || [],
      keyOpportunities: analysis.keyOpportunities || [],
      concerns: analysis.concerns || [],
      engagementApproach: analysis.engagementApproach || 'Standard outreach',
      summary: analysis.summary || 'Analysis completed',
      generatedAt: new Date().toISOString(),
    };

    console.log('✅ AI enrichment completed:', report);
    return report;
  } catch (error) {
    console.error('❌ Error enriching company data:', error);

    // Return default report on failure
    return {
      fitScore: 5,
      serviceRecommendations: ['Manual review needed'],
      keyOpportunities: ['Follow up for detailed discovery'],
      concerns: ['Automated analysis unavailable'],
      engagementApproach: 'Standard outreach process',
      summary: 'Automated enrichment failed. Manual review recommended.',
      generatedAt: new Date().toISOString(),
    };
  }
}
