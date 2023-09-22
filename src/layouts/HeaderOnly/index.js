import React from "react";
import { Header } from "../components/Header";

export const HeaderOnly = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="content">{children}</div>
    </div>
  );
};
