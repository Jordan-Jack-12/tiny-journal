import JournalList from '@/components/layouts/JournalList'
import React from 'react'

const JouranlPageMain = () => {
    // get the user session and userProfile, if not found logout and restrict access.
    const userId = "ea4684c8-090e-45d0-8980-2bc582e89380"
    return (
        <div className='w-full'>
            <JournalList userId={userId}/>
        </div>
    )
}

export default JouranlPageMain