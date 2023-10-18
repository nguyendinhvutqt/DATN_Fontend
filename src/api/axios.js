import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1/";

// const refreshToken = async () => {
//   try {
//     const res = await axios.post(BASE_URL + "users/refresh-token");
//   } catch (error) {
//     console.log(error);
//   }
// };

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
