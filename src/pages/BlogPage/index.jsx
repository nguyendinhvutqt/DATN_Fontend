import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import * as blogService from "../../services/blogService";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const getBlogsApi = async () => {
    try {
      const result = await blogService.getBlogs();
      if (result.status === 200) {
        setBlogs(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogsApi();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        {blogs &&
          blogs.map((blog) => {
            return (
              <Link
                key={blog._id}
                to={`/blogs/${blog._id}`}
                className={cx("blog")}
              >
                <img
                  className={cx("thumbnail")}
                  src={process.env.REACT_APP_API_BASE + blog.thumbnail}
                  alt="thumbnail"
                />
                <div className={cx("description")}>
                  <h2 className={cx("title-blog")}>{blog.title}</h2>
                  <div className={cx("profile-blog")}>
                    <img
                      className={cx("avatar-user")}
                      src={process.env.REACT_APP_API_BASE + blog.author.avatar}
                      alt="avatar"
                    />
                    <p className={cx("name-user")}>{blog.author.name}</p>
                  </div>
                  <strong className={cx("text")}>Đọc tiếp ...</strong>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Blog;
