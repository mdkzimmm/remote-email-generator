import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from 'dotenv';
import { AccountBrief, KeyStakeholder, PersonaType, PriorityContact } from "../types";
import { ExaService } from "./exaService";

dotenv.config();

/**
 * Service for handling Claude MCP interactions
 */
export class McpService {
  private server: McpServer;
  private exaService: ExaService;
  
  constructor() {
    // Initialize MCP server
    this.server = new McpServer({
      name: process.env.MCP_SERVER_NAME || 'remote-email-generator',
      version: process.env.MCP_SERVER_VERSION || '1.0.0'
    });
    
    // Initialize EXA service
    this.exaService = new ExaService();
    
    // Register MCP tools
    this.registerTools();
  }
  
  /**
   * Register all tools with the MCP server
   */
  private registerTools(): void {
    // Company research tool
    this.server.tool(
      "company_research",
      {
        companyName: z.string().min(1),
        website: z.string().optional(),
        linkedInUrl: z.string().optional()
      },
      async ({ companyName, website, linkedInUrl }) => {
        const research = await this.exaService.conductCompanyResearch({
          companyName,
          website,
          linkedInUrl
        });
        
        return {
          content: [{ type: "text", text: research }]
        };
      }
    );
    
    // Account brief generator tool
    this.server.tool(
      "account_brief_generator",
      {
        research: z.string().min(1)
      },
      async ({ research }) => {
        // This would normally call Claude to generate an account brief
        // For now, we'll return a placeholder to simulate the process
        const briefTemplate = `
# ACCOUNT INTELLIGENCE BRIEF

## COMPANY NAME
[Company name from research]

## ACCOUNT SNAPSHOT
[2-3 paragraph summary of company, industry, size, and market position]

## KEY STAKEHOLDERS
[List of executives with titles, LinkedIn URLs]

## GLOBAL FOOTPRINT & EXPANSION
[Details about international presence and expansion plans]

## PAIN POINTS & CHALLENGES
[List of 3-5 business challenges identified]

## TRIGGER EVENTS
[Recent developments that create urgency]

## PRIORITY CONTACTS
[List of 3-5 key contacts with persona mapping]

## COMPETITIVE INTELLIGENCE
[Current solution providers and competitive positioning]

## RECOMMENDED OUTREACH ANGLES
[3 specific angles based on research]

## SUGGESTED CASE STUDY
[Remote.com customer that resonates with this prospect]

## REMOTE.COM SOLUTION FOCUS
[Which Remote.com offerings would benefit this prospect most]

## SOURCES
[Source attribution from research]
`;
        
        return {
          content: [{ type: "text", text: briefTemplate }]
        };
      }
    );
    
    // Email sequence generator tool
    this.server.tool(
      "email_sequence_generator",
      {
        accountBrief: z.string().min(1),
        contactName: z.string().min(1),
        personaType: z.string()
      },
      async ({ accountBrief, contactName, personaType }) => {
        // This would normally call Claude to generate email sequences
        // For now, we'll return a placeholder to simulate the process
        const emailSequenceTemplate = `
# EMAIL SEQUENCE FOR ${contactName}

## PERSONA: ${personaType}

### EMAIL 1: PAIN POINT INTRODUCTION
Subject: [Pain point-focused subject line]

[4-6 sentences referencing specific triggers and pain points]

### EMAIL 2: CASE STUDY & SOCIAL PROOF
Subject: [Case study focused subject line]

[5-7 sentences with relevant metrics and social proof]

### EMAIL 3: OBJECTION HANDLING
Subject: [Objection handling subject line]

[4-6 sentences addressing persona-specific concerns]

### EMAIL 4: VALUE-ADD CONTENT
Subject: [Value-add subject line]

[3-5 sentences offering specific resources]

### EMAIL 5: RELATIONSHIP CONTINUATION
Subject: [Relationship continuation subject line]

[3-4 sentences with clear next steps]
`;
        
        return {
          content: [{ type: "text", text: emailSequenceTemplate }]
        };
      }
    );
  }
  
