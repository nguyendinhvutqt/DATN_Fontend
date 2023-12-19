import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { ToastContainer } from "react-toastify";

import styles from "./style.module.scss";
import * as blogService from "../../../services/blogService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Paginate from "../../../components/Paginate";
import ModalDeleteBlog from "./ModalDeleteBlog";
import { useDebounce } from "../../../hooks";
import * as searchService from "../../../services/searchService";

const cx = classNames.bind(styles);

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [modalDeleteBlogIsOpen, setModalDeleteBlogIsOpen] = useState(false);
  const [blogIdDelete, setBlogIdDelete] = useState(null);
  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [inputSearch, setInputSearch] = useState("");

  const debounced = useDebounce(inputSearch, 500);

  useEffect(() => {
    debounced.trim();
    const fetchApi = async () => {
      const result = await searchService.search(debounced);
      if (result.status === 200) {
        setBlogs(result?.data?.data?.blogs);
      }
    };
    fetchApi();
  }, [debounced]);

  const getBlogsApi = async (currentPage) => {
    try {
      const result = await blogService.getBlogsAndPaginate(currentPage);
      if (result.status === 200) {
        setBlogs(result.data.data);
        setTotalPage(result.data.totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogsApi(currentPage);
  }, [currentPage]);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const handleDeleteBlog = async () => {
    setModalDeleteBlogIsOpen(false);
    getBlogsApi(currentPage);
  };

  const closeModal = () => {
    setModalDeleteBlogIsOpen(false);
  };
  return (
    <div className={cx("wrapper")}>
      <h2>DANH SÁCH BÀI VIẾT</h2>
      <div className={cx("box-search")}>
        <label htmlFor="input-search">Tìm kiếm:</label>
        <input
          className={cx("input-search")}
          id="input-search"
          type="text"
          placeholder="Nhập tên bài viết..."
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </div>
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
                      <div
                        className={cx("btn-icon")}
                        onClick={() => {
                          setModalDeleteBlogIsOpen(true);
                          setBlogIdDelete(blog._id);
                        }}
                      >
                        <FontAwesomeIcon
                          className={cx("icon")}
                          icon={faTrash}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Paginate onClickPage={handlePageClick} totalPage={totalPage} />
      </div>
      <ModalDeleteBlog
        isOpen={modalDeleteBlogIsOpen}
        blogId={blogIdDelete}
        onRequestClose={closeModal}
        onBlogeDeleted={handleDeleteBlog}
      />
      <ToastContainer />
    </div>
  );
}

export default BlogsPage;
