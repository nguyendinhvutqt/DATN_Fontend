import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3001/api/",
});

export const get = async (url, options = {}) => {
  const response = await request.get(url, options);
  return response.data;
};

export const post = async (url, options = {}) => {
  const response = await request.post(url, options);
  return response.data;
};

export default request;