  /**
   * Start the MCP server with specified transport
   */
  async start(): Promise<void> {
    try {
      // Connect to transport (stdio for Claude Desktop)
      await this.server.connect(new StdioTransport());
      console.log("MCP server started successfully");
    } catch (error) {
      console.error("Failed to start MCP server:", error);
      throw error;
    }
  }
  
  /**
   * Parse a text account brief into structured data
   * @param briefText Raw account brief text
   * @returns Structured account brief
   */
  parseAccountBrief(briefText: string): AccountBrief {
    try {
      // Extract company name
      const companyNameMatch = briefText.match(/COMPANY NAME\s*\n(.*?)(?:\n\n|\n##)/s);
      const companyName = companyNameMatch ? companyNameMatch[1].trim() : "Unknown Company";
      
      // Extract account snapshot
      const snapshotMatch = briefText.match(/ACCOUNT SNAPSHOT\s*\n(.*?)(?:\n\n|\n##)/s);
      const accountSnapshot = snapshotMatch ? snapshotMatch[1].trim() : "";
      
      // Extract key stakeholders
      const stakeholdersMatch = briefText.match(/KEY STAKEHOLDERS\s*\n(.*?)(?:\n\n|\n##)/s);
      const stakeholdersText = stakeholdersMatch ? stakeholdersMatch[1].trim() : "";
      const keyStakeholders: KeyStakeholder[] = this.parseStakeholders(stakeholdersText);
      
      // Extract global footprint
      const footprintMatch = briefText.match(/GLOBAL FOOTPRINT & EXPANSION\s*\n(.*?)(?:\n\n|\n##)/s);
      const globalFootprint = footprintMatch ? footprintMatch[1].trim() : "";
      
      // Extract pain points
      const painPointsMatch = briefText.match(/PAIN POINTS & CHALLENGES\s*\n(.*?)(?:\n\n|\n##)/s);
      const painPointsText = painPointsMatch ? painPointsMatch[1].trim() : "";
      const painPoints = painPointsText.split(/\n-\s*/).filter(Boolean).map(p => p.trim());
      
      // Extract trigger events
      const triggersMatch = briefText.match(/TRIGGER EVENTS\s*\n(.*?)(?:\n\n|\n##)/s);
      const triggersText = triggersMatch ? triggersMatch[1].trim() : "";
      const triggerEvents = triggersText.split(/\n-\s*/).filter(Boolean).map(t => t.trim());
      
      // Extract priority contacts
      const contactsMatch = briefText.match(/PRIORITY CONTACTS\s*\n(.*?)(?:\n\n|\n##)/s);
      const contactsText = contactsMatch ? contactsMatch[1].trim() : "";
      const priorityContacts: PriorityContact[] = this.parseContacts(contactsText);
      
      // Extract competitive intelligence
      const competitiveMatch = briefText.match(/COMPETITIVE INTELLIGENCE\s*\n(.*?)(?:\n\n|\n##)/s);
      const competitiveIntelligence = competitiveMatch ? competitiveMatch[1].trim() : "";
      
      // Extract recommended outreach angles
      const anglesMatch = briefText.match(/RECOMMENDED OUTREACH ANGLES\s*\n(.*?)(?:\n\n|\n##)/s);
      const anglesText = anglesMatch ? anglesMatch[1].trim() : "";
      const recommendedOutreachAngles = anglesText.split(/\n-\s*/).filter(Boolean).map(a => a.trim());
      
      // Extract suggested case study
      const caseStudyMatch = briefText.match(/SUGGESTED CASE STUDY\s*\n(.*?)(?:\n\n|\n##)/s);
      const suggestedCaseStudy = caseStudyMatch ? caseStudyMatch[1].trim() : "";
      
      // Extract Remote.com solution focus
      const solutionMatch = briefText.match(/REMOTE\.COM SOLUTION FOCUS\s*\n(.*?)(?:\n\n|\n##)/s);
      const remoteSolutionFocus = solutionMatch ? solutionMatch[1].trim() : "";
      
      // Extract sources
      const sourcesMatch = briefText.match(/SOURCES\s*\n(.*?)(?:\n\n|\n##|$)/s);
      const sourcesText = sourcesMatch ? sourcesMatch[1].trim() : "";
      const sources = sourcesText.split(/\n-\s*/).filter(Boolean).map(s => s.trim());
      
      return {
        companyName,
        accountSnapshot,
        keyStakeholders,
        globalFootprint,
        painPoints,
        triggerEvents,
        priorityContacts,
        competitiveIntelligence,
        recommendedOutreachAngles,
        suggestedCaseStudy,
        remoteSolutionFocus,
        sources
      };
    } catch (error) {
      console.error("Error parsing account brief:", error);
      throw new Error(`Failed to parse account brief: ${(error as Error).message}`);
    }
  }
  
  /**
   * Parse stakeholders section into structured data
   */
  private parseStakeholders(stakeholdersText: string): KeyStakeholder[] {
    if (!stakeholdersText) return [];
    
    const stakeholders: KeyStakeholder[] = [];
    const stakeholderEntries = stakeholdersText.split(/\n-\s*/).filter(Boolean);
    
    for (const entry of stakeholderEntries) {
      const nameMatch = entry.match(/(.*?),\s*(.*?)(?:\s*\(|$)/);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        const title = nameMatch[2].trim();
        const linkedInMatch = entry.match(/\((https:\/\/www\.linkedin\.com\/.*?)\)/);
        const linkedInUrl = linkedInMatch ? linkedInMatch[1] : undefined;
        
        stakeholders.push({
          name,
          title,
          linkedInUrl,
          notes: entry
        });
      }
    }
    
    return stakeholders;
  }
  
  /**
   * Parse contacts section into structured data
   */
  private parseContacts(contactsText: string): PriorityContact[] {
    if (!contactsText) return [];
    
    const contacts: PriorityContact[] = [];
    const contactEntries = contactsText.split(/\n-\s*/).filter(Boolean);
    
    for (const entry of contactEntries) {
      const nameMatch = entry.match(/(.*?),\s*(.*?)(?:\s*\(|$)/);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        const title = nameMatch[2].trim();
        const linkedInMatch = entry.match(/\((https:\/\/www\.linkedin\.com\/.*?)\)/);
        const linkedInUrl = linkedInMatch ? linkedInMatch[1] : undefined;
        
        // Try to determine persona from text
        let persona = PersonaType.EXECUTIVE; // Default
        
        if (/HR|People|Talent|Culture/i.test(title)) {
          persona = PersonaType.HR_PEOPLE_OPS;
        } else if (/Recruit|Talent Acquisition|TA/i.test(title)) {
          persona = PersonaType.TALENT_ACQUISITION;
        } else if (/Finance|CFO|Account|Payroll/i.test(title)) {
          persona = PersonaType.FINANCE;
        } else if (/Operations|COO|Process/i.test(title)) {
          persona = PersonaType.OPERATIONS;
        } else if (/CEO|CTO|CIO|Chief|President|Founder|Owner/i.test(title)) {
          persona = PersonaType.EXECUTIVE;
        }
        
        // Check for explicit persona tag
        const personaMatch = entry.match(/\[(HR|TALENT|FINANCE|OPERATIONS|EXECUTIVE)\]/i);
        if (personaMatch) {
          const personaTag = personaMatch[1].toUpperCase();
          if (personaTag === 'HR') persona = PersonaType.HR_PEOPLE_OPS;
          if (personaTag === 'TALENT') persona = PersonaType.TALENT_ACQUISITION;
          if (personaTag === 'FINANCE') persona = PersonaType.FINANCE;
          if (personaTag === 'OPERATIONS') persona = PersonaType.OPERATIONS;
          if (personaTag === 'EXECUTIVE') persona = PersonaType.EXECUTIVE;
        }
        
        contacts.push({
          name,
          title,
          linkedInUrl,
          persona,
          notes: entry
        });
      }
    }
    
    return contacts;
  }
}