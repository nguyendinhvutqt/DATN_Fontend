import React, { useEffect, useRef, useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import CourseItem from "../CourseItem";
import { Wrapper as PopperWrapper } from "../Popper";
import { useDebounce } from "../../hooks";
import * as searchService from "../../services/searchService";
import BlogItem from "../BlogItem";

const cx = classNames.bind(styles);

const Search = () => {
  const [search, setSearch] = useState("");
  const [showResult, setShowResult] = useState(true);
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const debounced = useDebounce(search, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      setCourses([]);
      setBlogs([]);
      return;
    }
    const fetchApi = async () => {
      const result = await searchService.search(debounced);
      if (result.status === 200) {
        setCourses(result?.data?.data?.courses);
        setBlogs(result.data?.data?.blogs);
      }
    };
    fetchApi();
  }, [debounced]);

  const inputSearchRef = useRef();

  const handleCloseSearch = () => {
    setCourses([]);
    setBlogs([]);
    setSearch("");
    inputSearchRef.current.focus();
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChangeInput = (e) => {
    if (!e.target.value.startsWith(" ")) {
      setSearch(e.target.value);
    }
  };
  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && (courses.length > 0 || blogs.length > 0)}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h3 className={cx("search-title")}>Danh sách khoá học</h3>
              <div className={cx("course-list")}>
                {courses.length < 1 && <p>Không tìm thấy khoá học</p>}
                {courses.map((course) => (
                  <>
                    {course?.chapters[0]?.lessons && (
                      <CourseItem key={course._id} data={course} />
                    )}
                  </>
                ))}
              </div>
              <h3 className={cx("search-title")}>Danh sách bài viết</h3>
              <div className={cx("course-list")}>
                {blogs.length < 1 && <p>Không tìm thấy bài viết</p>}
                {blogs.map((result) => (
                  <BlogItem key={result.id} data={result} />
                ))}
              </div>
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputSearchRef}
            spellCheck={false}
            type="text"
            placeholder="Tìm kiếm khoá học, bài viết...."
            value={search}
            onChange={handleChangeInput}
            onFocus={handleShowResult}
          />
          {search && (
            <button className={cx("close-btn")} onClick={handleCloseSearch}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          <button className={cx("search-btn")}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onMouseDown={(e) => e.preventDefault()}
            />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
};

export default Search;
