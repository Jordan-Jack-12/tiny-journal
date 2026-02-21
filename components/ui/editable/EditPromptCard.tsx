import React, { useState } from 'react'
import Button from '../button/Button';

type PropsType = {
    addJournalBlock: (data: Record<string, string>) => void,
    onCancelButtonClick: () => void,
}

const EditPromptCard = (props: PropsType) => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    function onAddButtonClick() {
        props.addJournalBlock({ prompt: prompt, response: response });
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
                <Button onClick={props.onCancelButtonClick}>Cancel</Button>
                <Button onClick={onAddButtonClick}>Add</Button>
            </div>
        </div>
    )
}

export default EditPromptCard