'use client';

import React, { useState } from 'react'

type ItemListType = {
    id: string,
    order: number,
}

const CreateTestPage = () => {
    const [itemsList, setItemsList] = useState<ItemListType[]>([]);

    const handleAddNewQuestion = () => {
        setItemsList(prev => ([...prev, {id: 'asdfsd', order: 0}]))
    };

    return (
        <div>
            <h1 className='text-xl'>Create Test</h1>
            <div className='flex flex-col gap-2'>
                <label htmlFor="test-name">Test Name</label>
                <input className='border-2 border-green-300' />
                <label htmlFor="description">Description</label>
                <input type="text" />
                <button onClick={handleAddNewQuestion}>add New</button>
                {
                    itemsList.map((item, index) => {
                        return(
                            <div key={index}>
                                <input type="text" className='bg-amber-300' />
                                <div>
                                    <div>
                                        <input type="text" />
                                    </div>
                                    <div>
                                        <input type="text" name="" id="" />
                                    </div>
                                    <div>

                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CreateTestPage