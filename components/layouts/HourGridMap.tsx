'use client';

import React, { useEffect, useState } from 'react'

const data = [
    { date: '21-12-2025', hours: [5, 6, 7, 8, 9, 10, 11] },
    { date: '22-12-2025', hours: [5, 6, 7, 8, 9, 10, 11, 12, 13] },
    { date: '23-12-2025', hours: [9, 10, 11, 12, 13, 14] },
    { date: '24-12-2025', hours: [9, 10, 11, 12, 13, 14] },
    { date: '25-12-2025', hours: [9, 10, 11, 12, 13, 14, 15, 16, 17] },
    { date: '26-12-2025', hours: [11, 12, 13, 14] },
    { date: '27-12-2025', hours: [9, 10, 11, 12, 13, 14] },
]

type DataGridType = {
    data: string | boolean,
    isHeader: boolean,
}

const HourGridMap = () => {
    const [dataGrid, setDataGrid] = useState<DataGridType[][]>();

    const fillGrid = () => {
        const totalLength = 24 * 8;
        const grid = new Array(totalLength).fill(0);
        data.map((item, i) => {
            item.hours.map(hr => {
                grid[(hr)*8 + 1 + i] = 1;
            })
        })
        return grid.map((item) => item)
    }

    const tempGrid = fillGrid();

    return (
        <>
            <div className='grid grid-rows-8 grid-flow-col auto-cols-max gap-2 text-sm'>
                <div className='min-h-6 rounded text-white bg-(--color-sky-blue-400)'>Days</div>
                {
                    data.map((item, i) => {
                        return <div key={"date" + i} className='min-h-6 rounded text-white bg-(--color-sky-blue-400) px-2'>{item.date}</div>
                    })
                }
                {tempGrid?.map((item, i) => {
                        return (
                        <div key={i} className={`min-w-10 min-h-6 text-center rounded ${item == 1 ? 'bg-(--color-sky-blue-300)' : 'bg-(--color-sky-blue-100)'}`}>{i % 8 == 0? `${i/8}-${(i/8) + 1}` : ""}</div>
                    )
                    
                })}
            </div>
        </>

    )
}

export default HourGridMap