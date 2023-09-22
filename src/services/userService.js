import axios from "../ultils/axios";

export const login = async (username, password) => {
  try {
    const res = await axios.post("users/sign-in", { username, password });
    return res;
  } catch (error) {
    return error;
  }
};

export const getCourseByUserId = async (userId) => {
  try {
    const res = await axios.get(`users/course/${userId}`);
    return res;
  } catch (error) {
    return error;
  }
};
