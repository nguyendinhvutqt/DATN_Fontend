import axios, { axiosPublic } from "../ultils/axios";

export const addCourse = async (data) => {
  try {
    const res = await axios.post("courses/add", data);
    return res;
  } catch (error) {
    return error;
  }
};

export const courses = async () => {
  try {
    const res = await axios.get("courses");
    return res;
  } catch (error) {
    return error;
  }
};

export const coursesAndPaginate = async (page) => {
  try {
    const res = await axios.get(`courses/paginate?page=${page}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const course = async (id) => {
  try {
    const res = await axios.get(`courses/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const delCourse = async (id) => {
  try {
    const res = await axios.delete(`courses/delete/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const editCourse = async (id, data) => {
  try {
    const res = await axios.put(`courses/edit/${id}`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const registerCourse = async (courseId, userId) => {
  try {
    const res = await axios.post(`courses/register-course`, {
      courseId,
      userId,
    });
    return res;
  } catch (error) {
    return error;
  }
};
