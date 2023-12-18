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
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./style.module.scss";
import * as lessonService from "../../services/lessonService";
import * as courseService from "../../services/courseService";
import * as func from "../../ultils/func";
import Comment from "../../components/Comment";
import Footer from "../../layouts/components/Footer";
import { ToastContainer } from "react-toastify";
import ModalShowResult from "./ModalShowResult";

const cx = classNames.bind(styles);

const Learn = () => {
  // xử lí học xong video
  const [apiCalled, setApiCalled] = useState(false);
  const [isLearned, setIsLearned] = useState(false);
  const [isLearnedText, setIsLearnedText] = useState(false);
  const [newLesson, setNewLesson] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitAnswers, setSubmitAnswers] = useState(false);
  const [results, setResults] = useState([]);

  const [isOpenModalShowResult, setIsOpenModalShowResult] = useState(false);

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
          setSubmitAnswers(false);
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
          setIsLearned(false);
        }
      } catch (error) {
        // Xử lý lỗi khi gọi API
      }
    };

    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLearned, apiCalled, isLearnedText]);

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

  const handleProgress = (state) => {
    // Kiểm tra xem thời gian hiện tại của video đã đạt đến 3/4 hay chưa
    if (state.played >= 0.75 && !apiCalled && !newLesson) {
      setApiCalled(true);
      setNewLesson(true);
      // played là tỉ lệ thời gian đã phát

      // Gọi API khi đã xem đủ 3/4 video

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

  // const handleQuizz = async () => {
  // if (answer !== "") {
  //   if (answer === lesson.quizz.answerCorrect) {
  //     try {
  //       const result = await lessonService.learned(lesson._id);
  //       if (result.status === 200) {
  //         setIsLearned(true);
  //         toast.success("Câu trả lời chính xác");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     toast.error("Câu trả lời không chính xác");
  //   }
  // }
  // };

  const handleChangeQuizz = (event) => {
    const questionId = event.target.name;
    const selectedAnswer = event.target.value;
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedAnswer,
    });
  };

  const countCorrectAnswers = () => {
    const questions = lesson?.quizz;
    let count = 0;
    for (let i = 0; i < questions?.length; i++) {
      const question = questions[i];
      const userAnswer = userAnswers[question.question];
      if (userAnswer === question.answerCorrect) {
        count++;
      }
    }
    return count;
  };

  // const checkAnswer = (questionId) => {
  //   const question = lesson.quizz.find((q) => q.question === questionId);
  //   const userAnswer = userAnswers[questionId];
  //   return userAnswer === question.answerCorrect;
  // };

  const handleQuizz = async () => {
    setSubmitAnswers(true);

    // Logic to check answers and update results state
    const newResults = [];
    for (const question of lesson.quizz) {
      const questionId = question.question;
      const userAnswer = userAnswers[questionId];
      newResults.push({
        questionId,
        answerCorrect: question.answerCorrect,
        userAnswer,
        isCorrect: userAnswer === question.answerCorrect, // Add isCorrect field to track correctness
      });
    }
    setIsOpenModalShowResult(true);
    setResults(newResults);
    fetchApi();
  };

  const handleCloseModalShowResult = () => {
    setIsOpenModalShowResult(false);
  };

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
          {lesson.quizz &&
            lesson.quizz.map((q, key) => (
              <div key={key} className={cx("quizz")}>
                <h3 className={cx("title-quizz")}>{q.question}</h3>
                {q.answers.map((a) => (
                  <div key={a} className={cx("answer")}>
                    <input
                      className={cx("radio-answer")}
                      type="radio"
                      name={q.question}
                      value={a}
                      onChange={handleChangeQuizz}
                    ></input>
                    <label className={cx("text-answer")}>{a}</label>
                  </div>
                ))}
                {/* Display correct or wrong messages based on results */}
                {submitAnswers &&
                  results.map((result, index) => (
                    <div key={index}>
                      {result.questionId === q.question && ( // Match question by ID
                        <>
                          {result.isCorrect ? (
                            <p className={cx("correct")}>Câu trả lời đúng!</p>
                          ) : (
                            <p className={cx("wrong")}>Câu trả lời sai!</p>
                          )}
                        </>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          {lesson?.quizz?.length > 0 && (
            <button className={cx("btn-quizz")} onClick={handleQuizz}>
              Xác nhận
            </button>
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
                    {lesson?.quizz?.length > 0 && (
                      <FontAwesomeIcon
                        className={cx("icon-lesson")}
                        icon={faPenNib}
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
        <ToastContainer />
        <ModalShowResult
          countAnswers={lesson?.quizz?.length}
          countCorrectAnswers={countCorrectAnswers()}
          isOpen={isOpenModalShowResult}
          onClose={handleCloseModalShowResult}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Learn;
