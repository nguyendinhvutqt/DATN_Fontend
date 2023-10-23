import React from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import Profile from "../../../../components/MenuProfile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/reducers/userSlice";

const cx = classNames.bind(styles);

function Header() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleDispatchLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to="/" className={cx("logo")}>
          <h3>Học lập trình để đi làm</h3>
        </Link>
        <Profile user={user} dispatchLogout={handleDispatchLogout} />
      </div>
    </div>
  );
}

export default Header;
