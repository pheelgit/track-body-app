import React from "react";

import { measurementsConfig } from "shared/models/measurementsConfig";

import { UserLayout } from "shared/ui/userLayout";
import { SideBar } from "widgets/sideBar";
import { Header } from "widgets/header";
import { UserNav } from "widgets/userNav";
import { MeasurementCard } from "./components/MeasurementCard";

const content = (
  <div style={{ overflow: "scroll" }}>
    {measurementsConfig.map((meas) => (
      <MeasurementCard title={meas} key={meas} />
    ))}
  </div>
);

export const Measurement = () => {
  return (
    <>
      <UserLayout
        header={<Header />}
        sideBar={<SideBar />}
        content={content}
        footer={<UserNav />}
      />
    </>
  );
};

export default Measurement;
