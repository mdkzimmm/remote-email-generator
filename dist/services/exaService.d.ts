import { ResearchInput } from '../types';
/**
 * Service for interacting with the EXA API for research
 */
export declare class ExaService {
    private client;
    constructor();
    /**
     * Conducts comprehensive research on a company using EXA
     * @param input Company information for research
     * @returns Research results as string
     */
    conductCompanyResearch(input: ResearchInput): Promise<string>;
    /**
     * Search for company overview information
     */
    private searchCompanyOverview;
    /**
     * Search for company leadership information
     */
    private searchLeadershipTeam;
    /**
     * Search for recent news about the company
     */
    private searchRecentNews;
    /**
     * Search for market position information
     */
    private searchMarketPosition;
    /**
     * Search for global presence information
     */
    private searchGlobalPresence;
    /**
     * Search for company challenges and pain points
     */
    private searchCompanyChallenges;
    /**
     * Format search results into readable text
     */
    private formatSearchResults;
    /**
     * Get ISO date string for X months ago
     */
    private getDateMonthsAgo;
}
