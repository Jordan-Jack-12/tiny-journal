"use server";

import prisma from "@/lib/prisma";
import { MoodSchema } from "@/lib/zodSchemas";
import { getLoggedInUserProfileId } from "./session";
import { redirect } from "next/navigation";

export async function getMoodAnalysis(
  startDate: Date,
  endDate: Date,
) {
  try {
    const user_id = await getLoggedInUserProfileId();
    if (!user_id) redirect('/login');
    const res = await prisma.journal_block.findMany({
      where: {
        type: "MOOD",
        journal_page: {
          user_id: user_id,
        },
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        jsonObj: true,
      },
    });
    const schemaCheck = MoodSchema.safeParse(res);
    if (schemaCheck.error) {
      return [];
    }
    const moodMap = new Map<string, number>();
    schemaCheck.data.forEach((item) => {
      const currentMood = item.jsonObj.mood;
      if (moodMap.has(currentMood)) {
        const value = moodMap.get(currentMood);
        moodMap.set(currentMood, value ? value + 1 : 1);
      } else {
        moodMap.set(currentMood, 1);
      }
    });
    return Array.from(moodMap.entries()).map((item) => ({
      mood: item[0],
      amt: item[1],
    }));
  } catch (e) {
    console.log(e);
  }
}

export async function getWeekAnalysis(
  startDate: Date,
  endDate: Date,
) {
  try {
    const user_id = await getLoggedInUserProfileId();
    if (!user_id) redirect('/login');
    const res = await prisma.productive_hour.findMany({
      where: {
        user_id: user_id,
        date: {
          gte: startDate,
          lte: endDate,
        },
        hours: { not: "000000000000000000000000" },
      },
      select: {
        day: true,
      },
    });
    const dataMap = new Map<string, number>();
    res.forEach((item) => {
      const currentItem = item.day;
      const mapItem = dataMap.get(currentItem);
      if (mapItem != undefined) {
        dataMap.set(currentItem, mapItem + 1);
      } else {
        dataMap.set(currentItem, 1);
      }
    });

    return Array.from(dataMap.entries()).map((item) => {
      return { day: item[0], amt: item[1] };
    });
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getMonthAnalysis({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  try {
    const user_id = await getLoggedInUserProfileId();
    if (!user_id) redirect('/login');
    const res = await prisma.productive_hour.findMany({
      where: {
        user_id: user_id,
        date: {
          lte: endDate,
          gte: startDate,
        },
      },
      select: {
        date: true,
      },
    });
    if (!res) {
      return [];
    }
    const monthMap = new Map<string, number>();
    res.forEach((item) => {
      const currentDate = item.date.getDate();

      const currentItem = monthMap.get(currentDate.toString());
      if (currentItem != undefined) {
        monthMap.set(currentDate.toString(), currentItem + 1);
      } else {
        monthMap.set(currentDate.toString(), 1);
      }
    });
    return Array.from(monthMap.entries()).map((item) => ({
      date: item[0],
      amt: item[1],
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getDayAnalysis({
  startDate,
  endDate,
}: {
  startDate: Date,
  endDate: Date
}) {
  try {
        const user_id = await getLoggedInUserProfileId();
    if (!user_id) redirect('/login');
    const res = await prisma.productive_hour.findMany({
      where: {
        user_id: user_id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        hours: true,
      },
    });
    // TODO: Create a string array of hours
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
}
