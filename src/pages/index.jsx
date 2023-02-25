import React from "react";
import { Navigate, Routes, Route, Outlet } from "react-router-dom";

import { useAuth } from "shared/hooks/useAuth";

import AuthLayout from "pages/auth";
import { Measurement } from "pages/measurement";
import { CurrMeasurement } from "pages/currMeasuremetn";
import { Test } from "pages/test";
import { Photo } from "pages/photo";

const AppRouter = () => {
  const PrivateRoutes = () => {
    const { user } = useAuth();
    return user ? <Outlet /> : <Navigate to="/auth" />;
  };

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Navigate to="/measurement" />} exact />
        <Route path="/measurement/*" element={<Measurement />} />
        <Route path="/measurement/:curr" element={<CurrMeasurement />} />
        <Route path="/photo/*" element={<Photo />} />
        <Route path="/test/*" element={<Test />} />
      </Route>

      <Route path="/auth/*" element={<AuthLayout />} />
    </Routes>
  );
};

export default AppRouter;
