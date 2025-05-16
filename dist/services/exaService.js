"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExaService = void 0;
const exa_js_1 = require("exa-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Service for interacting with the EXA API for research
 */
class ExaService {
    constructor() {
        const apiKey = process.env.EXA_API_KEY;
        if (!apiKey) {
            throw new Error('EXA_API_KEY is required in the .env file');
        }
        this.client = new exa_js_1.Exa(apiKey);
    }
    /**
     * Conducts comprehensive research on a company using EXA
     * @param input Company information for research
     * @returns Research results as string
     */
    async conductCompanyResearch(input) {
        try {
            // Extract inputs
            const { companyName, website, linkedInUrl } = input;
            // Combine inputs for more focused search
            let companyIdentifier = companyName;
            if (website) {
                companyIdentifier += ` site:${website}`;
            }
            // Run multiple search queries to gather comprehensive data
            const [companyOverview, leadershipTeam, recentNews, marketPosition, globalPresence, challenges] = await Promise.all([
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
        }
        catch (error) {
            console.error('Error conducting EXA research:', error);
            throw new Error(`Failed to conduct company research: ${error.message}`);
        }
    }
    /**
     * Search for company overview information
     */
    async searchCompanyOverview(companyName, website) {
        const query = website
            ? `"${companyName}" overview company information site:${website} OR site:linkedin.com OR site:crunchbase.com`
            : `"${companyName}" overview company information site:linkedin.com OR site:crunchbase.com`;
        const results = await this.client.search(query, { numResults: 3, });
        return this.formatSearchResults(results);
    }
    /**
     * Search for company leadership information
     */
    async searchLeadershipTeam(companyName) {
        const query = `"${companyName}" leadership team executive management site:linkedin.com OR site:crunchbase.com`;
        const results = await this.client.search(query, { numResults: 3, });
        return this.formatSearchResults(results);
    }
    /**
     * Search for recent news about the company
     */
    async searchRecentNews(companyName) {
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
    async searchMarketPosition(companyName) {
        const query = `"${companyName}" market position industry competition analysis`;
        const results = await this.client.search(query, { numResults: 3, });
        return this.formatSearchResults(results);
    }
    /**
     * Search for global presence information
     */
    async searchGlobalPresence(companyName) {
        const query = `"${companyName}" global presence international expansion offices locations`;
        const results = await this.client.search(query, { numResults: 3, });
        return this.formatSearchResults(results);
    }
    /**
     * Search for company challenges and pain points
     */
    async searchCompanyChallenges(companyName) {
        const query = `"${companyName}" challenges problems issues pain points business`;
        const results = await this.client.search(query, { numResults: 3, });
        return this.formatSearchResults(results);
    }
    /**
     * Format search results into readable text
     */
    formatSearchResults(results) {
        if (!results || !results.results || results.results.length === 0) {
            return "No information found.";
        }
        return results.results.map((result, index) => {
            const title = result.title || 'Untitled';
            const url = result.url || '';
            const text = result.text || result.highlight || '';
            return `### Source ${index + 1}: ${title}\n${url}\n${text}\n`;
        }).join('\n');
    }
    /**
     * Get ISO date string for X months ago
     */
    getDateMonthsAgo(months) {
        const date = new Date();
        date.setMonth(date.getMonth() - months);
        return date.toISOString().split('T')[0];
    }
}
exports.ExaService = ExaService;
//# sourceMappingURL=exaService.js.map