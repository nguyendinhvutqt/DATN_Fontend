import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import * as commentService from "../../services/commentService";
import { getTimeComment } from "../../ultils/func";

const cx = classNames.bind(styles);
function CommentUserReply(props) {
  const { comment, commentId, userId, onReplyComment, showReplyComment } =
    props;

  const [like, setLike] = useState(0);

  useEffect(() => {
    if (comment?.likes) {
      setLike(comment.likes.length);
    }
  }, [comment.likes]);

  const likeCommentApi = async (commentId, userId) => {
    try {
      const data = {
        userId,
      };
      const result = await commentService.likeComment(commentId, data);
      if (result.status === 200) {
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
        src={process.env.REACT_APP_API_BASE + comment?.user?.avatar}
        alt="avatar"
      />
      <div
        className={cx("content-comment", {
          active: comment.user?._id === userId,
        })}
      >
        <div>
          <strong>{comment.user?.name}</strong>
          <p className={cx("text-comment")}>{comment?.textComment}</p>
        </div>
        <div className={cx("action")}>
          <p
            className={cx("like")}
            onClick={() => handleLikeComment(comment?._id, userId)}
          >
            Thích
          </p>
          <p
            className={cx("reply")}
            onClick={() => {
              onReplyComment(commentId, comment.user?.name);
              showReplyComment();
            }}
          >
            Trả lời
          </p>
          <p className={cx("time")}>{getTimeComment(comment.createdAt)}</p>
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

export default CommentUserReply;
