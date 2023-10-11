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
import ModalEditChapter from "../ChapterPage/ModalEditChapter";
import ModalAddLesson from "../LessonPage/ModalAddLesson";
import ModalDeleteLesson from "../LessonPage/ModalDeleteLesson";
import ModalEditLesson from "../LessonPage/ModalEditLesson";

const cx = classNames.bind(styles);

const CourseDetails = () => {
  const [course, setCourse] = useState([]);
  const [chapters, setChapters] = useState([]);

  const courseId = window.location.pathname.split("/")[3];
  const [showError, setShowError] = useState(false);
  const [isShowAddChapter, setIsShowAddChapter] = useState(false);
  const [isShowDeleteChapter, setIsShowDeleteChapter] = useState(false);
  const [isShowEditChapter, setIsShowEditChapter] = useState(false);
  const [isShowAddLesson, setIsShowAddLesson] = useState(false);
  const [isShowEditLesson, setIsShowEditLesson] = useState(false);
  const [isShowDeleteLesson, setIsShowDeleteLesson] = useState(false);
  const [chapterEdit, setChapterEdit] = useState({});
  const [chapterId, setChapterId] = useState(null);
  const [lessonId, setLessonId] = useState(null);
  const [lessonEdit, setLessonEdit] = useState({});

  //add chapter
  const hanleRequestAddChapterClose = () => {
    setShowError(false);
    setIsShowAddChapter(false);
  };

  const handleChapterAdded = (newChapter) => {
    const updatedChapters = [...chapters, newChapter];
    setChapters(updatedChapters);
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

  const handleChapterDeleted = (chapterId) => {
    setChapters((prev) => {
      return prev.filter((chapter) => chapter._id !== chapterId);
    });
    setIsShowDeleteChapter(false);
  };

  // sửa chương
  const hanleRequestEditChapterClose = () => {
    setShowError(false);
    setIsShowEditChapter(false);
  };

  const handleChapterEdited = (chapterEdit) => {
    setChapters((prev) => {
      return prev.map((chapter) => {
        if (chapter._id === chapterEdit._id) {
          return chapterEdit;
        }
        return chapter;
      });
    });
    setIsShowEditChapter(false);
  };

  //add bài học
  const hanleRequestAddLessonClose = () => {
    setShowError(false);
    setIsShowAddLesson(false);
  };

  const handleLessonAdded = (chapterId, lessonAdd) => {
    // Tìm chương có chapterId tương ứng trong chapters
    const updatedChapters = chapters.map((chapter) => {
      if (chapter._id === chapterId) {
        // Thêm bài học vào mảng lessons của chương
        return {
          ...chapter,
          lessons: [...chapter.lessons, lessonAdd],
        };
      }
      return chapter;
    });
    setChapters(updatedChapters);
    setIsShowAddLesson(false);
  };

  // xoá bài học
  const hanleRequestDeleteLessonClose = () => {
    setShowError(false);
    setIsShowDeleteLesson(false);
  };

  const handleLessonDeleted = (lessonId) => {
    // Sử dụng map để duyệt qua từng chương và xóa bài học có lessonId
    const updatedChapters = chapters.map((chapter) => {
      return {
        ...chapter,
        lessons: chapter.lessons.filter((lesson) => lesson._id !== lessonId),
      };
    });

    // Cập nhật trạng thái của chapters
    setChapters(updatedChapters);
    setIsShowDeleteLesson(false);
  };

  //Sửa bài học
  const hanleRequestEditLessonClose = () => {
    setShowError(false);
    setIsShowEditLesson(false);
  };

  const handleLessonEdited = (lessonEdit) => {
    const updatedChapters = chapters.map((chapter) => {
      return {
        ...chapter,
        lessons: chapter.lessons.map((lesson) => {
          if (lesson._id === lessonEdit._id) {
            return lessonEdit;
          }
          return lesson;
        }),
      };
    });

    setChapters(updatedChapters);
    setIsShowEditLesson(false);
  };

  const fetchApi = async () => {
    try {
      const result = await courseService.course(courseId);
      setCourse(result.data);
      setChapters(result.data.chapters);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  let numberChapter = 0;
  let numberLesion = 0;

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
                {chapters ? (
                  <div>
                    {chapters.map((chapter) => (
                      <div key={chapter._id}>
                        <div className={cx("chapter")}>
                          <strong>{`${++numberChapter}. ${
                            chapter.title
                          }`}</strong>
                          <div>
                            <span>{chapter.lessons.length} bài học</span>
                            <FontAwesomeIcon
                              className={cx("icon-lesson")}
                              icon={faPen}
                              onClick={() => {
                                setChapterEdit(chapter);
                                setIsShowEditChapter(true);
                              }}
                            />
                            <FontAwesomeIcon
                              className={cx("icon-lesson")}
                              icon={faTrash}
                              onClick={() => {
                                setIsShowDeleteChapter(true);
                                setChapterId(chapter._id);
                              }}
                            />
                            <FontAwesomeIcon
                              className={cx("icon-lesson")}
                              icon={faPlusCircle}
                              onClick={() => {
                                setIsShowAddLesson(true);
                                setChapterId(chapter._id);
                              }}
                            />
                          </div>
                        </div>
                        {chapter?.lessons.map((lesson) => (
                          <div key={lesson._id} className={cx("lesion")}>
                            <p className={cx("title")}>{`${++numberLesion}. ${
                              lesson.title
                            }`}</p>

                            <div>
                              <FontAwesomeIcon
                                className={cx("icon-lesson")}
                                icon={faTrash}
                                onClick={() => {
                                  setIsShowDeleteLesson(true);
                                  setLessonId(lesson._id);
                                }}
                              />
                              <FontAwesomeIcon
                                className={cx("icon-lesson")}
                                icon={faPen}
                                onClick={() => {
                                  setLessonEdit(lesson);
                                  setIsShowEditLesson(true);
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    <div
                      className={cx("div-chapter")}
                      onClick={() => {
                        setIsShowAddChapter(true);
                      }}
                    >
                      <FontAwesomeIcon
                        className={cx("icon-chapter")}
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
        <ModalEditChapter
          isOpen={isShowEditChapter}
          chapter={chapterEdit}
          onRequestClose={hanleRequestEditChapterClose}
          onChapterEdited={handleChapterEdited}
        />

        <ModalAddLesson
          isOpen={isShowAddLesson}
          chapterId={chapterId}
          onError={showError}
          onShowError={handleShowError}
          onRequestClose={hanleRequestAddLessonClose}
          onLessonAdded={handleLessonAdded}
        />
        <ModalDeleteLesson
          isOpen={isShowDeleteLesson}
          lessonId={lessonId}
          onRequestClose={hanleRequestDeleteLessonClose}
          onLessonDeleted={handleLessonDeleted}
        />
        <ModalEditLesson
          isOpen={isShowEditLesson}
          lessonEdit={lessonEdit}
          onError={showError}
          onShowError={handleShowError}
          onRequestClose={hanleRequestEditLessonClose}
          onLessonEdited={handleLessonEdited}
        />

        <ToastContainer />
      </div>
    </div>
  );
};

export default CourseDetails;
