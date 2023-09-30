import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import * as courseService from "../../../../services/courseService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

ModalEditCourse.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

function ModalEditCourse(props) {
  const {
    isOpen,
    onRequestClose,
    showError,
    onShowError,
    courseEdit,
    onCourseEdited,
  } = props;
  const [titleCourse, setTitleCourse] = useState("");
  const [descriptionCourse, setDescriptionCourse] = useState("");
  // const [thumbnailCourse, setThumbnailCourse] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitleCourse(courseEdit.title);
      setDescriptionCourse(courseEdit.description);
      // setThumbnailCourse(courseEdit.thumbnail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseEdit]);

  const customStyles = {
    content: {
      width: "700px",
      maxHeight: "80vh",
      top: "50%",
      left: "60%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", thumbnail);
    formData.append("title", titleCourse);
    formData.append("description", descriptionCourse);
    try {
      const fetchApi = async () => {
        const result = await courseService.editCourse(courseEdit._id, formData);
        if (result.status === "OK") {
          setDescriptionCourse("");
          setThumbnail("");
          setTitleCourse("");
          toast.success("Sửa khoá học thành công!");
          onRequestClose();
          if (onCourseEdited) {
            onCourseEdited();
          }
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

  const handleImageChange = (e) => {
    setThumbnail(e.target.files[0]); // Gán hình ảnh vào biến thumbnailCourse
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <div>
        <h2>Sửa khoá học</h2>
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
        <form onSubmit={handleSubmitForm} className={cx("add-course")}>
          <div className={cx("form-control")}>
            <p className={cx("title")}>Tiêu đề:</p>
            <input
              className={cx("input")}
              type="text"
              value={titleCourse}
              onChange={(e) => setTitleCourse(e.target.value)}
            />
          </div>
          <div className={cx("form-control")}>
            <p className={cx("title")}>Nội dung:</p>
            <ReactQuill
              theme="snow"
              value={descriptionCourse}
              onChange={setDescriptionCourse}
            />
          </div>
          <div className={cx("form-control")}>
            <p className={cx("title")}>Hình ảnh:</p>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {thumbnail && (
            <div>
              <p>Hình ảnh đã chọn:</p>
              <img
                className={cx("thumbnail")}
                // src={
                //   courseEdit.thumbnail === thumbnailCourse
                //     ? process.env.REACT_APP_API_BASE + thumbnailCourse
                //     : URL.createObjectURL(thumbnailCourse)
                // }
                src={URL.createObjectURL(thumbnail)}
                alt="Thumbnail"
              />
            </div>
          )}

          <div className={cx("box-btn")}>
            <button className={cx("btn")} onClick={onRequestClose}>
              Đóng
            </button>
            <button className={cx("btn")} type="submit">
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ModalEditCourse;
