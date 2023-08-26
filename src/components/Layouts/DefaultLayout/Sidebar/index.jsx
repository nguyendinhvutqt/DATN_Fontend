import React from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);

export const Sidebar = () => {
  return <aside className={cx("wrapper")}>Sidebar</aside>;
};
