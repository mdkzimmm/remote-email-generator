"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./cli");
const server_1 = require("./server");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
/**
 * Main application entry point
 * Supports both CLI and web server modes
 */
async function main() {
    // Check command line arguments
    const args = process.argv.slice(2);
    const mode = args[0] || 'cli'; // Default to CLI mode
    try {
        if (mode === 'server' || mode === 'web') {
            // Start in web server mode
            console.log('Starting Remote.com Email Generator in web server mode...');
            const server = new server_1.RemoteEmailGeneratorServer();
            server.start();
        }
        else {
            // Start in CLI mode
            console.log('Starting Remote.com Email Generator in CLI mode...');
            const cli = new cli_1.RemoteEmailGeneratorCLI();
            await cli.start();
        }
    }
    catch (error) {
        console.error('Application error:', error);
        process.exit(1);
    }
}
// Run the application
main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map