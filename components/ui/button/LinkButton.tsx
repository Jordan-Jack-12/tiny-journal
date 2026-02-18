import Link from 'next/link'
import React from 'react'

type LinkButtonProps = {
    children: React.ReactNode,
    href: string
    disabled?: boolean,
}

const LinkButton = ({ children, href, disabled = false }: LinkButtonProps) => {
    return (
        <Link
            href={href}
            className={`bg-(--color-sky-blue-300) py-2 px-4 rounded ${disabled ? 'cursor-default' : 'cursor-pointer'} hover:bg-(--color-sky-blue-400) disabled:bg-slate-300`}>
            {children}
        </Link>
    )
}

export default LinkButton