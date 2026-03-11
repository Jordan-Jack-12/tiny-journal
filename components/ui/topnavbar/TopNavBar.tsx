import Link from 'next/link'
import React from 'react'

const TopNavBar = () => {
  return (
    <nav className='flex sticky top-0 w-full h-16 justify-end items-center px-4 py-2 bg-sky-300'>
        <div className='flex items-center gap-2'>
            <div>
                Name
            </div>
            <div className='h-8 w-8 rounded-full bg-(--color-sky-blue-500)'>
            </div>
        </div>
    </nav>
  )
}

export default TopNavBar