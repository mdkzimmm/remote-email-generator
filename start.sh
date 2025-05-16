#!/bin/bash

# Remote.com Email Generator Startup Script

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js to use this application."
    echo "Visit https://nodejs.org to download and install Node.js."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm to use this application."
    echo "It usually comes with Node.js installation."
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p output

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Failed to install dependencies. Please try again."
        exit 1
    fi
fi

# Start the web interface
echo "Starting Remote.com Email Generator..."
echo "The web interface will open in your default browser."

# Build the TypeScript files if needed
if [ ! -d "dist" ]; then
    echo "Building the application..."
    npm run build
fi

# Check if .env file exists, create from example if not
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "Created .env file from .env.example"
        echo "Please add your API keys to the .env file before using the application."
    else
        echo "WARNING: No .env or .env.example file found. The application may not work correctly."
    fi
fi

# Start the web server
npm run server

# Open the browser
sleep 2
if command -v open &> /dev/null; then
    open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000
elif command -v start &> /dev/null; then
    start http://localhost:3000
else
    echo "Please open http://localhost:3000 in your web browser to use the application."
fi

echo "Remote.com Email Generator is running at http://localhost:3000"
echo "Press Ctrl+C to stop the application."