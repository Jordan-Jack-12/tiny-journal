import React, { useState } from 'react'
import Button from '../button/Button';
import SecButton from '../button/SecButton';
import { JsonObjType } from '@/types/journals.types';

type PropsType = {
    jsonObj: JsonObjType,
    addJournalBlock: (data: Record<string, string>) => void,
    onCancelButtonClick: () => void,
}

const EditMoodCard = (props: PropsType) => {
    const [mood, setMood] = useState(props.jsonObj && props.jsonObj.mood ? props.jsonObj.mood : "");
    const [text, setText] = useState(props.jsonObj && props.jsonObj.text ? props.jsonObj.text : "");
    
    function onAddButtonClick() {
        props.addJournalBlock({mood: mood, text: text});
        setMood("");
        setText("");
    }

    return (
        <div className='flex flex-col gap-2 mt-2'>
            <input 
            type="text" 
            value={mood} 
            onChange={(e) => setMood(e.target.value)} 
            className='border border-gray-200 rounded px-4 py-2' 
            placeholder='mood'
            />
            <textarea 
            name="reason" 
            id="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            className='border border-gray-200 rounded px-4 py-2'
            placeholder='what made you feel so...'
            ></textarea>
            <div className='flex justify-end gap-2'>
                <SecButton onClick={props.onCancelButtonClick}>Cancel</SecButton>
                <Button onClick={onAddButtonClick}>Add</Button>
            </div>
        </div>
    )
}

export default EditMoodCard