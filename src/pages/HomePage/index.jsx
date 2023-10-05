import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import banner1 from "../../assets/images/banner1.jpg";
import SliderComponent from "../../components/Slider";
import * as courseService from "../../services/courseService";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

export const HomePage = () => {
  const [courses, setCourses] = useState([]);

  const { user } = useSelector((state) => state.auth);
  console.log("user: ", user);

  useEffect(() => {
    // Kiểm tra xem có dữ liệu trong Local Storage không
    const storedCourses = JSON.parse(localStorage.getItem("courses"));
    if (storedCourses) {
      setCourses(storedCourses);
    } else {
      const fetchApi = async () => {
        try {
          const result = await courseService.courses();
          setCourses(result.data);
          // Lưu vào Local Storage
          localStorage.setItem("courses", JSON.stringify(result.data));
        } catch (error) {
          console.log(error);
        }
      };
      // Nếu không có, thực hiện lấy từ API
      fetchApi();
    }
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
      <div className={cx("wrapper-content")}>
        <div className={cx("wrapper-title")}>
          <h2 className={cx("title-content")}>DANH SÁCH KHOÁ HỌC</h2>
          <Link className={cx("link")} to="/course">
            {`Xem tất cả ${">>"}`}
          </Link>
        </div>

        <div className={cx("list-course")}>
          {courses &&
            courses.map((course) => {
              return (
                course?.chapters[0]?.lessons && (
                  <div key={course._id} className={cx("course")}>
                    <Link
                      to={
                        course.students.includes(user?.userId)
                          ? `learning/${course._id}?id=${course?.chapters[0]?.lessons[0]._id}`
                          : `courses/${course._id}`
                      }
                    >
                      <img
                        className={cx("thumbnail-course")}
                        src={process.env.REACT_APP_API_BASE + course.thumbnail}
                        alt=""
                      />
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
          <Link className={cx("link")} to="/Blog">
            Xem tất cả ${">>"}
          </Link>
        </div>
        <div className={cx("list-blog")}>
          {/* {courses.map((item) => (
            <div key={item._id} className={cx("blog")}>
              <Link to={`/blog`} className={cx("link-blog")} key={item.id}>
                <img
                  className={cx("thumbnail-blog")}
                  src={process.env.REACT_APP_API_BASE + item.thumbnail}
                  alt=""
                />
                <div>
                  <p className={cx("title-blog")}>
                    tao ten là tao ăn cơm đi chơi suoht ngày và ngu cong đi nhạu
                    đi da bong si sds
                  </p>
                </div>
              </Link>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};
