# Project Setup Guide

## Description

This project uses Supabase for the backend database and Express for the backend API. This guide will walk you through how to set up and run the project with Supabase, PostgreSQL `.pgsql` file, and Express

## System Requirements

- Node.js (>= 14.x)
- Supabase account (to use Supabase cloud service)

## Setting Up Supabase

1. **Sign Up and Create a Supabase Project**

   - Go to [Supabase](https://app.supabase.io/) and sign up for an account if you don’t already have one.
   - Create a new project in Supabase.
   - After the project is created, save the connection information such as `URL`, `SECRET_KEY`, `PORT NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` .
   - Run the pgsql.sql file or open the left sidebar -> Select SQL Editor -> paste the pgsql.sql file -> Run query

2. **Running Supabase Locally with Docker (optional)**
   If you want to run Supabase locally, you can use Docker:

   ```bash
   Step 1:
   git clone https://github.com/your-repo/your-project.git
   cd your-project

   Step 2: npm install

   Step 3: Configure .env Supabase, PORT, Serec key Connection
   SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_URL=NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=NEXT_PUBLIC_SUPABASE_ANON_KEY
   SECRET_KEY=your_secret_key_you_want
   PORT=your_port

   Step 4: npm run dev

   ```
