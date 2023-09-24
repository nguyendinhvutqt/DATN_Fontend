import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";

import avatar from "../../../../assets/images/avatar-default.png";

const cx = classNames.bind(styles);

Sidebar.propTypes = {};

function Sidebar(props) {
  const location = useLocation();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("profile")}>
        <img className={cx("avatar")} src={avatar} alt="" />
        <h3>Nguyen Dinh Vu</h3>
      </div>
      <NavLink
        to="/admin/courses"
        className={cx("block", {
          active: location.pathname.startsWith("/admin/courses"),
        })}
      >
        <FontAwesomeIcon icon={faBook} />
        <span>Danh sách khoá học</span>
      </NavLink>
      <NavLink
        to="/admin/blogs"
        className={cx("block", {
          active: location.pathname.startsWith("/admin/blogs"),
        })}
      >
        <FontAwesomeIcon icon={faNewspaper} />
        <span>Danh sách bài viết</span>
      </NavLink>
    </div>
  );
}

export default Sidebar;
