import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.scss";
import * as courseService from "../../../services/courseService";
import ModalAddCourse from "./ModalAddCourse";
import ModalDeleteCourse from "./ModalDeleteCourse";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import ModalEditCourse from "./ModalEditCourse";
import Paginate from "../../../components/Paginate";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const CoursesPage = () => {
  // lấy các khoá học
  const [courses, setCourses] = useState([]);
  // thêm khoá học
  const [openModalAdd, setOpenModalAdd] = useState(false);
  // trạng thái lỗi
  const [showError, setShowError] = useState(false);
  // xoá khoá học
  const [openModalDel, setOpenModalDel] = useState(false);
  const [courseId, setCourseId] = useState(null);
  // sửa khoá học
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [courseEdit, setCourseEdit] = useState(null);
  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchApi = async (currentPage) => {
    try {
      const result = await courseService.coursesAndPaginate(currentPage);
      if (result.status === "OK") {
        setCourses(result.data);
        setTotalPage(result.totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi(currentPage);
  }, [currentPage]);

  const closeModal = () => {
    setOpenModalAdd(false);
    setOpenModalDel(false);
    setOpenModalEdit(false);
    setShowError(false);
  };

  const handleCourse = () => {
    fetchApi();
    closeModal();
    setShowError(false);
  };

  const handleShowError = () => {
    setShowError(true);
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const handleInfo = (course) => {
    console.log("course: ", course);
  };

  return (
    <div className={cx("wrapper")}>
      <h2>DANH SÁCH KHOÁ HỌC</h2>
      <div>
        <button
          className={cx("btn", "btn-primary")}
          onClick={() => setOpenModalAdd(true)}
        >
          Thêm khoá học
        </button>
      </div>
      <div className={cx("course-list")}>
        <table className={cx("course-table")}>
          <thead>
            <tr>
              <th className={cx("th-title")}>Tên khoá học</th>
              <th className={cx("th-image")}>Hình ảnh</th>
              <th className={cx("th-action")}></th>
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
                      alt="hình ảnh"
                    />
                  </td>
                  <td>
                    <div className={cx("block-action")}>
                      <div className={cx("btn-icon")}>
                        <button
                          onClick={() => {
                            setCourseEdit(course);
                            setOpenModalEdit(true);
                          }}
                          className={cx("action")}
                        >
                          <FontAwesomeIcon
                            className={cx("icon")}
                            icon={faPenToSquare}
                          />
                        </button>
                      </div>
                      <div className={cx("btn-icon")}>
                        <button
                          onClick={() => {
                            setCourseId(course._id);
                            setOpenModalDel(true);
                          }}
                          className={cx("action")}
                        >
                          <FontAwesomeIcon
                            className={cx("icon")}
                            icon={faTrash}
                          />
                        </button>
                      </div>
                      <div className={cx("btn-icon")}>
                        <Link
                          to={`/admin/courses/${course._id}`}
                          className={cx("link")}
                          onClick={() => handleInfo(course)}
                        >
                          <FontAwesomeIcon
                            className={cx("icon")}
                            icon={faCircleInfo}
                          />
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Paginate onClickPage={handlePageClick} totalPage={totalPage} />
      </div>
      <div className={cx("modal")}>
        <ModalAddCourse
          isOpen={openModalAdd}
          showError={showError}
          onShowError={handleShowError}
          onRequestClose={closeModal}
          onCourseAdded={handleCourse}
        />
        <ModalDeleteCourse
          isOpen={openModalDel}
          courseIdToDelete={courseId}
          onRequestClose={closeModal}
          onCourseDeleted={handleCourse}
        />
        <ModalEditCourse
          isOpen={openModalEdit}
          showError={showError}
          onShowError={handleShowError}
          courseEdit={courseEdit}
          onRequestClose={closeModal}
          onCourseEdited={handleCourse}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CoursesPage;
