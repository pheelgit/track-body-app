import React from "react";
import { Layout } from "antd";
import "./index.css";

const { Footer, Content } = Layout;

export const UserLayout = ({ header, content, footer, sideBar }) => {
  return (
    <Layout className="user-layout">
      <Layout.Header className="user-layout--header" children={header} />
      {sideBar && sideBar}
      <Content className="user-layout--content" children={content} />
      <Footer children={footer} />
    </Layout>
  );
};
