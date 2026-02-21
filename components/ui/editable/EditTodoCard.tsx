import React, { useState } from 'react'
import Button from '../button/Button'

type PropsType = {
    addJournalBlock: (data: Record<string, string | boolean>) => void,
    onCancelButtonClick: () => void,
}

const EditTodoCard = (props: PropsType) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [text, setText] = useState("");

    function onAddButtonClick() {
        props.addJournalBlock({ text: text, checked: checked });
        setChecked(false);
        setText("");
    }

    return (
        <div className='flex flex-col gap-2 mt-2'>
            <div className='flex items-center justify-start gap-2'>
                <input 
                type="checkbox" 
                name="" 
                id="" 
                checked={checked} 
                onChange={(e) => setChecked(e.target.checked)} 
                className='h-8 w-8'
                />
                <input 
                type='text'
                name="reason" 
                id="content" 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                placeholder='todo'
                className='border border-gray-200 rounded px-4 py-2 w-full'
                />

            </div>
            <div className='flex justify-end gap-2'>
                <Button onClick={props.onCancelButtonClick}>Cancel</Button>
                <Button onClick={onAddButtonClick}>Add</Button>
            </div>
        </div>
    )
}

export default EditTodoCard