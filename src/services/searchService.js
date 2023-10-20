import axios from "../ultils/axios";

export const search = async (q, type = "less") => {
  try {
    const res = await axios(`search?q=${q}&type=${type}`);
    return res;
  } catch (error) {
    return error;
  }
};
