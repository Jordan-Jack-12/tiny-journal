"use server";

import prisma from "@/lib/prisma";
import { getDay } from "date-fns";
import { getLoggedInUserProfileId } from "./session";

function getDayString(day: number) {
  switch (day) {
    case 0:
      return "SUN";
    case 1:
      return "MON";
    case 2:
      return "TUE";
    case 3:
      return "WED";
    case 4:
      return "THU";
    case 5:
      return "FRI";
    case 6:
      return "SAT";
    default:
      return "SUN";
  }
}

export async function createOrUpdateDate(
  hours: string,
  id: string,
  date?: string,
) {
  try {
    const userId = await getLoggedInUserProfileId();
    if (!userId) return null;
    if (id.slice(0, 4) === "temp") {
      const res = await prisma.productive_hour.create({
        data: {
          user_id: userId,
          hours: hours,
          date: new Date(date!),
          updateAt: new Date(),
          day: getDayString(getDay(new Date(date!))),
        },
      });
      return res.id;
    } else {
      const resUpdate = await prisma.productive_hour.update({
        where: {
          id: id,
        },
        data: {
          hours: hours,
        },
      });
      return resUpdate.id;
    }
  } catch (e) {
    console.log(e);
  }
}
