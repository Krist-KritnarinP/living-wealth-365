import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health.js';
import { servicesRouter } from './routes/services.js';
import { consultationRouter } from './routes/consultations.js';
import { planRouter } from './routes/plans.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/health', healthRouter);
app.use('/api/services', servicesRouter);
app.use('/api/consultations', consultationRouter);
app.use('/api/plans', planRouter);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[Living Wealth 365 Backend] Server running on http://localhost:${PORT}`);
  console.log(`[Living Wealth 365 Backend] Health check: http://localhost:${PORT}/api/health`);
});

export default app;
