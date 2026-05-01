import { getJournalBlocksServerAction, getJournalPageById } from '@/actions/journal';
import JournalPanel from '@/components/layouts/JournalPanel'
import { JournalBlockSchema } from '@/lib/zodSchemas';
import { notFound } from 'next/navigation';
import React from 'react'

const JournalPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const journalId = (await params).id;

  const pageRes = await getJournalPageById(journalId)
  const pageData = pageRes.data
  if (!pageData) return notFound();
  const currentDate = new Date(pageData.created_at).toLocaleDateString()

  const journalBlocks = await getJournalBlocksServerAction(journalId);
  if (!journalBlocks || journalBlocks.success == false) return notFound();
  const zParsed = JournalBlockSchema.safeParse(journalBlocks.data);
  if (zParsed.error) return notFound();

  return (
    <main>
      <JournalPanel journalId={journalId} title={pageData.title} description={pageData.description} date={currentDate} journalBlocks={zParsed.data} />
    </main>
  )
}

export default JournalPage