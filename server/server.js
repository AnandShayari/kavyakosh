import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import poemRoutes from './routes/poemRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import competitionRoutes from './routes/competitionRoutes.js';
import marketplaceRoutes from './routes/marketplaceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { apiRateLimiter, appSecurityMiddleware, corsMiddleware } from './middleware/securityMiddleware.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173' },
});

connectDB();
app.set('trust proxy', 1);
app.use(corsMiddleware);
app.use(apiRateLimiter);
app.use(appSecurityMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'KavyaKosh API' }));
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/poems', poemRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

io.on('connection', (socket) => {
  socket.on('joinRoom', (room) => socket.join(room));
  socket.on('sendMessage', (message) => io.to(message.room).emit('receiveMessage', message));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
