'use client'

import { getJournalPageByUserIdServerAction } from '@/actions/journal'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type PropsType = {
    userId: string,
}

type JournalType = {
    id: string,
    createdAt: Date,
    updatedAt: Date | null,
    title: string,
    description: string | null,
    userId: string;
}

const JournalList = (props : PropsType) => {
    const [journals, setJournals] = useState<JournalType[]>();



    useEffect(() => {
        async function getJournals() {
            try {
                const response = await getJournalPageByUserIdServerAction(props.userId);
                if (!response || response.success == false) return 
                setJournals(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        getJournals();
    }, [])

    return (
        <div className='p-2 flex flex-col gap-2'>
            {journals && journals.length > 0 &&
                journals.map((item: JournalType, index: number) => {
                    return (
                        <Link
                            key={index}
                            className='bg-(--color-sky-blue-50) w-full rounded px-4 py-2'
                            href={`/journal/${item.id}`}
                        >
                            <h2 className='text-xl font-medium'>{item.title}</h2>
                            <p>Date: {new Date(item.createdAt).toLocaleDateString()}</p>
                            <p>{item.description}</p>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default JournalList