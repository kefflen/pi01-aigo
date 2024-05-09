'use server'
import { Message } from '@/types/Message'
import { ChatSession, GoogleGenerativeAI } from '@google/generative-ai'
import crypto from 'crypto'
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const chatsModels: Record<string, ChatSession> = {}
console.log('Action initChat')
export const initChat = async (chatId: string, initialPrompt: string): Promise<Message> => {
  const model = await genAi.getGenerativeModel({ model: 'gemini-pro' })
  
  const chat = model.startChat()
  chatsModels[chatId] = chat
  const reply = await chat.sendMessage(initialPrompt)

  return {
    author: 'AIGO',
    content: reply.response.text(),
    id: crypto.randomUUID(),
    sentWhen: new Date(),
  }
}

export const sendMessage = async (chatId: string, message: string) => {
  const chat = chatsModels[chatId]
  if (!chat) {
    throw new Error('Chat not found')
  }

  const reply = await chat.sendMessage(message)
  return reply
}