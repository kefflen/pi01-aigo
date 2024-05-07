// import { db } from '@/app/_lib/prisma'
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import { NextAuthConfig } from 'next-auth'
// import { Adapter } from 'next-auth/adapters'
// import GoogleProvider from 'next-auth/providers/google'

// export const authOptions: NextAuthConfig = {
//   adapter: PrismaAdapter(db) as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
//     })
//   ],
//   // callbacks: {
//   //   async session({ session, user }) {
//   //     session.user = { ...session.user, id: user.id }

//   //     return session
//   //   }
//   // },
//   // secret: process.env.NEXT_AUTH_SECRET
// }
