import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isGuest: { label: "Is Guest", type: "boolean" }
      },
      async authorize(credentials) {
        await dbConnect();

        // Handle Guest Login
        if (credentials?.isGuest === "true") {
          return {
            id: "guest_" + Math.random().toString(36).substr(2, 9),
            name: "Guest User",
            email: "guest@mockmate.io",
            image: null,
            role: "guest"
          } as any;
        }

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordMatch) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if ((account?.provider === "google" || account?.provider === "github") && user.email) {
        try {
          await dbConnect();
          await User.findOneAndUpdate(
            { email: user.email },
            {
              $set: {
                name: user.name ?? "User",
                email: user.email,
                image: user.image,
                provider: account.provider,
              },
            },
            { upsert: true, new: true }
          );
        } catch (e) {
          console.error("[NextAuth] MongoDB signIn error:", e);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
