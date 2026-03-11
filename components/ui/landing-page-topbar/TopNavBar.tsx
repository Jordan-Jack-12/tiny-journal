import Link from 'next/link'
import React from 'react'

function TopNavBar() {
    return (
        <nav className='flex justify-between bg-sky-300 h-16 items-center p-4'>
            <div>
                <h1 className='text-3xl font-semibold'>Tiny Journal</h1>
            </div>
            <div>
                <ul className='flex gap-2'>
                    <li><Link href={'/'}>Home</Link></li>
                    <li><Link href={'/'}>Demo</Link></li>
                    <li><Link href={'/'}>Features</Link></li>
                    <li><Link href={'/'}>Pricing</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default TopNavBar