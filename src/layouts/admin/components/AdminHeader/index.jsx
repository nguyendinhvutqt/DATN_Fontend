import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

Header.propTypes = {};

function Header(props) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to="/" className={cx("logo")}>
          <h3>Học lập trình để đi làm</h3>
        </Link>
      </div>
    </div>
  );
}

export default Header;
