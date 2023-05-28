import React from "react";
import { useSearchParams } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

const AuthRouter = () => {
  let [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <>
      {type === "registration" && <RegisterPage />}
      {type === "login" && <LoginPage />}
    </>
  );
};

export default AuthRouter;
