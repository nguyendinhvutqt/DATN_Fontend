import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./style.module.scss";
import * as userService from "../../services/userService";

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
        <div className={cx("my-courses")}>
          <h2>Các khoá học đã tham gia</h2>
          {listCourse &&
            listCourse.map((course) => (
              <div key={course._id} className={cx("course")}>
                <img
                  className={cx("img-course")}
                  src={process.env.REACT_APP_API_BASE + course.thumbnail}
                  alt="thumbnail"
                />
                <div className={cx("description-course")}>
                  <p>{course.title}</p>
                </div>
              </div>
            ))}
        </div>
        <div className={cx("profile")}>
          <div className={cx("wrapper-img-profile")}>
            <img
              className={cx("img-profile")}
              src={process.env.REACT_APP_API_BASE + user.avatar}
              alt="avatar"
            />
          </div>
          <div className={cx("info")}>
            <p>Họ và tên: </p>
            <input type="text" value={user.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
