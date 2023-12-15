import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import * as courseService from "../../services/courseService";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatMoney } from "../../ultils/func";

const cx = classNames.bind(styles);

const CoursePage = () => {
  const [courses, setCourses] = useState([]);

  const user = useSelector((state) => state.user);

  const getCoursesApi = async () => {
    try {
      const result = await courseService.courses();
      if (result.status === 200) {
        setCourses(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoursesApi();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <h2 className={cx("text-title")}>Danh sách các khoá học</h2>
        {courses &&
          courses.map((course) => {
            return (
              course?.chapters[0]?.lessons && (
                <Link
                  key={course._id}
                  to={
                    course.students.includes(user?.userId)
                      ? `/learning/${course._id}?id=${course?.chapters[0]?.lessons[0]._id}`
                      : `/courses/${course._id}`
                  }
                  className={cx("course")}
                >
                  <img
                    className={cx("thumbnail")}
                    src={process.env.REACT_APP_API_BASE + course.thumbnail}
                    alt="thumbnail"
                  />
                  <div className={cx("description")}>
                    <h2 className={cx("title-course")}>{course.title}</h2>
                    <div className={cx("member-course")}>
                      <FontAwesomeIcon icon={faUsers} color="gray" />
                      <p className={cx("text-member")}>
                        {course.students.length} thành viên
                      </p>
                    </div>
                    <p className={cx("price-course")}>
                      {course.price > 0
                        ? formatMoney(course.price)
                        : "Miễn phí"}
                    </p>
                    <div
                      className={cx("text")}
                      dangerouslySetInnerHTML={{ __html: course.description }}
                    />
                  </div>
                </Link>
              )
            );
          })}
      </div>
    </div>
  );
};

export default CoursePage;
