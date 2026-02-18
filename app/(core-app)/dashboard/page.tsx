import getGreeting from '@/util/Greeting'
import React from 'react'

const DashboardPage = () => {
  return (
    <main>
      <div className='px-4 py-2 text-3xl rounded bg-(--color-sky-blue-50)'>
        {getGreeting()}, User!
      </div>
      <div>
        What is on your mind?
      </div>
      <div>
        What do you wanna do today?
      </div>
      <div>
        What are you grateful for today?
      </div>
    </main>
  )
}

export default DashboardPage