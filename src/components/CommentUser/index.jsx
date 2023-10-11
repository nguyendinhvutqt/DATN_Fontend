import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import * as commentService from "../../services/commentService";

const cx = classNames.bind(styles);

CommentUser.propTypes = {};

function CommentUser(props) {
  const { comment, user, onReplyComment, showReplyComment } = props;

  const [like, setLike] = useState(0);

  useEffect(() => {
    // if (comment.likes.length > 0) {
    //   setLike(comment.likes.length);
    // }
  }, [comment.likes]);

  const likeCommentApi = async (commentId, userId) => {
    try {
      const data = {
        userId,
      };
      const result = await commentService.likeComment(commentId, data);
      if (result.status === "OK") {
        setLike(result.data.likes.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeComment = (commentId, userId) => {
    likeCommentApi(commentId, userId);
  };
  return (
    <div className={cx("comment")}>
      <img
        className={cx("avatar")}
        src={process.env.REACT_APP_API_BASE + comment.user.avatar}
        alt="avatar"
      />
      <div
        className={cx("content-comment", {
          active: comment.user._id === user.userId,
        })}
      >
        <div>
          <strong>{comment.user.name}</strong>
          <p className={cx("text-comment")}>{comment?.comment}</p>
        </div>
        <div className={cx("action")}>
          <p
            className={cx("like")}
            onClick={() => handleLikeComment(comment._id, user.userId)}
          >
            Thích
          </p>
          <p
            className={cx("reply")}
            onClick={() => {
              onReplyComment(comment._id, comment.user.name);
              showReplyComment();
            }}
          >
            Trả lời
          </p>
          <p className={cx("time")}>1 tháng trước</p>
          <div className={cx("box-like")}>
            {like > 0 && (
              <>
                <FontAwesomeIcon
                  className={cx("icon-like")}
                  icon={faThumbsUp}
                  color="#337eff"
                />
                <p className={cx("number-like")}>{like}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentUser;
