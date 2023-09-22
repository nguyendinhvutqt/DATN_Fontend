import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./style.module.scss";
import Search from "../../../components/Search";
import Profile from "../../../components/MenuProfile";
import Button from "../../../components/Button";
import MyCourse from "../../../components/MyCourse";

const cx = classNames.bind(styles);

export const Header = () => {
  const user = useSelector((state) => state?.auth?.user?.name);
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to="/" className={cx("logo")}>
          <h3>Học lập trình để đi làm</h3>
        </Link>

        <Search />
        <div className={cx("actions")}>
          {!user ? (
            <Button primary to="/sign-in">
              Đăng nhập
            </Button>
          ) : (
            <>
              <MyCourse />
              <Profile name={user} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
