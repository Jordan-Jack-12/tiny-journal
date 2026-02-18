"use client"
import ScreeningTestList from '@/components/layouts/ScreeningTestList'
import React from 'react'

const ScreeningTestPage = () => {
    return (
        <div className='max-w-4xl mx-auto'>
            <h1 className='text-4xl font-semibold'>Tests</h1>
            <ScreeningTestList />
        </div>
    )
}

export default ScreeningTestPage