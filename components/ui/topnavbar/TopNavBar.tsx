import Link from 'next/link'
import React from 'react'

const TopNavBar = () => {
  return (
    <nav className='flex w-full h-16 justify-between items-center px-4 py-2 bg-(--color-sky-blue-200)'>
        <Link href={"/"}><p className='text-xl font-semibold'>Alvera</p></Link>
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