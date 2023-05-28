import React from "react";

import { Button } from "antd";
import { Header } from "widgets/header";
import { UserNav } from "widgets/userNav";
import { UserLayout } from "shared/ui/userLayout";
import { SideBar } from "widgets/sideBar";

import { userApi } from "shared/api/userApi";
import { useDatesToSelect } from "shared/hooks/useDatesToSelect";

import { a } from "shared/testTS";

export const Test = () => {
  const { allPhotos } = useDatesToSelect();
  const { data } = userApi.useGetUserDataQuery();

  const test = async () => {
    console.log(a);
    console.log(data);
    console.log(allPhotos);
  };
  const content = <Button onClick={test} children="test" />;
  return (
    <UserLayout
      header={<Header />}
      sideBar={<SideBar />}
      content={content}
      footer={<UserNav />}
    />
  );
};
