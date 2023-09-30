import classNames from "classnames/bind";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);

const Paginate = (props) => {
  const { onClickPage, totalPage } = props;

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={onClickPage}
        pageRangeDisplayed={3}
        pageCount={totalPage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName={cx("page-item")}
        pageLinkClassName={cx("page-link")}
        previousClassName={cx("page-item")}
        previousLinkClassName={cx("page-link")}
        nextClassName={cx("page-item")}
        nextLinkClassName={cx("page-link")}
        breakClassName={cx("page-item")}
        breakLinkClassName={cx("page-link")}
        containerClassName={cx("pagination")}
        activeClassName={cx("active")}
      />
    </>
  );
};

export default Paginate;
