import axios from "../ultils/axios";

export const addComment = async (lessonId, data) => {
  try {
    const response = await axios.post(`comments/${lessonId}/comment`, data);
    return response;
  } catch (error) {
    return error;
  }
};
