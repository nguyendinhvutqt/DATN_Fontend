import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import banner1 from "../../assets/images/banner1.jpg";
import SliderComponent from "../../components/Slider";
import * as courseService from "../../services/courseService";
import * as blogService from "../../services/blogService";
import * as userService from "../../services/userService";
import {
  formatMoney,
  getPrtcentLessonSuccess,
  getTotalLessons,
  getTotalLessonsByUser,
} from "../../ultils/func";

const cx = classNames.bind(styles);

export const HomePage = () => {
  const [coursesLearned, setCoursesLearned] = useState([]);
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const user = useSelector((state) => state.user);

  const getCoursesLearned = async () => {
    try {
      const result = await userService.getCourseLearned();
      if (result.status === 200) {
        setCoursesLearned(result.data.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const getBlogsApi = async () => {
    try {
      const result = await blogService.getBlogs();
      setBlogs(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoursesLearned();
  }, []);

  useEffect(() => {
    getCoursesApi();
  }, []);

  useEffect(() => {
    getBlogsApi();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-slider")}>
        <div className={cx("slider")}>
          <SliderComponent
            banner
            accessibility
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
          >
            <img src={banner1} alt="" />
            <img src={banner1} alt="" />
          </SliderComponent>
        </div>
      </div>
      {user.isLoggedIn === true && coursesLearned.length > 0 && (
        <div className={cx("wrapper-content")}>
          <div className={cx("wrapper-title")}>
            <h2 className={cx("title-content")}>
              DANH SÁCH KHOÁ HỌC ĐÃ ĐĂNG KÍ
            </h2>
          </div>
          <div className={cx("list-course")}>
            {coursesLearned &&
              coursesLearned.map((course) => {
                return (
                  course?.chapters[0]?.lessons.length > 0 && (
                    <div key={course._id} className={cx("course")}>
                      <Link
                        to={
                          course.students.includes(user?.userId)
                            ? `/learning/${course?._id}?id=${course?.chapters[0]?.lessons[0]._id}`
                            : `/courses/${course?._id}`
                        }
                      >
                        <img
                          className={cx("thumbnail-course")}
                          src={
                            process.env.REACT_APP_API_BASE + course.thumbnail
                          }
                          alt=""
                        />

                        <div className={cx("logic-course")}>
                          <div className={cx("progress-bar")}>
                            <div className={cx("progress")}>
                              <div className={cx("percentage")}>
                                {course &&
                                  `${getPrtcentLessonSuccess(
                                    course,
                                    user.userId
                                  )}%`}
                              </div>
                            </div>
                          </div>
                          <p className={cx("count-course")}>
                            {`${getTotalLessonsByUser(
                              course,
                              user.userId
                            )}/${getTotalLessons(course)} bài học`}
                          </p>
                          {getPrtcentLessonSuccess(course, user.userId) ===
                            100 && (
                            <FontAwesomeIcon
                              className={cx("icon-check")}
                              icon={faCheckCircle}
                              color="#23CD56"
                            />
                          )}
                        </div>
                        <p className={cx("total-user")}>
                          <FontAwesomeIcon
                            className={cx("icon-user")}
                            icon={faUsers}
                          />
                          {course?.students.length} thành viên /{" "}
                          {course.price > 0
                            ? formatMoney(course.price)
                            : "Miễn phí"}
                        </p>
                        <p className={cx("title-course")}>{course.title}</p>
                      </Link>
                    </div>
                  )
                );
              })}
          </div>
        </div>
      )}
      <div className={cx("wrapper-content")}>
        <div className={cx("wrapper-title")}>
          <h2 className={cx("title-content")}>DANH SÁCH KHOÁ HỌC PRO</h2>
        </div>

        <div className={cx("list-course")}>
          {courses &&
            courses.map((course) => {
              return (
                course?.chapters[0]?.lessons.length > 0 &&
                !course.students.includes(user?.userId) &&
                course.price > 1 && (
                  <div key={course._id} className={cx("course")}>
                    <Link
                      to={
                        course.students.includes(user?.userId)
                          ? `/learning/${course?._id}?id=${course?.chapters[0]?.lessons[0]._id}`
                          : `/courses/${course?._id}`
                      }
                    >
                      <img
                        className={cx("thumbnail-course")}
                        src={process.env.REACT_APP_API_BASE + course.thumbnail}
                        alt=""
                      />
                      <p className={cx("total-user")}>
                        <FontAwesomeIcon
                          className={cx("icon-user")}
                          icon={faUsers}
                        />
                        {course?.students.length} thành viên
                      </p>
                      <p className={cx("price-course")}>
                        {formatMoney(course.price)}
                      </p>
                      <p className={cx("title-course")}>{course.title}</p>
                    </Link>
                  </div>
                )
              );
            })}
        </div>
      </div>
      <div className={cx("wrapper-content")}>
        <div className={cx("wrapper-title")}>
          <h2 className={cx("title-content")}>DANH SÁCH KHOÁ HỌC MIỄN PHÍ</h2>
        </div>

        <div className={cx("list-course")}>
          {courses &&
            courses.map((course) => {
              return (
                course?.chapters[0]?.lessons.length > 0 &&
                !course.students.includes(user?.userId) &&
                course.price === 0 && (
                  <div key={course._id} className={cx("course")}>
                    <Link
                      to={
                        course.students.includes(user?.userId)
                          ? `/learning/${course?._id}?id=${course?.chapters[0]?.lessons[0]._id}`
                          : `/courses/${course?._id}`
                      }
                    >
                      <img
                        className={cx("thumbnail-course")}
                        src={process.env.REACT_APP_API_BASE + course.thumbnail}
                        alt=""
                      />
                      <p className={cx("total-user")}>
                        <FontAwesomeIcon
                          className={cx("icon-user")}
                          icon={faUsers}
                        />
                        {course?.students.length} thành viên
                      </p>
                      <p className={cx("title-course")}>{course.title}</p>
                    </Link>
                  </div>
                )
              );
            })}
        </div>
      </div>
      <div className={cx("wrapper-content")}>
        <div className={cx("wrapper-title")}>
          <h2 className={cx("title-content")}>BÀI VIẾT</h2>
        </div>
        <div className={cx("list-blog")}>
          {blogs &&
            blogs.map((item) => (
              <div key={item._id} className={cx("blog")}>
                <Link
                  to={`/blogs/${item._id}`}
                  className={cx("link-blog")}
                  key={item.id}
                >
                  <img
                    className={cx("thumbnail-blog")}
                    src={process.env.REACT_APP_API_BASE + item.thumbnail}
                    alt=""
                  />
                  <div>
                    <p className={cx("title-blog")}>{item.title}</p>
                    <div className={cx("profile-blog")}>
                      <img
                        className={cx("avatar-blog")}
                        src={
                          process.env.REACT_APP_API_BASE + item.author.avatar
                        }
                        alt="avatar"
                      />
                      <p className={cx("name-blog")}>{item.author.name}</p>
                    </div>
                    {/* <div className={cx("views-blog")}>
                      <FontAwesomeIcon icon={faEye} color="gray" />
                      <span className={cx("count-views")}>{item.views}</span>
                    </div> */}
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
