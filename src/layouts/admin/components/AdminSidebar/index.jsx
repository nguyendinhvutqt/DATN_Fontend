import React from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faNewspaper,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../../context/AuthProvider";
import avatar from "../../../../assets/images/avatar-default.png";

const cx = classNames.bind(styles);

function Sidebar() {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignOut = (e) => {
    setAuth({});
    navigate("/sign-in");
  };
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
      <NavLink
        to="/admin/users"
        className={cx("block", {
          active: location.pathname.startsWith("/admin/users"),
        })}
      >
        <FontAwesomeIcon icon={faUsers} />
        <span>Danh sách người dùng</span>
      </NavLink>
      <div className={cx("block")} onClick={handleSignOut}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span>Đăng xuất</span>
      </div>
    </div>
  );
}

export default Sidebar;
