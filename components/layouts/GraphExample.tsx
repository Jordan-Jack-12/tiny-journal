"use client";
import React from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

const GraphExample = ({ data }: { data: { hour: string; amt: number }[] }) => {
  return (
    <AreaChart
      style={{ width: "100%", aspectRatio: 2.5, maxHeight: 320 }}
      responsive
      data={data}
      margin={{
        top: 40,
      }}
    >
      <Area type="monotone" dataKey="amt" stroke="#107faa" fill="#77daf3" />
      <XAxis dataKey="hour" padding={{ right: 10 }} minTickGap={1} />
      <YAxis width="auto" domain={[0, "dataMax"]} />
    </AreaChart>
  );
};

export default GraphExample;
