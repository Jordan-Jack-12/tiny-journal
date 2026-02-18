export type QuestionType = {
    id: string,
    text: string,
    testId: string
}

export type ResponseOptionType = {
    id: string,
    text: string,
    score: number,
    questionId: string,
}

export type ResponseOptionWithCheckBoxType = {
    id: string,
    checked: boolean,
    text: string,
    score: number,
    questionId: string,
}

export type QuestionAndOptionsType = QuestionType & {options: ResponseOptionType[]};

export type QuestionAndOptionsWithCheckBoxType = QuestionType & {options: ResponseOptionWithCheckBoxType[]}