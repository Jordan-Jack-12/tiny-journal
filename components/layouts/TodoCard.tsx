import React, { useState } from 'react'


type PropsType = {
    checked: boolean,
    text: string,
    time: string
}

const TodoCard = (props: PropsType) => {
    const [checked, setChecked] = useState(props.checked);
    return (
        <div className='flex gap-2 justify-between bg-sky-50 px-4 py-2'>
            <div className='flex gap-2 items-center'>
                <input 
                type="checkbox" 
                checked={checked} 
                onChange={(e) => setChecked(e.target.checked)} 
                className='w-4 h-4'
                />
                <p>{props.text}</p>
            </div>
            <div>
                <span className='text-sm'>{props.time}</span>
            </div>
        </div>
    )
}

export default TodoCard