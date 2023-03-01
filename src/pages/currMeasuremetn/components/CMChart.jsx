import React from "react";
import { Line } from "@ant-design/plots";

export const CMChart = ({ measurementsData }) => {
  const lineConfig = {
    data: measurementsData,
    xField: "date",
    yField: "size",
    smooth: true,
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    slider: {
      start: 0,
      end: 1,
    },
  };

  return <Line {...lineConfig} />;
};
