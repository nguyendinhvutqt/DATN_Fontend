import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import * as lessonService from "../../../../services/lessonService";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import { useEffect } from "react";

const cx = classNames.bind(styles);

ModalEditLesson.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

function ModalEditLesson(props) {
  const { isOpen, onRequestClose, lessonEdit, onLessonEdited } = props;
  const [titleLesson, setTitleLesson] = useState("");
  const [video, setVideo] = useState("");
  const [descriptionLseson, setDescriptionLseson] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      setTitleLesson(lessonEdit.title);
      setDescriptionLseson(lessonEdit.content);
      setVideo(lessonEdit.resources);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonEdit]);

  const handleSubmit = () => {
    try {
      setLoading(true);
      const fetchApi = async () => {
        const data = {
          title: titleLesson,
          content: descriptionLseson,
          resources: video,
        };
        const result = await lessonService.editLesson(lessonEdit._id, data);
        if (result.status === 200) {
          setDescriptionLseson("");
          setVideo("");
          setTitleLesson("");
          toast.success(result.data.message);
          onLessonEdited(result.data.data);
        }
      };
      fetchApi();
      setLoading(false);
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
      <h2>Sửa bài học</h2>
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
            value={video}
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
            {loading ? "Đang sửa..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalEditLesson;
