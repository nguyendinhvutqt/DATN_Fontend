import React, { useState } from "react";
import Modal from "react-modal";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);

function ModalShowResult(props) {
  const { isOpen, onClose, countAnswers, countCorrectAnswers } = props;
  const customStyles = {
    content: {
      width: "400px",
      maxHeight: "80vh",
      top: "250px",
      left: "720px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <h2 className={cx("title")}>KẾT QUẢ TRẮC NGHIỆM</h2>
      <div>
        <p className={cx("text")}>Xin chúc mừng</p>
        <p className={cx("text")}>
          Bạn đã trả lời đúng {countCorrectAnswers} / {countAnswers} câu hỏi
        </p>
      </div>
      <button className={cx("btn")} onClick={onClose}>
        Đóng
      </button>
    </Modal>
  );
}

export default ModalShowResult;
