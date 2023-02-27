import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import { measurementsConfig } from "shared/models/measurementsConfig";

import { UserLayout } from "shared/ui/userLayout";
import { Header } from "widgets/header";
import { UserNav } from "widgets/userNav";
import { SideBar } from "widgets/sideBar";
import { CMTable, CMCreate, CMChart, CMNotes } from "./components";
import { Space, Card, Segmented } from "antd";

export const CurrMeasurement = () => {
  const { curr } = useParams();
  const navigate = useNavigate();

  const content = (
    <>
      <Segmented
        style={{
          width: "100%",
          overflowX: "scroll",
        }}
        defaultValue={curr}
        options={measurementsConfig}
        onChange={(newCurr) => navigate(`/measurement/${newCurr}`)}
      ></Segmented>

      <Space direction="vertical" className="text-center">
        <Card title={`new measurement for ${curr}`}>
          <CMCreate />
        </Card>
        <Card title={`Notes for ${curr}`}>
          <CMNotes />
        </Card>
        <Card>
          <CMChart />
        </Card>
        <Card title="measurements">
          <CMTable />
        </Card>
      </Space>
    </>
  );

  return (
    <UserLayout
      header={<Header />}
      sideBar={<SideBar />}
      content={content}
      footer={<UserNav />}
    />
  );
};
