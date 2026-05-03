import {
  getDayAnalysis,
  getMonthAnalysis,
  getMoodAnalysis,
  getWeekAnalysis,
} from "@/actions/analysis";
import React from "react";
import MoodPieChart from "@/components/layouts/MoodPieChart";
import MonthGraph from "@/components/layouts/MonthGraph";
import DayGraph from "@/components/layouts/DayGraph";
import WeekGraphAnalysis from "@/components/layouts/WeekGraphAnalysis";
import { getLoggedInUserProfileId } from "@/actions/session";
import { redirect } from "next/navigation";

const AnalysisPage = async () => {
  const userId = await getLoggedInUserProfileId();
  if (!userId) redirect("/login");
  const startDate = new Date("2026-01-01");
  const endDate = new Date();

  async function getMoodData() {
    const res = await getMoodAnalysis(startDate, endDate);
    if (!res) return [];
    return res;
  }

  const moodData = await getMoodData();
  const weekData = await getWeekAnalysis(startDate, endDate);
  const monthData = await getMonthAnalysis({ startDate, endDate });
  const dayData = await getDayAnalysis({ startDate, endDate });
  return (
    <div>
      <h1>Analysis Page</h1>
      <div className="flex flex-col">
        <div className="grid grid-cols-1">

          <div>
            <h2>Month Analysis</h2>
            <MonthGraph data={monthData} />
          </div>
          <div>
            <h2>Day Analysis</h2>
            <DayGraph data={dayData} />
          </div>
          <div>
            <h2>Week Analysis</h2>
            <WeekGraphAnalysis data={weekData} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <MoodPieChart data={moodData} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
