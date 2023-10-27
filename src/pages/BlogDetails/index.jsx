import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import * as blogService from "../../services/blogService";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const params = useParams();
  const { blogId } = params;

  const getBlogApi = async (blogId) => {
    try {
      const result = await blogService.getBlog(blogId);
      if (result.status === 200) {
        setBlog(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogApi(blogId);
  }, [blogId]);
  return (
    <div className={cx("wrapper")}>
      {blog && (
        <div className={cx("inner")}>
          <h1>{blog.title}</h1>
          <div className={cx("profile")}>
            <img
              className={cx("avatar")}
              src={process.env.REACT_APP_API_BASE + blog.author.avatar}
              alt=""
            />
            <p className={cx("name")}>{blog.author.name}</p>
          </div>
          <div
            className={cx("text")}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
