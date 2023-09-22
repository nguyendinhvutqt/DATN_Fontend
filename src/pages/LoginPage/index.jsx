import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

import { loginSuccess } from "../../redux/authSlice";
import * as userService from "../../services/userService";
import logo from "../../assets/images/l.png";
const cx = classNames.bind(styles);

LoginPage.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const fetchApi = async () => {
      try {
        const result = await userService.login(username, password);
        if (result?.status === "OK") {
          setError("");
          dispatch(loginSuccess({ ...result.data }));
          localStorage.setItem("userInfo", JSON.stringify(result.data.user));
          navigate("/");
        } else {
          setError(result.message);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchApi();
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
            <h2>ĐĂNG NHẬP</h2>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="input">Mật khẩu</label>
          </div>
          <div className={cx("input")}>
            <button onClick={handleSubmit} className={cx("button")}>
              ĐĂNG NHẬP
            </button>
          </div>
          <div className={cx("log")}>
            <p>Bạn chưa có tài khoản</p>
            <Link className={cx("link")} to="/sign-up">
              Đăng kí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
