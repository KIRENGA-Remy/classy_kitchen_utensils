import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { notFound, errorHandler } from './middlewares/error';

import productRoutes from './modules/products/product.routes';
import categoryRoutes from './modules/categories/category.routes';
import orderRoutes from './modules/orders/order.routes';

export function createApp() {
  const app = express();

  // --- Security & performance middleware ---
  app.use(helmet());                                   // safe HTTP headers
  app.use(cors({ origin: env.CORS_ORIGIN }));          // allow only our frontend
  app.use(compression());                              // gzip responses
  app.use(express.json({ limit: '100kb' }));           // cap body size
  if (env.NODE_ENV !== 'test') app.use(morgan('dev')); // request logging

  // Throttle abusive clients (100 requests / 15 min per IP).
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

  // --- Health check (used by hosting platforms & uptime monitors) ---
  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  // --- Feature routes ---
  app.use('/api/products', productRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/orders', orderRoutes);

  // --- 404 + central error handler (must be last) ---
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
