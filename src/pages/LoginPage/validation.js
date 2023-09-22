const validation = (username, password) => {
  let error = {};

  if (username === "") {
    error.username = "Tên đăng nhập không được đẻ trống";
  }

  if (password === "") {
    error.password = "Mật khẩu không được đẻ trống";
  }

  return error;
};

export default validation;
