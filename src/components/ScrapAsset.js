import React, { useState, useEffect } from 'react';
import data from '../mockData/mockData.json';

function ScrapAsset() {
  const [assets, setAssets] = useState(data.assets);
  const [selectedAsset, setSelectedAsset] = useState('');

  useEffect(() => {
    // Fetch assets from the backend API
    const fetchAssets = async () => {
      const response = await fetch("http://localhost:3001/api/assets");
      const data = await response.json();
      setAssets(data);
    };

    fetchAssets();
  }, []);

  const handleScrap = async () => {
    if (!selectedAsset) {
      alert('Please select an asset to scrap.');
      return;
    }
    await fetch('/api/scrap-asset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assetId: selectedAsset }),
    });

    alert('Asset scrapped successfully!');
    setSelectedAsset('');
  };

  return (
    <div>
      <h2>Scrap Asset</h2>
      <div className="form-group">
        <label>Asset</label>
        <select
          className="form-control"
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
        >
          <option value="">Select Asset</option>
          {assets.map(asset => (
            <option key={asset.id} value={asset.id}>
              {asset.make} ({asset.serialNumber}) - {asset.type}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-danger mt-3" onClick={handleScrap}>Scrap Asset</button>
    </div>
  );
}

export default ScrapAsset;