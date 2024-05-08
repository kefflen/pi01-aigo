'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { chatsMocks } from '@/mocks/ChatsMocks'
import { Chat } from '@/types/Chat'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ChatPage() {
  const [chatData, setChat] = useState<Chat | null>(null)
  const session = useSession()
  console.log(session)
  useEffect(() => {
    const chat = chatsMocks[0]
    setChat(chat)
  }, [])

  if (!chatData) {
    return <div>Loading...</div>
  }

  const chat = chatData
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
              const isUser = message.author !== 'AIGO'

              return (
                <div
                  key={message.id}
                  className={cn(
                    'flex flex-col gap-1 p-2 bg-slate-900 rounded-lg self-start w-[45%]',
                    !isUser && 'bg-slate-950 self-end'
                  )}
                >
                  <div
                    className={cn(
                      'font-semibold text-lg flex gap-1',
                      isUser ? 'text-left' : 'text-right flex-row-reverse'
                    )}
                  >
                    <Image
                      alt="Profile picture"
                      src={
                        isUser
                          ? 'https://lh3.googleusercontent.com/a/ACg8ocJ315SxMmCEFok1MRy_G7klYzkEs-LRtymibTu2K8vbuarqCCQW=s96-c'
                          : '/aigo.svg'
                      }
                      width={30}
                      height={30}
                      className="rounded-full bg-white p-1/2"
                    />
                    {message.author}
                  </div>

                  <p
                    className={cn(
                      'opacity-70 text-sm',
                      isUser ? 'text-left' : 'text-right'
                    )}
                  >
                    {message.content}
                  </p>
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-1">
            <input
              type="text"
              className="w-full p-2 my-1 bg-slate-200 text-black rounded-lg outline-none"
              placeholder="Digite sua mensagem..."
            />
            <Button className="h-full">Enviar</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
