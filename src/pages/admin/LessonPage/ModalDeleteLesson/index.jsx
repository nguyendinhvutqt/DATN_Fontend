import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import * as lessonService from "../../../../services/lessonService";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

ModalDeleteLesson.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

function ModalDeleteLesson(props) {
  const { isOpen, onRequestClose, lessonId, onLessonDeleted } = props;
  const customStyles = {
    content: {
      width: "400px",
      top: "250px",
      left: "720px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleDeleteCourse = () => {
    try {
      const fetchApi = async () => {
        const result = await lessonService.deleteLesson(lessonId);
        console.log(result);
        if (result.status === "OK") {
          toast.success("Xoá bài học thành công!");
          onLessonDeleted(lessonId);
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
      <h2>Bạn có muốn xoá bài học?</h2>

      <div className={cx("box-btn")}>
        <button className={cx("btn")} onClick={onRequestClose}>
          Đóng
        </button>
        <button
          className={cx("btn", "btn-primary")}
          onClick={handleDeleteCourse}
        >
          Xác nhận
        </button>
      </div>
    </Modal>
  );
}

export default ModalDeleteLesson;
