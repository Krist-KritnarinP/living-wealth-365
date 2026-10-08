import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// Basic health check endpoint
app.use('/api/health', healthRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[Living Wealth 365 Backend] Server running on http://localhost:${PORT}`);
});

export default app;
