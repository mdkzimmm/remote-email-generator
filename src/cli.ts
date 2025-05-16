import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { ExaService, McpService, EmailGeneratorService, CsvExportService } from './services';
import { AccountBrief, EmailGenerationOptions, ResearchInput } from './types';
import { config } from './config';

/**
 * Command Line Interface for Remote.com Email Generator
 */
export class RemoteEmailGeneratorCLI {
  private rl: readline.Interface;
  private exaService: ExaService;
  private mcpService: McpService;
  private emailGeneratorService: EmailGeneratorService;
  private csvExportService: CsvExportService;
  
  constructor() {
    // Initialize readline interface
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // Initialize services
    this.exaService = new ExaService();
    this.mcpService = new McpService();
    this.emailGeneratorService = new EmailGeneratorService();
    this.csvExportService = new CsvExportService();
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir, { recursive: true });
    }
  }
  
  /**
   * Start the CLI application
   */
  async start(): Promise<void> {
    this.displayWelcomeMessage();
    await this.displayMainMenu();
  }
  
  /**
   * Display welcome message
   */
  private displayWelcomeMessage(): void {
    console.log('\n====================================================');
    console.log('  REMOTE.COM EMAIL GENERATOR');
    console.log('  Personalized Outreach Automation');
    console.log('====================================================\n');
    console.log('This tool helps you generate personalized email sequences');
    console.log('for Remote.com outreach based on account research.\n');
  }
  
  /**
   * Display main menu and handle user input
   */
  private async displayMainMenu(): Promise<void> {
    console.log('\nMAIN MENU:');
    console.log('1. Generate Email Sequences (Full Workflow)');
    console.log('2. Research a Company');
    console.log('3. Parse an Existing Account Brief');
    console.log('4. Generate Emails from Existing Brief');
    console.log('5. Exit');
    
    const answer = await this.prompt('Select an option (1-5): ');
    
    switch (answer) {
      case '1':
        await this.handleFullWorkflow();
        break;
      case '2':
        await this.handleCompanyResearch();
        break;
      case '3':
        await this.handleParseAccountBrief();
        break;
      case '4':
        await this.handleGenerateEmails();
        break;
      case '5':
        this.exitApplication();
        break;
      default:
        console.log('Invalid option. Please try again.');
        await this.displayMainMenu();
    }
  }
  
  /**
   * Handle the full workflow from research to email generation
   */
  private async handleFullWorkflow(): Promise<void> {
    try {
      // Get company information
      const companyName = await this.prompt('Enter company name: ');
      const website = await this.prompt('Enter company website (optional): ');
      const linkedInUrl = await this.prompt('Enter LinkedIn URL (optional): ');
      
      console.log('\nConducting research using EXA...');
      
      // Conduct research
      const researchInput: ResearchInput = {
        companyName,
        website: website || undefined,
        linkedInUrl: linkedInUrl || undefined
      };
      
      const research = await this.exaService.conductCompanyResearch(researchInput);
      
      console.log('Research complete!\n');
      console.log('Generating account intelligence brief using Claude MCP...');
      
      // Save research to file
      const researchFileName = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_research.md`;
      const researchFilePath = path.join(config.outputDir, researchFileName);
      fs.writeFileSync(researchFilePath, research);
      
      console.log(`Research saved to ${researchFilePath}`);
      
      // Simulate brief generation (in a real implementation, this would use Claude MCP)
      // For demo purposes, we'll create a simplified brief
      const briefText = this.generateSampleBrief(companyName, research);
      
      // Save brief to file
      const briefFileName = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_brief.md`;
      const briefFilePath = path.join(config.outputDir, briefFileName);
      fs.writeFileSync(briefFilePath, briefText);
      
      console.log(`Account brief generated and saved to ${briefFilePath}\n`);
      
      // Parse brief
      const accountBrief = this.mcpService.parseAccountBrief(briefText);
      
      // Generate email sequences
      console.log('Generating personalized email sequences...');
      
      const emailOptions: EmailGenerationOptions = {
        includeSubjects: true,
        maxEmailsPerContact: 5,
        personalize: true
      };
      
      const emailSequences = this.emailGeneratorService.generateEmailSequences(accountBrief, emailOptions);
      
      // Export to CSV
      const csvPath = await this.csvExportService.exportToCSV(emailSequences, companyName);
      
      console.log(`Email sequences generated successfully!`);
      console.log(`Exported to CSV: ${csvPath}\n`);
      
      // Return to main menu
      await this.displayMainMenu();
    } catch (error) {
      console.error('Error in workflow:', error);
      console.log(`An error occurred: ${(error as Error).message}`);
      await this.displayMainMenu();
    }
  }
  
  /**
   * Handle company research
   */
  private async handleCompanyResearch(): Promise<void> {
    try {
      // Get company information
      const companyName = await this.prompt('Enter company name: ');
      const website = await this.prompt('Enter company website (optional): ');
      const linkedInUrl = await this.prompt('Enter LinkedIn URL (optional): ');
      
      console.log('\nConducting research using EXA...');
      
      // Conduct research
      const researchInput: ResearchInput = {
        companyName,
        website: website || undefined,
        linkedInUrl: linkedInUrl || undefined
      };
      
      const research = await this.exaService.conductCompanyResearch(researchInput);
      
      // Save research to file
      const researchFileName = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_research.md`;
      const researchFilePath = path.join(config.outputDir, researchFileName);
      fs.writeFileSync(researchFilePath, research);
      
      console.log(`Research complete! Saved to ${researchFilePath}\n`);
      
      // Return to main menu
      await this.displayMainMenu();
    } catch (error) {
      console.error('Error in research:', error);
      console.log(`An error occurred: ${(error as Error).message}`);
      await this.displayMainMenu();
    }
  }
  
  /**
   * Handle parsing an existing account brief
   */
  private async handleParseAccountBrief(): Promise<void> {
    try {
      // Get brief file path
      const briefPath = await this.prompt('Enter path to account brief file: ');
      
      if (!fs.existsSync(briefPath)) {
        console.log('File not found. Please check the path and try again.');
        await this.handleParseAccountBrief();
        return;
      }
      
      // Read brief file
      const briefText = fs.readFileSync(briefPath, 'utf-8');
      
      // Parse brief
      const accountBrief = this.mcpService.parseAccountBrief(briefText);
      
      // Display parsed data
      console.log('\nParsed Account Brief:');
      console.log(`Company: ${accountBrief.companyName}`);
      console.log(`Contacts: ${accountBrief.priorityContacts.length}`);
      console.log(`Pain Points: ${accountBrief.painPoints.length}`);
      
      // Save parsed brief as JSON
      const jsonFileName = path.basename(briefPath, path.extname(briefPath)) + '.json';
      const jsonFilePath = path.join(config.outputDir, jsonFileName);
      fs.writeFileSync(jsonFilePath, JSON.stringify(accountBrief, null, 2));
      
      console.log(`\nParsed brief saved to ${jsonFilePath}\n`);
      
      // Return to main menu
      await this.displayMainMenu();
    } catch (error) {
      console.error('Error parsing brief:', error);
      console.log(`An error occurred: ${(error as Error).message}`);
      await this.displayMainMenu();
    }
  }
  
  /**
   * Handle generating emails from an existing brief
   */
  private async handleGenerateEmails(): Promise<void> {
    try {
      // Get brief file path
      const briefPath = await this.prompt('Enter path to account brief file: ');
      
      if (!fs.existsSync(briefPath)) {
        console.log('File not found. Please check the path and try again.');
        await this.handleGenerateEmails();
        return;
      }
      
      // Read brief file
      const briefText = fs.readFileSync(briefPath, 'utf-8');
      
      // Parse brief
      const accountBrief = this.mcpService.parseAccountBrief(briefText);
      
      // Configure email options
      const includeSubjectsAnswer = await this.prompt('Include subject lines? (y/n): ');
      const maxEmailsAnswer = await this.prompt('Maximum emails per contact (1-5): ');
      const personalizeAnswer = await this.prompt('Personalize emails? (y/n): ');
      
      const emailOptions: EmailGenerationOptions = {
        includeSubjects: includeSubjectsAnswer.toLowerCase() === 'y',
        maxEmailsPerContact: parseInt(maxEmailsAnswer, 10) || 5,
        personalize: personalizeAnswer.toLowerCase() === 'y'
      };
      
      // Generate email sequences
      console.log('\nGenerating personalized email sequences...');
      const emailSequences = this.emailGeneratorService.generateEmailSequences(accountBrief, emailOptions);
      
      // Export to CSV
      const csvPath = await this.csvExportService.exportToCSV(emailSequences, accountBrief.companyName);
      
      console.log(`Email sequences generated successfully!`);
      console.log(`Exported to CSV: ${csvPath}\n`);
      
      // Return to main menu
      await this.displayMainMenu();
    } catch (error) {
      console.error('Error generating emails:', error);
      console.log(`An error occurred: ${(error as Error).message}`);
      await this.displayMainMenu();
    }
  }
  
  /**
   * Exit the application
   */
  private exitApplication(): void {
    console.log('\nThank you for using Remote.com Email Generator!\n');
    this.rl.close();
    process.exit(0);
  }
  
  /**
   * Prompt the user for input
   */
  private prompt(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }
  
  /**
   * Generate a sample brief for demo purposes
   * In a real implementation, this would be handled by Claude MCP
   */
  private generateSampleBrief(companyName: string, research: string): string {
    return `# ACCOUNT INTELLIGENCE BRIEF

## COMPANY NAME
${companyName}

## ACCOUNT SNAPSHOT
${companyName} is a rapidly growing technology company that specializes in cloud-based solutions for enterprise customers. With approximately 500 employees and offices across North America and Europe, they are currently focused on expanding their presence in Asia and South America. The company has seen 35% year-over-year growth and is considering remote-first hiring policies to accelerate their global expansion.

## KEY STAKEHOLDERS
- Sarah Johnson, Chief People Officer (https://www.linkedin.com/in/sarahjohnson)
- Michael Chen, VP of Talent Acquisition (https://www.linkedin.com/in/michaelchen)
- David Rodriguez, CFO (https://www.linkedin.com/in/davidrodriguez)
- Amanda Kim, COO (https://www.linkedin.com/in/amandakim)
- Robert Patel, CEO (https://www.linkedin.com/in/robertpatel)

## GLOBAL FOOTPRINT & EXPANSION
Headquarters in San Francisco with offices in New York, London, and Berlin. Currently exploring expansion into Singapore, Tokyo, São Paulo, and Mexico City. Considering a remote-first approach to accelerate growth without establishing physical offices in each location.

## PAIN POINTS & CHALLENGES
- Managing compliance across multiple international jurisdictions
- Navigating complex local employment laws in target markets
- Inefficient contractor conversion process
- Inconsistent onboarding experience for international employees
- Lack of local HR expertise in expansion regions

## TRIGGER EVENTS
- Recently announced plans to double headcount within 18 months
- Opened a small satellite office in Singapore as APAC headquarters
- Hired a new Global VP of People last quarter
- Experienced compliance issues with contractors in Brazil

## PRIORITY CONTACTS
- Sarah Johnson, Chief People Officer [HR]
- Michael Chen, VP of Talent Acquisition [TALENT]
- David Rodriguez, CFO [FINANCE]
- Amanda Kim, COO [OPERATIONS]
- Robert Patel, CEO [EXECUTIVE]

## COMPETITIVE INTELLIGENCE
Currently using a mix of local legal entities, PEOs in some regions, and independent contractors. Considering consolidating their approach for more consistent global operations.

## RECOMMENDED OUTREACH ANGLES
- Simplified global expansion without entity setup
- Contractor misclassification risk mitigation
- Competitive benefits packages to attract international talent

## SUGGESTED CASE STUDY
TechDynamics - A similar SaaS company that used Remote.com to expand into 12 new countries in 9 months without setting up entities.

## REMOTE.COM SOLUTION FOCUS
Global Employment Platform with particular emphasis on entity-free expansion and contractor conversion capabilities.

## SOURCES
- Company website
- LinkedIn profiles
- Recent press releases
- Industry analysis reports`;
  }
}