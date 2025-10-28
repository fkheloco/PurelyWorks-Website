/**
 * HubSpot API Client
 * Core wrapper for HubSpot API operations
 */

import { Client } from '@hubspot/api-client';

let hubspotClient: Client | null = null;

/**
 * Initialize and return the HubSpot client
 * Singleton pattern to reuse the same client instance
 */
export function getHubSpotClient(): Client {
  if (!hubspotClient) {
    const accessToken = import.meta.env.VITE_HUBSPOT_ACCESS_TOKEN;

    if (!accessToken) {
      throw new Error(
        'HubSpot access token not found. Please set VITE_HUBSPOT_ACCESS_TOKEN in your .env file.'
      );
    }

    hubspotClient = new Client({ accessToken });
  }

  return hubspotClient;
}

/**
 * Check if HubSpot client is configured
 */
export function isHubSpotConfigured(): boolean {
  return !!import.meta.env.VITE_HUBSPOT_ACCESS_TOKEN;
}
