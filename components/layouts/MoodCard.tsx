import React from 'react'

type MoodCardType = {
  time: string,
  mood: string,
  content: string,
}

const MoodCard = ({ content, mood, time }: MoodCardType) => {
  return (
    <div className='w-full p-4 bg-sky-50 rounded'>
      <div>
        <p>{mood}</p>
      </div>
      <div>
        <h2>Reason: {content}</h2>
      </div>
      <div className='flex justify-end'>
        <p className='text-sm'>{time}</p>
      </div>
    </div>
  )
}

export default MoodCard