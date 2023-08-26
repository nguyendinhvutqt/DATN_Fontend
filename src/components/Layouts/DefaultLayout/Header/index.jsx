import React, { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import Button from "../../../Button";
import { Wrapper as PopperWrapper } from "../../../Popper";
import styles from "./style.module.scss";
import images from "../../../../assets/images";
import CourseItem from "../../../CourseItem";

const cx = classNames.bind(styles);

export const Header = () => {
  const [search, setSearch] = useState("");
  // const [searchResult, setSearchResult] = useState([]);

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>
          <img src={images.logo} alt="TikTok" />
        </div>
        <Tippy
          // visible={searchResult.length > 0}
          interactive
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h3 className={cx("search-title")}>Danh sách khoá học</h3>
                <div className={cx("course-list")}>
                  <CourseItem />
                  <CourseItem />
                  <CourseItem />
                  <CourseItem />
                  <CourseItem />
                </div>
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx("search")}>
            <input
              type="text"
              placeholder="Tìm kiếm khoá học...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className={cx("close-btn")} onClick={() => setSearch("")}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}

            <button className={cx("search-btn")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>
        <div className={cx("actions")}>
          <Button>Đăng nhập</Button>
        </div>
      </div>
    </header>
  );
};
