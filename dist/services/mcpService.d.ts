import { AccountBrief } from "../types";
/**
 * Service for handling Claude MCP interactions
 */
export declare class McpService {
    private server;
    private exaService;
    constructor();
    /**
     * Register all tools with the MCP server
     */
    private registerTools;
    /**
     * Start the MCP server with specified transport
     */
    start(): Promise<void>;
    /**
     * Parse a text account brief into structured data
     * @param briefText Raw account brief text
     * @returns Structured account brief
     */
    parseAccountBrief(briefText: string): AccountBrief;
    /**
     * Parse stakeholders section into structured data
     */
    private parseStakeholders;
    /**
     * Parse contacts section into structured data
     */
    private parseContacts;
}
