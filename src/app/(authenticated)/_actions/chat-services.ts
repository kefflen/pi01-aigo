'use server'
import { db } from "@/app/_lib/prisma"
import { prismaChatDataToChatMapper } from "@/mappers/prismaChatToChatMapper"
import { Chat } from "@/types/Chat"
import { signOut } from "next-auth/react"
import { redirect } from "next/navigation"

export const loadUserChatById = async (userEmail: string, chatId: string): Promise<Chat|never> => {

  const chatData = await db.chat.findUnique({
    where: {
      id: chatId
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
    return redirect('/')
  }

  if (chatData.user.email !== userEmail) {
    return redirect('/')
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

export const loadChats = async (userEmail: string): Promise<Chat[]|never> => {
  const user = await db.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  if (!user) {
    signOut()
    return redirect("/signin")
  }

  const chatData = await db.chat.findMany({
    where: {
      userId: user.id,
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


