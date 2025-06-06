import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { ExaService, McpService, EmailGeneratorService, CsvExportService } from './services';
import { AccountBrief, EmailGenerationOptions, ResearchInput } from './types';
import { config } from './config';

/**
 * Web server for Remote.com Email Generator
 */
export class RemoteEmailGeneratorServer {
  private app: express.Application;
  private exaService: ExaService;
  private mcpService: McpService;
  private emailGeneratorService: EmailGeneratorService;
  private csvExportService: CsvExportService;
  
  constructor() {
    // Initialize Express
    this.app = express();
    
    // Initialize services
    this.exaService = new ExaService();
    this.mcpService = new McpService();
    this.emailGeneratorService = new EmailGeneratorService();
    this.csvExportService = new CsvExportService();
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir, { recursive: true });
    }
    
    // Configure middleware
    this.configureMiddleware();
    
    // Set up routes
    this.setupRoutes();
  }
  
  /**
   * Configure Express middleware
   */
  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, 'public')));
    
    // Make output directory accessible for downloading files
    this.app.use('/output', express.static(config.outputDir));
  }
  
  /**
   * Set up API routes
   */
  private setupRoutes(): void {
    // Health check
    this.app.get('/api/health', (req, res) => {
      res.status(200).json({ status: 'ok' });
    });
    
    // Conduct company research
    this.app.post('/api/research', async (req, res) => {
      try {
        const { companyName, website, linkedInUrl } = req.body;
        
        if (!companyName) {
          return res.status(400).json({ error: 'Company name is required' });
        }
        
        const researchInput: ResearchInput = {
          companyName,
          website,
          linkedInUrl
        };
        
        const research = await this.exaService.conductCompanyResearch(researchInput);
        
        // Save research to file
        const researchFileName = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_research.md`;
        const researchFilePath = path.join(config.outputDir, researchFileName);
        fs.writeFileSync(researchFilePath, research);
        
        res.status(200).json({
          message: 'Research completed successfully',
          researchFileName,
          downloadUrl: `/output/${researchFileName}`,
          research
        });
      } catch (error) {
        console.error('Error conducting research:', error);
        res.status(500).json({ error: `Research failed: ${(error as Error).message}` });
      }
    });
    
    // Generate account brief
    this.app.post('/api/brief', async (req, res) => {
      try {
        const { research, companyName } = req.body;
        
        if (!research) {
          return res.status(400).json({ error: 'Research data is required' });
        }
        
        // In a real implementation, this would use Claude MCP
        // For demo purposes, we'll create a simplified brief
        const briefText = this.generateSampleBrief(companyName, research);
        
        // Save brief to file
        const briefFileName = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_brief.md`;
        const briefFilePath = path.join(config.outputDir, briefFileName);
        fs.writeFileSync(briefFilePath, briefText);
        
        res.status(200).json({
          message: 'Account brief generated successfully',
          briefFileName,
          downloadUrl: `/output/${briefFileName}`,
          brief: briefText
        });
      } catch (error) {
        console.error('Error generating brief:', error);
        res.status(500).json({ error: `Brief generation failed: ${(error as Error).message}` });
      }
    });
    
    // Parse account brief
    this.app.post('/api/parse', async (req, res) => {
      try {
        const { brief } = req.body;
        
        if (!brief) {
          return res.status(400).json({ error: 'Brief text is required' });
        }
        
        const accountBrief = this.mcpService.parseAccountBrief(brief);
        
        res.status(200).json({
          message: 'Brief parsed successfully',
          accountBrief
        });
      } catch (error) {
        console.error('Error parsing brief:', error);
        res.status(500).json({ error: `Brief parsing failed: ${(error as Error).message}` });
      }
    });
    
    // Generate email sequences
    this.app.post('/api/emails', async (req, res) => {
      try {
        const { accountBrief, options } = req.body;
        
        if (!accountBrief) {
          return res.status(400).json({ error: 'Account brief is required' });
        }
        
        const emailOptions: EmailGenerationOptions = {
          includeSubjects: options?.includeSubjects ?? true,
          maxEmailsPerContact: options?.maxEmailsPerContact ?? 5,
          personalize: options?.personalize ?? true
        };
        
        const emailSequences = this.emailGeneratorService.generateEmailSequences(accountBrief, emailOptions);
        
        // Export to CSV
        const csvPath = await this.csvExportService.exportToCSV(emailSequences, accountBrief.companyName);
        const csvFileName = path.basename(csvPath);
        
        res.status(200).json({
          message: 'Email sequences generated successfully',
          csvFileName,
          downloadUrl: `/output/${csvFileName}`,
          emailSequences
        });
      } catch (error) {
        console.error('Error generating emails:', error);
        res.status(500).json({ error: `Email generation failed: ${(error as Error).message}` });
      }
    });
    
    // Full workflow API
    this.app.post('/api/workflow', async (req, res) => {
      try {
        const { companyName, website, linkedInUrl, emailOptions } = req.body;
        
        if (!companyName) {
          return res.status(400).json({ error: 'Company name is required' });
        }
        
        // Conduct research
        const researchInput: ResearchInput = {
          companyName,
          website,
          linkedInUrl
        };
        
        const research = await this.exaService.conductCompanyResearch(researchInput);
        
        // Save research to file
        const researchFileName = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_research.md`;
        const researchFilePath = path.join(config.outputDir, researchFileName);
        fs.writeFileSync(researchFilePath, research);
        
        // Generate brief (in a real implementation, this would use Claude MCP)
        const briefText = this.generateSampleBrief(companyName, research);
        
        // Save brief to file
        const briefFileName = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_brief.md`;
        const briefFilePath = path.join(config.outputDir, briefFileName);
        fs.writeFileSync(briefFilePath, briefText);
        
        // Parse brief
        const accountBrief = this.mcpService.parseAccountBrief(briefText);
        
        // Generate email sequences
        const emailGenerationOptions: EmailGenerationOptions = {
          includeSubjects: emailOptions?.includeSubjects ?? true,
          maxEmailsPerContact: emailOptions?.maxEmailsPerContact ?? 5,
          personalize: emailOptions?.personalize ?? true
        };
        
        const emailSequences = this.emailGeneratorService.generateEmailSequences(accountBrief, emailGenerationOptions);
        
        // Export to CSV
        const csvPath = await this.csvExportService.exportToCSV(emailSequences, companyName);
        const csvFileName = path.basename(csvPath);
        
        res.status(200).json({
          message: 'Workflow completed successfully',
          researchFileName,
          researchUrl: `/output/${researchFileName}`,
          briefFileName,
          briefUrl: `/output/${briefFileName}`,
          csvFileName,
          csvUrl: `/output/${csvFileName}`,
          emailSequences
        });
      } catch (error) {
        console.error('Error in workflow:', error);
        res.status(500).json({ error: `Workflow failed: ${(error as Error).message}` });
      }
    });
    
    // Serve the basic HTML interface
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
  }
  
  /**
   * Start the server
   */
  start(): void {
    this.app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
      console.log(`Web interface: http://localhost:${config.port}`);
      console.log(`API endpoint: http://localhost:${config.port}/api`);
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