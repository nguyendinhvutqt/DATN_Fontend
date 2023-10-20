import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/l.png";
import * as userService from "../../services/userService";

const cx = classNames.bind(styles);

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    try {
      const data = {
        username,
        name,
        password,
        confirmPassword,
      };
      const result = await userService.register(data);
      if (result.status === 201) {
        setName("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        navigate("/sign-in");
      } else if (result.status === 400) {
        setError(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    register();
  };

  const handleHideError = () => {
    setError("");
  };

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
          {error && (
            <div className={cx("error")}>
              <strong>{error}</strong>
              <FontAwesomeIcon
                className={cx("cancel")}
                icon={faXmark}
                onClick={handleHideError}
              />
            </div>
          )}
          <div className={cx("input")}>
            <FontAwesomeIcon className={cx("icon")} icon={faUser} />
            <input
              type="text"
              className={cx("input-email")}
              autoComplete="new-password"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="input">Tên đăng nhập</label>
          </div>
          <div className={cx("input")}>
            <FontAwesomeIcon className={cx("icon")} icon={faUser} />
            <input
              type="text"
              className={cx("input-email")}
              autoComplete="new-password"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="input">Họ và tên</label>
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
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="input">Nhập lại mật khẩu</label>
          </div>
          <div className={cx("input")}>
            <button onClick={handleRegister} className={cx("button")}>
              ĐĂNG KÍ
            </button>
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
