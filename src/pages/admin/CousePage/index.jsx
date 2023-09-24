import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./style.module.scss";
import * as courseService from "../../../services/courseService";
import ModalAddCourse from "./ModalAddCourse";

const cx = classNames.bind(styles);

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchApi = async () => {
    try {
      const result = await courseService.courses();
      if (result.status === "OK") {
        setCourses(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCourseAdded = () => {
    // This function will be called when a course is successfully added.
    // You can use it to refetch the courses.
    fetchApi();
    closeModal(); // Close the modal after adding the course.
  };

  return (
    <div className={cx("wrapper")}>
      <h2>DANH SÁCH KHOÁ HỌC</h2>
      <div>
        <button onClick={openModal}>Thêm khoá học</button>
      </div>
      <div className={cx("course-list")}>
        <table className={cx("course-table")}>
          <thead>
            <tr>
              <th>Tên khoá học</th>
              <th>Hình ảnh</th>
              <th>zsfc</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course) => (
                <tr key={course._id} className={cx("")}>
                  <td>{course.title}</td>
                  <td className={cx("td-thumbnail")}>
                    <img
                      className={cx("thumbnail")}
                      src={`${
                        process.env.REACT_APP_API_BASE + course.thumbnail
                      }`}
                      alt=""
                    />
                  </td>
                  <td>
                    <button>Sửa</button>
                    <button>Chi tiết</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={cx("modal")}>
        <ModalAddCourse
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onCourseAdded={handleCourseAdded}
        />
      </div>
    </div>
  );
};

export default CoursesPage;
