import classNames from "classnames/bind";
import React from "react";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faNewspaper,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const HomePageAdmin = () => {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>CHÀO MỪNG BẠN ĐẾN VỚI TRANG QUẢN TRỊ</h2>
      <div className={cx("statistical")}>
        <Link to="/admin/courses" className={cx("courses")}>
          <div>
            <FontAwesomeIcon className={cx("icon")} icon={faBook} />
          </div>
          <span className={cx("text")}>12 khoá học</span>
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
          <span className={cx("text")}>30 người dùng</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePageAdmin;
