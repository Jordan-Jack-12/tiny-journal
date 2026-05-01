"use client";

import React, { useState } from "react";
import { createOrUpdateDate } from "@/actions/productivity";
import { add, getDay, startOfWeek } from "date-fns";
import GraphExample from "./GraphExample";

const hoursArray: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
];

export type dataType = {
  id: string;
  date: Date;
  hours: string;
  day: string;
};

type GridHeatMapType = {
  data: dataType[];
};

function createDateArray(dataArray: dataType[]) {
  const dateMap = new Map();
  if (!dataArray) return [];
  dataArray.map((item) => {
    dateMap.set(item.date.toISOString().slice(0, 10), item);
  });
  const today = new Date();
  const startDate = startOfWeek(today);
  const dates = [];
  for (let i = 1; i < 8; i++) {
    dates.push(add(startDate, { days: i }).toISOString().slice(0, 10));
  }
  const cleanData: dataType[] = [];
  dates.forEach((item) => {
    if (!dateMap.get(item)) {
      cleanData.push({
        id: "temp-" + crypto.randomUUID(),
        date: new Date(item),
        hours: "000000000000000000000000",
        day: getDay(item).toLocaleString(),
      });
    } else {
      cleanData.push(dateMap.get(item));
    }
  });
  return cleanData;
}

function createGraphData(dateArray: dataType[]) {
  const tempArray: string[] = [];
  const data: { hour: string; amt: number }[] = [
    { hour: "1", amt: 0 },
    { hour: "2", amt: 0 },
    { hour: "3", amt: 0 },
    { hour: "4", amt: 0 },
    { hour: "5", amt: 0 },
    { hour: "6", amt: 0 },
    { hour: "7", amt: 0 },
    { hour: "8", amt: 0 },
    { hour: "9", amt: 0 },
    { hour: "10", amt: 0 },
    { hour: "11", amt: 0 },
    { hour: "12", amt: 0 },
    { hour: "13", amt: 0 },
    { hour: "14", amt: 0 },
    { hour: "15", amt: 0 },
    { hour: "16", amt: 0 },
    { hour: "17", amt: 0 },
    { hour: "18", amt: 0 },
    { hour: "19", amt: 0 },
    { hour: "20", amt: 0 },
    { hour: "21", amt: 0 },
    { hour: "22", amt: 0 },
    { hour: "23", amt: 0 },
    { hour: "24", amt: 0 },
  ];
  dateArray.forEach((item: dataType) => {
    tempArray.push(item.hours);
  });
  tempArray.forEach((i: string) => {
    i.split("").forEach((i: string, idx: number) => {
      if (i === "1") {
        data[idx].amt += 1;
      }
    });
  });
  return data;
}

const GridHeatMap = (props: GridHeatMapType) => {
  const [data, setData] = useState<dataType[]>(createDateArray(props.data));
  const [graphData, setGraphData] = useState<{ hour: string; amt: number }[]>(
    createGraphData(props.data),
  );

  async function handleClick(
    hour: number,
    index: number,
    innerIndex: number,
    id: string,
  ) {
    const item = data.find((i) => i.id === id);
    if (!item) return;
    const hours = item.hours;
    const hourExist = item.hours[innerIndex] === "0" ? false : true;
    let newHours: string;
    if (!hourExist) {
      newHours = hours.slice(0, innerIndex) + 1 + hours.slice(innerIndex + 1);
    } else {
      newHours = hours.slice(0, innerIndex) + 0 + hours.slice(innerIndex + 1);
    }
    let newItem = { ...item, hours: newHours };
    try {
      const res = await createOrUpdateDate(
        newItem.hours,
        newItem.id,
        newItem.date.toISOString().slice(0, 10),
      );
      if (res != undefined) {
        newItem = { ...newItem, id: res };
      }
    } catch (e) {
      console.log(e);
    }
    const newData = [
      ...data.slice(0, index),
      newItem,
      ...data.slice(index + 1),
    ];
    setData(newData);
    setGraphData(createGraphData(newData));
  }

  return (
    <div className="mx-auto text-sm">
      {data.map((item: dataType, index: number) => {
        return (
          <div key={index} className="flex gap-2 p-1 max-w-5xl items-center">
            <span>{item.date.toLocaleString("en-GB").slice(0, 10)}</span>
            {hoursArray.map((hour: number, innerIndex: number) => {
              const checked = item.hours[innerIndex] === "0" ? false : true;
              const randomkey = crypto.randomUUID();
              return (
                <span
                  key={randomkey}
                  onClick={() =>
                    handleClick(hour, index, innerIndex, item.id)
                  }
                  className={`h-8 w-8 cursor-pointer justify-center flex items-center rounded-xl ${checked ? "bg-sky-300 text-sky-200" : "bg-sky-100 text-sky-200"}`}
                >
                  {hour}
                </span>
              );
            })}
          </div>
        );
      })}
      <div className="flex gap-2 p-1 max-w-5xl justify-end">
        <div className="text-transparent">
          {new Date().toLocaleString("en-GB").slice(0, 10)}
        </div>
        <GraphExample data={graphData} />
      </div>
    </div>
  );
};

export default GridHeatMap;
