import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import roadmapRouter from './routes/roadmap.js';
import stripeRouter from './routes/stripe.js';
import processCvRouter from './routes/processCv.js';
import './firebase.js'; // Initialize Firebase

// 1. Initial Configuration
dotenv.config();
const app = express();

// 2. Security and Protocol Middleware
app.use(
  cors({
    origin: [
      'https://career-roadmap-ai-l7y9.vercel.app',
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.options('*', cors()); // Preflight handling

// 3. Body Parsing (Must come before routes)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. Special Case: Stripe Webhook (Raw body)
app.use(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  stripeRouter
);

// 5. File Uploads
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// 6. Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`, {
    headers: req.headers,
    body: req.body,
  });
  next();
});

// 7. API Routes
app.use('/api/roadmap', roadmapRouter);
app.use('/api/processCv', processCvRouter);
app.use('/api/stripe', stripeRouter);

// 8. Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    region: process.env.VERCEL_REGION || 'local',
  });
});

// 9. Documentation Endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Career Roadmap API',
    status: 'operational',
    endpoints: [
      '/api/roadmap - POST career roadmap generation',
      '/api/processCv - POST process CV/resume',
      '/health - GET service status',
    ],
  });
});

// 10. Error Handling (404 -> 500)
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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`[ERROR] ${err.stack}`);
  res.status(statusCode).json({
    error: {
      message:
        process.env.NODE_ENV === 'production'
          ? 'Something went wrong'
          : err.message,
      ...(process.env.NODE_ENV !== 'production' && {
        stack: err.stack,
        details: err.details,
      }),
    },
  });
});

// 11. Server Export/Start
export default app;

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
