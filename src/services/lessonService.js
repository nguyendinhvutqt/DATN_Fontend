import axios from "../ultils/axios";

export const getById = async (lessonId) => {
  try {
    const res = await axios.get(`lessons/${lessonId}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const addLesson = async (chapterId, data) => {
  try {
    const res = await axios.post(`lessons/${chapterId}/lesson`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const editLesson = async (lessonId, data) => {
  try {
    const res = await axios.put(`lessons/${lessonId}`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteLesson = async (lessonId) => {
  try {
    const res = await axios.delete(`lessons/${lessonId}`);
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
