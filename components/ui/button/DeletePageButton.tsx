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
        <button className='cursor-pointer' onClick={handleDelete}>
            <Trash />
        </button>
    )
}

export default DeletePageButton