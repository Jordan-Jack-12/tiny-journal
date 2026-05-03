"use client"

import { createJournalPage } from '@/actions/journal';
import { createClient } from '@/lib/supabase/client';
import { NotebookPen } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import React from 'react'

const CreateNewJournalButton = () => {
    const router = useRouter()

    async function handleClick() {
        try {
            const supabase = createClient();
            const {data, error} = await supabase.auth.getClaims();
            if (error || !data?.claims.sub) redirect('/login');
            const res = await createJournalPage(data.claims.sub);
            if (!res || res.success == false) return
            router.push('/journal/' + res.data?.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button
        className='flex gap-2 items-center bg-sky-300 text-white text-[0.875rem] font-semibold px-4 py-2 rounded-full cursor-pointer'
        onClick={handleClick}
        >
            <NotebookPen /> Create New
        </button>
    )
}

export default CreateNewJournalButton