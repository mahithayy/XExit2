import React from "react";

function ResignationCard({ data, onApprove }) {
  return (
    <div style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
      <p><strong>{data.employeeId.username}</strong> ({data.employeeId.email})</p>
      <p>Requested LWD: {new Date(data.lwd).toDateString()}</p>
      <p>Status: {data.status}</p>
      {data.status === "pending" && (
        <>
          <button onClick={() => onApprove(data._id, true)}>Approve</button>
          <button onClick={() => onApprove(data._id, false)}>Reject</button>
        </>
      )}
    </div>
  );
}

export default ResignationCard;
