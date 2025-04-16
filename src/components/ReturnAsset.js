import React, { useState, useEffect } from "react";

import data from "../mockData/mockData.json";

function ReturnAsset() {
  const [issuedAssets, setIssuedAssets] = useState(data.issuedAssets);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [returnReason, setReturnReason] = useState("");

  useEffect(() => {
    // Fetch issued assets from the backend API
    const fetchIssuedAssets = async () => {
      const response = await fetch(
        "http://localhost:3001/api/assets/getissue-list"
      );
      const data = await response.json();
      setIssuedAssets(data);
    };

    fetchIssuedAssets();
  }, []);

  const handleReturn = async () => {
    if (!selectedIssue || !returnReason) {
      alert("Please select an issued asset and provide a return reason.");
      return;
    }

    await fetch("/api/return-asset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issueId: selectedIssue, reason: returnReason }),
    });

    alert("Asset returned successfully!");
    setSelectedIssue("");
    setReturnReason("");
  };

  return (
    <div>
      <h2>Return Asset</h2>
      <div className="form-group">
        <label>Issued Asset</label>
        <select
          className="form-control"
          value={selectedIssue}
          onChange={(e) => setSelectedIssue(e.target.value)}
        >
          <option value="">Select Issued Asset</option>
          {issuedAssets &&
            issuedAssets.map((issue) => (
              <option key={issue.id} value={issue.id}>
                {issue.asset.make} ({issue.asset.serialNumber}) -{" "}
                {issue.employee.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Return Reason</label>
        <input
          type="text"
          className="form-control"
          value={returnReason}
          onChange={(e) => setReturnReason(e.target.value)}
          placeholder="Enter reason for return (e.g., upgrade, repair)"
        />
      </div>
      <button className="btn btn-warning mt-3" onClick={handleReturn}>
        Return Asset
      </button>
    </div>
  );
}

export default ReturnAsset;
