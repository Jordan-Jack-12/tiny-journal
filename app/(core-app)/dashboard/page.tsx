import { getLoggedInUserFirstName } from '@/actions/user'
import getGreeting from '@/util/Greeting'
import React, { Suspense } from 'react'

const getUsersFirstName = async () => {
  return await getLoggedInUserFirstName();
}

const DashboardPage = async () => {
  return (
    <main className='p-4'>
      <div className='px-4 py-2 text-3xl font-semibold font-serif rounded'>
        {getGreeting()}, 
        <Suspense fallback={<p className='inline animate-pulse bg-sky-200 rounded text-transparent'>UserName</p>}>
          {getUsersFirstName()}!
        </Suspense>
      </div>
      <div>
        What is on your mind?
      </div>
      <div>
        What do you wanna do today?
      </div>
      <div>
        <p>Recent Journals</p>
      </div>
    </main>
  )
}

export default DashboardPage