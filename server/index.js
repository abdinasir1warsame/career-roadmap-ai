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
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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

// Start server
const server = app.listen(PORT, () => {
  console.log(`
  � Server running in ${process.env.NODE_ENV || 'development'} mode
  🔗 Base URL: http://localhost:${PORT}
  📚 API Docs: http://localhost:${PORT}/api-docs
  🩺 Health Check: http://localhost:${PORT}/health
  `);
});

// Handle shutdowns gracefully
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.stack}`);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});
