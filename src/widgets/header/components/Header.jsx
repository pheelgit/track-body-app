import React from "react";

import { useShowSideBar } from "shared/hooks/useShowSideBar";

import { Button, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";

export const Header = () => {
  const { openSideBar } = useShowSideBar();

  return (
    <Layout.Header className="flex justify-between items-center">
      <Button children={<MenuOutlined />} onClick={openSideBar} />
    </Layout.Header>
  );
};
