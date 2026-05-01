import { getLoggedInUserFirstName } from '@/actions/user'
import getGreeting from '@/util/Greeting'
import React from 'react'

const DashboardPage = async () => {
  const first_name = await getLoggedInUserFirstName();
  return (
    <main>
      <div className='px-4 py-2 text-3xl rounded bg-(--color-sky-blue-50)'>
        {getGreeting()}, {first_name}!
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