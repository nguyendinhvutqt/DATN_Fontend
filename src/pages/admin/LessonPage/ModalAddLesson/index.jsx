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

const cx = classNames.bind(styles);

ModalAddLesson.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

function ModalAddLesson(props) {
  const { isOpen, onRequestClose, chapterId, onLessonAdded } = props;
  const [titleLesson, setTitleLesson] = useState("");
  const [video, setVideo] = useState("");
  const [descriptionLseson, setDescriptionLsesson] = useState("");
  const [textLseson, setTextLseson] = useState("");
  const [valueRadio, setValueRadio] = useState("");
  const [file, setFile] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const fetchApi = async () => {
        const data = new FormData();
        data.append("title", titleLesson);
        data.append("content", descriptionLseson);
        data.append("text", textLseson);
        data.append("resources", video);
        data.append("file", file);
        const result = await lessonService.addLesson(chapterId, data);
        if (result.status === 201) {
          setDescriptionLsesson("");
          setVideo("");
          setTextLseson("");
          setTitleLesson("");
          setValueRadio("");
          setFile("");
          toast.success(result.data.message);
          onLessonAdded(chapterId, result.data.data);
        }
      };
      fetchApi();
    } catch (error) {
      console.log("error", error);
    }
  };

  const typesRadio = [
    { title: "Video", value: "video" },
    { title: "Text", value: "text" },
    { title: "Quizz", value: "quizz" },
  ];

  const handleRadio = (e) => {
    setValueRadio(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Gán hình ảnh vào biến thumbnailCourse
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
      <form onSubmit={handleSubmit} className={cx("add-course")}>
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
            onChange={setDescriptionLsesson}
          />
        </div>
        <div className={cx("box-radio")}>
          {typesRadio.map((radio) => (
            <div className={cx("radio")}>
              <input
                type="radio"
                name="radio"
                value={radio.value}
                onChange={handleRadio}
              />
              <label for="html" className={cx("label")}>
                {radio.title}
              </label>
            </div>
          ))}
        </div>
        {valueRadio === "video" && (
          <>
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
          </>
        )}
        {valueRadio === "text" && (
          <div className={cx("form-control")}>
            <p className={cx("title")}>Nội dung:</p>
            <ReactQuill
              theme="snow"
              value={textLseson}
              onChange={setTextLseson}
            />
          </div>
        )}
        {valueRadio === "quizz" && (
          <div className={cx("form-control")}>
            <p className={cx("title")}>Tài nguyên:</p>
            <input
              className={cx("input")}
              type="file"
              accept=".xlsx"
              name="file"
              onChange={handleFileChange}
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
      </form>
    </Modal>
  );
}

export default ModalAddLesson;
