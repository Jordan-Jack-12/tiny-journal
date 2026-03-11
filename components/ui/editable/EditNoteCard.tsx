import React, { useState } from 'react'
import Button from '../button/Button'
import { JsonObjType } from '@/types/journals.types'
import SecButton from '../button/SecButton'

type PropsType = {
    jsonObj: JsonObjType,
    addJournalBlock: (data: Record<string, string>) => void,
    onCancelButtonClick: () => void,
}

const EditNoteCard = (props: PropsType) => {
    const [text, setText] = useState(props.jsonObj && props.jsonObj.text ? props.jsonObj.text : "")

    function onAddButtonClick() {
        if (!props.jsonObj) return;
        props.addJournalBlock({text: text});
        setText("");
    }

    return (
        <div className='flex flex-col gap-2 mt-2'>
            <textarea name="reason" id="content" value={text} className='w-full border border-gray-200 px-4 py-2' onChange={(e) => setText(e.target.value)}></textarea>
            <div className='flex justify-end gap-2'>
                <SecButton onClick={props.onCancelButtonClick}>Cancel</SecButton>
                <Button onClick={onAddButtonClick}>Add</Button>
            </div>
        </div>
    )
}

export default EditNoteCard