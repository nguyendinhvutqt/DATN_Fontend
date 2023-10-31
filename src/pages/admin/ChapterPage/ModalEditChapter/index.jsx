import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import * as chapterService from "../../../../services/chapterService";
import { toast } from "react-toastify";
import { useEffect } from "react";

const cx = classNames.bind(styles);

ModalEditChapter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

function ModalEditChapter(props) {
  const { isOpen, onRequestClose, chapter, onChapterEdited } = props;

  const [titleChapter, setTitleChapter] = useState("a");
  const [chapterId, setChapterId] = useState(null);
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

  useEffect(() => {
    if (isOpen) {
      setTitleChapter(chapter.title);
      setChapterId(chapter._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter]);

  function handleSubmit() {
    try {
      setLoading(true);
      const fetchApi = async () => {
        const result = await chapterService.editChapter(chapterId, {
          title: titleChapter,
        });
        if (result.status === 200) {
          setTitleChapter("");
          toast.success(result.data.message);
          onChapterEdited(result.data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      fetchApi();
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <h2>Sửa chương</h2>
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
            {laoding ? "Đang sửa..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalEditChapter;
