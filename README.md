# Remote.com Email Generator

A complete, production-ready application for automating personalized outreach for Remote.com Account Executives. This tool leverages EXA for web research and Claude MCP for generating account research briefs and personalized email sequences.

## Features

- **Account Research Automation**: Uses EXA to gather company intelligence and leverages Claude MCP to create structured insights
- **Account Brief Parser**: Extracts structured data from research briefs following the standard format
- **Persona Framework**: Implements Remote.com's 5 persona categories with specific attributes
- **Email Sequence Generator**: Creates tailored 5-email sequences for each contact based on persona and company data
- **CSV Export**: Exports ready-to-use email sequences in CSV format for import into outreach tools
- **Multiple Interfaces**: Offers both a CLI and a web interface for flexibility

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- EXA API key (for web research)
- Claude MCP server tools (for AI-powered brief generation)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd remote-email-generator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables by copying the example file:
   ```
   cp .env.example .env
   ```

4. Edit `.env` and add your API keys:
   ```
   EXA_API_KEY=your_exa_api_key_here
   ```

5. Build the project:
   ```
   npm run build
   ```

### Using the CLI

Start the application in CLI mode:

```
npm run start
```

Follow the interactive prompts to:
1. Research a company
2. Generate an account brief
3. Create personalized email sequences
4. Export to CSV

### Using the Web Interface

Start the application in web server mode:

```
npm run start -- server
```

Then open your browser and navigate to:
```
http://localhost:3000
```

## Usage Examples

### Full Workflow

```
npm run start
```

Then select "Generate Email Sequences (Full Workflow)" and follow the prompts:
1. Enter company name (required)
2. Provide optional website and LinkedIn URL
3. Configure email options
4. Review the generated sequences and find the CSV export in the 'output' directory

### Research Only

```
npm run start
```

Select "Research a Company" to use EXA to gather company information without generating emails.

### Generate Emails from Existing Brief

```
npm run start
```

Select "Generate Emails from Existing Brief" and provide the path to your brief file.

## API Documentation

The web server includes a RESTful API:

- `POST /api/research`: Conducts company research using EXA
- `POST /api/brief`: Generates an account brief from research data
- `POST /api/parse`: Parses an account brief into structured data
- `POST /api/emails`: Generates email sequences from a parsed account brief
- `POST /api/workflow`: Performs the complete workflow from research to email generation

## Project Structure

```
remote-email-generator/
├── src/
│   ├── config/         # Configuration management
│   ├── data/           # Static data like personas
│   ├── public/         # Web interface assets
│   ├── services/       # Core functionality
│   ├── types/          # TypeScript interfaces
│   ├── utils/          # Utility functions
│   ├── cli.ts          # CLI interface
│   ├── server.ts       # Web server
│   └── index.ts        # Entry point
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Documentation
```

## Persona Framework

The application implements Remote.com's 5 persona framework:

1. **HR & PEOPLE OPERATIONS LEADER**
   - Focus on employee experience and culture
   - Pain points around global compliance and HR administration

2. **TALENT ACQUISITION LEADER**
   - Focus on expanding talent pools and hiring globally
   - Pain points around location-based hiring limitations

3. **FINANCE LEADER**
   - Focus on cost control and compliance
   - Pain points around unpredictable international costs

4. **OPERATIONS LEADER**
   - Focus on process standardization and efficiency
   - Pain points around multiple international vendors

5. **EXECUTIVE LEADER**
   - Focus on growth strategy and competitive advantage
   - Pain points around international expansion barriers

## Email Sequence Structure

For each contact, the tool generates up to 5 distinct emails:

1. **PAIN POINT INTRODUCTION**: 4-6 sentences referencing specific triggers
2. **CASE STUDY & SOCIAL PROOF**: 5-7 sentences with relevant metrics
3. **OBJECTION HANDLING**: 4-6 sentences addressing persona-specific concerns
4. **VALUE-ADD CONTENT**: 3-5 sentences offering specific resources
5. **RELATIONSHIP CONTINUATION**: 3-4 sentences with clear next steps

## License

Proprietary and confidential. Unauthorized copying of this project is strictly prohibited.