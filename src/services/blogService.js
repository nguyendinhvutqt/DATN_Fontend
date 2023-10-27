import axios from "../ultils/axios";

export const getBlog = async (blogId) => {
  try {
    const res = await axios.get(`blogs/${blogId}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const getBlogsAndPaginate = async (page) => {
  try {
    const res = await axios.get(`blogs?page=${page}`);
    return res;
  } catch (error) {
    return error;
  }
};

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

export const deleteBlog = async (blogId) => {
  try {
    const res = await axios.delete(`blogs/${blogId}`);
    return res;
  } catch (error) {
    return error;
  }
};
