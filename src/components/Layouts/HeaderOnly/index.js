import React from "react";
import { Header } from "../DefaultLayout/Header";

export const HeaderOnly = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="content">{children}</div>
    </div>
  );
};
