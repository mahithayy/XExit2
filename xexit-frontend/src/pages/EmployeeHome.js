import React, { useState } from "react";
import { submitResignation } from "../services/resignation";
import { submitExitResponses } from "../services/questionnaire";
import QuestionnaireForm from "../components/QuestionnaireForm";
import LogoutButton from "../components/LogoutButton";

function EmployeeHome() {
  const [lwd, setLwd] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleResignation = async () => {
    try {
      await submitResignation(lwd);
      alert("Resignation submitted");
    } catch (err) {
      alert("Failed: " + err.response?.data?.message);
    }
  };

  const handleResponsesSubmit = async (responses) => {
    try {
      await submitExitResponses(responses);
      alert("Responses submitted");
    } catch (err) {
      alert("Error submitting responses");
    }
  };

  return (
    <div>
      <h2>Employee Home</h2>
      <LogoutButton />
      <input type="date" value={lwd} onChange={(e) => setLwd(e.target.value)} />
      <button onClick={handleResignation}>Submit Resignation</button>
      <hr />
      <button onClick={() => setShowForm(!showForm)}>Fill Exit Interview</button>
      {showForm && <QuestionnaireForm onSubmit={handleResponsesSubmit} />}
    </div>
  );
}

export default EmployeeHome;
