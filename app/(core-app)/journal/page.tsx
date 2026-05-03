import JournalPageData from "@/components/layouts/JournalPageData";
import React from "react";
import z from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const JouranlPageMain = async () => {

  return (
    <div className="w-full p-2">
      <JournalPageData />
    </div>
  );
};

export default JouranlPageMain;

