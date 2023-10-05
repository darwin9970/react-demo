import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutersConfig from "@/router";

export const App = () => {
  return (
    <BrowserRouter>
      <RoutersConfig />
    </BrowserRouter>
  );
};
