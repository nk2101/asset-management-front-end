import React, { useState, useEffect } from "react";

import data from "../mockData/mockData.json";

function AssetHistory() {
  const [assets, setAssets] = useState(data.assets);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [history, setHistory] = useState(data.assetHistory);

  useEffect(() => {
    // Fetch all assets from the backend API
    const fetchAssets = async () => {
      const response = await fetch("http://localhost:3001/api/assets");
      const data = await response.json();
      setAssets(data);
    };

    fetchAssets();
  }, []);

  const fetchAssetHistory = async (assetId) => {
    // Fetch history for the selected asset from the backend API
    const response = await fetch(
      `http://localhost:3001/api/assets/${assetId}/history`
    );
    const data = await response.json();
    setHistory(data);
  };

  const handleAssetChange = (event) => {
    const assetId = event.target.value;
    setSelectedAsset(assetId);
    if (assetId) {
      fetchAssetHistory(assetId);
    } else {
      setHistory([]);
    }
  };

  return (
    <div>
      <h2>Asset History</h2>
      <div className="form-group">
        <label>Select Asset</label>
        <select
          className="form-control"
          value={selectedAsset}
          onChange={handleAssetChange}
        >
          <option value="">Select an Asset</option>
          {assets &&
            assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.make} ({asset.serialNumber})
              </option>
            ))}
        </select>
      </div>
      {history && history.length > 0 ? (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Date</th>
              <th>Action</th>
              <th>Employee</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {history &&
              history.map((entry, index) => (
                <tr key={index}>
                  <td>{new Date(entry.date).toLocaleString()}</td>
                  <td>{entry.action}</td>
                  <td>{entry.employeeName || "N/A"}</td>
                  <td>{entry.details}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        selectedAsset && (
          <p className="mt-4">No history found for the selected asset.</p>
        )
      )}
    </div>
  );
}

export default AssetHistory;
