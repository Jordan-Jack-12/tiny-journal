import React, { useState } from 'react'
import Button from '../button/Button';

type PropsType = {
    addJournalBlock: (data: Record<string, string>) => void,
    onCancelButtonClick: () => void,
}

const EditMoodCard = (props: PropsType) => {
    const [mood, setMood] = useState("");
    const [content, setContent] = useState("");
    
    function onAddButtonClick() {
        props.addJournalBlock({mood: mood, content: content});
        setMood("");
        setContent("");
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
            id="content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className='border border-gray-200 rounded px-4 py-2'
            placeholder='what made you feel so...'
            ></textarea>
            <div className='flex justify-end gap-2'>
                <Button onClick={props.onCancelButtonClick}>Cancel</Button>
                <Button onClick={onAddButtonClick}>Add</Button>
            </div>
        </div>
    )
}

export default EditMoodCard