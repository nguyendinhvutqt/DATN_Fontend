import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useLocation } from "react-router-dom";
import HeadlessTippy from "@tippyjs/react/headless";
import {
  faCirclePlus,
  faHouse,
  faNewspaper,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import { Wrapper as PopperWrapper } from "../../../components/Popper";

const cx = classNames.bind(styles);

export const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation();

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className={cx("wrapper")}>
      <HeadlessTippy
        interactive
        visible={showMenu}
        placement="bottom-start"
        render={(attrs) => (
          <div className={cx("show-add-blog")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <div className={cx("wrapper-add-blog")}>
                <Link className={cx("add-blog")} to="add-blog">
                  <FontAwesomeIcon icon={faPen} />{" "}
                  <span className={cx("text-blog")}>Viết blog</span>
                </Link>
              </div>
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleMenu}
      >
        <div className={cx("blog")}>
          <FontAwesomeIcon
            className={cx("add-blog")}
            icon={faCirclePlus}
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </HeadlessTippy>

      <NavLink
        className={cx("home", {
          active: location.pathname === "/",
        })}
        to="/"
      >
        <FontAwesomeIcon className={cx("icon-home")} icon={faHouse} />
        <p>Trang chủ</p>
      </NavLink>

      <NavLink
        className={cx("home", {
          active: location.pathname.startsWith("/blog"),
        })}
        to="/blog"
      >
        <FontAwesomeIcon className={cx("icon-blog")} icon={faNewspaper} />
        <p>Bài viết</p>
      </NavLink>
    </div>
  );
};
