"use client";
import React from "react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";

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
      <XAxis dataKey="hour" padding={{ right: 10 }} minTickGap={1} axisLine={{ stroke: 'red', strokeWidth: 2 }} tickLine={false}/>
      <YAxis width="auto" domain={[0, "dataMax"]} tickLine={false} tick={false} axisLine={{strokeWidth: 0}} />
    </AreaChart>
  );
};

export default GraphExample;
