'use client'

import { Chat } from '@/types/Chat'
import { useContext, useEffect, useState } from 'react'
import { loadChats } from '../_actions/chat-actions'
import { AuthenticatedContext } from '../_providers/authenticatedContext'
import { ChatCard } from './ChatCard'

export const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([])
  const authenticatedContext = useContext(AuthenticatedContext)

  useEffect(() => {
    loadChats(authenticatedContext.userId).then((chatsData) => {
      setChats(chatsData)
    })
  }, [authenticatedContext.userId])

  return (
    <div className="py-2 px-4 w-full border-lime-500 grid gap-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {chats.map((chat) => (
        <ChatCard className="" key={chat.id} chat={chat} />
      ))}
    </div>
  )
}
