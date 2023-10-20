import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import * as chapterService from "../../../../services/chapterService";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

ModalAddChapter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

function ModalAddChapter(props) {
  const { isOpen, onRequestClose, courseId, onChapterAdded } = props;

  const [titleChapter, setTitleChapter] = useState("");
  const [laoding, setLoading] = useState(false);

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
      setLoading(true);
      const fetchApi = async () => {
        const result = await chapterService.addChapter(courseId, {
          title: titleChapter,
        });
        if (result.status === 201) {
          setTitleChapter("");
          toast.success(result.data.message);
          onChapterAdded(result.data.data);
          setLoading(false);
        } else {
          toast.error("Thêm mới chương thất bại");
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
      <h2>Thêm mới chương</h2>
      <div className={cx("add-course")}>
        <div className={cx("form-control")}>
          <p className={cx("title")}>Tiêu đề:</p>
          <input
            className={cx("input")}
            type="text"
            value={titleChapter}
            onChange={(e) => setTitleChapter(e.target.value)}
          />
        </div>
        <div className={cx("box-btn")}>
          <button className={cx("btn")} onClick={onRequestClose}>
            Đóng
          </button>
          <button className={cx("btn", "btn-primary")} onClick={handleSubmit}>
            {laoding ? "Đang thêm..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddChapter;
