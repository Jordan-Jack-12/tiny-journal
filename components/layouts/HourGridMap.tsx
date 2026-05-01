"use client";

import React, { useState } from "react";

type PropsType = {
  data: { date: string; hours: number[] }[];
};

// type DataGridType = {
//   data: string | boolean;
//   isHeader: boolean;
// };

type mixedType = (number | boolean | string)[];

const HourGridMap = (props: PropsType) => {
  const fillGrid = () => {
    const totalLength = 24 * 8;
    const grid = new Array(totalLength).fill(0);
    props.data.map((item, i) => {
      item.hours.map((hr) => {
        grid[hr * 8 + 1 + i] = 1;
      });
    });
    return grid.map((item) => item);
  };

  const [dataGrid, setDataGrid] = useState<mixedType>(fillGrid());

  function handleClick(index: number) {
    const f = dataGrid.slice(0, index);
    const current = dataGrid[index] == 1 ? 0 : 1;
    const r = dataGrid.slice(index + 1, dataGrid.length);

    setDataGrid([...f, current, ...r]);
  }

  return (
    <>
      <div className="grid grid-rows-8 grid-flow-col auto-cols-max gap-2 text-sm">
        <div className="min-h-6 rounded text-white bg-sky-300">Days</div>
        {props.data.map((item, i) => {
          return (
            <div
              key={"date" + i}
              className="min-h-6 rounded text-white bg-sky-300 px-2"
            >
              {item.date}
            </div>
          );
        })}
        {dataGrid.map((item, i) => {
          return (
            <div
              key={i}
              className={`min-w-10 min-h-6 text-center rounded ${item == 1 ? "bg-sky-300" : "bg-sky-100"}`}
              onClick={() => handleClick(i)}
            >
              {i % 8 == 0 ? `${i / 8}-${i / 8 + 1}` : ""}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HourGridMap;
