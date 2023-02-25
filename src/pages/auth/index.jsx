import React from "react";
import { Navigate } from "react-router-dom";

import AuthRouter from "./AuthRouter";
import { useAuth } from "shared/hooks/useAuth";

import { Layout } from "antd";
import AuthNav from "./components/AuthNav";

const { Header, Content } = Layout;

const AuthLayout = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" />;
  return (
    <Layout>
      <Header className="mb-6">
        <AuthNav />
      </Header>
      <Content className="px-6 pt-6">
        <AuthRouter />
      </Content>
    </Layout>
  );
};

export default AuthLayout;
