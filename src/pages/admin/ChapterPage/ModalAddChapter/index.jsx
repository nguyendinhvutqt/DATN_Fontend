import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import * as chapterService from "../../../../services/chapterService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

ModalAddChapter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

function ModalAddChapter(props) {
  const {
    isOpen,
    onRequestClose,
    courseId,
    onChapterAdded,
    onError,
    onShowError,
  } = props;

  const [titleChapter, setTitleChapter] = useState("");
  const [error, setError] = useState("");
  const [laoding, setLoading] = useState(false);

  const customStyles = {
    content: {
      width: "700px",
      maxHeight: "80vh",
      top: "250px",
      left: "810px",
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
        console.log(result);
        if (result.status === "OK") {
          setTitleChapter("");
          toast.success("Thêm chương thành công!");
          onChapterAdded();
          setLoading(false);
        } else {
          setError(result.message);
          onShowError();
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
      <h2>Thêm mới chương</h2>
      {onError && error && (
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
            value={titleChapter}
            onChange={(e) => setTitleChapter(e.target.value)}
          />
        </div>
        <div className={cx("box-btn")}>
          <button className={cx("btn")} onClick={onRequestClose}>
            Đóng
          </button>
          <button className={cx("btn")} onClick={handleSubmit}>
            {laoding ? "Đang thêm..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddChapter;
