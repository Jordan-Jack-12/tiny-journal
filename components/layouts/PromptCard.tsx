import React, { memo } from 'react'

type PropsType = {
    id: string,
    time: string,
    text: string,
    prompt?: string,
    container: number,
    editBlock: ({ id, type, container }: { id: string, type: string, container: number }) => void,
    deleteBlock: (id: string) => void
}

const PromptCard = memo(function PromptCard(props: PropsType) {
    function handleEdit() {
        props.editBlock({
            id: props.id,
            type: 'PROMPT',
            container: props.container
        })
    }

    function onDelete() {
        props.deleteBlock(props.id)
    }

    return (
        <div className='group flex flex-col justify-between bg-white rounded-2xl border border-sky-100 px-4 py-2'>
            <div>
                <p>Prompt: {props.prompt}</p>
            </div>
            <div>
                <p>Response: {props.text}</p>
            </div>
            <div className='flex justify-end gap-2 items-center'>
                <div className='flex gap-2 invisible group-hover:visible'>
                    <button onClick={handleEdit}>
                        Edit
                    </button>
                    <button onClick={onDelete}>Delete</button></div>
                <span className='text-sm text-gray-500'>{props.time}</span>
            </div>
        </div>
    )
})

export default PromptCard