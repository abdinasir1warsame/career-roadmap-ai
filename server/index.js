import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import roadmapRouter from './routes/roadmap.js';
import stripeRouter from './routes/stripe.js';
import processCvRouter from './routes/processCv.js';
import './firebase.js'; // Initialize Firebase

dotenv.config();

const app = express();

// CORS Configuration - updated with your frontend URL
app.use(
  cors({
    origin: [
      'https://career-roadmap-ai-l7y9.vercel.app',
      'http://localhost:5173', // for local development
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Stripe webhook route must come before body parsers!
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

// Health check endpoint
app.get('/health', (req, res) => {
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

// Export the Express app for Vercel
export default app;

// Local server (only for development)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`
    🚀 Server running in ${process.env.NODE_ENV || 'development'} mode
    🔗 Base URL: http://localhost:${PORT}
    🩺 Health Check: http://localhost:${PORT}/health
    `);
  });
}
