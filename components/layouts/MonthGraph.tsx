"use client";

import React from "react";
import { Area, AreaChart, Tooltip, TooltipContentProps, XAxis, YAxis } from "recharts";

const dates = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
  const isVisible = active && payload && payload.length;
  return (
    <div className="custom-tooltip bg-sky-50 p-2 border text-sm border-gray-300/30 rounded" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
        <>
          <p className="label">{`Day ${label} : ${payload[0].value} hours`}</p>
          <p className="intro">{}</p>
        </>
      )}
    </div>
  );
};

type PropsType = {
  data: { date: string; amt: number }[];
};

const MonthGraph = (props: PropsType) => {
  const data = dates.map((item) => {
    const dateItem = props.data.find((i) => i.date === item.toString());
    const amt = dateItem != undefined ? dateItem.amt : 0;
    return { date: item.toString(), amt };
  });

  return (
    <AreaChart
      style={{
        width: "100%",
        maxWidth: "1000px",
        maxHeight: "40vh",
        aspectRatio: 1.618,
        padding: "10px",
      }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 10,
        left: 0,
        bottom: 0,
      }}
      onContextMenu={(_, e) => e.preventDefault()}
    >
      <XAxis dataKey="date" tickLine={false} fontSize={12} />
      <YAxis width="auto" tickLine={false} fontSize={12}/>
      <Tooltip content={CustomTooltip}/>
      <Area type="monotone" dataKey="amt" stroke="#74d4ff" fill="#74d4ff" />
    </AreaChart>
  );
};

export default MonthGraph;
