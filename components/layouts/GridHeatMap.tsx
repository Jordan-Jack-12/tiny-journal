import React from 'react'

const data = [1,2,2,3,3,4,4,5,5,5,6,6,7,7,7,3,5,4,3,2,3,23,2,3,2,32,3,23,2,3,23,2,3,23,2,32,3,2]

const GridHeatMap = () => {
    return (
        <div>
            <div>
                <h2>Heat Map</h2>
            </div>
            <div className='grid grid-rows-7 auto-cols-max grid-flow-col gap-2 mx-auto w-4xl'>
                {data.map((item: number, index: number) => {
                    return (
                        <div key={index} className='bg-(--color-sky-blue-300) rounded w-5 h-5' title='This is a new'>{item}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default GridHeatMap