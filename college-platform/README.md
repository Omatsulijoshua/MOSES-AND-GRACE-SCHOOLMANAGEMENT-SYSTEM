# Moses and Grace College of Health Science & Technology Platform

A modern, fast, mobile-responsive educational institution platform built with Next.js, Express, and PostgreSQL.

## Project Structure
This is a monorepo containing two main parts:
- `frontend/`: The Next.js 15 App Router frontend application.
- `backend/`: The Node.js Express REST API backend application.

## Tech Stack
**Frontend:**
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Axios
- Vercel (Deployment)

**Backend:**
- Node.js + Express.js
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- JWT Authentication
- Render (Deployment)

## Getting Started Locally

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed locally or a remote Neon Database URL.

### 1. Backend Setup
1. Open terminal and navigate to `backend/`.
2. Run `npm install` to install dependencies.
3. Update `DATABASE_URL` in `backend/.env` with your PostgreSQL connection string.
4. Run `npx prisma db push` to push the schema to the database.
5. Run `npx prisma generate` to generate the Prisma client.
6. Start the server: `npm run dev` (Runs on `http://localhost:5000`).

### 2. Frontend Setup
1. Open a new terminal and navigate to `frontend/`.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file and add: `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
4. Start the app: `npm run dev` (Runs on `http://localhost:3000`).

## Deployment
- **Frontend**: Connect the `frontend/` directory to Vercel. Set `NEXT_PUBLIC_API_URL` to your live backend URL.
- **Backend**: Connect the `backend/` directory to Render as a Web Service. Set the environment variables (`DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`).
- **Database**: Use [Neon](https://neon.tech/) for free serverless PostgreSQL.
