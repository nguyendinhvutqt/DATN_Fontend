import React, { useEffect, useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../Popper";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import CourseItem from "../CourseItem";
import * as userService from "../../services/userService";

const cx = classNames.bind(styles);

const MyCourse = ({ user }) => {
  const [listCourse, setListCourse] = useState([]);
  const [showCourse, setShowCourse] = useState(false);

  useEffect(() => {
    try {
      const fetchApi = async () => {
        const result = await userService.getCourseLearned();
        if (result.status === 200) {
          setListCourse(result.data.courses);
        }
      };
      fetchApi();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showCourse && listCourse.length > 0}
        placement="bottom-end"
        render={(attrs) => (
          <div className={cx("show-profile")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <div className={cx("course-list")}>
                {listCourse &&
                  listCourse.map((course) => (
                    <CourseItem key={course._id} data={course} />
                  ))}
              </div>
            </PopperWrapper>
          </div>
        )}
        onClickOutside={() => setShowCourse(!showCourse)}
      >
        <p className={cx("title")} onClick={() => setShowCourse(!showCourse)}>
          Khoá học của tôi
        </p>
      </HeadlessTippy>
    </div>
  );
};

export default MyCourse;
