import { Exa } from 'exa-js';
import dotenv from 'dotenv';
import { ResearchInput } from '../types';

dotenv.config();

/**
 * Service for interacting with the EXA API for research
 */
export class ExaService {
  private client: Exa;

  constructor() {
    const apiKey = process.env.EXA_API_KEY;
    if (!apiKey) {
      throw new Error('EXA_API_KEY is required in the .env file');
    }
    this.client = new Exa(apiKey);
  }

  /**
   * Conducts comprehensive research on a company using EXA
   * @param input Company information for research
   * @returns Research results as string
   */
  async conductCompanyResearch(input: ResearchInput): Promise<string> {
    try {
      // Extract inputs
      const { companyName, website, linkedInUrl } = input;
      
      // Combine inputs for more focused search
      let companyIdentifier = companyName;
      if (website) {
        companyIdentifier += ` site:${website}`;
      }
      
      // Run multiple search queries to gather comprehensive data
      const [
        companyOverview,
        leadershipTeam,
        recentNews,
        marketPosition,
        globalPresence,
        challenges
      ] = await Promise.all([
        this.searchCompanyOverview(companyName, website),
        this.searchLeadershipTeam(companyName),
        this.searchRecentNews(companyName),
        this.searchMarketPosition(companyName),
        this.searchGlobalPresence(companyName),
        this.searchCompanyChallenges(companyName)
      ]);
      
      // Combine all research into a structured format
      const combinedResearch = `
# EXA RESEARCH RESULTS: ${companyName.toUpperCase()}

## COMPANY OVERVIEW
${companyOverview}

## LEADERSHIP TEAM
${leadershipTeam}

## RECENT NEWS
${recentNews}

## MARKET POSITION
${marketPosition}

## GLOBAL PRESENCE
${globalPresence}

## CHALLENGES AND PAIN POINTS
${challenges}

## ADDITIONAL SEARCH METADATA
- Company Name: ${companyName}
${website ? `- Website: ${website}` : ''}
${linkedInUrl ? `- LinkedIn: ${linkedInUrl}` : ''}
- Research Date: ${new Date().toISOString().split('T')[0]}
`;

      return combinedResearch;
    } catch (error) {
      console.error('Error conducting EXA research:', error);
      throw new Error(`Failed to conduct company research: ${(error as Error).message}`);
    }
  }

  /**
   * Search for company overview information
   */
  private async searchCompanyOverview(companyName: string, website?: string): Promise<string> {
    const query = website 
      ? `"${companyName}" overview company information site:${website} OR site:linkedin.com OR site:crunchbase.com`
      : `"${companyName}" overview company information site:linkedin.com OR site:crunchbase.com`;
    
    const results = await this.client.search(query, { numResults: 3, });
    return this.formatSearchResults(results);
  }

  /**
   * Search for company leadership information
   */
  private async searchLeadershipTeam(companyName: string): Promise<string> {
    const query = `"${companyName}" leadership team executive management site:linkedin.com OR site:crunchbase.com`;
    const results = await this.client.search(query, { numResults: 3, });
    return this.formatSearchResults(results);
  }

  /**
   * Search for recent news about the company
   */
  private async searchRecentNews(companyName: string): Promise<string> {
    const query = `"${companyName}" news recent developments press release -stock`;
    const results = await this.client.search(query, { 
      numResults: 5, 
      useAutoprompt: true,
      startPublishedDate: this.getDateMonthsAgo(6)
    });
    return this.formatSearchResults(results);
  }

  /**
   * Search for market position information
   */
  private async searchMarketPosition(companyName: string): Promise<string> {
    const query = `"${companyName}" market position industry competition analysis`;
    const results = await this.client.search(query, { numResults: 3, });
    return this.formatSearchResults(results);
  }

  /**
   * Search for global presence information
   */
  private async searchGlobalPresence(companyName: string): Promise<string> {
    const query = `"${companyName}" global presence international expansion offices locations`;
    const results = await this.client.search(query, { numResults: 3,  });
    return this.formatSearchResults(results);
  }

  /**
   * Search for company challenges and pain points
   */
  private async searchCompanyChallenges(companyName: string): Promise<string> {
    const query = `"${companyName}" challenges problems issues pain points business`;
    const results = await this.client.search(query, { numResults: 3,  });
    return this.formatSearchResults(results);
  }

  /**
   * Format search results into readable text
   */
  private formatSearchResults(results: any): string {
    if (!results || !results.results || results.results.length === 0) {
      return "No information found.";
    }
    
    return results.results.map((result: any, index: number) => {
      const title = result.title || 'Untitled';
      const url = result.url || '';
      const text = result.text || result.highlight || '';
      
      return `### Source ${index + 1}: ${title}\n${url}\n${text}\n`;
    }).join('\n');
  }

  /**
   * Get ISO date string for X months ago
   */
  private getDateMonthsAgo(months: number): string {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date.toISOString().split('T')[0];
  }
}