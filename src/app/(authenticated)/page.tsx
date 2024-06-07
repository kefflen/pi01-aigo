'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ChatList } from './components/ChatsList'
import { NewChatForm } from './components/NewChatForm'

export default function Home() {
  return (
    <Sheet>
      <main className="flex flex-col flex-1 min-h-screen w-full">
        <div className="container mx-auto mt-10">
          <div className="flex justify-end p-2 border-b-4 border-slate-800">
            <SheetTrigger asChild>
              <Button>Novo chat</Button>
            </SheetTrigger>
          </div>
          <ChatList />
        </div>
      </main>
      <SheetContent className="bg-slate-900 border-none text-white">
        <SheetHeader className="border-b-2 border-slate-800 mb-2">
          <SheetTitle className="text-white">Novo chat</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <NewChatForm />
      </SheetContent>
    </Sheet>
  )
}
