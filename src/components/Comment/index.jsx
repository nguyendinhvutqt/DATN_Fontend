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
  const room = lessonId;
  const { user } = useSelector((state) => state.auth);

  // Messages States
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");
  const [newComment, setNewComment] = useState("");
  const [currentRoom, setCurrentRoom] = useState(room);

  const inputRef = useRef();

  const handleDeleteText = () => {
    setComment("");
    inputRef.current.focus();
  };

  useEffect(() => {
    // Khi component được mount, người dùng tham gia phòng bình luận của bài học
    socket.emit("join-room", room);

    // Lắng nghe sự kiện khi có bình luận mới từ server
    socket.on("new-comment", (data) => {
      setNewComment(data);
    });
  }, [room]);

  const fetchApi = async () => {
    try {
      const data = {
        userId: user.userId,
        comment: comment,
      };
      const result = await commentService.addComment(lessonId, data);
      if (result.status === "OK") {
        setComment("");
        setComments(result.data.comments);
        // socket.emit("comment", result.data.comments);

        // Gửi bình luận lên server trong phòng (bài học) tương ứng
        socket.emit("comment", { room, comments: result.data.comments });

        // Xóa nội dung ô nhập bình luận
        setComment("");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleSubmit = () => {
    fetchApi();
  };
  const getComment = async (lessonId, currentRoom) => {
    try {
      const result = await commentService.getComments(lessonId);
      if (result.status === "OK") {
        socket.emit("leave-room", currentRoom);
        setCurrentRoom(lessonId);
        socket.emit("join-room", lessonId);

        setNewComment("");
        setComments(result.data.comments);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getComment(lessonId, currentRoom);
  }, [lessonId, currentRoom]);

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
        {newComment.length > 0
          ? newComment.map((comment) => (
              <div key={comment._id} className={cx("comment")}>
                <img
                  className={cx("avatar")}
                  src={process.env.REACT_APP_API_BASE + comment.userId.avatar}
                  alt="avatar"
                />
                <div className={cx("content-comment")}>
                  <strong>{comment.userId.name}</strong>
                  <p>{comment?.comment}</p>
                </div>
              </div>
            ))
          : comments &&
            comments.map((comment) => (
              <div key={comment._id} className={cx("comment")}>
                <img
                  className={cx("avatar")}
                  src={process.env.REACT_APP_API_BASE + comment.userId.avatar}
                  alt="avatar"
                />
                <div className={cx("content-comment")}>
                  <strong>{comment.userId.name}</strong>
                  <p>{comment?.comment}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Comment;
