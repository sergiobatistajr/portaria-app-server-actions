import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import {
  getServerSession,
  type NextAuthOptions,
  DefaultSession,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: string;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    name: string;
    role: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      name: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const options = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await prismadb.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          return null;
        }
        if (user.isActive === false) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValid) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
        token.role = user.role;
      }

      return token;
    },

    session: async ({ session, token }) => {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.name = token.name!;
      session.user.role = token.role;

      return session;
    },
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, options);
}
