'use client';
import { QuestionAndOptionsType, ResponseOptionType } from '@/types/screening-test.types';
import React, { useState } from 'react'
import Button from '../ui/button/Button';
import { getResult } from '@/actions/screening-test.actions';
import LinkButton from '../ui/button/LinkButton';

type PropsType = {
    data: QuestionAndOptionsType[] | null,
    test_id: string
}

type ResponseType = Record<string, string>;

const ScreeningTestPanel = (prop: PropsType) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [questionsAndOptions] = useState<QuestionAndOptionsType[] | null>(prop.data);
    const [response, setResponse] = useState<ResponseType>({});
    const [result, setResult] = useState("");

    const handleTestRetake = () => {
        window.location.reload();
    }

    const handleNext = () => {
        if (!questionsAndOptions) return;
        if (currentIndex < questionsAndOptions.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }

    const handleRespone = (question_id: string, option_id: string) => {
        const newOption: ResponseType = {}
        newOption[question_id] = option_id
        const newResponse = { ...response, ...newOption }
        setResponse(newResponse)
    }

    const handleSubmit = async () => {
        try {
            const options: string[] = [];
            Object.values(response).forEach(value => {
                options.push(value);
            })
            const res = await getResult(options, prop.test_id)
            if (!res) return;
            setResult(res.text);

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='max-w-4xl mx-auto'>
            {result.length < 1 ?
                <div>
                    <div className='text-xl py-2 px-4 min-h-6xl'> {currentIndex + 1}.  
                        {questionsAndOptions && questionsAndOptions[currentIndex].text}
                    </div>
                    <div className='text-base'>
                        {questionsAndOptions && questionsAndOptions[currentIndex].options.map((item: ResponseOptionType) => {
                            return (
                                <div onClick={() => handleRespone(item.questionId, item.id)} key={item.id} className='flex gap-2 px-4 py-2 bg-transparent hover:bg-green-900/20 rounded'>
                                    <input type="checkbox" checked={(response[item.questionId] == item.id)} readOnly />
                                    <p>
                                        {item.text} = {item.score}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='px-4 flex gap-2'>
                        <Button onClick={handlePrevious} disabled={currentIndex == 0 ? true : false}>Previous</Button>
                        <Button onClick={handleNext} disabled={currentIndex == (questionsAndOptions && questionsAndOptions.length - 1) ? true : false}>Next</Button>
                    </div>

                    <div className='px-4'>
                        <Button onClick={handleSubmit} disabled={currentIndex == (questionsAndOptions && questionsAndOptions.length - 1) ? false : true}>Submit</Button>
                    </div>
                </div>
                :
                <div className='flex flex-col'>
                    <div>
                        <p>Result: </p>
                        <h1 className='text-xl'>{result}</h1>
                    </div>
                    <div className='flex gap-2'>
                        <LinkButton href='/screening-test'>Go To Home</LinkButton>
                        <Button onClick={handleTestRetake}>Retake Test</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ScreeningTestPanel