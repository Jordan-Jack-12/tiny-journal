"use client"

import React, { useState } from 'react'

type PropsType = {
    intialValue: string | null
}

const EditableDescription = (props: PropsType) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [value, setValue] = useState<string | null>(props.intialValue);
    if (!value) return 
    if (isEditing) {
        return (
            <input 
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
            type="text" 
            />
        )
    }
    return (
        <p onClick={() => setIsEditing(true)}>{value}</p>
    )
}

export default EditableDescription