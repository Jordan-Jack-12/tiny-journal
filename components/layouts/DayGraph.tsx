"use client";

import React from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hours: { hour: number; amt: number }[] = [
  { hour: 1, amt: 0 },
  { hour: 2, amt: 0 },
  { hour: 3, amt: 0 },
  { hour: 4, amt: 0 },
  { hour: 5, amt: 0 },
  { hour: 6, amt: 0 },
  { hour: 7, amt: 0 },
  { hour: 8, amt: 0 },
  { hour: 9, amt: 0 },
  { hour: 10, amt: 0 },
  { hour: 11, amt: 0 },
  { hour: 12, amt: 0 },
  { hour: 13, amt: 0 },
  { hour: 14, amt: 0 },
  { hour: 15, amt: 0 },
  { hour: 16, amt: 0 },
  { hour: 17, amt: 0 },
  { hour: 18, amt: 0 },
  { hour: 19, amt: 0 },
  { hour: 20, amt: 0 },
  { hour: 21, amt: 0 },
  { hour: 22, amt: 0 },
  { hour: 23, amt: 0 },
  { hour: 24, amt: 0 },
];

type PropsType = {
  data: { hours: string }[];
};

const DayGraph = (props: PropsType) => {
  const dayMap = new Map<number, number>();
  for (let i = 1; i < 25; i++) {
    dayMap.set(i, 0);
  }
  props.data.forEach((item) => {
    item.hours.split("").forEach((item, idx) => {
      const currentItem = dayMap.get(idx);
      if (!currentItem) {
        dayMap.set(idx, 0);
      } else {
        dayMap.set(idx, currentItem + Number(item));
      }
    });
  });
  const data = Array.from(dayMap.entries()).map(([key, value]) => {
    return { hour: key, amt: value };
  });
  return (
    <LineChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="hour" />
      <YAxis width="auto" />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="amt"
        stroke="#74d4ff"
        isAnimationActive={true}
      />
    </LineChart>
  );
};

export default DayGraph;
