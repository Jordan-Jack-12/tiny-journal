import React, { memo } from 'react'


type PropsType = {
    content: string,
    time: string
}

const NoteCard = memo(function NoteCard(props: PropsType) {
    return (
        <div className='flex flex-col justify-between bg-sky-50 min-h-20 px-4 py-2'>
            <div>
                <p>{props.content}</p>
            </div>
            <div className='flex justify-end'>
                <span className='text-sm'>{props.time}</span>
            </div>
        </div>
    )
})

export default NoteCard