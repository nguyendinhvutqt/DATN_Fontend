import React from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);

const CourseItem = () => {
  return (
    <div className={cx("wrapper")}>
      <img className={cx("img-course")} src="logo192.png" alt="img-course" />
      <p className={cx("title-course")}>
        Khoa hoc ReactJS taij f8 csdc cdc kjoikjiji jijij jij ij ij
      </p>
    </div>
  );
};

export default CourseItem;
