import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";

import * as courseService from "../../services/courseService";
import { formatMoney } from "../../ultils/func";
import * as paymentService from "../../services/paymentService";

const cx = classNames.bind(styles);

function CourseDetails() {
  const [courseData, setCourseData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [sdkReady, setSdkReady] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const user = useSelector((state) => state.user);

  let numberChapter = 0;
  let numberLesion = 0;

  useEffect(() => {
    const courseId = window.location.pathname.split("/")[2];

    const fetchApi = async () => {
      const result = await courseService.course(courseId);
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

  const addPaymentScript = async () => {
    try {
      const result = await paymentService.getPaymentConfig();
      if (result.status === 200) {
        const script = document.createComment("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${result.data.data}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.appendChild(script);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addPaymentScript();
  }, []);

  const onSuccessPaypal = async (details, data) => {
    try {
      const result = await courseService.paymentCourse(courseData._id);
      console.log(result);
      if (result.status === 200) {
        navigate(
          `/learning/${courseData._id}?id=${courseData?.chapters[0]?.lessons[0]._id}`
        );
      }
    } catch (error) {
      console.log(error);
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
            {courseData.price > 0 ? (
              <>
                <button className={cx("btn-register-course")}>
                  {formatMoney(courseData.price)}
                </button>
                <PayPalButton
                  amount={Math.round((courseData.price / 24000) * 100) / 100}
                  // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                  onSuccess={onSuccessPaypal}
                  onError={() => {
                    alert("Thanh toán thất bại");
                  }}
                />
              </>
            ) : (
              <button
                className={cx("btn-register-course")}
                onClick={handleRegisterCourse}
              >
                ĐĂNG KÍ HỌC
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetails;
