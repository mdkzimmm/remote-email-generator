import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

export const config = {
  // API Keys
  exaApiKey: process.env.EXA_API_KEY || '',
  
  // MCP Configuration
  mcpServerPort: parseInt(process.env.MCP_SERVER_PORT || '4000', 10),
  mcpServerName: process.env.MCP_SERVER_NAME || 'remote-email-generator',
  mcpServerVersion: process.env.MCP_SERVER_VERSION || '1.0.0',
  
  // Server Configuration
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Paths
  outputDir: path.join(process.cwd(), 'output'),
  
  // Application Settings
  defaultEmailOptions: {
    includeSubjects: true,
    maxEmailsPerContact: 5,
    personalize: true
  }
};