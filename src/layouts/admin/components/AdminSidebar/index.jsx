import React from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faHome,
  faNewspaper,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import avatar from "../../../../assets/images/avatar-default.png";
import { useDispatch } from "react-redux";
import { logout } from "../../../../store/reducers/userSlice";

const cx = classNames.bind(styles);

function Sidebar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/sign-in");
  };
  const location = useLocation();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("profile")}>
        <img className={cx("avatar")} src={avatar} alt="" />
        <h3>Nguyen Dinh Vu</h3>
      </div>
      <NavLink to="/admin" className={cx("block")}>
        <FontAwesomeIcon icon={faHome} />
        <span>Trang quản trị</span>
      </NavLink>
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
