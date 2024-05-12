'use server'
import { db } from "@/app/_lib/prisma"
import { prismaChatDataToChatMapper } from "@/mappers/prismaChatToChatMapper"
import { Chat } from "@/types/Chat"
import { redirect } from "next/navigation"

export const loadUserChatById = async (userId: string, chatId: string): Promise<Chat|never> => {

  const chatData = await db.chat.findUnique({
    where: {
      id: chatId,
      userId
    },
    include: {
      user: true,
      messages: {
        orderBy: {
          sentWhen: 'desc'
        }
      }
    }
  })

  if (!chatData) {
    throw new Error('No chat data found')
  }

  const {
    user,
    messages,
    ...chat
  } = chatData
  return prismaChatDataToChatMapper({
    chat,
    messages,
    user
  })
}

export const loadChats = async (userId: string): Promise<Chat[]|never> => {

  const chatData = await db.chat.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      messages: {
        orderBy: {
          sentWhen: 'desc'
        }
      }
    }
  })

  if (!chatData) {
    throw new Error('No chat data found')
  }


  return chatData.map(data => {
    const {
      user,
      messages,
      ...chat
    } = data
    return prismaChatDataToChatMapper({
      chat,
      messages,
      user
    })
  })
}


