import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";
import axios from 'axios';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
    } & DefaultSession["user"]
  }
  interface User {
    accessToken: string;
  }
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        isRegister: { label: "Is Register", type: "boolean" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }
        
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          console.log('Backend response:', response.data);

          if (response.data.user && response.data.access_token) {
            return {
              ...response.data.user,
              accessToken: response.data.access_token
            };
          } else {
            console.error('Invalid response structure:', response.data);
            throw new Error('Invalid response structure from server');
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Authentication error:', error.response?.data);
            throw new Error(error.response?.data?.message || 'Authentication failed');
          } else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred');
          }
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };