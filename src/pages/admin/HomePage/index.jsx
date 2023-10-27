import classNames from "classnames/bind";
import React, { useState } from "react";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faNewspaper,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as courseService from "../../../services/courseService";
import * as userService from "../../../services/userService";

const cx = classNames.bind(styles);

const HomePageAdmin = () => {
  const [totalCourse, setTotalCourse] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  const getCourseApi = async () => {
    try {
      const result = await courseService.getCoursesByAdmin();
      if (result.status === 200) {
        setTotalCourse(result.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserApi = async () => {
    const result = await userService.getUsers();
    if (result.status === 200) {
      setTotalUser(result.data.data.length);
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseApi();
  }, []);

  useEffect(() => {
    getUserApi();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>CHÀO MỪNG BẠN ĐẾN VỚI TRANG QUẢN TRỊ</h2>
      <div className={cx("statistical")}>
        <Link to="/admin/courses" className={cx("courses")}>
          <div>
            <FontAwesomeIcon className={cx("icon")} icon={faBook} />
          </div>
          <span className={cx("text")}>{totalCourse} khoá học</span>
        </Link>
        <Link to="/admin/blogs" className={cx("blogs")}>
          <div>
            <FontAwesomeIcon className={cx("icon")} icon={faNewspaper} />
          </div>
          <span className={cx("text")}>3 bài viết</span>
        </Link>
        <Link className={cx("users")}>
          <div>
            <FontAwesomeIcon className={cx("icon")} icon={faUsers} />
          </div>
          <span className={cx("text")}>{totalUser} người dùng</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePageAdmin;
