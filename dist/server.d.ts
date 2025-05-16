/**
 * Web server for Remote.com Email Generator
 */
export declare class RemoteEmailGeneratorServer {
    private app;
    private exaService;
    private mcpService;
    private emailGeneratorService;
    private csvExportService;
    constructor();
    /**
     * Configure Express middleware
     */
    private configureMiddleware;
    /**
     * Set up API routes
     */
    private setupRoutes;
    /**
     * Start the server
     */
    start(): void;
    /**
     * Generate a sample brief for demo purposes
     * In a real implementation, this would be handled by Claude MCP
     */
    private generateSampleBrief;
}
