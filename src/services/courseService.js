import * as request from "../ultils/request";
import axios from "../ultils/axios";

export const courses = async () => {
  try {
    const res = await axios.get("courses");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const course = async (id) => {
  try {
    const res = await request.get(`courses/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const registerCourse = async (courseId, userId) => {
  try {
    const res = await request.post(`courses/register-course`, {
      courseId,
      userId,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
