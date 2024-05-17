import { cn } from '@/app/_lib/utils'
import { LinkButton } from '@/components/LinkButton'
import { Button } from '@/components/ui/button'
import { Chat } from '@/types/Chat'
import { deleteChat } from '../../_actions/chat-actions'

type ChatCardProps = {
  chat: Chat
  className?: string
}

export const ChatCard = ({ chat, className }: ChatCardProps) => {
  const handleRemoveButton = () => {
    deleteChat(chat.id)
  }

  return (
    <div
      className={cn('bg-slate-800 h-fit rounded-lg overflow-hidden', className)}
    >
      <div className="flex justify-between items-center bg-slate-900 p-1">
        <h3 className="text-lg font-semibold text-white px-2 py-1 rounded-t-md">
          {chat.title}
        </h3>
        <span className="text-xs text-white px-2 py-1 rounded-md bg-slate-700">
          {chat.language}
        </span>
      </div>
      <div className="flex flex-col p-2">
        {chat.context && <p>Contexto: {chat.context}</p>}
        <p className="text-sm my-1 text-slate-300 px-2 py-1 rounded-b-md bg-slate-900">
          {chat.summary ? (<>{chat.summary}</>) : (<div className='opacity-50'>Não possui resumo</div>)}
        </p>
      </div>
      <div className="p-2 flex gap-2 justify-end">
        <LinkButton href={`/chat/${chat.id}`} className="hover:bg-slate-950">
          Continuar
        </LinkButton>
        <Button
          onClick={handleRemoveButton}
          variant={'outline'}
          className="bg-transparent border-red-800 border-2 text-red-600 hover:bg-red-800 hover:text-white"
        >
          Apagar
        </Button>
      </div>
    </div>
  )
}
