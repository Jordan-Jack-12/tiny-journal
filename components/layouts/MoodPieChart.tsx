"use client";

import { PieChart, Pie, PieLabelRenderProps, PieSectorShapeProps, Sector } from "recharts";
import React from "react";

type PropsType = {
  data: { mood: string; amt: number }[];
};

const RADIAN = Math.PI / 180;
const COLORS = [
  "#f472b6",
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185",
  "#38bdf8",
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

const MoodPieChart = (props: PropsType) => {
  return (
    <PieChart
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        maxHeight: "100vh",
        aspectRatio: 2,
      }}
      responsive
    >
      <Pie
        data={props.data}
        dataKey="amt"
        cx="50%"
        cy="50%"
        outerRadius="100%"
        fill="#74d4ff"
        labelLine={false}
        label={renderCustomizedLabel}
        shape={MyCustomPie}
        isAnimationActive={true}
      />
    </PieChart>
  );
};

export default MoodPieChart;
