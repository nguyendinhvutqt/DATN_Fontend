import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import * as lessonService from "../../../../services/lessonService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";

const cx = classNames.bind(styles);

ModalAddLesson.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

function ModalAddLesson(props) {
  const {
    isOpen,
    onRequestClose,
    chapterId,
    onLessonAdded,
    showError,
    onShowError,
  } = props;
  const [titleLesson, setTitleLesson] = useState("");
  const [video, setVideo] = useState("");
  const [descriptionLseson, setDescriptionLseson] = useState("");
  const [error, setError] = useState("");

  const customStyles = {
    content: {
      width: "700px",
      maxHeight: "80vh",
      top: "250px",
      left: "720px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleSubmit = () => {
    try {
      const fetchApi = async () => {
        const data = {
          title: titleLesson,
          content: descriptionLseson,
          resources: video,
        };
        const result = await lessonService.addLesson(chapterId, data);
        if (result.status === "OK") {
          setDescriptionLseson("");
          setVideo("");
          setTitleLesson("");
          toast.success("Thêm bài học thành công!");
          onLessonAdded(chapterId, result.data);
        } else {
          setError(result.message);
          onShowError();
        }
      };
      fetchApi();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <h2>Thêm mới bài học</h2>
      {showError && error && (
        <div className={cx("error")}>
          <strong>{error}</strong>
          <FontAwesomeIcon
            className={cx("icon-close")}
            icon={faXmark}
            onClick={() => setError("")}
          />
        </div>
      )}
      <div className={cx("add-course")}>
        <div className={cx("form-control")}>
          <p className={cx("title")}>Tiêu đề:</p>
          <input
            className={cx("input")}
            type="text"
            placeholder="Nhập tiêu đề..."
            value={titleLesson}
            onChange={(e) => setTitleLesson(e.target.value)}
          />
        </div>
        <div className={cx("form-control")}>
          <p className={cx("title")}>Nội dung:</p>
          <ReactQuill
            theme="snow"
            value={descriptionLseson}
            onChange={setDescriptionLseson}
          />
        </div>
        <div className={cx("form-control")}>
          <p className={cx("title")}>Tài nguyên:</p>
          <input
            className={cx("input")}
            type="text"
            placeholder="Nhập đường dẫn video..."
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>
        {video && (
          <div className={cx("video")}>
            <p>Video đã chọn:</p>
            <ReactPlayer
              loading="lazy"
              playing={true}
              width={650}
              height={300}
              controls={true}
              url={video}
            />
          </div>
        )}

        <div className={cx("box-btn")}>
          <button className={cx("btn")} onClick={onRequestClose}>
            Đóng
          </button>
          <button className={cx("btn", "btn-primary")} onClick={handleSubmit}>
            Xác nhận
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddLesson;
