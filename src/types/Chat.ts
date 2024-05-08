import { Message } from "./Message"

//TODO: add user ID
export type Chat = {
  id: string
  title: string
  language: string
  context: string|null
  messages: Message[]
  summary: string
}
