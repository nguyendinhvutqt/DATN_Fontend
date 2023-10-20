import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";

import * as courseService from "../../services/courseService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

function CourseDetails() {
  const [courseData, setCourseData] = useState(null);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const user = useSelector((state) => state.user);

  let numberChapter = 0;
  let numberLesion = 0;

  useEffect(() => {
    const courseId = window.location.pathname.split("/")[2];

    const fetchApi = async () => {
      const result = await courseService.course(courseId);
      console.log(result);
      setCourseData(result.data);
      // setLoading(false);
    };

    fetchApi();
  }, []);

  const handleRegisterCourse = async () => {
    if (courseData) {
      const result = await courseService.registerCourse(courseData._id);
      if (result.status === 200) {
        navigate(
          `/learning/${courseData._id}?id=${courseData?.chapters[0]?.lessons[0]._id}`
        );
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      {courseData && (
        <div className={cx("course")}>
          <div className={cx("section")}>
            <div className={cx("description")}>
              <h1 className={cx("title-course")}>{courseData.title}</h1>
              <div
                className={cx("text")}
                dangerouslySetInnerHTML={{ __html: courseData.description }}
              />
            </div>
            <div className={cx("content")}>
              <h2>NỘI DUNG BÀI HỌC</h2>
              <div className={cx("list-Chapter")}>
                {courseData.chapters.map((chapter) => (
                  <div key={chapter._id}>
                    <div className={cx("chapter")}>
                      <strong>{`${++numberChapter}. ${chapter.title}`}</strong>
                      <span>{chapter.lessons.length} bài học</span>
                    </div>

                    {chapter.lessons.map((lesson) => (
                      <div className={cx("lesion")} key={lesson._id}>
                        <p className={cx("title")}>{`${++numberLesion}. ${
                          lesson.title
                        }`}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={cx("course1")}>
            <img
              className={cx("img-course")}
              src={process.env.REACT_APP_API_BASE + courseData.thumbnail}
              alt="thumbnail"
            />
            <button
              className={cx("btn-register-course")}
              onClick={handleRegisterCourse}
            >
              ĐĂNG KÍ HỌC
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetails;
