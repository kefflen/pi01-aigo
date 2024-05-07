'use server'

import { cn } from '@/app/_lib/utils'
import { Chat } from '@/types/Chat'

type ChatCardProps = {
  chat: Chat
  className?: string
}
export const ChatCard = ({ chat, className }: ChatCardProps) => {
  return (
    <div className={cn('bg-slate-800 h-fit rounded-lg overflow-hidden', className)}>
      <div className="flex justify-between items-center bg-slate-900 p-1">
        <h3 className="text-lg font-semibold text-white px-2 py-1 rounded-t-md">
          {chat.title}
        </h3>
        <span className="text-xs text-white px-2 py-1 rounded-md bg-slate-700">
          {chat.language}
        </span>
      </div>
      <div className="flex flex-col p-2">
        <p>Context: {chat.context}</p>
        <p className="text-sm my-1 text-slate-300 px-2 py-1 rounded-b-md bg-slate-900">
          {chat.summary}
        </p>
      </div>
      <div className='p-2 flex gap-2 justify-end'>
        <button className="bg-slate-900 text-white px-2 py-1 rounded-md">
          Continue
        </button>
        <button className="border-2 border-red-800 text-red-600 px-2 py-1 rounded-md">
          Remove
        </button>
      </div>
    </div>
  )
}
