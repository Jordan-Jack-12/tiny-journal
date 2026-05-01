"use client";

import React from "react";
import { Pie, PieChart, Tooltip } from "recharts";

type WeekPieChartType = {
  data: { day: string; amt: number }[];
};

const fillColor = [
  "#f472b6",
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185",
  "#38bdf8",
];

const WeekPieChart = (props: WeekPieChartType) => {
  const data = props.data.map((item, idx) => ({
    ...item,
    fill: fillColor[idx],
  }));
  return (
    <PieChart
      style={{
        width: "50%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      title="Productive Day of the Week"
      responsive
    >
      <Pie
        data={data}
        innerRadius="80%"
        outerRadius="100%"
        // Corner radius is the rounded edge of each pie slice
        cornerRadius="50%"
        fill="#8884d8"
        // padding angle is the gap between each pie slice
        paddingAngle={5}
        dataKey="amt"
      />

      <Tooltip />
    </PieChart>
  );
};

export default WeekPieChart;
