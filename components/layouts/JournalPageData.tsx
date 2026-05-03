"use client";
import { sub } from 'date-fns';
import React, { Suspense, useState } from 'react'
import FilterAndSearchRibbon from './FilterAndSearchRibbon';
import JournalList from './JournalList';

const LazyLoadingComponent = () => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='bg-gray-200 rounded animate-pulse h-10'>
                Loading...
            </div>
            <div className='bg-gray-100 rounded animate-pulse h-10'>
                Loading...
            </div>
            <div className='bg-gray-50 rounded animate-pulse h-10'>
                Fetching...
            </div>
        </div>
    )
}

const JournalPageData = () => {
    const [fromDate, setfromDate] = useState(sub(new Date(), { days: 7 }));
    const [toDate, setToDate] = useState(new Date());
    return (
        <div>
            <FilterAndSearchRibbon from={fromDate} to={toDate} setFrom={setfromDate} setTo={setToDate} />
            <Suspense fallback={<LazyLoadingComponent />}>
                <JournalList from={fromDate} to={toDate} />
            </Suspense>
        </div>
    )
}

export default JournalPageData