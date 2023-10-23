import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { ToastContainer } from "react-toastify";

import styles from "./style.module.scss";
import * as blogService from "../../../services/blogService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function BlogsPage() {
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
      <h2>DANH SÁCH BÀI VIẾT</h2>
      <div>
        <table className={cx("blog-table")}>
          <thead>
            <tr>
              <th className={cx("th-title")}>Tiêu đề bài viết</th>
              <th className={cx("th-image")}>Hình ảnh</th>
              <th className={cx("th-image")}>Trạng thái</th>
              <th className={cx("th-action")}></th>
            </tr>
          </thead>
          <tbody>
            {blogs &&
              blogs.map((blog) => (
                <tr key={blog._id} className={cx("")}>
                  <td>{blog.title}</td>
                  <td className={cx("td-thumbnail")}>
                    <img
                      className={cx("thumbnail")}
                      src={`${process.env.REACT_APP_API_BASE + blog.thumbnail}`}
                      alt="hình ảnh"
                    />
                  </td>
                  <td>{blog.status}</td>
                  <td>
                    <div className={cx("block-action")}>
                      <div className={cx("btn-icon")}>
                        <Link
                          to={`/admin/blogs/${blog._id}`}
                          className={cx("action")}
                        >
                          <FontAwesomeIcon
                            className={cx("icon")}
                            icon={faPenToSquare}
                          />
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* <Paginate onClickPage={handlePageClick} totalPage={totalPage} /> */}
      </div>
      <ToastContainer />
    </div>
  );
}

export default BlogsPage;
