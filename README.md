# VoiceHireAI

A Next.js application that provides AI-powered voice interview assistant using supabase for database, Vapi for voice calls, and Google Gemini for AI responses.

## Environment Variables Required

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Authentication (Required)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
# Google AI (Gemini) API Key (Required for generating Interview Questions and Candidate Feedback)
GEMINI_API_KEY=your_gemini_api_key_here

# Paypal Client ID (Required for payment)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=

# Vapi API Key (Required for voice functionality)
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_key_here
```

## Getting API Keys

### Paypal

1. Go to [Paypal Developer Dashboard](https://developer.paypal.com/home/)
2. Create a API Key

### Google AI (Gemini)

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API key
3. Enable Gemini API

### Vapi Voice

1. Go to [Vapi Dashboard](https://dashboard.vapi.ai/)
2. Create an account and get your API key

### Database

1. Use Neon, Supabase, or any PostgreSQL database
2. Get your connection string

## Troubleshooting

### 500 Internal Server Error

- Check if all environment variables are set
- Verify database connection

### Axios Error

- Ensure API endpoints are accessible
- Check authentication status
- Verify request payload format

### Vapi Call Issues

- Verify VAPI_API_KEY is set
- Check Vapi account status
- Ensure proper voice configuration

## Features

- User authentication with Supabase and OAuth
- AI Interview Assistant voice conversations
- After Interview Candidate Performance report generation
- Keeping Track of previously created interviews
- Display how many Candidates have taken each Interview and view report of their performance.

## Tech Stack

- Javascript
- Next.js 15
- Vapi Voice API
- Google Gemini AI
- Supabase Database
- Tailwind CSS
