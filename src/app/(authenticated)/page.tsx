'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ChatList } from './ChatsList'
import { createUserChat } from './_actions/chat-actions'
import { AuthenticatedContext } from './_providers/authenticatedContext'

const chatFormSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  context: z.string().optional(),
  language: z.string().min(1, 'O idioma é obrigatório'),
})

export default function Home({ ...rest }) {
  const { userId } = useContext(AuthenticatedContext)
  const form = useForm<z.infer<typeof chatFormSchema>>({
    resolver: zodResolver(chatFormSchema),
  })
  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
    createUserChat({
      language: data.language,
      title: data.title,
      context: data.context,
      userId,
    })
  })

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
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-2 p-2 w-full">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Título*</FormLabel>
                    <FormControl className="border-none bg-slate-800 text-white">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="items-stretch">
                    <FormLabel htmlFor="title">Idioma*</FormLabel>
                    <div className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="bg-slate-800 text-start rounded-md h-9 px-3 py-1 text-sm w-full mb-1">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o idioma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 rounded-md py-1 px-2 text-white">
                          <SelectItem value="inglês">Inglês</SelectItem>
                          <SelectItem value="espanhol">Espanhol</SelectItem>
                          <SelectItem value="francês">Francês</SelectItem>
                          <SelectItem value="italiano">Italiano</SelectItem>
                          <SelectItem value="alemão">Alemão</SelectItem>
                          <SelectItem value="japonês">Japonês</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="context"
                render={({ field }) => (
                  <FormItem className="items-stretch">
                    <FormLabel htmlFor="title">Contexto</FormLabel>
                    <div className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="bg-slate-800 text-start rounded-md h-9 px-3 py-1 text-sm w-full mb-1">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar contexto?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 rounded-md py-1 px-2 text-white">
                          <SelectItem value="Viagem">Travel to the country that speak the learning language</SelectItem>
                          <SelectItem value="Atendimento de restaurante">Restaurant attendement</SelectItem>
                          <SelectItem value="Atendimento posto de saude">Health attendement</SelectItem>
                          <SelectItem value="Atendimento no aeroporto">Airport attendement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="bg-slate-950 hover:bg-slate-950/50"
            >
              Criar chat
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
