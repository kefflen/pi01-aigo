import { Chat } from "@/types/Chat"
import { ChatSession as GeminiChatSession, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai"

console.log('ChatService.ts executed at:', new Date().toISOString())
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
let generativeModel: undefined | GenerativeModel

type Message = {
  role: 'user' | 'model',
  parts: string
}

class ChatSession {
  id: string
  chatSession: GeminiChatSession

  constructor(id: string, history: Message[], model: GenerativeModel) {
    this.id = id
    console.log('ChatSession.constructor', id, history, model)

    let userMessage: Message|undefined
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

  async sendMessage(message: string): Promise<Message> {
    console.log('ChatSession.sendMessage', message )
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


      const history: Message[] = chat.messages.map(message => ({
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

    return chatSession.sendMessage(message)
  }
}

export const chatService = new ChatService()