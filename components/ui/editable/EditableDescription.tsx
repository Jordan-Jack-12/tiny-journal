"use client"

import { updateJournalDescriptionById } from '@/actions/journal'
import { Check, CirclePlus, X } from 'lucide-react'
import React, { useState } from 'react'

type PropsType = {
    journalId: string,
    intialValue: string | null
}

const EditableDescription = (props: PropsType) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [value, setValue] = useState<string | null>(props.intialValue);

    function handleCross() {
            setValue(props.intialValue);
            setIsEditing(false);
        }
    
        async function handleUpdate() {
            const changed = (props.intialValue !== value);
            try {
                if (!changed || value == null) return;
                const res = await updateJournalDescriptionById({ journalId: props.journalId, description: value });
                if (!res?.success) return console.log(res?.message);
                if (res.data?.description) setValue(res.data.description);
            } catch (error) {
                console.log(error)
            }
            setIsEditing(false);
        }

    if (isEditing) {
        return (
            <div className='flex justify-start gap-2' >
                <input
                    value={value ? value : ''}
                    autoFocus
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    className='outline-0 border-b-2 border-sky-300 bg-sky-100 px-2 rounded-t-md'
                />
                <button onClick={handleUpdate} className='p-2 rounded-full font-semibold bg-green-200 text-green-600 cursor-pointer'>
                    <Check size={12} />
                </button>
                <button onClick={handleCross} className='p-2 rounded-full font-semibold bg-red-200 text-red-600 cursor-pointer'>
                    <X size={12} />
                </button>
            </div>

        )
    }
    return (
        <p className='text-gray-500 flex gap-2 border-b-4  border-transparent items-center' onClick={() => setIsEditing(true)}>{value ? value : <><CirclePlus size={18} /> Add Description</>}</p>
    )
}

export default EditableDescription