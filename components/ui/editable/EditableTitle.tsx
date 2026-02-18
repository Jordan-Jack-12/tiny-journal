"use client"

import React, { useState } from 'react'

type PropsType = {
    intialValue: string
}

const EditableTitle = (props: PropsType) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [value, setValue] = useState<string>(props.intialValue);
    console.log(value)
    if (isEditing) {
        return (
            <input 
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
            type="text"
            className='text-3xl border-0 font-semibold'
            />
        )
    }
    return (
        <h1 onClick={() => setIsEditing(true)} className='text-3xl font-semibold'>{value}</h1>
    )
}

export default EditableTitle