'use client'

import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { getUserByEmail } from '../../_actions/user-actions'

type AuthenticatedContextType = {
  userId: string
  email: string
  avatarUrl: string
  name: string
}

export const AuthenticatedContext = createContext<AuthenticatedContextType>(
  {} as AuthenticatedContextType
)

export const AuthenticatedProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [user, setUser] = useState<User | null>(null)
  const session = useSession()

  useEffect(() => {
    if (session.data?.user?.email) {
      const email = session.data.user.email
      getUserByEmail(email).then((user) => {
        if (!user) {
          return
        }
        setUser(user)
      })
    }
  }, [session.data?.user?.email])

  if (!user) {
    return null
  }

  return (
    <AuthenticatedContext.Provider
      value={{
        userId: user.id,
        email: user.email,
        avatarUrl:
          user.image ||
          'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon',
        name: user.name || 'Usuario',
      }}
    >
      {children}
    </AuthenticatedContext.Provider>
  )
}
