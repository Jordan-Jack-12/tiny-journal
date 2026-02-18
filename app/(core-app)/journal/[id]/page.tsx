import JournalPanel from '@/components/layouts/JournalPanel'
import React from 'react'

const JournalPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const journalId = (await params).id
  return (
    <main className='overflow-y-auto'>
      <JournalPanel journalId={journalId}/>
    </main>
  )
}

export default JournalPage