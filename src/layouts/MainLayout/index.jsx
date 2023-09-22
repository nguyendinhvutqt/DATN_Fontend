import React from "react";
import classNames from "classnames/bind";
import { Header } from "../components/Header";
import styles from "./style.module.scss";
import { Sidebar } from "../components/Sidebar";

const cx = classNames.bind(styles);

export const DefaultLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
};
