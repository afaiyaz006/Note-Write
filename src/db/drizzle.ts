import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.AUTH_DRIZZLE_URL!);
