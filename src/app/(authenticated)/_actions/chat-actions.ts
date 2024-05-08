'use server'

import { chatsMocks } from "@/mocks/ChatsMocks"

export const loadChats = async () => {
  return chatsMocks
}