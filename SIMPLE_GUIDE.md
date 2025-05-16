# Super Easy Guide to Using the Email Generator

Hello! This guide will help you use the Remote.com Email Generator even if you've never used a computer program before!

## Installation

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

## Getting Started

### For Windows Users:
1. Find the folder called "remote-email-generator" on your computer
2. Look for a file called `start.bat`
3. Double-click on `start.bat`
4. A black window will open - this is normal! Just wait a moment
5. Your web browser will automatically open with the program

### For Mac Users:
1. Find the folder called "remote-email-generator" on your computer
2. Look for a file called `start.sh`
3. Double-click on `start.sh`
4. If asked, click "Yes" to allow it to run
5. Your web browser will open with the program

## Using the Program

Once the web page opens, you'll see a form that looks like this:

```
Company Name: [                     ]
Company Website: [                     ]
LinkedIn URL: [                     ]

[✓] Include subject lines
[✓] Personalize emails
Emails per contact: [5▼]

[Generate Email Sequences]
```

### Step 1: Enter Company Information
1. Type the company name you want to research (like "Apple" or "Nike")
2. Type the company website if you know it (like "apple.com")
3. Type the LinkedIn URL if you know it (optional)

### Step 2: Check Your Settings
These are already set to the best options:
- Include subject lines: Checked
- Personalize emails: Checked
- Emails per contact: 5 (the maximum)

### Step 3: Click the Purple Button
Click the "Generate Email Sequences" button and wait!

### Step 4: Download Your Results
When it's done (this might take a minute), you'll see links to download:
1. Research - All the facts about the company
2. Account Brief - A summary of the company and key contacts
3. Email Sequences - Ready-to-use emails (this is what you want!)

### Step 5: Use Your Emails
1. Click on "Download Email Sequences (CSV)"
2. Open the downloaded file (it should open in Excel or similar program)
3. You'll see personalized emails for different people at the company
4. Copy and paste these emails when you're ready to send them!

## What If Something Goes Wrong?

If the program doesn't start or shows an error:

1. Make sure your computer is connected to the internet
2. Check that you have an EXA API key added to the `.env` file
   (You might need help from an adult with this step)
3. Try closing everything and starting again
4. If it still doesn't work, look at the black window for any error messages

## That's It!

You don't need to understand any coding to use this tool. Just fill in the company information, click the button, and get your personalized emails!

Happy emailing! 📧