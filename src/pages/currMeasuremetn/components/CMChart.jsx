import React from "react";
import { Line } from "@ant-design/plots";

import { useMeasurementData } from "pages/currMeasuremetn/hooks/useMeasurementData";

export const CMChart = () => {
  const chartData = useMeasurementData();
  const lineConfig = {
    data: chartData,
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

  if (chartData.length < 2) {
    return null;
  }

  return <Line {...lineConfig} />;
};
