"use client"

import { createJournalPage } from '@/actions/journal';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const AddJournalButton = () => {
    const [userId, setUserId] = useState("ea4684c8-090e-45d0-8980-2bc582e89380");
    const router = useRouter()

    async function handleClick() {
        try {
            const res = await createJournalPage(userId);
            if (!res || res.success == false) return
            router.push('/journal/'+res.data?.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button
        className='bg-sky-300 text-white text-[0.875rem] font-semibold px-4 py-2 rounded-full cursor-pointer'
        onClick={handleClick}
        >
            Add New Journal
        </button>
    )
}

export default AddJournalButton