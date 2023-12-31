import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  faEye,
  faEyeSlash,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { gapi } from "gapi-script";

import * as userService from "../../services/userService";
import logo from "../../assets/images/l.png";
import { login } from "../../store/reducers/userSlice";
import LoginGoogle from "../../components/LoginGoogle";

const cx = classNames.bind(styles);

function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "1042533964811-q3ho970e77ee45meinb4dpo5lr1nk588.apps.googleusercontent.com",
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  const handleSubmit = (e) => {
    const fetchApi = async () => {
      try {
        const result = await userService.login(username, password);
        if (result.status === 200) {
          setError("");
          dispatch(login(result.data));
          localStorage.setItem("access-token", result.data.accessToken);
          localStorage.setItem("refresh-token", result.data.refreshToken);

          navigate(from, { replace: true });
        } else if (result.status === 400) {
          setError(result.data.message);
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
          <LoginGoogle />
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
