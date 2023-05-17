import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) => {
      if (session?.user) {
        // get User's role
        const sessionUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        // add id and role to session
        session.user.id = user.id;
        session.user.role = sessionUser?.role;
      }
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    newUser: "/auth/new-user", // New users will be directed here on first sign in
  },
};
export default NextAuth(authOptions);
