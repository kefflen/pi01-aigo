'use client'
import { signIn } from 'next-auth/react'

export default function Home({...rest}) {
  const handleSignin = async () => {
    signIn()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={handleSignin}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        SignIn
      </button>
    </main>
  )
}
