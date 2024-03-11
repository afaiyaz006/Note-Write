import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const secret = process.env.NEXTAUTH_SECRET

export const authOptions = {
  secret: secret,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  
    
  ],

};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
