import React from "react";
import { Drawer, Typography } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useShowSideBar } from "shared/hooks/useShowSideBar";
import BodyInfo from "./BodyInfo";

const { Text } = Typography;

export const SecondSideBar = () => {
  let [searchParams, setSearchParams] = useSearchParams();
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
        return (
          <Text
            type="danger"
            children="child has not in CHILDREN_FOR_SECOND_SIDEBAR !!"
          />
        );
    }
  };

  return (
    <Drawer
      title="Two-level Drawer"
      placement="left"
      width="100%"
      onClose={closeSecondSideBar}
      open={open}
      closeIcon={<RollbackOutlined />}
    >
      {content()}
    </Drawer>
  );
};
