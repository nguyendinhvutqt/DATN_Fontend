import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const CourseItem = ({ data }) => {
  const user = useSelector((state) => state.user);
  return (
    <Link
      to={
        data.students.includes(user.userId)
          ? `/learning/${data?._id}?id=${data?.chapters[0]?.lessons[0]?._id}`
          : `/courses/${data?._id}`
      }
      className={cx("wrapper")}
    >
      <img
        className={cx("img-course")}
        src={`http://localhost:3001//${data.thumbnail}`}
        alt="img-course"
      />
      <p className={cx("title-course")}>{data.title}</p>
    </Link>
  );
};

CourseItem.prototypes = { data: PropTypes.object.isRequired };

export default CourseItem;
