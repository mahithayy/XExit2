import API from "../api/axios";

export const register = (username, password) =>
  API.post("/auth/register", { username, password });

export const login = (username, password) =>
  API.post("/auth/login", { username, password });
