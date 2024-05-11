
export type Message = {
  id: string
  content: string
  author?: string | null
  sentWhen: Date
}