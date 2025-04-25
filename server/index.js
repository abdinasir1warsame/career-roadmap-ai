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

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    'https://career-roadmap-ai-l7y9.vercel.app',
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Stripe webhook route must come before body parsers!
app.use(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  stripeRouter
);

// File upload middleware with error handling
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
    useTempFiles: true, // Recommended for Vercel
    tempFileDir: '/tmp/', // Vercel's writable directory
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced logging middleware
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
    {
      headers: req.headers,
      body: req.body,
    }
  );
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
    region: process.env.VERCEL_REGION || 'local',
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested resource ${req.originalUrl} was not found`,
    availableEndpoints: [
      '/api/roadmap',
      '/api/processCv',
      '/api/stripe',
      '/health',
    ],
  });
});

// Enhanced Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  console.error(`[ERROR] ${err.stack}`, {
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    headers: req.headers,
  });

  res.status(statusCode).json({
    error: {
      message: isProduction ? 'Something went wrong!' : err.message,
      ...(!isProduction && {
        stack: err.stack,
        details: err.details,
      }),
      timestamp: new Date().toISOString(),
    },
  });
});

// Export for Vercel
export default app;

// Local development server
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`
    🚀 Server running in ${process.env.NODE_ENV || 'development'} mode
    🔗 Base URL: http://localhost:${PORT}
    🩺 Health Check: http://localhost:${PORT}/health
    `);
  });
}
