import React from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

export const HeaderOnly = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};
