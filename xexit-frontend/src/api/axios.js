import axios from "axios";

const API = axios.create({
  baseURL: "https://xexit2.onrender.com/api", // or your Render URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default API;
