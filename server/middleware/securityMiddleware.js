import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss';
import hpp from 'hpp';

const parseOrigins = () => {
  const configuredOrigins = process.env.CORS_ORIGINS || process.env.CLIENT_URL || 'http://localhost:5173';
  return configuredOrigins.split(',').map((origin) => origin.trim()).filter(Boolean);
};

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin || parseOrigins().includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
});

export const appSecurityMiddleware = [
  helmet(),
  mongoSanitize(),
  (req, res, next) => {
    const sanitizeValue = (value) => {
      if (typeof value === 'string') {
        return xss(value);
      }

      if (Array.isArray(value)) {
        return value.map(sanitizeValue);
      }

      if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([key, childValue]) => [key, sanitizeValue(childValue)]));
      }

      return value;
    };

    req.body = sanitizeValue(req.body);
    req.params = sanitizeValue(req.params);
    req.query = sanitizeValue(req.query);
    next();
  },
  hpp(),
];

export const apiRateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

export const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.AI_RATE_LIMIT_MAX) || 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'AI request limit reached. Please try again later.' },
});
