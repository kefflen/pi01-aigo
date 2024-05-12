'use server'

import { db } from "../_lib/prisma"

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  })

  return user
}