'use client';

import React from 'react'

type ButtonProps = {
    children: React.ReactNode,
    onClick?: () => void,
    disabled?: boolean,
}

const GhostButton = ({ children, onClick, disabled = false }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`bg-white py-2 px-4 rounded ${disabled ? 'cursor-default' : 'cursor-pointer'} hover:bg-(--color-sky-blue-100) disabled:bg-slate-300`}>
            {children}
        </button>
    )
}

export default GhostButton