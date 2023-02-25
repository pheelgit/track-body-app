import React from "react";
import { Layout } from "antd";

const { Footer, Content } = Layout;

export const UserLayout = ({ header, content, footer, sideBar }) => {
  return (
    <Layout className="h-full">
      {header}
      {sideBar && sideBar}
      <Content className="overflow-scroll">{content}</Content>
      <Footer>{footer}</Footer>
    </Layout>
  );
};
