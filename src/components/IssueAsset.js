import React, { useState, useEffect } from "react";
import data from "../mockData/mockData.json";
import axios from "axios";

function IssueAsset() {
  const [employees, setEmployees] = useState(data.employees);
  const [assets, setAssets] = useState(data.assets);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");

  useEffect(() => {
    // Fetch employees and assets from the backend API
    const fetchEmployees = async () => {
      const response = await fetch("http://localhost:3001/api/employees");
      const data = await response.json();
      setEmployees(data);
    };

    const fetchAssets = async () => {
      const response = await fetch("http://localhost:3001/api/assets");
      const data = await response.json();
      setAssets(data);
    };

    fetchEmployees();
    fetchAssets();
  }, []);

  const handleIssue = async () => {
    if (!selectedEmployee || !selectedAsset) {
      alert("Please select both an employee and an asset.");
      return;
    }
    let payload = { employeeId: selectedEmployee, assetId: selectedAsset };

    const response = await axios.post(
      "http://localhost:3001/api/assets/issueasset",
      payload
    );

    alert("Asset issued successfully!");
    setSelectedEmployee("");
    setSelectedAsset("");
  };

  return (
    <div>
      <h2>Issue Asset</h2>
      <div className="form-group">
        <label>Employee</label>
        <select
          className="form-control"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Asset</label>
        <select
          className="form-control"
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
        >
          <option value="">Select Asset</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.make} ({asset.serialNumber})
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-success mt-3" onClick={handleIssue}>
        Issue Asset
      </button>
    </div>
  );
}

export default IssueAsset;
