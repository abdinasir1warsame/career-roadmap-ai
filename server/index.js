import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import roadmapRouter from '../routes/roadmap.js';
import stripeRouter from '../routes/stripe.js';
import processCvRouter from '../routes/processCv.js';
import '../firebase.js'; // Initialize Firebase

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || 'https://career-roadmap-ai-l7y9.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Stripe webhook must be before JSON middleware
app.use('/api/stripe/webhook', stripeRouter);

// Other middleware
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    abortOnLimit: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/roadmap', roadmapRouter);
app.use('/api/processCv', processCvRouter);
app.use('/api/stripe', stripeRouter);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested resource ${req.originalUrl} was not found`,
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Something went wrong!'
      : err.message;

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
});

// Export for Vercel Serverless
export const handler = serverless(app);
