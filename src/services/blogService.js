import axios from "../ultils/axios";

export const addBlog = async (data) => {
  try {
    const res = await axios.post("blogs", data);
    return res;
  } catch (error) {
    return error;
  }
};
