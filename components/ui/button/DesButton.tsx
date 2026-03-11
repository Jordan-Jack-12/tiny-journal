'use client';

import React from 'react'

type ButtonProps = {
    children: React.ReactNode,
    onClick?: () => void,
    disabled?: boolean,
}

const DesButton = ({ children, onClick, disabled = false }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`bg-sky-300 text-white text-[0.875rem] font-semibold py-2 px-4 rounded-full ${disabled ? 'cursor-default' : 'cursor-pointer'} hover:bg-(--color-sky-blue-200) disabled:bg-slate-300`}>
            {children}
        </button>
    )
}

export default DesButton