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
            className={`bg-sky-300 text-white text-[0.875rem] font-semibold py-2 px-4 rounded-full ${disabled ? 'cursor-default' : 'cursor-pointer'} hover:bg-(--color-sky-blue-400) disabled:bg-slate-300`}>
            {children}
        </Link>
    )
}

export default LinkButton