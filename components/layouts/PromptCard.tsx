import React from 'react'

type PropsType = {
    time: string,
    prompt: string,
    response: string
}

const PromptCard = (props: PropsType) => {
    return (
        <div className='flex flex-col justify-between bg-sky-50 min-h-20 px-4 py-2'>
            <div>
                <p>Prompt: {props.prompt}</p>
            </div>
            <div>
                <p>Response: {props.response}</p>
            </div>
            <div className='flex justify-end'>
                <span className='text-sm'>{props.time}</span>
            </div>
        </div>
    )
}

export default PromptCard