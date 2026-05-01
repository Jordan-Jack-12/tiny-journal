"use client"

import { createJournalPage } from '@/actions/journal';
import { createClient } from '@/lib/supabase/client';
import { redirect, useRouter } from 'next/navigation';
import React from 'react'

type PropsType = {
    profileId: string
}

const AddJournalButton = (props: PropsType) => {
    const router = useRouter()

    async function handleClick() {
        try {
            const supabase = createClient();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {data, error} = await supabase.auth.getUser();
            if (error) redirect('/login');
            const res = await createJournalPage(props.profileId);
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