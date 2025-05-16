# Remote.com Email Generator - Usage Guide

This document provides detailed instructions for using the Remote.com Email Generator tool to create personalized outreach sequences.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [CLI Mode](#cli-mode)
4. [Web Interface](#web-interface)
5. [Understanding the Output](#understanding-the-output)
6. [Advanced Usage](#advanced-usage)
7. [Troubleshooting](#troubleshooting)

## Introduction

The Remote.com Email Generator automates the creation of personalized email sequences for Account Executives at Remote.com. It follows this workflow:

1. Research a prospect company using EXA (web search tool)
2. Generate a structured account intelligence brief with Claude MCP
3. Map contacts to Remote.com's 5 persona framework
4. Create personalized email sequences for each contact
5. Export ready-to-use emails in CSV format

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- EXA API key
- Claude MCP server tools installed locally

### Setup

1. Clone and install the application:
```bash
git clone <repository-url>
cd remote-email-generator
npm install
```

2. Configure your environment:
```bash
cp .env.example .env
# Edit .env to add your API keys
```

3. Build the application:
```bash
npm run build
```

## CLI Mode

The CLI mode provides an interactive command-line interface:

### Starting the CLI

```bash
npm run cli
```

### Main Menu Options

1. **Generate Email Sequences (Full Workflow)**
   - Runs the complete process from research to email export
   - Requires company name (and optionally website/LinkedIn URL)
   - Follows interactive prompts to customize output

2. **Research a Company**
   - Uses EXA to gather company information without generating emails
   - Saves research as a markdown file in the output directory

3. **Parse an Existing Account Brief**
   - Takes an existing brief file and parses it into structured data
   - Useful when you already have a brief and just need the structured data

4. **Generate Emails from Existing Brief**
   - Creates email sequences from an existing account brief
   - Allows customization of email parameters

5. **Exit**
   - Exits the application

### Example CLI Walkthrough

```
# Start the CLI
npm run cli

# Select option 1 for full workflow
1

# Enter company details
Enter company name: Acme Corporation
Enter company website (optional): https://acme.com
Enter LinkedIn URL (optional): https://linkedin.com/company/acme

# The system will now conduct research and generate emails
# When complete, it will show the paths to the output files
```

## Web Interface

The web interface provides a user-friendly way to use all features:

### Starting the Web Server

```bash
npm run server
```

Then open your browser and navigate to:
```
http://localhost:3000
```

### Web Interface Tabs

1. **Full Workflow**
   - All-in-one process from company research to email generation
   - Enter company details and email options
   - Download results as files

2. **Research Only**
   - Conduct company research without generating emails
   - Useful for preliminary research

3. **Parse Brief**
   - Paste an existing account brief into the text area
   - View structured data extracted from the brief

4. **Generate Emails**
   - Paste an existing brief and generate email sequences
   - Customize email generation options

### Using the Web Interface

1. Fill in the required fields (company name is always required)
2. Select desired options
3. Click the corresponding action button
4. Wait for processing to complete
5. Download results using the provided links

## Understanding the Output

### Research Output

The research file (e.g., `Acme_Corporation_research.md`) contains raw data gathered from EXA searches, including:
- Company overview
- Leadership information
- Recent news
- Market position
- Global presence
- Challenges and pain points

### Account Brief

The account brief (e.g., `Acme_Corporation_brief.md`) is a structured intelligence document with sections:
- Company name
- Account snapshot
- Key stakeholders
- Global footprint & expansion plans
- Pain points & challenges
- Trigger events
- Priority contacts with persona mapping
- Competitive intelligence
- Recommended outreach angles
- Suggested case study
- Remote.com solution focus
- Sources

### Email Sequences CSV

The CSV output (e.g., `Acme_Corporation_emails_2025-05-15.csv`) contains all email sequences with:
- Contact information (name, title, email, persona)
- Email sequence number (1-5)
- Email type
- Subject line
- Email body

## Advanced Usage

### Customizing Email Options

When generating emails, you can customize:
- **Include Subjects**: Whether to generate subject lines
- **Max Emails Per Contact**: Number of emails in each sequence (1-5)
- **Personalization**: Whether to include company-specific details

### Using Your Own Research

If you have already conducted research:
1. Create an account brief following the standard format
2. Use option 3 (Parse an Existing Brief) or 4 (Generate Emails from Existing Brief)

### API Integration

The web server includes a RESTful API you can integrate with other tools:
- `POST /api/research`: Conduct company research
- `POST /api/brief`: Generate account brief
- `POST /api/parse`: Parse account brief
- `POST /api/emails`: Generate email sequences
- `POST /api/workflow`: Run complete workflow

## Troubleshooting

### Common Issues

1. **EXA API Key Not Working**
   - Verify your API key in the .env file
   - Check EXA API usage limits

2. **Claude MCP Connection Issues**
   - Ensure Claude MCP server tools are properly installed and running
   - Check server configuration in .env file

3. **Empty Research Results**
   - Try more specific company information
   - Check internet connectivity

4. **Brief Parsing Errors**
   - Ensure brief follows the standard format with all required sections
   - Check for formatting issues in section headers

### Getting Help

If you encounter issues not covered in this guide:
1. Check the console for error messages
2. Review logs in the application directory
3. Contact the development team for support