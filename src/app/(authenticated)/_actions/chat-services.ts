'use server'
import { db } from "@/app/_lib/prisma"
import { Chat } from "@/types/Chat"
import { Message, Chat as PrismaChat, User } from "@prisma/client"
import { signOut } from "next-auth/react"
import { redirect } from "next/navigation"

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

  const data = await db.chat.findMany({
    where: {
      userId: user.id,
    },
    include: {
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

  return data.map(prismaChatToChatMapper)
}


const prismaChatToChatMapper = (prismaData: PrismaChat & {
  messages: Array<Message & { author: User | null }>
}): Chat => {
  return {
    id: prismaData.id,
    title: prismaData.title,
    language: prismaData.language,
    context: prismaData.context,
    messages: prismaData.messages.map((message) => ({...message, author: message.author?.name || 'AIGO' })),
    summary: prismaData.summary,
  }
}