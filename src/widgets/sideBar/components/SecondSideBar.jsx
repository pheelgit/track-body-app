import React from "react";
import { useSearchParams } from "react-router-dom";

import { BodyInfo } from "./BodyInfo";
import { useShowSideBar } from "shared/hooks/useShowSideBar";

import { Drawer } from "antd";
import { RollbackOutlined } from "@ant-design/icons";

export const SecondSideBar = () => {
  let [searchParams] = useSearchParams();
  const { closeSecondSideBar, CHILDREN_FOR_SECOND_SIDEBAR } = useShowSideBar();

  const open = searchParams.has("openSecondSideBar");
  const child = searchParams.get("childForSecondSideBar");

  const content = () => {
    switch (child) {
      case CHILDREN_FOR_SECOND_SIDEBAR.bodyInfo:
        return <BodyInfo />;
      // case CHILDREN_FOR_TWO_LEVEL_SIDEBAR.SomeParams:
      //   return <SomePage />;
      default:
        return null;
    }
  };

  return (
    <Drawer
      title="Two-level Drawer"
      placement="left"
      width="90%"
      onClose={closeSecondSideBar}
      open={open}
      closeIcon={<RollbackOutlined />}
    >
      {content()}
    </Drawer>
  );
};
