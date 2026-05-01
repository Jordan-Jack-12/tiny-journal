import { updateJournalBlockServerAction } from '@/actions/journal';
import { Strikethrough } from 'lucide-react';
import React, { memo, useEffect, useState } from 'react'


type PropsType = {
    id: string,
    checked?: boolean,
    text: string,
    container: number,
    time: string,
    editBlock: ({ id, type, container }: { id: string, type: string, container: number }) => void,
    deleteBlock: (id: string) => void
}

const TodoCard = memo(function TodoCard(props: PropsType) {
    const [checked, setChecked] = useState(props.checked);
    function handleEdit() {
        props.editBlock({
            id: props.id,
            type: 'TODO',
            container: props.container
        })
    }

    function onDelete() {
        props.deleteBlock(props.id)
    }

    useEffect(() => {
        async function handleCheckBox() {
            if (props.id.slice(0, 4) === 'temp') return;
            try {
                await updateJournalBlockServerAction({ id: props.id, jsonObj: { text: props.text, checked: checked }, updatedAt: new Date() })
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                console.log("something went wrong!")
            }
        }
        handleCheckBox();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked])

    return (
        <div className='group flex gap-2 justify-between bg-white rounded-2xl border border-sky-100 px-4 py-2'>
            <div className='flex gap-2 items-center'>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    className='w-4 h-4 bg-sky-500 accent-sky-300'
                />
                {checked ? <p><del>{props.text}</del></p> : <p>{props.text}</p>}
            </div>
            <div className='flex justify-end gap-2 items-center'>
                <div className='flex text-sm font-normal gap-2 invisible group-hover:visible'>
                    <button onClick={handleEdit} className='cursor-pointer'>
                        Edit
                    </button>
                    <button onClick={onDelete} className='text-red-500 cursor-pointer'>Delete</button></div>
                <span className='text-sm text-gray-500'>{props.time}</span>
            </div>
        </div>
    )
})

export default TodoCard