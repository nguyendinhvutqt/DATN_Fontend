import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { toast } from "react-toastify";
import * as blogService from "../../../../services/blogService";

const cx = classNames.bind(styles);

ModalDeleteBlog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

function ModalDeleteBlog(props) {
  const { isOpen, onRequestClose, blogId, onBlogeDeleted } = props;
  const customStyles = {
    content: {
      top: "40%",
      left: "55%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleDeleteCourse = () => {
    try {
      const fetchApi = async () => {
        const result = await blogService.deleteBlog(blogId);
        if (result.status === 200) {
          toast.success("Xoá bài viết thành công!");
          onRequestClose();
          onBlogeDeleted();
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
          Xác nhận
        </button>
      </div>
    </Modal>
  );
}

export default ModalDeleteBlog;
