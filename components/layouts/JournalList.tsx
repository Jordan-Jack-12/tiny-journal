"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DeletePageButton from '../ui/button/DeletePageButton';
import { getJournalPageByDateRangeServerAction } from '@/actions/journal';

type JournalType = {
    id: string,
    created_at: Date,
    updated_at: Date | null,
    title: string,
    description: string | null,
    user_id: string;
}

type PropsType = {
    from: Date,
    to: Date
}

const JournalList = (props: PropsType) => {
    const [journals, setJournals] = useState<JournalType[]>();
    useEffect(() => {
        async function fetchJournalPages(from: Date, to: Date) {
            try {
                const res = await getJournalPageByDateRangeServerAction({from, to});
                if (res.success == false) return
                setJournals(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchJournalPages(props.from, props.to);
    }, [props.from, props.to])
    return (
        <div className='p-2 flex flex-col gap-2'>
            {journals && journals.length > 0 &&
                journals.map((item: JournalType, index: number) => {
                    return (
                        <div key={index} className='group flex justify-between items-center border-2 border-gray-100 bg-white rounded-2xl w-full px-4 py-2'>
                            <Link
                                className='flex-1'
                                href={`/journal/${item.id}`}
                            >
                                <h2 className='text-xl font-bold'>{item.title}</h2>
                                <p className='text-[0.875rem] text-gray-500'>{new Date(item.created_at).toLocaleDateString()}</p>
                                <p>{item.description}</p>
                            </Link>
                            <div className='invisible group-hover:visible'>
                                <DeletePageButton id={item.id} />
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default JournalList