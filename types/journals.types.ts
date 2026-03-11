export type JsonObjType = {
    text: string,
    mood?: string,
    prompt?: string,
    checked?: boolean
}

export type JournalBlockType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: string;
    jsonObj: JsonObjType;
    journalId: string;
}
