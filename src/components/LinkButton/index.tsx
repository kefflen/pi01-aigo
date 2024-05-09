import Link from 'next/link'
import * as React from 'react'
import { Button } from '../ui/button'

type LinkButtonProps = Omit<
  React.ComponentPropsWithRef<typeof Button>,
  'onClick'
> & {
  href: string
}

export const LinkButton = ({ href, children, ...rest }: LinkButtonProps) => {
  return (
    <Button asChild {...rest}>
      <Link href={href}>
        {children}
      </Link>
    </Button>
  )
}
