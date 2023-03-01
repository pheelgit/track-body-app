import React from "react";

import { useShowSideBar } from "shared/hooks/useShowSideBar";

import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

export const Header = () => {
  const { openSideBar } = useShowSideBar();

  return <Button children={<MenuOutlined />} onClick={openSideBar} />;
};
