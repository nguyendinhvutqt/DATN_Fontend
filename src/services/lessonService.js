import axios from "../ultils/axios";

export const getById = async (id) => {
  try {
    const res = await axios.get(`lessons/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const learned = async (userId, lessonId) => {
  try {
    const res = await axios.post("lessons/learned", {
      userId,
      lessonId,
    });
    return res;
  } catch (error) {
    return error;
  }
};
