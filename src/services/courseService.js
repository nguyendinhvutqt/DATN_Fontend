import axios, { axiosPublic } from "../ultils/axios";

export const addCourse = async (data) => {
  try {
    const res = await axios.post("courses", data);
    return res;
  } catch (error) {
    return error;
  }
};

export const courses = async () => {
  try {
    const res = await axiosPublic.get("courses");
    return res;
  } catch (error) {
    return error;
  }
};

export const getCoursesByAdmin = async () => {
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
    const res = await axios.delete(`courses/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const editCourse = async (id, data) => {
  try {
    const res = await axios.put(`courses/${id}`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const paymentCourse = async (courseId) => {
  try {
    const res = await axios.post(`courses/payment`, {
      courseId,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const registerCourse = async (courseId) => {
  try {
    const res = await axios.post(`courses/register-course`, {
      courseId,
    });
    return res;
  } catch (error) {
    return error;
  }
};
