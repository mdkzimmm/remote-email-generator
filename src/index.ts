import { RemoteEmailGeneratorCLI } from './cli';
import { RemoteEmailGeneratorServer } from './server';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Main application entry point
 * Supports both CLI and web server modes
 */
async function main(): Promise<void> {
  // Check command line arguments
  const args = process.argv.slice(2);
  const mode = args[0] || 'cli'; // Default to CLI mode
  
  try {
    if (mode === 'server' || mode === 'web') {
      // Start in web server mode
      console.log('Starting Remote.com Email Generator in web server mode...');
      const server = new RemoteEmailGeneratorServer();
      server.start();
    } else {
      // Start in CLI mode
      console.log('Starting Remote.com Email Generator in CLI mode...');
      const cli = new RemoteEmailGeneratorCLI();
      await cli.start();
    }
  } catch (error) {
    console.error('Application error:', error);
    process.exit(1);
  }
}

// Run the application
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});