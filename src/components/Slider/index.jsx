import React from "react";
import Slider from "react-slick";
// import classNames from "classnames/bind";
// import styles from "./style.module.scss";

// const cx = classNames.bind(styles);

const SliderComponent = ({ children, banner = false, ...props }) => {
  const settings = {
    ...props,
  };
  return <Slider {...settings}>{children}</Slider>;
};

export default SliderComponent;
