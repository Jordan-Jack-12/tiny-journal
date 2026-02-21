import React, { useState } from 'react'
import Button from '../button/Button'

type PropsType = {
    addJournalBlock: (data: Record<string, string>) => void,
    onCancelButtonClick: () => void,
}

const EditNoteCard = (props: PropsType) => {
    const [text, setText] = useState("")

    function onAddButtonClick() {
        props.addJournalBlock({text: text});
        setText("");
    }

    return (
        <div className='flex flex-col gap-2 mt-2'>
            <textarea name="reason" id="content" value={text} className='w-full border border-gray-200 px-4 py-2' onChange={(e) => setText(e.target.value)}></textarea>
            <div className='flex justify-end gap-2'>
                <Button onClick={props.onCancelButtonClick}>Cancel</Button>
                <Button onClick={onAddButtonClick}>Add</Button>
            </div>
        </div>
    )
}

export default EditNoteCard