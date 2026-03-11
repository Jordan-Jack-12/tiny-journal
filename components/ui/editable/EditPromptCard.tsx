import React, { useState } from 'react'
import Button from '../button/Button';
import SecButton from '../button/SecButton';
import { JsonObjType } from '@/types/journals.types';

type PropsType = {
    jsonObj: JsonObjType,
    addJournalBlock: (data: Record<string, string>) => void,
    onCancelButtonClick: () => void,
}

const EditPromptCard = (props: PropsType) => {
    const [prompt, setPrompt] = useState(props.jsonObj && props.jsonObj.prompt ? props.jsonObj.prompt : "");
    const [response, setResponse] = useState(props.jsonObj && props.jsonObj.text ? props.jsonObj.text : "");

    function onAddButtonClick() {
        props.addJournalBlock({ prompt: prompt, text: response });
        setPrompt("");
        setResponse("");
    }

    return (
        <div className='flex flex-col gap-2 mt-2'>
            <div className='flex flex-col gap-2'>
                <input 
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder='prompt' 
                className='border border-gray-200 rounded px-4 py-2'
                />
                <textarea 
                name="reason" 
                id="content" 
                value={response} 
                onChange={(e) => setResponse(e.target.value)} 
                placeholder='reponse..'
                className='border border-gray-200 rounded px-4 py-2'
                ></textarea>
            </div>
            <div className='flex justify-end gap-2'>
                <SecButton onClick={props.onCancelButtonClick}>Cancel</SecButton>
                <Button onClick={onAddButtonClick}>Add</Button>
            </div>
        </div>
    )
}

export default EditPromptCard