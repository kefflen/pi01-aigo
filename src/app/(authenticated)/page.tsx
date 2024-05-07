import { signIn } from 'next-auth/react'
import { ChatList } from './ChatsList'

export default function Home({...rest}) {
  const handleSignin = async () => {
    signIn()
  }

  return (
    <main className="flex flex-1 min-h-screen container">
      <ChatList />
    </main>
  )
}
