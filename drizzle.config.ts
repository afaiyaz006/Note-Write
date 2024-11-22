import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  schema: './app/schema.ts',
  out: 'migrations',
  dialect: 'postgresql',
  driver: "pg",
  dbCredentials: {
    connectionString:"***REMOVED***"
  },
});