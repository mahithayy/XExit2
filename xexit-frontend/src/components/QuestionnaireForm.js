import React, { useState } from "react";

function QuestionnaireForm({ onSubmit }) {
  const [responses, setResponses] = useState([
    { questionText: "Why are you leaving?", response: "" },
    { questionText: "Any suggestions for improvement?", response: "" },
  ]);

  const handleChange = (i, value) => {
    const copy = [...responses];
    copy[i].response = value;
    setResponses(copy);
  };

  return (
    <div>
      <h4>Exit Interview</h4>
      {responses.map((q, i) => (
        <div key={i}>
          <label>{q.questionText}</label>
          <input value={q.response} onChange={(e) => handleChange(i, e.target.value)} />
        </div>
      ))}
      <button onClick={() => onSubmit(responses)}>Submit</button>
    </div>
  );
}

export default QuestionnaireForm;
