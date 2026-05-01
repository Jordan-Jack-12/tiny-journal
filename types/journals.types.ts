export type JsonObjType = {
    text: string,
    mood?: string,
    prompt?: string,
    checked?: boolean
}

export type JournalBlockType = {
    id: string;
    created_at: Date;
    updated_at: Date;
    type: string;
    jsonObj: JsonObjType;
    journalId: string;
}
