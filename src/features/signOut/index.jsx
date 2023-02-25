import { Button } from "antd";
import React from "react";
import { authService } from "shared/api/authService";

export const SignOut = (props) => {
  return (
    <>
      <Button
        {...props}
        onClick={() => {
          authService.logOut();
        }}
        children="logOut"
      />
    </>
  );
};
