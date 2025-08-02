import React, { useEffect, useState } from "react";
import { getAllResignations, approveResignation, rejectResignation } from "../services/resignation";
import { getAllExitResponses } from "../services/questionnaire";
import ResignationCard from "../components/ResignationCard";
import LogoutButton from "../components/LogoutButton";

function HRDashboard() {
  const [resignations, setResignations] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getAllResignations();
      setResignations(res.data.data);
      const r = await getAllExitResponses();
      setResponses(r.data.data);
    })();
  }, []);

  const handleAction = async (id, approve) => {
    const lwd = prompt("Enter final exit date (YYYY-MM-DD):");
    if (!lwd) return;
    if (approve) await approveResignation(id, lwd);
    else await rejectResignation(id, lwd);
    window.location.reload();
  };

  return (
    <div>
      <h2>HR Dashboard</h2>
      <LogoutButton />
      <h3>Resignations</h3>
      {resignations.map((r) => (
        <ResignationCard key={r._id} data={r} onApprove={handleAction} />
      ))}
      <h3>Exit Interview Responses</h3>
      {responses.map((resp, idx) => (
        <div key={idx}>
          <strong>{resp.employeeId.username}:</strong>
          <ul>
            {resp.responses.map((r, i) => (
              <li key={i}>
                {r.questionText}: {r.response}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default HRDashboard;
