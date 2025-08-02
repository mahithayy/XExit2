import API from "../api/axios";

export const submitResignation = (lwd) =>
  API.post("/user/resign", { lwd });

export const getAllResignations = () =>
  API.get("/admin/resignations");

export const approveResignation = (resignationId, lwd) =>
  API.put("/admin/conclude_resignation", {
    resignationId,
    approved: true,
    lwd,
  });

export const rejectResignation = (resignationId, lwd) =>
  API.put("/admin/conclude_resignation", {
    resignationId,
    approved: false,
    lwd,
  });
