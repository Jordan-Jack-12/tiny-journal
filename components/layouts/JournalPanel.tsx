"use client";

import React, { useRef, useState } from 'react'
import { createManyNewJournalBlocksServerAction, deleteManyJournalBlockByIdServerAction, getJournalBlocksServerAction, updateJournalBlockServerAction } from '@/actions/journal';
import EditableDescription from '../ui/editable/EditableDescription';
import EditableTitle from '../ui/editable/EditableTitle';
import NoteCard from './NoteCard';
import MoodCard from './MoodCard';
import EditMoodCard from '../ui/editable/EditMoodCard';
import EditNoteCard from '../ui/editable/EditNoteCard';
import EditTodoCard from '../ui/editable/EditTodoCard';
import EditPromptCard from '../ui/editable/EditPromptCard';
import TodoCard from './TodoCard';
import PromptCard from './PromptCard';
import { JournalBlockType, JsonObjType } from '@/types/journals.types';
import { CirclePlus } from 'lucide-react';
import SecButton from '../ui/button/SecButton';
import Button from '../ui/button/Button';
import { notFound } from 'next/navigation';
import { JournalBlockSchema } from '@/lib/zodSchemas';
import { redisTest } from '@/actions/session';

type PropsType = {
    userId?: string,
    journalId: string,
    title: string,
    description: string | null,
    date: string,
    journalBlocks: JournalBlockType[]
}

