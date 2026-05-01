'use client'

import { deleteJournalPageById } from '@/actions/journal'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type PropsType = {
    id: string
}

const DeletePageButton = (props: PropsType) => {
    const router = useRouter()

    async function handleDelete() {
        await deleteJournalPageById(props.id);
        router.push('/journal')
    }
    return (
        <button className='cursor-pointer hover:bg-red-200 hover:text-red-500 rounded-md p-1' onClick={handleDelete}>
            <Trash />
        </button>
    )
}

export default DeletePageButton