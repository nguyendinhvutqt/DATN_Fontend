import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);

Blog.propTypes = {};

function Blog(props) {
  return <div className={cx("wrapper")}>hello</div>;
}

export default Blog;
