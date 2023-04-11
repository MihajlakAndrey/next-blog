import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'

import clientPromise from '../../../lib/mongodb'
import GitHubProvider from 'next-auth/providers/github'
import { getUser, login } from '../../../lib/mongoose/user'

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      //@ts-ignore
      async authorize(credentials) {
        try {
          const { user, error } = await login(credentials)
          if (error) {
            throw new Error(error)
          }
          if (!user) return null
          return user
        } catch (error: any) {
          throw new Error(error.message)
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const me = await getUser(token._id as string)

      if (me) {
        token.user = me
      }
      if (account?.provider === 'credentials') {
        token._id = user?._id
        token.provider = account.provider
      }
      if (account?.provider === 'github') {
        token._id = token.sub
        token.provider = account.provider
      }

      return token
    },
    async session({ session, token }) {
      session.user = token.user
      //@ts-ignore
      session.user.provider = token.provider
      return session
    },
  },
  pages: {
    signIn: '/',
    signOut: '/',
  },
})
