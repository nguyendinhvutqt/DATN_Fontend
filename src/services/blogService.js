import axios from "../ultils/axios";

export const getBlogs = async () => {
  try {
    const res = await axios.get("blogs");
    return res;
  } catch (error) {
    return error;
  }
};

export const addBlog = async (data) => {
  try {
    const res = await axios.post("blogs", data);
    return res;
  } catch (error) {
    return error;
  }
};

export const confirmBlog = async (blogId) => {
  try {
    const res = await axios.put(`blogs/${blogId}`);
    return res;
  } catch (error) {
    return error;
  }
};
