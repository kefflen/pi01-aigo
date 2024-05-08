'use server'

import { ChatCard } from './ChatCard'
import { loadChats } from '../_actions/chat-actions'

//TODO: Should load chat by user id
export const ChatList = async () => {
  
  const chats = await loadChats()
  console.log({ chats })
  return (
    <div className="py-2 px-4 w-full border-lime-500 grid gap-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {chats.map((chat) => (
        <ChatCard className="" key={chat.id} chat={chat} />
      ))}
    </div>
  )
}
