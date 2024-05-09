import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'
import { GoogleLoginButton } from './_components/GoogleLoginButton'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const hasSession = await getServerSession(authOptions)
  
  if (hasSession) {
    return redirect('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="-translate-y-20 flex flex-col items-center w-96 border-slate-500 rounded-lg border-2 p-4 pb-10">
        <h1 className="text-4xl font-bold text-center">AIGO</h1>
        <p className="mt-2 self-stretch flex-1 justify-center text-center">
          Bem vindo, ao sistema AIGO, onde você pode praticar outras linguas
          atravez de uma conversa com nossa IA
        </p>
        <GoogleLoginButton className="mt-10 self-stretch" />
      </div>
    </main>
  )
}
