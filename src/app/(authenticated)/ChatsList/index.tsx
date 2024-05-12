'use client'

import { Chat } from '@/types/Chat'
import { useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { loadChats } from '../_actions/chat-services'
import { ChatCard } from './ChatCard'
import { AuthenticatedContext } from '../_providers/authenticatedContext'

export const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([])
  const authenticatedContext = useContext(AuthenticatedContext)
  const session = useSession()

  useEffect(() => {
    if (session.data?.user) {
      const user = session.data.user as any
      loadChats(user.email).then((chatsData) => {
        setChats(chatsData)
      })
    }
  }, [session])

  return (
    <div className="py-2 px-4 w-full border-lime-500 grid gap-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {chats.map((chat) => (
        <ChatCard className="" key={chat.id} chat={chat} />
      ))}
    </div>
  )
}
