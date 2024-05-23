'use client'

import { cn } from '@/lib/utils'
import { Chat } from '@/types/Chat'
import { Message } from '@/types/Message'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { loadUserChatById } from '../../_actions/chat-actions'
import { AuthenticatedContext } from '../../_providers/authenticatedContext'
import { ChatInput } from './components/ChatInput'

type ChatPageProps = {
  params: {
    chatId: string
  }
}

export default function ChatPage({ params: { chatId } }: ChatPageProps) {
  const { userId, avatarUrl, name } = useContext(AuthenticatedContext)
  const [chat, setChat] = useState<null | Chat>(null)

  useEffect(() => {
    loadUserChatById(userId, chatId).then((chat) => setChat(chat))
  }, [chatId, userId])

  if (!chat) {
    return <div>Loading...</div>
  }

  const addMessage = (message: Message) => {
    setChat((prevChat) => {
      if (!prevChat) {
        return prevChat
      }

      return {
        ...prevChat,
        messages: [...prevChat.messages, message],
      }
    })
  }

  return (
    <main className="p-5 flex flex-col flex-1">
      <div className="container mx-auto flex flex-1 flex-col">
        <div className="flex justify-between bg-slate-900 p-2 rounded-t-lg">
          <div>
            <h2 className="text-2xl font-bold">{chat.title}</h2>
            <p className="text-sm text-gray-500">{chat.context}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-2xl font-medium">AIGO</h3>
            <Image
              src={'/aigo.svg'}
              alt="AIGO Icon"
              width={48}
              height={48}
              className="flex items-center justify-center bg-gray-200 rounded-full"
            ></Image>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-2 overflow-y-auto bg-slate-800 rounded-b-lg">
          <div className="w-full flex flex-col gap-3 overflow-auto pb-5">
            {chat.messages.map((message, index) => {
              const isUser = !!message.author

              return (
                <div
                  key={message.id}
                  className={cn(
                    'flex flex-col gap-1 p-2 bg-slate-900 rounded-lg self-start w-[48%]',
                    isUser && 'bg-slate-950 self-end'
                  )}
                >
                  <div
                    className={cn(
                      'font-semibold text-lg flex gap-1',
                      isUser ? 'text-right flex-row-reverse' : 'text-left'
                    )}
                  >
                    <Image
                      alt="Profile picture"
                      src={isUser ? avatarUrl : '/aigo.svg'}
                      width={30}
                      height={30}
                      className="rounded-full bg-white p-1/2"
                    />
                    {message.author ? name : 'AIGO'}
                  </div>

                  <p
                    className={cn(
                      'opacity-70 text-sm p-2',
                      isUser ? 'text-right' : 'text-left'
                    )}
                  >
                    {message.content}
                  </p>
                </div>
              )
            })}
          </div>
          <ChatInput chatId={chatId} addMessage={addMessage} />
        </div>
      </div>
    </main>
  )
}
