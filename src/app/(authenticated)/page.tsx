import { signIn, signOut } from 'next-auth/react'
import { ChatList } from './ChatsList'
import { Button } from '@/components/ui/button'

export default function Home({ ...rest }) {
  const handleSignin = async () => {
    signIn()
  }


  return (
    <main className="flex flex-col flex-1 min-h-screen w-full">
      <div className="container mx-auto mt-10">
        <div className='flex justify-end p-2 border-b-4 border-slate-800'>
          <Button>Novo chat</Button>
        </div>
        <ChatList />
      </div>
    </main>
  )
}
