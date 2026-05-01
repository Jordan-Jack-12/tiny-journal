"use client";

import React from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

type PropsType = {
  data: { day: string; amt: number }[];
};

const WeekGraphAnalysis = (props: PropsType) => {
  const data = days.map((item) => {
    const dateItem = props.data.find((i) => i.day === item.toString());
    const amt = dateItem != undefined ? dateItem.amt : 0;
    return { day: item.toString(), amt };
  });
  return (
    <AreaChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
      onContextMenu={(_, e) => e.preventDefault()}
    >
      <XAxis dataKey="day" />
      <YAxis width="auto" />
      <Tooltip />
      <Area type="monotone" dataKey="amt" stroke="#74d4ff" fill="#74d4ff" />
    </AreaChart>
  );
};

export default WeekGraphAnalysis;
