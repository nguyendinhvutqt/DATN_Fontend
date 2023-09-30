import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import * as chapterService from "../../../../services/chapterService";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

ModalDeleteChapter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

function ModalDeleteChapter(props) {
  const { isOpen, onRequestClose, chapterId, onChapterDeleted } = props;
  const customStyles = {
    content: {
      width: "400px",
      top: "250px",
      left: "800px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [loading, setLoading] = useState(false);

  const handleDeleteCourse = () => {
    try {
      setLoading(true);
      const fetchApi = async () => {
        const result = await chapterService.delChapter(chapterId);
        if (result.status === "OK") {
          toast.success("Xoá chương học thành công!");

          onChapterDeleted();
          setLoading(false);
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
      <h2>Bạn có muốn xoá khoá học?</h2>

      <div className={cx("box-btn")}>
        <button className={cx("btn")} onClick={onRequestClose}>
          Đóng
        </button>
        <button className={cx("btn")} onClick={handleDeleteCourse}>
          {loading ? "Đang xoá..." : "Xác nhận"}
        </button>
      </div>
    </Modal>
  );
}

export default ModalDeleteChapter;
