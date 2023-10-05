import axios from "../ultils/axios";

export const addChapter = async (courseId, data) => {
  try {
    const respone = await axios.post(`courses/${courseId}/chapter`, data);
    return respone;
  } catch (error) {
    return error;
  }
};

export const editChapter = async (chapterId, data) => {
  try {
    const response = await axios.put(`chapters/${chapterId}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const delChapter = async (chapterId) => {
  try {
    const response = await axios.delete(`chapters/${chapterId}`);
    return response;
  } catch (error) {
    return error;
  }
};
