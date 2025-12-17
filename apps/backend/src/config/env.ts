import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  API_URL: z.string().url(),
  
  DATABASE_URL: z.string().url(),
  
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  SUPABASE_JWT_SECRET: z.string(),
  
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1h'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  
  MP_ACCESS_TOKEN: z.string().optional(),
  MP_PUBLIC_KEY: z.string().optional(),
  MP_WEBHOOK_SECRET: z.string().optional(),
  
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_SECURE: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  
  FRONTEND_URL: z.string().url(),
  
  REDIS_URL: z.string().optional(),
  
  MAX_FILE_SIZE: z.string().default('5242880'),
  UPLOAD_DIR: z.string().default('./uploads'),
  
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),
  
  PAYPAL_CLIENT_ID: z.string(),
  PAYPAL_CLIENT_SECRET: z.string(),
  PAYPAL_MODE: z.enum(['sandbox', 'production']).default('sandbox'),
  PAYPAL_WEBHOOK_ID: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const config = {
  NODE_ENV: parsedEnv.data.NODE_ENV,
  PORT: parseInt(parsedEnv.data.PORT, 10),
  API_URL: parsedEnv.data.API_URL,
  
  DATABASE_URL: parsedEnv.data.DATABASE_URL,
  
  supabase: {
    url: parsedEnv.data.SUPABASE_URL,
    anonKey: parsedEnv.data.SUPABASE_ANON_KEY,
    serviceRoleKey: parsedEnv.data.SUPABASE_SERVICE_ROLE_KEY,
    jwtSecret: parsedEnv.data.SUPABASE_JWT_SECRET,
  },
  
  JWT_SECRET: parsedEnv.data.JWT_SECRET,
  JWT_REFRESH_SECRET: parsedEnv.data.JWT_REFRESH_SECRET,
  JWT_EXPIRES_IN: parsedEnv.data.JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: parsedEnv.data.JWT_REFRESH_EXPIRES_IN,
  
  MP_ACCESS_TOKEN: parsedEnv.data.MP_ACCESS_TOKEN,
  MP_PUBLIC_KEY: parsedEnv.data.MP_PUBLIC_KEY,
  MP_WEBHOOK_SECRET: parsedEnv.data.MP_WEBHOOK_SECRET,
  
  SMTP_HOST: parsedEnv.data.SMTP_HOST,
  SMTP_PORT: parsedEnv.data.SMTP_PORT ? parseInt(parsedEnv.data.SMTP_PORT, 10) : undefined,
  SMTP_SECURE: parsedEnv.data.SMTP_SECURE === 'true',
  SMTP_USER: parsedEnv.data.SMTP_USER,
  SMTP_PASS: parsedEnv.data.SMTP_PASS,
  EMAIL_FROM: parsedEnv.data.EMAIL_FROM,
  
  FRONTEND_URL: parsedEnv.data.FRONTEND_URL,
  
  REDIS_URL: parsedEnv.data.REDIS_URL,
  
  MAX_FILE_SIZE: parseInt(parsedEnv.data.MAX_FILE_SIZE, 10),
  UPLOAD_DIR: parsedEnv.data.UPLOAD_DIR,
  
  RATE_LIMIT_WINDOW_MS: parseInt(parsedEnv.data.RATE_LIMIT_WINDOW_MS, 10),
  RATE_LIMIT_MAX_REQUESTS: parseInt(parsedEnv.data.RATE_LIMIT_MAX_REQUESTS, 10),
  
  PAYPAL_CLIENT_ID: parsedEnv.data.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET: parsedEnv.data.PAYPAL_CLIENT_SECRET,
  PAYPAL_MODE: parsedEnv.data.PAYPAL_MODE,
  PAYPAL_WEBHOOK_ID: parsedEnv.data.PAYPAL_WEBHOOK_ID,
  
  isDevelopment: parsedEnv.data.NODE_ENV === 'development',
  isProduction: parsedEnv.data.NODE_ENV === 'production',
  isTest: parsedEnv.data.NODE_ENV === 'test',
};

export const env = config;
