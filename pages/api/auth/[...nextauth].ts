import NextAuth, { DefaultSession } from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/prisma-client'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, token, user }: { session: any; token: any; user: any }) => {
      if (session?.user) {
        session.user.id = user.id
        console.log(session)
      }
      return session
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
}
export default NextAuth(authOptions)
