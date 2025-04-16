import React, { useState, useEffect } from "react";

import data from '../mockData/mockData.json'

function StockView() {
  const [stock, setStock] = useState(data.stock);

  useEffect(() => {
    // Fetch stock data from the backend API
    const fetchStock = async () => {
      const response = await fetch("http://localhost:3001/api/category/stockview");
      const data = await response.json();
      setStock(data);
    };
    fetchStock();
  }, []);

  const calculateTotalValue = () => {
    return stock.reduce((sum, item) => sum + item.value, 0);
  };

  return (
    <div>
      <h2>Stock View</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Branch</th>
            <th>Asset Type</th>
            <th>Quantity</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {stock && stock.map((item) => (
            <tr key={item.branch}>
              <td>{item.branch}</td>
              <td>{item.type}</td>
              <td>{item.quantity}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <strong>Total Value:</strong>
            </td>
            <td>
              <strong>{calculateTotalValue()}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default StockView;
