'use client'
import { v4 } from 'uuid'
import { sendMessage } from '@/app/(authenticated)/_actions/aigo-services'
import { AuthenticatedContext } from '@/app/(authenticated)/_providers/authenticatedContext'
import { Button } from '@/components/ui/button'
import { Message } from '@/types/Message'
import { useContext, useState } from 'react'

type ChatInputProps = {
  chatId: string
  addMessage: (message: Message) => void
}

export const ChatInput = ({ chatId, addMessage }: ChatInputProps) => {
  const { userId } = useContext(AuthenticatedContext)
  const [message, setMessage] = useState<string>('')
  
  const handleSendMessage = async () => {
    const addedMessage: Message = {
      content: message,
      sentWhen: new Date(),
      id: v4(),
      author: userId
    }
    
    addMessage(addedMessage)
    const response = await sendMessage(chatId, addedMessage)
    setMessage('')
    addMessage(response)
  }

  return (
    <form
      className="flex items-center gap-1"
      onSubmit={(data) => {
        data.preventDefault()
        handleSendMessage()
      }}
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        className="w-full p-2 my-1 bg-slate-200 text-black rounded-lg outline-none"
        placeholder="Digite sua mensagem..."
      />
      <Button type="submit" className="h-full">
        Enviar
      </Button>
    </form>
  )
}
