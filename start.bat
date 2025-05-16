@echo off
echo Remote.com Email Generator Startup Script

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js to use this application.
    echo Visit https://nodejs.org to download and install Node.js.
    pause
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo npm is not installed. Please install npm to use this application.
    echo It usually comes with Node.js installation.
    pause
    exit /b 1
)

:: Create output directory if it doesn't exist
if not exist "output" mkdir output

:: Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install dependencies. Please try again.
        pause
        exit /b 1
    )
)

:: Start the web interface
echo Starting Remote.com Email Generator...
echo The web interface will open in your default browser.

:: Build the TypeScript files if needed
if not exist "dist" (
    echo Building the application...
    call npm run build
)

:: Check if .env file exists, create from example if not
if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env
        echo Created .env file from .env.example
        echo Please add your API keys to the .env file before using the application.
    ) else (
        echo WARNING: No .env or .env.example file found. The application may not work correctly.
    )
)

:: Start the web server (don't wait)
start cmd /k "npm run server"

:: Wait before opening browser
timeout /t 3 >nul

:: Open the browser
start http://localhost:3000

echo Remote.com Email Generator is running at http://localhost:3000
echo Press Ctrl+C in the server window to stop the application.