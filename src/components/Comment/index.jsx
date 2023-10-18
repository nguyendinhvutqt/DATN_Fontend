import React from "react";
import styles from "./style.module.scss";
import { useState } from "react";
import classNames from "classnames/bind";
import { useRef } from "react";
import { io } from "socket.io-client";
import avatar from "../../assets/images/avatar-default.png";
import { useEffect } from "react";
import * as commentService from "../../services/commentService";
import CommentUser from "../CommentUser";
import ReplyComment from "../ReplyComment";
import CommentUserReply from "../CommentUserReply";

const socket = io(process.env.REACT_APP_API_BASE);

const cx = classNames.bind(styles);

function Comment(props) {
  const { lessonId, user } = props;

  // Messages States
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState("");
  // const [currentRoom, setCurrentRoom] = useState(lessonId);
  const [prevRoom, setPrevRoom] = useState();
  const [isShowCommentReply, setIsShowCommentReply] = useState(false);
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [replyCommentUser, setReplyCommentUser] = useState("");

  const inputRef = useRef();

  const handleDeleteText = () => {
    setComment("");
    inputRef.current.focus();
  };

  useEffect(() => {
    // Khi component được mount, người dùng tham gia phòng bình luận của bài học
    socket.emit("join-room", lessonId);

    // Lắng nghe sự kiện khi có bình luận mới từ server
    socket.on("new-comment", (data) => {
      // setNewComment(data);
      setComments(data);
    });

    // Lắng nghe sự kiện khi có Phản hồi bình luận bình luận từ server
    socket.on("new-reply-comment", async (data) => {
      setComments((prev) => {
        return prev.map((comment) => {
          console.log(comment._id === data._id);
          if (comment._id === data._id) {
            return data;
          }
          return comment;
        });
      });
    });
  }, [lessonId]);

  // const handleNewReplyComment = (newComment) => {};

  const handleSubmit = async () => {
    try {
      const data = {
        userId: user.userId,
        comment: comment,
      };
      const result = await commentService.addComment(lessonId, data);
      if (result.status === "OK") {
        setComment("");
        socket.emit("comment", { room: lessonId, comments: result.data });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getComment = async (lessonId, prevRoom) => {
    try {
      const result = await commentService.getComments(lessonId);
      if (result.status === "OK") {
        if (prevRoom) {
          socket.emit("leave-room", prevRoom); // Rời phòng cũ
        }
        setPrevRoom(lessonId); // Lưu trữ giá trị của phòng trước đó
        socket.emit("join-room", lessonId); // Tham gia phòng mới
        setComments(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComment(lessonId, prevRoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  const handleReplyComment = (replyCommentId, replyCommentUser) => {
    console.log("replyCommentId: ", replyCommentId);
    console.log("replyCommentUser: ", replyCommentUser);
    setReplyCommentId(replyCommentId);
    setReplyCommentUser(replyCommentUser);
  };

  const handleShowReplyComment = () => {
    setIsShowCommentReply(true);
  };

  const handleCloseReplyComment = () => {
    setIsShowCommentReply(false);
  };

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
        {comments &&
          comments.map((commentData) => (
            <div key={commentData._id} className={cx("box-comment")}>
              <CommentUser
                comment={commentData}
                userId={user.userId}
                onReplyComment={handleReplyComment}
                showReplyComment={handleShowReplyComment}
              />

              <div className={cx("reply-comment")}>
                {commentData?.replies &&
                  commentData.replies.map((reply) => (
                    <CommentUserReply
                      commentId={commentData._id}
                      comment={reply}
                      userId={user.userId}
                      room={lessonId}
                      onReplyComment={handleReplyComment}
                      showReplyComment={handleShowReplyComment}
                    />
                  ))}
              </div>
              {replyCommentId === commentData._id && isShowCommentReply && (
                <ReplyComment
                  comment={commentData}
                  replyCommentUser={replyCommentUser}
                  room={lessonId}
                  userId={user.userId}
                  // onNewReplyComment={handleNewReplyComment}
                  closeReplyComment={handleCloseReplyComment}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Comment;
