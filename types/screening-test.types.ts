export type QuestionType = {
    id: string,
    text: string,
    test_id: string
}

export type ResponseOptionType = {
    id: string,
    text: string,
    score: number,
    question_id: string,
}

export type ResponseOptionWithCheckBoxType = {
    id: string,
    checked: boolean,
    text: string,
    score: number,
    question_id: string,
    test_id: string,
}

export type QuestionAndOptionsType = QuestionType & {option: ResponseOptionType[]};

export type QuestionAndOptionsWithCheckBoxType = QuestionType & {option: ResponseOptionWithCheckBoxType[]}