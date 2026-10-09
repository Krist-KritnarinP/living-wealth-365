import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Routes
import { healthRouter } from './routes/health.js';
import { authRouter } from './routes/auth.js';
import { leadsRouter } from './routes/leads.js';
import { postsRouter } from './routes/posts.js';
import { productsRouter } from './routes/products.js';
import { wishlistRouter } from './routes/wishlist.js';
import { insurancePlansRouter } from './routes/insurancePlans.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// 🚀 API Routes
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/products', productsRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/insurance-plans', insurancePlansRouter);

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`✨ [Living Wealth 365 Backend API] Online`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🛡️ Health: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
  console.log(`📋 Leads: http://localhost:${PORT}/api/leads`);
  console.log(`📰 Posts: http://localhost:${PORT}/api/posts`);
  console.log(`💎 Products: http://localhost:${PORT}/api/products`);
  console.log(`💖 Wishlist: http://localhost:${PORT}/api/wishlist`);
  console.log(`===================================================`);
});

export default app;
