import API from "../api/axios";

export const submitExitResponses = (responses) =>
  API.post("/user/responses", { responses });

export const getAllExitResponses = () =>
  API.get("/admin/exit_responses");
