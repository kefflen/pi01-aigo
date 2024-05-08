import { Message } from "./Message"

//TODO: add user ID
export type Chat = {
  id: string
  title: string
  language: string
  context: string
  messages: Message[]
  summary: string
}
