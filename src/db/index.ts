// import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { user } from "./schema/auth-schema";
// import bcrypt from "bcrypt";
// export const db = drizzle(process.env.AUTH_DRIZZLE_URL!);
// async function main() {
//   const password = await bcrypt.hash("password", 10);
//   const userEntit: typeof user.$inferInsert = {
//     first_name: "A",
//     last_name: "B",
//     email_address: "abc@example.com",
//     password: password,
//     provider: "credential",
//   };

//   await db.insert(users).values(user);
//   console.info("User created!");
// }
// main();
