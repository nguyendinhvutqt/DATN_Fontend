import React from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import Header from "../components/AdminHeader";
import Sidebar from "../components/AdminSidebar";

const cx = classNames.bind(styles);

const AdminLayout = ({ children }) => {
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

export default AdminLayout;
