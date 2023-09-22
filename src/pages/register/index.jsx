import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/l.png";


const cx = classNames.bind(styles);

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("back")}></div>
      <div className={cx("login")}>
        <div className={cx("content")}>
        <img className={cx("img")} src={logo} alt="dfdsf" />
        </div>
        <div className={cx("home")}>
          <div className={cx("account")}>
            <h2>ĐĂNG KÍ TÀI KHOẢN</h2>
          </div>
          <div className={cx("input")}>
            <FontAwesomeIcon className={cx("icon")} icon={faUser} />
            <input
              type="text"
              className={cx("input-email")}
              autoComplete="new-password"
              required
            />
            <label htmlFor="input">Tên đăng nhập</label>
          </div>
          <div className={cx("input")}>
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <FontAwesomeIcon className={cx("icon")} icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon className={cx("icon")} icon={faEye} />
              )}
            </div>

            <input
              type={showPassword ? "text" : "password"}
              className={cx("input-email")}
              autoComplete="new-password"
              required
            />
            <label htmlFor="input">Mật khẩu</label>
          </div>
          <div className={cx("input")}>
            <div onClick={() => setShowCfPassword(!showCfPassword)}>
              {showCfPassword ? (
                <FontAwesomeIcon className={cx("icon")} icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon className={cx("icon")} icon={faEye} />
              )}
            </div>

            <input
              type={showCfPassword ? "text" : "password"}
              className={cx("input-email")}
              autoComplete="new-password"
              required
            />
            <label htmlFor="input">Nhập lại mật khẩu</label>
          </div>
          <div className={cx("input")}>
            <button className={cx("button")}>ĐĂNG KÍ</button>
          </div>
          <div className={cx("log")}>
            <p>Bạn đã có tài khoản</p>
            <Link className={cx("link")} to="/sign-in">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
