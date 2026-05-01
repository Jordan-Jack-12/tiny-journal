import { getJournalPageByUserIdServerAction } from "@/actions/journal";
import JournalList from "@/components/layouts/JournalList";
import AddJournalButton from "@/components/ui/button/AddJournalButton";
import SecButton from "@/components/ui/button/SecButton";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import z from "zod";

const JournalBlockSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      created_at: z.date(),
      updated_at: z.date(),
      user_id: z.string(),
    }),
  ),
});

const JouranlPageMain = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const supabase = await createClient();
  const supabaseResponse = await supabase.auth.getClaims();
  if (supabaseResponse.error) return redirect('/login');
  const pageString = (await searchParams).page ?? 1;
  const page = Number(pageString);
  const next = page + 1;
  const previous = page - 1 < 1 ? 1 : page - 1;
  const userId = await prisma.userProfile.findFirst({where: {userId: supabaseResponse.data?.claims.sub}, select: {id: true}});
  if (!userId) return redirect('/login');
  const response = await getJournalPageByUserIdServerAction({
    userId: userId.id,
    page: page,
  });

  if (!response || response.data == undefined || response.success == false) {
    return (
      <div className="w-full p-2">
        <div className="flex ml-3 my-2 justify-between items-center">
          <AddJournalButton profileId={userId.id}/>
          <div className="flex gap-2">
            <Link
              href={`/journal?page=${previous}`}
              className="bg-white border border-gray-200 rounded-full"
            >
              <ChevronLeft />
            </Link>
            {page}
            <Link
              href={`/journal?page=${next}`}
              className="bg-white border border-gray-200 rounded-full"
            >
              <ChevronRight />
            </Link>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search for Journals"
              className="py-2 px-4 border border-gray-200  bg-white rounded-full"
            />
            <SecButton>Search</SecButton>
          </div>
        </div>
        <hr />
        No Journal Found
      </div>
    );
  }

  const r = JournalBlockSchema.safeParse(response);
  console.log(r.error)
  if (!r.success) return;
  const data = r.data.data;

  return (
    <div className="w-full p-2">
      <div className="flex ml-3 my-2 justify-between items-center">
        <AddJournalButton profileId={userId.id}/>
        <div className="flex gap-2">
          <Link
            href={`/journal?page=${previous}`}
            className="bg-white border border-gray-200 rounded-full"
          >
            <ChevronLeft />
          </Link>
          {page}
          <Link
            href={`/journal?page=${next}`}
            className="bg-white border border-gray-200 rounded-full"
          >
            <ChevronRight />
          </Link>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search for Journals"
            className="py-2 px-4 border border-gray-200  bg-white rounded-full"
          />
          <SecButton>Search</SecButton>
        </div>
      </div>
      <hr className="text-gray-200" />
      <JournalList userId={userId.id} journals={data} />
    </div>
  );
};

export default JouranlPageMain;

