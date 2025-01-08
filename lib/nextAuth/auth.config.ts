import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      console.log('authorized', auth?.user);
      return !!auth?.user;
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
} satisfies NextAuthConfig;
