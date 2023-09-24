import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import * as courseService from "../../../../services/courseService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

ModalAddCourse.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

function ModalAddCourse(props) {
  const { isOpen, onRequestClose } = props;
  const [titleCourse, setTitleCourse] = useState("");
  const [thumbnailCourse, setThumbnailCourse] = useState("");
  const [descriptionCourse, setDescriptionCourse] = useState("");

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
    formData.append("file", thumbnailCourse);
    formData.append("title", titleCourse);
    formData.append("description", descriptionCourse);
    try {
      const fetchApi = async () => {
        const result = await courseService.addCourse(formData);
        if (result.status === "OK") {
          setDescriptionCourse("");
          setThumbnailCourse("");
          setTitleCourse("");
          toast.success("Thêm khoá học thành công!");
          onRequestClose();
          if (props.onCourseAdded) {
            props.onCourseAdded();
          }
        }
      };
      fetchApi();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleImageChange = (e) => {
    setThumbnailCourse(e.target.files[0]); // Gán hình ảnh vào biến thumbnailCourse
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <h2>Thêm mới khoá học</h2>
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
        {thumbnailCourse && (
          <div>
            <p>Hình ảnh đã chọn:</p>
            <img
              className={cx("thumbnail")}
              src={URL.createObjectURL(thumbnailCourse)}
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
        <ToastContainer />
      </form>
    </Modal>
  );
}

export default ModalAddCourse;
