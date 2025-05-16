"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config();
exports.config = {
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
    outputDir: path_1.default.join(process.cwd(), 'output'),
    // Application Settings
    defaultEmailOptions: {
        includeSubjects: true,
        maxEmailsPerContact: 5,
        personalize: true
    }
};
//# sourceMappingURL=index.js.map