import React from "react";

import { useShowSideBar } from "shared/hooks/useShowSideBar";
import { useSearchParams } from "react-router-dom";

import { userApi } from "shared/api/userApi";

import { SignOut } from "features/signOut";

import { SecondSideBar } from "./SecondSideBar";
import { Button, Drawer } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const SideBar = () => {
  const [searchParams] = useSearchParams();
  const { data: userInfo, isLoading: userInfoIsLoading } =
    userApi.useGetUserDataQuery();

  const { closeSideBar, openSecondSideBar, CHILDREN_FOR_SECOND_SIDEBAR } =
    useShowSideBar();

  const { bodyInfo } = CHILDREN_FOR_SECOND_SIDEBAR;

  return (
    <Drawer
      title={userInfoIsLoading ? <LoadingOutlined /> : userInfo.nickName}
      placement="left"
      onClose={closeSideBar}
      open={searchParams.has("openSideBar")}
      width="80%"
      footer={<SignOut danger />}
    >
      <Button onClick={() => openSecondSideBar(bodyInfo)}>body info</Button>

      <SecondSideBar />
    </Drawer>
  );
};
