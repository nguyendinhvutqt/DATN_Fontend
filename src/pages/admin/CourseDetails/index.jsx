import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLessThan,
  faPen,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import * as courseService from "../../../services/courseService";
import ModalAddChapter from "../ChapterPage/ModalAddChapter";
import { ToastContainer } from "react-toastify";
import ModalDeleteChapter from "../ChapterPage/ModalDeleteChapter";

const cx = classNames.bind(styles);

const CourseDetails = () => {
  const [course, setCourse] = useState([]);

  const courseId = window.location.pathname.split("/")[3];
  const [showError, setShowError] = useState(false);
  const [isShowAddChapter, setIsShowAddChapter] = useState(false);
  const [isShowDeleteChapter, setIsShowDeleteChapter] = useState(false);
  const [chapterId, setChapterId] = useState(null);

  //add chapter
  const hanleRequestAddChapterClose = () => {
    setShowError(false);
    setIsShowAddChapter(false);
  };

  const handleChapterAdded = () => {
    fetchApi();
    setShowError(false);
    setIsShowAddChapter(false);
  };

  const handleShowError = () => {
    setShowError(true);
  };

  // xoá chương
  const hanleRequestDeleteChapterClose = () => {
    setShowError(false);
    setIsShowDeleteChapter(false);
  };

  const handleChapterDeleted = () => {
    fetchApi();
    setIsShowDeleteChapter(false);
  };

  const fetchApi = async () => {
    try {
      const result = await courseService.course(courseId);
      setCourse(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("nav")}>
          <Link to="/admin/courses">
            <FontAwesomeIcon className={cx("icon-back")} icon={faLessThan} />
          </Link>
          <h2 className={cx("name-course")}>{course && course.title}</h2>
          <div className={cx("logic-course")}></div>
        </div>
        <div className={cx("course")}>
          <div className={cx("sidebar")}>
            <div className={cx("list-Chapter")}>
              <div>
                <h2>NỘI DUNG BÀI HỌC</h2>
              </div>
              <div>
                {course.chapters ? (
                  <div>
                    {course.chapters.map((chapter) => (
                      <div key={chapter._id}>
                        <div className={cx("chapter")}>
                          <strong>{chapter.title}</strong>
                          <div>
                            <span>5 bài học</span>
                            <FontAwesomeIcon
                              className={cx("icon-add-lesson")}
                              icon={faPen}
                            />
                            <FontAwesomeIcon
                              className={cx("icon-add-lesson")}
                              icon={faTrash}
                              onClick={() => {
                                setIsShowDeleteChapter(true);
                                setChapterId(chapter._id);
                              }}
                            />
                            <FontAwesomeIcon
                              className={cx("icon-add-lesson")}
                              icon={faPlusCircle}
                            />
                          </div>
                        </div>
                        {chapter?.lessons.map((lesson) => (
                          <div key={lesson._id} className={cx("lesion")}>
                            <p className={cx("title")}>{lesson.title}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                    <div
                      className={cx("div-add-chapter")}
                      onClick={() => {
                        setIsShowAddChapter(true);
                      }}
                    >
                      <FontAwesomeIcon
                        className={cx("icon-add-chapter")}
                        icon={faPlusCircle}
                      />
                      <p>Thêm chương mới</p>
                    </div>
                  </div>
                ) : (
                  <p>Không có khoá học nào</p>
                )}
              </div>
            </div>
          </div>
          <div className={cx("content")}>content</div>
        </div>
      </div>
      <div className={cx("modal")}>
        <ModalAddChapter
          isOpen={isShowAddChapter}
          courseId={courseId}
          onError={showError}
          onShowError={handleShowError}
          onRequestClose={hanleRequestAddChapterClose}
          onChapterAdded={handleChapterAdded}
        />
        <ModalDeleteChapter
          isOpen={isShowDeleteChapter}
          chapterId={chapterId}
          onRequestClose={hanleRequestDeleteChapterClose}
          onChapterDeleted={handleChapterDeleted}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default CourseDetails;
