import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { useState } from "react";
import { io } from "socket.io-client";
import * as commentService from "../../services/commentService";

const socket = io(process.env.REACT_APP_API_BASE);

const cx = classNames.bind(styles);

function ReplyComment(props) {
  const { comment, room, closeReplyComment, replyCommentUser } = props;

  const [textComment, setTextComment] = useState("");

  useEffect(() => {
    if (replyCommentUser) {
      setTextComment(`@${replyCommentUser} `);
    }
  }, [replyCommentUser]);

  const handleSubmitReplyComment = async (commentId, textComment) => {
    try {
      const data = {
        replyComment: textComment,
      };
      // Gửi phản hồi bình luận lên server
      const result = await commentService.replyComment(commentId, data);

      setTextComment("");
      if (result.status === 200) {
        closeReplyComment();
        socket.emit("reply-comment", {
          room,
          replyComment: result.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("reply-comment")}>
      <img
        className={cx("avatar")}
        src={process.env.REACT_APP_API_BASE + comment.user.avatar}
        alt="avatar"
      />
      <div className={cx("box-reply-comment")}>
        <input
          type="text"
          className={cx("input")}
          placeholder="Nhập bình luận ở đây..."
          value={textComment}
          onChange={(e) => setTextComment(e.target.value)}
        />
        <div className={cx("box-btn")}>
          <button className={cx("btn", "btn-del")} onClick={closeReplyComment}>
            Đóng
          </button>
          <button
            className={cx("btn", "btn-submit")}
            onClick={() => handleSubmitReplyComment(comment._id, textComment)}
          >
            Bình luận
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReplyComment;