const JournalPanel = (props: PropsType) => {
    const [journalBlocks, setJournalBlocks] = useState<JournalBlockType[]>(props.journalBlocks);
    const [editedJournalObjects, setEditedJournalObjects] = useState<Record<string, Pick<JournalBlockType, 'jsonObj'>>>({});
    const [deletedIds, setDeletedIds] = useState<string[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingContainer, setEditingContainer] = useState(3);
    const [editorZoneJournalBlockType, setEditorZoneJournalBlockType] = useState<string>('');
    const [editorZoneJournalBlock, setEditorZoneJournalBlock] = useState<JournalBlockType | null>(null);
    const [newJournalBlocks, setNewJournalBlocks] = useState<JournalBlockType[]>([]);

    const hiddenDivRef = useRef<HTMLDivElement>(null);

    const changed = newJournalBlocks.length > 0 || Object.keys(editedJournalObjects).length > 0 || deletedIds.length > 0;

    function scrollToBottom() {
        const ref = hiddenDivRef.current;
        if (ref) {
            ref.scrollIntoView({ behavior: "instant", block: "end" });
        }
    }

    function onButtonClick(type: string) {
        setIsAdding(true)
        setEditorZoneJournalBlockType(type)
    }

    async function onAddButtonClick(data: Record<string, string | boolean>) {
        if (!editorZoneJournalBlock) return;
        const currentBlock = { ...editorZoneJournalBlock, jsonObj: { ...editorZoneJournalBlock.jsonObj, ...data } };
        if (isEditing) {
            if (editingContainer == 0 || editingContainer == 2) {
                setEditedJournalObjects({ ...editedJournalObjects, [editorZoneJournalBlock.id]: currentBlock })
            } else {
                const restData = newJournalBlocks.filter((i) => i.id != currentBlock.id);
                setNewJournalBlocks([...restData, currentBlock]);
            }
        } else {
            setNewJournalBlocks([...newJournalBlocks, currentBlock]);
        }
        setIsAdding(false);
        setIsEditing(false);
        setEditorZoneJournalBlock(null);
        setEditorZoneJournalBlockType('');
    }

    function onCancelButtonClick() {
        setEditorZoneJournalBlockType('');
        setEditorZoneJournalBlock(null);
        setIsAdding(false);
        setIsEditing(false);
    }

    function createNewJournalBlock(type: string) {
        let jsonObj: JsonObjType = { text: '' };
        switch (type) {
            case 'NOTE':
                jsonObj = { text: '' };
            case 'MOOD':
                jsonObj = { mood: '', text: '' };
            case 'TODO':
                jsonObj = { text: '', checked: false };
            case 'PROMPT':
                jsonObj = { prompt: '', text: '' };
        }
        const tempId = crypto.randomUUID()
        setEditorZoneJournalBlock({
            id: 'temp-' + tempId,
            journalId: props.journalId,
            type: type,
            jsonObj: jsonObj,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        console.log("created new: ", editorZoneJournalBlock)
        console.log(newJournalBlocks)
    }

    const editJournalBlock = ({ id, type, container }: { id: string, type: string, container: number }) => {
        setEditorZoneJournalBlockType(type);
        setIsEditing(true);
        setEditingContainer(container);
        let data: JournalBlockType | undefined;
        switch (container) {
            case 0:
                data = journalBlocks.find((i) => i.id === id);
                if (!data) return;
                setEditorZoneJournalBlock({
                    id: data.id,
                    journalId: props.journalId,
                    type: data.type,
                    jsonObj: data.jsonObj,
                    createdAt: data.createdAt,
                    updatedAt: new Date(),
                })
                setEditingContainer(0);
                break;
            case 1:
                data = newJournalBlocks.find((i) => i.id === id);
                if (!data) return;
                setEditingContainer(1);
                setEditorZoneJournalBlock({
                    id: data.id,
                    journalId: props.journalId,
                    type: data.type,
                    jsonObj: data.jsonObj,
                    createdAt: data.createdAt,
                    updatedAt: new Date(),
                })
                break;
        }
        console.log("edit: ", editorZoneJournalBlock)
    }

    const deleteJournalBlock = (id: string) => {
        if (id.slice(0, 4) === 'temp') {
            setNewJournalBlocks(newJournalBlocks.filter((item) => item.id !== id))
        } else {
            setDeletedIds([...deletedIds, id])
        }
    }

    async function onSave() {
        try {
            const res = await createManyNewJournalBlocksServerAction({ journalBlocks: newJournalBlocks });
            if (!res.success) {
                console.log(res.message);
            }

            Object.entries(editedJournalObjects).forEach(async (item) => {
                await updateJournalBlockServerAction({ id: item[0], jsonObj: item[1].jsonObj, updatedAt: new Date() })
            })

            const res2 = await deleteManyJournalBlockByIdServerAction(deletedIds);
            if (!res2.success) {
                console.log(res2.message);
            }

            const journalBlocks = await getJournalBlocksServerAction(props.journalId);
            if (!journalBlocks || journalBlocks.success == false) return notFound();
            const data = (journalBlocks.data != undefined && journalBlocks.data != null ? journalBlocks.data : [])
            const r = JournalBlockSchema.safeParse(data)
            if (r.success) setJournalBlocks(r.data);
            setEditedJournalObjects({});
            setNewJournalBlocks([]);
            setDeletedIds([]);
        } catch (error) {
            console.log(error)
        }
    }

    function onCancel() {
        setDeletedIds([]);
        setEditedJournalObjects({});
        setNewJournalBlocks([]);
    }

    return (
        <div className='p-2 w-full'>
            <div className='flex justify-between items-center my-4 '>
                {changed && <div className='flex gap-2'><SecButton onClick={onCancel}>Cancel</SecButton> <Button onClick={onSave}>Save</Button> </div>}
            </div>
            <div className='flex justify-between items-center my-4 '>
                {<EditableTitle journalId={props.journalId} intialValue={props.title} />}
                <p>Date: {props.date}</p>
            </div>
            <div className='text-gray-600'>
                <EditableDescription journalId={props.journalId} intialValue={props.description} />
            </div>
            <hr className='text-gray-600' />
            <div className='flex flex-col gap-2 py-2'>
                {
                    journalBlocks && journalBlocks.map((item, index) => {
                        if (deletedIds.includes(item.id)) return;
                        const itemType = item.type

                        const hhmm = new Date(item.createdAt).toLocaleTimeString(navigator.language, {
                            hour: '2-digit',
                            minute: '2-digit'
                        })

                        const data = editedJournalObjects[item.id] && editedJournalObjects[item.id].jsonObj != undefined ? { ...item.jsonObj, ...editedJournalObjects[item.id].jsonObj } : item.jsonObj
                        const edited = (editedJournalObjects[item.id] ? 2 : 0)
                        switch (itemType) {
                            case 'NOTE':
                                return <NoteCard key={index} id={item.id} container={edited} time={hhmm} text={data.text} editBlock={editJournalBlock} deleteBlock={deleteJournalBlock} />
                            case 'MOOD':
                                return <MoodCard key={index} id={item.id} container={edited} time={hhmm} text={data.text} mood={data.mood} editBlock={editJournalBlock} deleteBlock={deleteJournalBlock} />
                            case 'TODO':
                                return <TodoCard key={index} id={item.id} container={edited} time={hhmm} text={data.text} checked={data.checked} editBlock={editJournalBlock} deleteBlock={deleteJournalBlock} />
                            case 'PROMPT':
                                return <PromptCard key={index} id={item.id} container={edited} time={hhmm} prompt={data.prompt} text={data.text} editBlock={editJournalBlock} deleteBlock={deleteJournalBlock} />
                        }
                    })
                }
                {
                    newJournalBlocks &&
                    newJournalBlocks.map((item: JournalBlockType, index: number) => {
                        const itemType = item.type;
                        const jsonObj = JSON.parse(JSON.stringify(item.jsonObj));
                        const hhmm = new Date(item.createdAt).toLocaleTimeString(navigator.language, {
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                        switch (itemType) {
                            case 'NOTE':
                                return <NoteCard key={index} id={item.id} container={1} time={hhmm} text={jsonObj.text} editBlock={editJournalBlock} deleteBlock={deleteJournalBlock} />
                            case 'MOOD':
                                return <MoodCard key={index} id={item.id} container={1} time={hhmm} text={jsonObj.text} mood={jsonObj.mood} editBlock={editJournalBlock} deleteBlock={deleteJournalBlock} />
                            case 'TODO':
                                return <TodoCard key={index} id={item.id} container={1} time={hhmm} text={jsonObj.text} checked={jsonObj.checked} editBlock={editJournalBlock} deleteBlock={deleteJournalBlock} />
                            case 'PROMPT':
                                return <PromptCard key={index} id={item.id} container={1} time={hhmm} prompt={jsonObj.prompt} text={jsonObj.text} editBlock={editJournalBlock} deleteBlock={deleteJournalBlock} />
                        }
                    })


                }
                <div className={`flex gap-2 p-2 border border-gray-200 rounded-full bg-white justify-center sticky bottom-2 ${(isAdding || isEditing) ? 'hidden' : 'block'}`}>
                    <button className='flex gap-2 items-center py-2 px-4 hover:bg-sky-200 rounded-full' onClick={() => { onButtonClick('NOTE'); createNewJournalBlock('NOTE'); scrollToBottom() }}><CirclePlus size={18} /> note</button>
                    <button className='flex gap-2 items-center py-2 px-4 hover:bg-sky-200 rounded-full' onClick={() => { onButtonClick('MOOD'); createNewJournalBlock('MOOD'); scrollToBottom() }}><CirclePlus size={18} /> mood</button>
                    <button className='flex gap-2 items-center py-2 px-4 hover:bg-sky-200 rounded-full' onClick={() => { onButtonClick('TODO'); createNewJournalBlock('TODO'); scrollToBottom() }}><CirclePlus size={18} /> todo</button>
                    <button className='flex gap-2 items-center py-2 px-4 hover:bg-sky-200 rounded-full' onClick={() => { onButtonClick('PROMPT'); createNewJournalBlock('PROMPT'); scrollToBottom() }}><CirclePlus size={18} /> prompt</button>
                </div>
                <div className={`${(isAdding || isEditing) ? 'block' : 'hidden'} sticky bottom-0 bg-white p-4 border-2 border-gray-200 rounded`}>
                    <div>
                        <select name="type-selector" id="type-selector" value={editorZoneJournalBlockType} onChange={(e) => { setEditorZoneJournalBlockType(e.target.value); createNewJournalBlock(editorZoneJournalBlockType) }}
                            className='bg-gray-200 rounded px-4 py-2 '
                        >
                            <option value="NOTE">Note</option>
                            <option value="MOOD">Mood</option>
                            <option value="TODO">Todo</option>
                            <option value="PROMPT">Prompt</option>
                        </select>
                    </div>
                    <div>
                        {editorZoneJournalBlockType == 'NOTE' && <EditNoteCard jsonObj={editorZoneJournalBlock ? editorZoneJournalBlock.jsonObj : { text: '' }} onCancelButtonClick={onCancelButtonClick} addJournalBlock={onAddButtonClick} />}
                        {editorZoneJournalBlockType == 'MOOD' && <EditMoodCard jsonObj={editorZoneJournalBlock ? editorZoneJournalBlock.jsonObj : { text: '', mood: '' }} onCancelButtonClick={onCancelButtonClick} addJournalBlock={onAddButtonClick} />}
                        {editorZoneJournalBlockType == 'TODO' && <EditTodoCard jsonObj={editorZoneJournalBlock ? editorZoneJournalBlock.jsonObj : { text: '', checked: false }} onCancelButtonClick={onCancelButtonClick} addJournalBlock={onAddButtonClick} />}
                        {editorZoneJournalBlockType == 'PROMPT' && <EditPromptCard jsonObj={editorZoneJournalBlock ? editorZoneJournalBlock.jsonObj : { text: '', prompt: '' }} onCancelButtonClick={onCancelButtonClick} addJournalBlock={onAddButtonClick} />}
                    </div>
                </div>
            </div>
            <Button onClick={redisTest}>Test redis</Button>
            <div ref={hiddenDivRef} className='empty-div'></div>
        </div>

    )
}

export default JournalPanel