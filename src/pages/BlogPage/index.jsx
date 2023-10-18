import React from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);

function Blog() {
  return <div className={cx("wrapper")}>hello</div>;
}

export default Blog;
