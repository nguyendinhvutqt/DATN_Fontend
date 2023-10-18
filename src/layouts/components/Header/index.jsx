import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./style.module.scss";
import Search from "../../../components/Search";
import Profile from "../../../components/MenuProfile";
import Button from "../../../components/Button";
import MyCourse from "../../../components/MyCourse";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/reducers/userSlice";

const cx = classNames.bind(styles);

export const Header = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleDispatchLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to="/" className={cx("logo")}>
          <h3>Học lập trình để đi làm</h3>
        </Link>

        <Search />
        <div className={cx("actions")}>
          {!user.name ? (
            <Button primary to="/sign-in">
              Đăng nhập
            </Button>
          ) : (
            <>
              <MyCourse user={user} />
              <Profile user={user} dispatchLogout={handleDispatchLogout} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
