import { Chat } from "@/types/Chat"
import { Message } from "@/types/Message"
import { ChatSession as GeminiChatSession, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai"
import { v4 } from "uuid"

console.log('ChatService.ts executed at:', new Date().toISOString())
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
let generativeModel: undefined | GenerativeModel

type geminiMessage = {
  role: 'user' | 'model',
  parts: string
}

class ChatSession {
  id: string
  chatSession: GeminiChatSession

  constructor(id: string, history: geminiMessage[], model: GenerativeModel) {
    this.id = id

    let userMessage: geminiMessage|undefined
    if (history[history.length - 1].role === 'user') {
      userMessage = history.pop()
    }

    this.chatSession = model.startChat({
      history: history.map(message => ({
        parts: [{
          text: message.parts
        }],
        role: message.role
      }))
    })

    if (userMessage) {
      this.chatSession.sendMessage(userMessage.parts)
    }
  }

  async sendMessage(message: string): Promise<geminiMessage> {
    const reply = await this.chatSession.sendMessage(message)

    return {
      role: 'model',
      parts: reply.response.text()
    }
  }
}

class ChatService {
  chats: Map<string, ChatSession> = new Map()

  async sendMessageToChat(chat: Chat, message: string) {
    if (!generativeModel) {
      generativeModel = await genAi.getGenerativeModel({ model: 'gemini-pro' })
    }

    if (!this.chats.has(chat.id)) {


      const history: geminiMessage[] = chat.messages.map(message => ({
        role: message.author ? 'user' : 'model',
        parts: message.content
      }))

      this.chats.set(chat.id, new ChatSession(chat.id, [{
        role: 'user',
        parts: chat.initialPrompt
      }, ...history], generativeModel))
    }

    const chatSession = this.chats.get(chat.id)
    if (!chatSession) {
      throw new Error('Chat session not found')
    }

    const response = await chatSession.sendMessage(message)
    const result: Message = {
      content: response.parts,
      id: v4(),
      sentWhen: new Date(),
      author: null
    }
    
    return result
  }
}

export const chatService = new ChatService()