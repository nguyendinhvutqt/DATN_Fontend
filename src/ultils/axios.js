import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để thêm access token vào các request
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access-token");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để refresh token khi access token hết hạn
instance.interceptors.response.use(
  (response) => {
    // Xử lý một response thành công
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Nếu token hết hạn hoặc bất kỳ mã lỗi nào khác bạn muốn xử lý
      // Gọi refresh token ở đây và trả về một promise
      return refreshToken()
        .then((response) => {
          // Cập nhật token mới vào storage (localStorage hoặc cookies)
          localStorage.setItem("access-token", response.data.accessToken);
          localStorage.setItem("refresh-token", response.data.refreshToken);

          // Thêm access token mới vào các request thông qua interceptor
          error.config.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;

          // Thực hiện lại request gốc với access token mới
          return instance(error.config);
        })
        .catch((refreshError) => {
          // Xử lý lỗi khi không thể refresh token
          return Promise.reject(refreshError);
        });
    }
    // Nếu không phải lỗi 401, trả về error ban đầu
    return Promise.reject(error);
  }
);

const refreshToken = () => {
  // Lấy refresh token từ storage (localStorage hoặc cookies)
  const refreshToken = localStorage.getItem("refresh-token");

  if (!refreshToken) {
    return Promise.reject(new Error("Không có refresh token"));
  }

  // Gửi request để lấy access token mới sử dụng refresh token
  return instance.post("users/refresh-token", { refreshToken });
};

export default instance;
