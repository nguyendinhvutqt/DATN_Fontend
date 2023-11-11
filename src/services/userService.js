import axios, { axiosPublic } from "../ultils/axios";

export const getUsers = async (page) => {
  try {
    const res = await axios.get(`users/?page=${page}`);
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

export const loginGoogle = async (data) => {
  try {
    const res = await axiosPublic.post("users/sign-in/google", data);
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

export const blockUser = async (userId) => {
  try {
    const res = await axios.put(`users/block`, { userId });
    return res;
  } catch (error) {
    return error;
  }
};

export const unBlockUser = async (userId) => {
  try {
    const res = await axios.put(`users/un-block`, { userId });
    return res;
  } catch (error) {
    return error;
  }
};
