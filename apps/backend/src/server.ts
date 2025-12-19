import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { env } from './config/env';
import { logger } from './config/logger';
import { prisma } from './config/database';

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [env.FRONTEND_URL, ...(env.CORS_ORIGIN ? env.CORS_ORIGIN.split(',') : [])].filter(Boolean),
  credentials: true,
  exposedHeaders: ['Authorization'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
});

// Health check endpoint
app.get('/health', async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      database: 'connected',
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      database: 'disconnected',
    });
  }
});

// API routes
import routes from './routes';

app.get('/api/v1', (_req: Request, res: Response) => {
  res.json({
    message: 'VÉRTICE E-commerce API',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

app.use('/api/v1', routes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled error:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(500).json({
    error: 'Internal Server Error',
    message: env.isDevelopment ? err.message : 'Something went wrong',
    ...(env.isDevelopment && { stack: err.stack }),
  });
});

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  const PORT = env.PORT;
  
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
    logger.info(`📍 Environment: ${env.NODE_ENV}`);
    logger.info(`🔗 API URL: ${env.API_URL}`);
    logger.info(`🌐 Frontend URL: ${env.FRONTEND_URL}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    logger.info('SIGTERM received, shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    logger.info('SIGINT received, shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
  });
} else {
  logger.info('🚀 Running in serverless mode (Vercel)');
  logger.info(`📍 Environment: ${env.NODE_ENV}`);
}

export default app;
