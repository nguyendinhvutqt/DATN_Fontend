import axios from "../ultils/axios";

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

export const course = async (id) => {
  try {
    const res = await axios.get(`courses/${id}`);
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
