'use client'

import { Suspense, useContext } from 'react'
import { loadChats } from '../../_actions/chat-actions'
import { AuthenticatedContext } from '../../_providers/authenticatedContext'
import { ChatCard } from './ChatCard'

export const ChatList = () => {
  return (
    <Suspense fallback={'Loading...'}>
      <ChatListLoaded />
    </Suspense>
  )
}

const ChatListLoaded = async () => {
  const authenticatedContext = useContext(AuthenticatedContext)
  const chats = await loadChats(authenticatedContext.userId)

  return (
    <div className="py-2 px-4 w-full border-lime-500 grid gap-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {chats.map((chat) => (
        <ChatCard className="" key={chat.id} chat={chat} />
      ))}
    </div>
  )
}
