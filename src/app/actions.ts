// "use server";

// import { SignUpSchema } from "./zod-schemas/signup-schemas";
// import { db } from "../db/drizzle";
// import { usersTable } from "@/db/schema/users";

// export async function createUser(prevState: unknown, formData: FormData) {
//   const signUpFormData = {
//     firstName: formData.get("firstName"),
//     lastName: formData.get("lastName"),
//     emailAddress: formData.get("emailAddress"),
//     password: formData.get("password"),
//   };
//   const validationResult = SignUpSchema.safeParse(signUpFormData);
//   if (!validationResult.success) {
//     const errorMessages = validationResult.error.format();
//     return {
//       success: false,
//       message: "Invalid data",
//       errorMessages,
//     };
//   } else {
//     try {
//       console.log("Inserting new user....");
//       await db.insert(usersTable).values([
//         {
//           first_name: validationResult.data.firstName,
//           last_name: validationResult.data.lastName,
//           email_address: validationResult.data.emailAddress,
//           password: validationResult.data.password,
//         },
//       ]);
//       return { message: "User creation succcessfull", success: true };
//     } catch {
//       return { message: "User creation unsuccessfull", success: false };
//     }
//   }
// }
// export async function loginUser(credentials: unknown) {
//   console.log(credentials);
// }
