import { Message } from "./Message"

export type Chat = {
  id: string
  title: string
  language: string
  context: string
  messages: Message[]
  summary: string
}