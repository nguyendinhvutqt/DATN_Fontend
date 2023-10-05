import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import { useState } from "react";
import classNames from "classnames/bind";
import { useRef } from "react";
import { io } from "socket.io-client";
import avatar from "../../assets/images/avatar-default.png";
import { useEffect } from "react";
import * as commentService from "../../services/commentService";
import { useSelector } from "react-redux";

const socket = io("http://localhost:3001");

const cx = classNames.bind(styles);

Comment.propTypes = {};

function Comment(props) {
  const { lessonId } = props;
  const { user } = useSelector((state) => state.auth);
  console.log("user: ", user);
  console.log("lessonID: ", lessonId);

  //Room State
  //   const [room, setRoom] = useState("");

  // Messages States
  const [comment, setComment] = useState("");
  //   const [messageReceived, setMessageReceived] = useState("");

  const inputRef = useRef();

  const handleDeleteText = () => {
    setComment("");
    inputRef.current.focus();
  };

  const fetchApi = async () => {
    const data = {
      userId: user.userId,
      comment: comment,
    };
    const result = await commentService.addComment(lessonId, data);
    console.log("resulr: ", result);
    if (result.status === "OK") {
      socket.emit("comment", result.data.comments);
    }
  };

  const handleSubmit = () => {
    try {
      fetchApi();
    } catch (error) {
      console.log("error: ", error);
    }
    // socket.emit("send-message", { message, lessonId });
  };

  //   useEffect(() => {
  //     socket.on("receive_message", (data) => {
  //       setMessageReceived(data.message);
  //     });
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [socket]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-input")}>
        <img className={cx("avatar")} src={avatar} alt="" />

        <input
          className={cx("input")}
          ref={inputRef}
          type="text"
          value={comment}
          placeholder="Nhập bình luận ở đây..."
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className={cx("box-btn")}>
        <button className={cx("btn", "btn-del")} onClick={handleDeleteText}>
          Xoá
        </button>
        <button className={cx("btn", "btn-submit")} onClick={handleSubmit}>
          Bình luận
        </button>
      </div>
      <div className={cx("wrapper-comment")}>
        <div className={cx("comment")}>
          <img className={cx("avatar")} src={avatar} alt="" />
          <div className={cx("content-comment")}>
            <strong>âsdasd</strong>
            <p>sadasdas</p>
          </div>
        </div>
        <div className={cx("comment")}>
          <div className={cx("avatar")}>
            <img style={{ width: "30px" }} src={avatar} alt="" />
          </div>
          <div className={cx("content-comment")}>
            <strong>âsdasd</strong>
            <p>sadasdas</p>
          </div>
        </div>
        <div className={cx("comment")}>
          <div className={cx("avatar")}>
            <img style={{ width: "30px" }} src={avatar} alt="" />
          </div>
          <div className={cx("content-comment")}>
            <strong>âsdasd</strong>
            <p>sadasdas</p>
          </div>
        </div>
        <div className={cx("comment")}>
          <div className={cx("avatar")}>
            <img style={{ width: "30px" }} src={avatar} alt="" />
          </div>
          <div className={cx("content-comment")}>
            <strong>âsdasd</strong>
            <p>sadasdas</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
