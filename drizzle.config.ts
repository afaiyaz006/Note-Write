import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  schema: './app/schema.ts',
  out: 'migrations',
  dialect: 'postgresql',
  driver: "pg",
  dbCredentials: {
    connectionString:"postgres://default:zqa6dPKL2ltm@ep-lucky-morning-a1uxf0mj-pooler.ap-southeast-1.aws.neon.tech/verceldb?pgbouncer=true&connect_timeout=15&sslmode=require"
  },
});