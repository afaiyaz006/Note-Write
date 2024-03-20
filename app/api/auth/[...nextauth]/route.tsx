import NextAuth, { NextAuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";
import GitHubProvider from "next-auth/providers/github";

const secret: string | undefined = process.env.NEXTAUTH_SECRET;

if (!secret) {
  throw new Error("NEXTAUTH_SECRET environment variable is not defined");
}

const providers: Provider[] = [
  GitHubProvider({
    clientId: process.env.GITHUB_ID || "",
    clientSecret: process.env.GITHUB_SECRET || "",
  }),
];

export const authOptions = {
  secret: secret,
  providers: providers,
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };