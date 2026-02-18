'use client';
import { getAllScreeningTest } from '@/actions/screening-test.actions';
import React, { useEffect, useState } from 'react';
import LinkButton from '../ui/button/LinkButton';

type ScreenTestType = {
    id: string,
    title: string,
    description: string,
    slug: string,
}

const ScreeningTestList = () => {
    const [testList, setTestList] = useState<ScreenTestType[] | null>(null);

    useEffect(() => {
        const fecthTestList = async () => {
            const res = await getAllScreeningTest();
            setTestList(res);
        }

        fecthTestList();
    }, [])

    return (
        <div className='flex flex-col gap-2 '>
            {testList?.map((item: ScreenTestType) => {
                return (
                    <div key={item.id} className='flex items-center p-4 rounded hover:bg-slate-200 '>
                        <div className='flex-1'>
                        <h1 className='text-xl font-semibold'>{item.title}</h1>
                        <p className='text-slate-600'>{item.description}</p>

                        </div>
                        <LinkButton href={`/screening-test/${item.slug}`}>Take Test</LinkButton>
                    </div>
                )
            })}
        </div>
    )
}

export default ScreeningTestList