import axios, { axiosPublic } from "../ultils/axios";

export const getUsers = async () => {
  try {
    const res = await axios.get("users");
    return res;
  } catch (error) {
    return error;
  }
};

export const login = async (username, password) => {
  try {
    const res = await axiosPublic.post("users/sign-in", { username, password });
    return res;
  } catch (error) {
    return error;
  }
};

export const register = async (data) => {
  try {
    const res = await axiosPublic.post("users/sign-up", data);
    return res;
  } catch (error) {
    return error;
  }
};

export const getCourseLearned = async () => {
  try {
    const res = await axios.get(`users/course/learned`);
    return res;
  } catch (error) {
    return error;
  }
};
