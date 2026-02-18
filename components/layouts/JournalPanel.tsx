"use client";

import React, { useEffect, useState } from 'react'
import { getJournalBlocksServerAction, getJournalPageById } from '@/actions/journal';
import { Prisma } from '@/lib/generated/prisma/browser';
import Button from '../ui/button/Button';
import SecButton from '../ui/button/SecButton';
import EditableDescription from '../ui/editable/EditableDescription';
import EditableTitle from '../ui/editable/EditableTitle';

type JournalObjectsType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: string;
    jsonObj: Prisma.JsonValue;
    journalId: string;
}

type PropsType = {
    userId?: string,
    journalId: string,
}

const JournalPanel = (props: PropsType) => {
    const [currentDate, setCurrentDate] = useState<string>();
    const [currentPageTitle, setCurrentPageTitle] = useState<string>("");
    const [currentPageDescription, setCurrentPageDescription] = useState<string | null>("");
    const [journalObjects, setJournalObjects] = useState<JournalObjectsType[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editorZoneJournalBlockType, setEditorZoneJournalBlockType] = useState<string>('');
    const [editorZoneJournalBlock, setEditorZoneJournalBlock] = useState<JournalObjectsType | null>()
    const [newJournalObjects, setNewJournalObjects] = useState<JournalObjectsType[]>([]);

    function onButtonClick(type: string) {
        setIsAdding(true)
        setEditorZoneJournalBlockType(type)
    }  
    
    function onAddButtonClick() {
        if (!editorZoneJournalBlock) return;
        setNewJournalObjects([...newJournalObjects, editorZoneJournalBlock]);
        setIsAdding(false);
    }

    function onCancelButtonClick() {
        setEditorZoneJournalBlockType('');
        setEditorZoneJournalBlock(null);
        setIsAdding(false);
    }

    function createNewJournalBlock(type: string) {
        setEditorZoneJournalBlock({
            id: 'tempid-1201',
            journalId: props.journalId,
            type: type,
            jsonObj: {},
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }

    useEffect(() => {
        async function getJournalBlocks() {
            try {
                const pageRes = await getJournalPageById(props.journalId)
                const blocksRes = await getJournalBlocksServerAction(props.journalId)
                if (!blocksRes || blocksRes.success == false || !pageRes || blocksRes.data == undefined) return;
                setJournalObjects(blocksRes.data)
                const pageData = pageRes.data
                if (!pageData) return;
                const currentD = new Date(pageData.createdAt).toLocaleDateString()
                setCurrentDate(currentD)
                setCurrentPageTitle(pageData.title);
                setCurrentPageDescription(pageData.description)
            } catch (error) {
                console.log(error)
            }
        }

        getJournalBlocks()
    }, [])

    return (
        <div className='p-2 w-full overflow-y-scroll'>
            <div className='flex justify-between items-center my-4 '>
                {currentPageTitle && <EditableTitle intialValue={currentPageTitle}/>}
                <p>Date: {currentDate}</p>
            </div>
            <div className='text-gray-600'>
                {currentPageDescription && <EditableDescription intialValue={currentPageDescription} />}
            </div>
            <hr className='text-gray-600' />
            <div className='flex flex-col gap-2 py-2'>
                {
                    journalObjects && journalObjects.map((item, index) => {
                        const itemType = item.type
                        const stringobj = JSON.stringify(item.jsonObj, null, 2)
                        const reactobj = JSON.parse(stringobj);
                        const hhmm = new Date(item.createdAt).toLocaleTimeString(navigator.language, {
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                        return (
                            <div key={index} className='flex flex-col justify-between bg-(--color-sky-blue-50) min-h-20 px-4 py-2'>
                                <span>{itemType === 'NOTE' ? reactobj.text : null}</span>
                                <span className='text-right text-gray-500'>{hhmm}</span>
                            </div>
                        )
                    })
                }
                {
                    newJournalObjects && 
                    newJournalObjects.map((item: JournalObjectsType, index: number) => {
                        return (
                            <div key={index} className='flex flex-col justify-between bg-(--color-sky-blue-50) min-h-20 px-4 py-2'>
                                <span>{item.type === 'NOTE' ? JSON.parse(JSON.stringify(item.jsonObj)).text : null}</span>
                                <span className='text-right text-gray-500'>{new Date(item.createdAt).toLocaleTimeString(navigator.language, {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</span>
                            </div>
                        )
                    })
                    
                    
                }
                <div className={`flex gap-2 opacity-0 hover:opacity-100 justify-center ${isAdding ? 'hidden' : 'block'}`}>
                    <button onClick={() => {onButtonClick('NOTE'); createNewJournalBlock('NOTE')}}>note</button>
                    <button onClick={() => {onButtonClick('MOOD'); createNewJournalBlock('MOOD')}}>mood</button>
                    <button onClick={() => {onButtonClick('TODO'); createNewJournalBlock('TODO')}}>todo</button>
                </div>
                <div className={`${isAdding ? 'block' : 'hidden'}`}>
                    <div>
                        <select name="type-selector" id="type-selector" value={editorZoneJournalBlockType} onChange={(e) => { setEditorZoneJournalBlockType(e.target.value); createNewJournalBlock(editorZoneJournalBlockType)}}>
                            <option value="NOTE">Note</option>
                            <option value="MOOD">Mood</option>
                            <option value="TODO">Todo</option>
                            <option value="PROMPT">Prompt</option>
                        </select>
                    </div>
                    <div>
                        {editorZoneJournalBlockType == 'NOTE' && <textarea className='border-2 border-gray-300 focu'/>}
                        {editorZoneJournalBlockType == 'MOOD' && <><input type="checkbox" name="happy" id="happy" /></>}
                        {editorZoneJournalBlockType == 'TODO' && <textarea className='border-2 border-gray-300 focu'/>}
                    </div>
                    <div>
                        <SecButton onClick={onCancelButtonClick}>Cancel</SecButton>
                        <Button onClick={onAddButtonClick}>Add</Button>
                    </div>
                </div>
            </div>
            <div className='text-4xl'>Test element</div>
            <div className='text-4xl'>Test element</div>
            <div className='text-4xl'>Test element</div>
            <div className='text-4xl'>Test element</div>
            <div className='text-4xl'>Test element</div>
            <div className='text-4xl'>Test element</div>
            <div className='text-4xl'>Test element</div>
            <div className='text-4xl'>Test element</div>
            <div className='text-4xl'>Test element</div>
            <div className='text-4xl'>Test element</div>
            <div className='text-4xl'>Test element</div>
        </div>

    )
}

export default JournalPanel