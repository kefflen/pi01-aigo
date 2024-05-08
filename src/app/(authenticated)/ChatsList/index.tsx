'use client'
import { chatsMocks } from '@/mocks/ChatsMocks'
import { Chat } from '@/types/Chat'
import { useEffect, useState } from 'react'
import { ChatCard } from './ChatCard'

export const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    setChats(chatsMocks)
  }, [])

  return (
    <div className="py-2 px-4 w-full border-lime-500 grid gap-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {chats.map((chat) => (
        <ChatCard className="" key={chat.id} chat={chat} />
      ))}
    </div>
  )
}
