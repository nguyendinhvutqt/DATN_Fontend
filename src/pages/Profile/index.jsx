import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./style.module.scss";
import * as userService from "../../services/userService";
import { Link } from "react-router-dom";
import {
  getPrtcentLessonSuccess,
  getTotalLessons,
  getTotalLessonsByUser,
} from "../../ultils/func";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const Profile = () => {
  const [listCourse, setListCourse] = useState([]);

  const user = useSelector((state) => state.user);

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
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("text-title")}>
          <h2>Thông tin trang cá nhân</h2>
        </div>
        <div className={cx("profile")}>
          <div className={cx("wrapper-img-profile")}>
            {user?.googleId ? (
              <img
                className={cx("img-profile")}
                src={user.avatar}
                alt="avatar"
              />
            ) : (
              <img
                className={cx("img-profile")}
                src={process.env.REACT_APP_API_BASE + user.avatar}
                alt="avatar"
              />
            )}
            <div className={cx("name-user")}>
              <h2>{user.name}</h2>
            </div>
          </div>
        </div>
        <div className={cx("my-courses")}>
          <h2>Các khoá học đã tham gia</h2>
          <div className={cx("list-course")}>
            {listCourse &&
              listCourse.map((course) => (
                <Link
                  to={`/learning/${course?._id}?id=${course?.chapters[0]?.lessons[0]?._id}`}
                  key={course._id}
                  className={cx("course")}
                >
                  <img
                    className={cx("img-course")}
                    src={process.env.REACT_APP_API_BASE + course.thumbnail}
                    alt="thumbnail"
                  />
                  <div className={cx("logic-course")}>
                    <div className={cx("progress-bar")}>
                      <div className={cx("progress")}>
                        <div className={cx("percentage")}>
                          {course &&
                            `${getPrtcentLessonSuccess(course, user.userId)}%`}
                        </div>
                      </div>
                    </div>
                    <p className={cx("count-course")}>
                      {`${getTotalLessonsByUser(
                        course,
                        user.userId
                      )}/${getTotalLessons(course)} bài học`}
                    </p>
                    {getPrtcentLessonSuccess(course, user.userId) === 100 && (
                      <FontAwesomeIcon
                        className={cx("icon-check")}
                        icon={faCheckCircle}
                        color="#23CD56"
                      />
                    )}
                  </div>
                  <div className={cx("description-course")}>
                    <p>{course.title}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
