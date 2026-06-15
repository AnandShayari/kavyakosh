# KavyaKosh

An emotionally immersive AI poetry platform scaffolded with React, Tailwind CSS, Express, MongoDB, Socket.io, Redis-ready infrastructure, and OpenAI integration architecture.

## Project Structure

- `client/` — React + Vite frontend
- `server/` — Express backend and API
- `assets/` — existing workspace asset directory
- `PRODUCTION_ARCHITECTURE.md` — production architecture, roles, and roadmap

## Setup

1. Install frontend dependencies:
   - `cd client`
   - `npm install`

2. Install backend dependencies:
   - `cd server`
   - `npm install`

3. Create `.env` files:
   - `client/.env` with `VITE_API_URL=http://localhost:5000/api`
   - `server/.env` with the required backend secrets

4. Run development servers:
   - `cd server && npm run dev`
   - `cd client && npm run dev`

## Deployment

- Frontend: Vercel with `client` as the deployment root
- Backend: Render/Railway with `server/server.js`
- Database: MongoDB Atlas
- Redis: Upstash Redis
- Media: Cloudinary

## Environment Variables

### `server/.env`
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `OPENAI_API_KEY`
- `REDIS_URL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### `client/.env`
- `VITE_API_URL`
