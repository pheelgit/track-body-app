import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";

import { Menu } from "antd";

const UserNav = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("measured");

  const onSelected = ({ key }) => {
    setCurrent(key);
    navigate(`/${key}`);
  };

  return (
    <Menu
      onSelect={onSelected}
      selectedKeys={[current]}
      mode="horizontal"
      items={config}
      theme="dark"
      style={{ justifyContent: "center" }}
    />
  );
};
export default UserNav;
