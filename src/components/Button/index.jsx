import React from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);

const Button = ({ to, href, children, onClick }) => {
  let Comp = "button";
  const classes = cx("wrapper");
  return (
    <Comp className={classes}>
      <span>{children}</span>
    </Comp>
  );
};

export default Button;
