import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const BlogItem = ({ data }) => {
  return (
    <Link to={`/blogs/${data._id}`} className={cx("wrapper")}>
      <img
        className={cx("img-blog")}
        src={`http://localhost:3001/${data.thumbnail}`}
        alt="img-blog"
      />
      <p className={cx("title-blog")}>{data.title}</p>
    </Link>
  );
};

BlogItem.prototypes = { data: PropTypes.object.isRequired };

export default BlogItem;
