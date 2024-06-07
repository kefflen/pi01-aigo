import Link from 'next/link'
import { LinkButton } from '../LinkButton'
import { LogoutButton } from './LogoutButton'

export const Header = () => {
  return (
    <header className="flex items-center bg-slate-800 w-full h-16">
      <div className='container mx-auto flex justify-between items-center'>
        <Link href={'/'}>
          <h1 className="text-2xl font-bold text-gray-100 p-4">AIGO</h1>
        </Link>
        <LogoutButton />
      </div>
    </header>
  )
}
