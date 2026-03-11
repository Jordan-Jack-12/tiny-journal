import React, { useState } from 'react'
import Button from '../button/Button'
import SecButton from '../button/SecButton';
import { JsonObjType } from '@/types/journals.types';

type PropsType = {
    jsonObj: JsonObjType,
    addJournalBlock: (data: Record<string, string | boolean>) => void,
    onCancelButtonClick: () => void,
}

const EditTodoCard = (props: PropsType) => {
    const [checked, setChecked] = useState<boolean>(props.jsonObj && props.jsonObj.checked ? props.jsonObj.checked : false);
    const [text, setText] = useState(props.jsonObj && props.jsonObj.text ? props.jsonObj.text : "");

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
                <SecButton onClick={props.onCancelButtonClick}>Cancel</SecButton>
                <Button onClick={onAddButtonClick}>Add</Button>
            </div>
        </div>
    )
}

export default EditTodoCard