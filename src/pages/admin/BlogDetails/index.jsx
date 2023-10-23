import classNames from "classnames/bind";
import React, { useEffect } from "react";

import styles from "./style.module.scss";
import * as blogService from "../../../services/blogService";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const cx = classNames.bind(styles);

const BlogDetailAdmin = () => {
  const [blog, setBlog] = useState({});

  const params = useParams();
  const { blogId } = params;

  const getBlogApi = async (blogId) => {
    try {
      const result = await blogService.getBlogs(blogId);
      if (result.status === 200) {
        setBlog(result.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmBlog = async (blogId) => {
    try {
      const result = await blogService.confirmBlog(blogId);
      if (result.status === 200) {
        setBlog(result.data.data);
        toast.success(result.data.message);
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
      <h1>{blog.title}</h1>
      <div
        className={cx("text")}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <div className={cx("btn")}>
        <Link to="/admin/blogs" className={cx("btn-back")}>
          Quay lại
        </Link>
        {blog.status === "Chưa duyệt" && (
          <button
            className={cx("btn-duyet")}
            onClick={() => handleConfirmBlog(blog._id)}
          >
            Duyệt
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BlogDetailAdmin;
