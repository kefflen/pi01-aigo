import { Header } from '@/components/Header'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../_lib/auth'
import { AuthenticatedProvider } from './_providers/authenticatedContext'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/signin')
  }

  return (
    <AuthenticatedProvider>
      <Header />
      {children}
    </AuthenticatedProvider>
  )
}
