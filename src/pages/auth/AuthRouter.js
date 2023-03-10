import React from "react";
import { useSearchParams } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

const AuthRouter = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <>
      {type === "login" && <LoginPage />}
      {type === "registration" && <RegisterPage />}
    </>
  );
};

export default AuthRouter;
