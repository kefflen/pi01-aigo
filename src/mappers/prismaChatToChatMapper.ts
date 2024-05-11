import { Chat } from "@/types/Chat"
import { Chat as PrismaChat, Message as PrismaMessage, User } from "@prisma/client"

type prismaDataChat = {
  chat: PrismaChat
  messages: PrismaMessage[]
  user: User
}

export const prismaChatDataToChatMapper = ({
  chat,
  messages,
  user
}: prismaDataChat): Chat => {
  return {
    id: chat.id,
    initialPrompt: chat.initialPrompt,
    messages: messages.map(message => ({
      content: message.content,
      id: message.id,
      sentWhen: message.sentWhen,
      author: message.authorId && user.name
    })),
    context: chat.context,
    language: chat.language,
    summary: chat.summary,
    title: chat.title,
  }
}