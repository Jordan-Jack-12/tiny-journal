import GraphExample from '@/components/layouts/GraphExample'
import GridHeatMap from '@/components/layouts/GridHeatMap'
import HourGridMap from '@/components/layouts/HourGridMap'
import React from 'react'

const UITestPage = () => {
    return (
        <div className='w-6xl'>
            {/* <GridHeatMap /> */}
            <HourGridMap />
            <GraphExample />
        </div>
    )
}

export default UITestPage