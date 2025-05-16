/**
 * Command Line Interface for Remote.com Email Generator
 */
export declare class RemoteEmailGeneratorCLI {
    private rl;
    private exaService;
    private mcpService;
    private emailGeneratorService;
    private csvExportService;
    constructor();
    /**
     * Start the CLI application
     */
    start(): Promise<void>;
    /**
     * Display welcome message
     */
    private displayWelcomeMessage;
    /**
     * Display main menu and handle user input
     */
    private displayMainMenu;
    /**
     * Handle the full workflow from research to email generation
     */
    private handleFullWorkflow;
    /**
     * Handle company research
     */
    private handleCompanyResearch;
    /**
     * Handle parsing an existing account brief
     */
    private handleParseAccountBrief;
    /**
     * Handle generating emails from an existing brief
     */
    private handleGenerateEmails;
    /**
     * Exit the application
     */
    private exitApplication;
    /**
     * Prompt the user for input
     */
    private prompt;
    /**
     * Generate a sample brief for demo purposes
     * In a real implementation, this would be handled by Claude MCP
     */
    private generateSampleBrief;
}
