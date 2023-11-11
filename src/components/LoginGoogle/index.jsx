import React from "react";
import GoogleLogin from "react-google-login";

import * as userService from "../../services/userService";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../store/reducers/userSlice";

const LoginGoogle = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSuccess = async (res) => {
    const dataUser = res.profileObj;
    try {
      const result = await userService.loginGoogle(dataUser);
      if (result.status === 200) {
        dispatch(login(result.data));
        localStorage.setItem("access-token", result.data.accessToken);
        localStorage.setItem("refresh-token", result.data.refreshToken);

        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFailure = (res) => {
    console.log("failure");
    console.log(res);
  };
  return (
    <div>
      <GoogleLogin
        clientId="1042533964811-q3ho970e77ee45meinb4dpo5lr1nk588.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LoginGoogle;
