import axios from "../ultils/axios";

export const addComment = async (lessonId, data) => {
  try {
    const response = await axios.post(`comments/${lessonId}/comment`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getComments = async (lessonId, data) => {
  try {
    const response = await axios.get(`comments/${lessonId}/comment`);
    return response;
  } catch (error) {
    return error;
  }
};
