import React, { useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { Wrapper as PopperWrapper } from "../Popper";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/authSlice";
import avatar from "../../assets/images/avatar-default.png";

const cx = classNames.bind(styles);

const Profile = ({ name }) => {
  const [showMenu, setShowMenu] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSignOut = (e) => {
    dispatch(logOut());
    navigate("/sign-in");
  };

  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showMenu}
        placement="bottom-end"
        render={(attrs) => (
          <div className={cx("show-profile")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <div className={cx("profile")}>
                <img
                  className={cx("img-profile")}
                  src={
                    user?.avatar
                      ? `${process.env.REACT_APP_API_BASE}${user.avatar}`
                      : avatar
                  }
                  alt="img-avatar"
                />
                <p className={cx("title-name")}>{name}</p>
              </div>
              <Link to="/profile" className={cx("to-profile")}>
                <p className={cx("text-link-profile")}>Trang cá nhân</p>
              </Link>
              <div className={cx("to-logout")} onClick={handleSignOut}>
                <button className={cx("text-link-logout")}>Đăng xuất</button>
              </div>
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleMenu}
      >
        <img
          onClick={() => setShowMenu(!showMenu)}
          className={cx("img-avatar")}
          src={`${process.env.REACT_APP_API_BASE}${user.avatar}`}
          alt="avatar"
        />
      </HeadlessTippy>
    </div>
  );
};

export default Profile;
