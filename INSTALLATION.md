# Remote.com Email Generator - Installation Guide

This document provides detailed instructions for installing and setting up the Remote.com Email Generator tool.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Installation Steps

### 1. Clone the Repository

Open your terminal or command prompt and run the following commands:

```bash
git clone <repository-url>
cd remote-email-generator
```

Replace `<repository-url>` with the actual URL of the git repository.

### 2. Install Dependencies

Once you're in the project directory, install all required dependencies:

```bash
npm install
```

This will install all the packages defined in the package.json file.

### 3. Set Up Environment Variables

Create an environment file by copying the example:

```bash
cp .env.example .env
```

On Windows, use this command instead:
```bash
copy .env.example .env
```

### 4. Configure API Keys

Open the `.env` file in any text editor and add your API keys:

```
EXA_API_KEY=your_exa_api_key_here
```

Replace `your_exa_api_key_here` with your actual EXA API key.

### 5. Build the Project

Compile the TypeScript code to JavaScript:

```bash
npm run build
```

This will create a `dist` folder with the compiled code.

## Starting the Application

### Using the Start Scripts

The simplest way to start the application:

- **On Windows**: Double-click the `start.bat` file
- **On Mac/Linux**: Double-click the `start.sh` file or run `./start.sh` in terminal

### Starting Manually

You can also start the application manually using npm:

- **CLI Mode**: `npm run cli`
- **Web Server Mode**: `npm run server`

When running in web server mode, open your browser and navigate to:
```
http://localhost:3000
```

## Verifying Installation

To verify that everything is installed correctly:

1. Make sure the application starts without errors
2. Check that you can access the web interface
3. Try running a simple company search

## Next Steps

Once you've successfully installed the application, refer to the [USAGE.md](./docs/USAGE.md) guide for detailed instructions on how to use the Remote.com Email Generator.

For a simplified guide aimed at non-technical users, see [SIMPLE_GUIDE.md](./SIMPLE_GUIDE.md).