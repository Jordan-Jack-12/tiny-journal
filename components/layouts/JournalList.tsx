import { Loader } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import DeletePageButton from '../ui/button/DeletePageButton';

type JournalType = {
    id: string,
    created_at: Date,
    updated_at: Date | null,
    title: string,
    description: string | null,
    user_id: string;
}

type PropsType = {
    userId: string,
    journals: JournalType[]
}

const JournalList = ({ journals }: PropsType) => {

    return (
        <div className='p-2 flex flex-col gap-2'>
            {!journals && <Loader className='animate-spin mx-auto' />}
            {journals && journals.length > 0 &&
                journals.map((item: JournalType, index: number) => {
                    return (
                        <div key={index} className='group flex justify-between items-center border-2 border-gray-100 bg-white rounded-2xl w-full px-4 py-2'>
                            <Link
                                className='flex-1'
                                href={`/journal/${item.id}`}
                            >
                                <h2 className='text-xl font-bold'>{item.title}</h2>
                                <p className='text-[0.875rem] text-gray-500'>Date: {new Date(item.created_at).toLocaleDateString()}</p>
                                <p>{item.description}</p>
                            </Link>
                            <div className='invisible group-hover:visible'>
                                <DeletePageButton id={item.id}/>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default JournalList