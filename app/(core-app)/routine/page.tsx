import GraphExample from '@/components/layouts/GraphExample'
import HourGridMap from '@/components/layouts/HourGridMap'
import React from 'react'

const RoutinePage = () => {
  return (
    <div className='py-2'>
      <HourGridMap />
      <GraphExample />
    </div>
  )
}

export default RoutinePage