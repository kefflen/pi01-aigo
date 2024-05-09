'use client'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const router = useRouter()
  return (
    <Button variant={'destructive'} onClick={() => {
      signOut()
      router.push('/signin')
    }}>
      Sair
    </Button>
  )
}
