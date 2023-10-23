import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import classNames from "classnames/bind";

import * as blogService from "../../services/blogService";
import styles from "./style.module.scss";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Post = () => {
  const [title, setTitle] = useState("");
  const [postBlogSuccess, setPostBlogSuccess] = useState(false);
  const [thumbnail, setThumbnail] = useState("");

  const editorRef = useRef(null);

  const fetchApi = async (data) => {
    try {
      const result = await blogService.addBlog(data);
      if (result.status === 201) {
        setPostBlogSuccess(true);
        toast.success(result.data.message);
      } else if (result.status === 400) {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostBlog = () => {
    if (editorRef.current) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", editorRef.current.getContent());
      formData.append("file", thumbnail);
      fetchApi(formData);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("control-input")}>
        <p>Tiêu đề:</p>
        <input
          className={cx("input")}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={cx("control-input")}>
        <p>Hình ảnh:</p>
        <input
          className={cx("file")}
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
      </div>
      {thumbnail && (
        <div className={cx("control-thumbnail")}>
          <p>Hình ảnh đã chọn:</p>
          <img
            className={cx("thumbnail")}
            src={URL.createObjectURL(thumbnail)}
            alt="Thumbnail"
          />
        </div>
      )}
      <Editor
        apiKey="4ri0qkl6qqoooknb8ba09asl4r2pmb89b0bup7h4a3t5qfev"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={""}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <div className={cx("box-btn")}>
        <Link to="/" className={cx("btn-back")}>
          Quay lại
        </Link>
        {postBlogSuccess === false && (
          <button className={cx("btn-post")} onClick={handlePostBlog}>
            Đăng bài viết
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Post;
