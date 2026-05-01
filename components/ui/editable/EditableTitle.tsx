"use client"

import { updateJournalTitleById } from '@/actions/journal'
import { Check, X } from 'lucide-react'
import React, { useState } from 'react'

type PropsType = {
    intialValue: string,
    journalId: string
}

const EditableTitle = (props: PropsType) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [value, setValue] = useState<string>(props.intialValue);

    function handleCross() {
        setValue(props.intialValue);
        setIsEditing(false);
    }

    async function handleUpdate() {
        const changed = (props.intialValue !== value);
        try {
            if (!changed) return;
            const res = await updateJournalTitleById({ journalId: props.journalId, title: value });
            if (!res?.success) return;
            if (res.data?.title) setValue(res.data.title);
        } catch (error) {
            console.log(error)
        }
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <div className='flex justify-start gap-2' >
                <input
                    value={value}
                    autoFocus
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    className='text-3xl bg-sky-100 px-2 rounded-t-md border-b-2 border-sky-300 font-semibold outline-0'
                />

                <button onClick={handleUpdate} className='p-2 rounded-full font-semibold bg-green-200 text-green-600 cursor-pointer'>
                    <Check size={18} />
                </button>
                <button onClick={handleCross} className='p-2 rounded-full font-semibold bg-red-200 text-red-600 cursor-pointer'>
                    <X size={18} />
                </button>
            </div>

        )
    }
    return (
        <h1 onClick={() => setIsEditing(true)} className='text-3xl border-b-2 border-transparent font-semibold'>{value}</h1>
    )
}

export default EditableTitle