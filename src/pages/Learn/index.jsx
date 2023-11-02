import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { NavLink, useLocation, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faFilm,
  faLessThan,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./style.module.scss";
import * as lessonService from "../../services/lessonService";
import * as courseService from "../../services/courseService";
import * as func from "../../ultils/func";
import Comment from "../../components/Comment";
import Footer from "../../layouts/components/Footer";

const cx = classNames.bind(styles);

const Learn = () => {
  // xử lí học xong video
  const [apiCalled, setApiCalled] = useState(false);
  const [isLearned, setIsLearned] = useState(false);
  const [isLearnedText, setIsLearnedText] = useState(false);
  const [newLesson, setNewLesson] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const user = useSelector((state) => state.user);

  const location = useLocation();
  const params = useParams();

  const playerRef = useRef(null);

  const [lessonId, setLessonId] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("id");
  });
  const [lesson, setLesson] = useState({});
  const [course, setCourse] = useState(null);

  useEffect(() => {
    try {
      const fetchApi = async () => {
        const result = await lessonService.getById(lessonId);
        if (result.status === 200) {
          setApiCalled(false);
          setNewLesson(false);
          setLesson(result.data.data);
        }
      };
      fetchApi();
    } catch (error) {}
  }, [lessonId]);

  useEffect(() => {
    // Gọi API để lấy thông tin khoá học
    const { courseId } = params;
    const fetchCourse = async () => {
      try {
        const result = await courseService.course(courseId);
        if (result.status === 200) {
          setApiCalled(false);
          setIsLearnedText(false);
          setCourse(result.data);
        }
      } catch (error) {
        // Xử lý lỗi khi gọi API
      }
    };

    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLearned, apiCalled, isLearnedText]);

  const handleProgress = (state) => {
    // Kiểm tra xem thời gian hiện tại của video đã đạt đến 3/4 hay chưa
    if (state.played >= 0.75 && !apiCalled && !newLesson) {
      setApiCalled(true);
      setNewLesson(true);
      // played là tỉ lệ thời gian đã phát

      // Gọi API khi đã xem đủ 3/4 video
      const fetchApi = async () => {
        try {
          const result = await lessonService.learned(lesson._id);
          console.log(result);
          if (result.status === 200) {
            setIsLearned(true);
          }
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchApi();
    }
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Tính toán khoảng cách tới bottom của trang (ví dụ: 20%)
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const distanceToBottom = scrollHeight - (scrollTop + windowHeight);

    // Khi người dùng cuộn đến 20% đáy trang, thực hiện fetch dữ liệu
    if (distanceToBottom < 0.4 * windowHeight) {
      const fetchApi = async () => {
        try {
          const result = await lessonService.learned(lesson._id);
          console.log(result);
          if (result.status === 200) {
            setIsLearnedText(true);
          }
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchApi();
    }
  };

  useEffect(() => {
    if (lesson.docs) {
      window.addEventListener("scroll", handleScroll);
    }

    // Cleanup listener khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  const handleVideoEnd = () => {
    setApiCalled(false);
  };

  let numberChapter = 0;
  let numberLesion = 0;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-nav")}>
        <div className={cx("nav")}>
          <div className={cx("title-course")}>
            <Link to="/">
              <FontAwesomeIcon className={cx("icon-back")} icon={faLessThan} />
            </Link>
            <h2 className={cx("name-course")}>{course?.title}</h2>
          </div>
          <div className={cx("logic-course")}>
            <div className={cx("progress-bar")}>
              <div className={cx("progress")}>
                <div className={cx("percentage")}>
                  {course &&
                    `${func.getPrtcentLessonSuccess(course, user.userId)}%`}
                </div>
              </div>
            </div>
            <p className={cx("count-course")}>
              {course &&
                `${func.getTotalLessonsByUser(
                  course,
                  user.userId
                )}/${func.getTotalLessons(course)} bài học`}
            </p>
          </div>
        </div>
      </div>
      <div className={cx("lessons")}>
        <div className={cx("content")}>
          {lesson.resources && (
            <ReactPlayer
              ref={playerRef}
              loading="lazy"
              playing={true}
              width={800}
              height={472}
              controls={true}
              url={lesson.resources}
              onProgress={handleProgress}
              onEnded={handleVideoEnd}
            />
          )}
          {lesson.docs && (
            <div
              className={cx("")}
              dangerouslySetInnerHTML={{ __html: lesson.docs }}
            ></div>
          )}
          <div
            className={cx("description")}
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          ></div>
          <div className={cx("comment")}>
            <Comment user={user} lessonId={lessonId} />
          </div>
        </div>
        <div className={cx("menu")}>
          <div className={cx("list-Chapter")}>
            <h2 className={cx("title-lesson")}>NỘI DUNG BÀI HỌC</h2>
            {course?.chapters.map((chapter) => (
              <div key={chapter._id}>
                <div className={cx("chapter")}>
                  <strong>{`${++numberChapter}. ${chapter.title}`}</strong>
                  <span>{chapter.lessons.length} bài học</span>
                </div>

                {chapter.lessons.map((lesson) => (
                  <NavLink
                    key={lesson._id}
                    className={cx("lesson", {
                      active: lessonId === lesson._id,
                    })}
                    to={`/learning/${course._id}?id=${lesson._id}`}
                    onClick={() => setLessonId(lesson._id)}
                  >
                    <p className={cx("title")}>
                      {` ${++numberLesion}. ${lesson.title} `}
                    </p>
                    {lesson?.resources && (
                      <FontAwesomeIcon
                        className={cx("icon-lesson")}
                        icon={faFilm}
                      />
                    )}
                    {lesson?.docs && (
                      <FontAwesomeIcon
                        className={cx("icon-lesson")}
                        icon={faNewspaper}
                      />
                    )}
                    {lesson.userLearneds.includes(user.userId) && (
                      <p className={cx("icon-check")}>
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          style={{ color: "#23cd56" }}
                        />
                      </p>
                    )}
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Learn;
