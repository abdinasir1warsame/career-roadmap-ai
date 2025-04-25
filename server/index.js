import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import processCvRouter from './routes/processCv.js'; // Ensure this import exists

const app = express();

// 1. Middleware (order matters!)
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// 2. Routes (all work automatically)
app.use('/api/processCv', processCvRouter); // CV processing
app.use('/api/roadmap', roadmapRouter);
app.use('/api/stripe', stripeRouter);
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 3. Export for Vercel
export default app;
