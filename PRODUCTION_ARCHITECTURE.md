# KavyaKosh Production Architecture

KavyaKosh is moving beyond a basic MERN app into an AI-powered literary ecosystem: publishing, reviews, competitions, marketplace, creator identity, and premium AI tools on one platform.

## Platform Stack

### Frontend

- React + Vite
- Tailwind CSS
- Framer Motion
- React Router
- TanStack Query for server state
- Zustand for lightweight client state
- React Hook Form + Zod for validated forms
- Axios for API access
- Socket.io client for real-time notifications

### Backend

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT access tokens + refresh tokens
- Role-based access control for user, premium, moderator, and admin roles
- Socket.io for real-time events
- Redis for caching, sessions, rate-limit coordination, and future queues
- Cloudinary for media storage

### AI Layer

- OpenAI API integration
- Prompt templates by format: poem, shayari, ghazal, lyrics, caption, quote
- AI generation history
- Rate limiting per user and per route
- Token usage and cost tracking
- AI review engine for emotion, creativity, rhythm, imagery, and symbolism

### DevOps

- Frontend: Vercel
- Backend: Railway or Render
- Database: MongoDB Atlas
- Redis: Upstash Redis
- Media: Cloudinary

## Roles

- Guest: browse poems, explore content, view competitions, view marketplace
- Registered user: generate AI poetry, publish poems, join competitions, review poems, save collections, follow creators, buy marketplace items
- Premium user: higher AI limits, advanced models, exclusive competitions, marketplace discounts
- Moderator: moderate content, handle reports, manage reviews
- Admin: full platform control

## Core Collections

Current and planned collections:

```text
users
profiles
poems
drafts
collections
likes
comments
reviews
followers
notifications
competitions
submissions
leaderboards
products
orders
wishlist
cart
subscriptions
chat_histories
ai_generations
reports
badges
achievements
```

## Production Priorities

1. Finish auth hardening: refresh token rotation, email verification, password reset, and secure cookie support.
2. Add AI usage accounting: per-user daily limits, model used, prompt tokens, completion tokens, and estimated cost.
3. Build notification delivery: persist notifications in MongoDB and emit real-time updates through Socket.io.
4. Add admin and moderator workflows: reports, moderation queues, user actions, and AI usage dashboards.
5. Add Redis-backed caching and queue workers for expensive AI, marketplace, and notification jobs.
6. Migrate the backend to TypeScript when the API contracts stabilize.

## Theme

- Background: `#0B0B0F`
- Gold: `#D4AF37`
- Purple: `#8B5CF6`
- Text: `#F5F5F5`
- Cards: `#14141A`
