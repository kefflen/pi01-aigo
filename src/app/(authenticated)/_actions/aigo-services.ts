'use server'
import { db } from '@/app/_lib/prisma'
import { prismaChatDataToChatMapper } from '@/mappers/prismaChatToChatMapper'
import { chatService } from '@/services/ChatService'
import { GoogleGenerativeAI } from '@google/generative-ai'
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')


export const sendMessage = async (chatId: string, message: string) => {
  
  const prismaResponse = await db.chat.findUnique({
    where: {
      id: chatId
    },
    include: {
      user: true,
      messages: {
        include: {
          author: true,
        },
        orderBy: {
          sentWhen: 'desc'
        }
      }
    }
  })

  if (!prismaResponse) {
    throw new Error('Chat not found')
  }

  const {
    user,
    messages,
    ...chatData
  } = prismaResponse
  
  const chat = prismaChatDataToChatMapper({
    chat: chatData,
    messages,
    user
  })
  

  const reply = await chatService.sendMessageToChat(chat, message)

  db.message.create({
    data: {
      content: message,
      chatId, authorId: prismaResponse?.user.id
    },
  })

  db.message.create({
    data: {
      content: reply.parts,
      chatId, authorId: prismaResponse?.user.id
    },
  })

  return reply
}