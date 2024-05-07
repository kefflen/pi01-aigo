'use client'
import { cn } from '@/app/_lib/utils'
import { signIn } from 'next-auth/react'

export const GoogleLoginButton = ({ className }: { className?: string }) => {
  const handleSignin = async () => {
    signIn()
  }
  return (
    <button
      onClick={handleSignin}
      className={cn('py-2 px-4 font-bold bg-slate-800 rounded-md', className)}
    >
      Faça login com Google
    </button>
  )
}
