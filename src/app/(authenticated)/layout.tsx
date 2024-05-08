import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../_lib/auth'
import { Header } from '@/components/Header'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // const session = await getServerSession(authOptions)

  // if (!session) {
  //   return redirect('/signin')
  // }

  return (
    <>
      <Header />
      {children}
    </>
  )
}
