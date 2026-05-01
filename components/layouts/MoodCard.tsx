import React, { memo } from 'react'

type MoodCardType = {
  id: string,
  time: string,
  mood?: string,
  text: string,
  container: number,
  editBlock: ({ id, type, container }: { id: string, type: string, container: number }) => void,
  deleteBlock: (id: string) => void
}

const MoodCard = memo(function MoodCard({ id, text, mood, time, container, editBlock, deleteBlock }: MoodCardType) {
  function handleEdit() {
    editBlock({
      id: id,
      type: 'MOOD',
      container: container
    })
  }

  function onDelete() {
    deleteBlock(id)
  }

  return (
    <div className='group w-full p-4 bg-white rounded-2xl border border-sky-100' >
      <div>
        <p>{mood}</p>
      </div>
      <div>
        <h2>Reason: {text}</h2>
      </div>
      <div className='flex justify-end gap-2 items-center'>
        <div className='flex text-sm font-normal gap-2 invisible group-hover:visible'>
          <button onClick={handleEdit} className='cursor-pointer'>
            Edit
          </button>
          <button onClick={onDelete} className='text-red-500 cursor-pointer'>Delete</button></div>
        <span className='text-sm text-gray-500'>{time}</span>
      </div>
    </div >
  )
})

export default MoodCard