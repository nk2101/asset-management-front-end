import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EmployeeMaster from "./components/EmployeeMaster";
import AssetMaster from "./components/AssetMaster";
import AssetCategoryMaster from "./components/AssetCategoryMaster";
import StockView from "./components/StockView";
import IssueAsset from "./components/IssueAsset";
import ReturnAsset from "./components/ReturnAsset";
import ScrapAsset from "./components/ScrapAsset";
import AssetHistory from "./components/AssetHistory";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css"; // DataTables CSS
import EmployeeMaster1 from "./components/EmployeeMaster1";
import AssetMaster1 from "./components/AssetMaster1";
import { Helmet } from "react-helmet";
import AssetCategoryMaster1 from "./components/AssetCategoryMaster1";
import StockView1 from "./components/StockView1";

function App() {
  return (
    <Router>
      <div>
        <Helmet>
          <title>Asset Master</title>
        </Helmet>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* <Route path="/employee-master" element={<EmployeeMaster />} /> */}

            <Route path="/employee-master" element={<EmployeeMaster1 />} />
            {/* <Route path="/asset-master" element={<AssetMaster />} /> */}
            <Route path="/asset-master" element={<AssetMaster1 />} />

            {/* <Route
              path="/asset-category-master"
              element={<AssetCategoryMaster />}
            /> */}

            <Route
              path="/asset-category-master"
              element={<AssetCategoryMaster1 />}
            />
            {/* <Route path="/stock-view" element={<StockView />} /> */}
            <Route path="/stock-view" element={<StockView1 />} />
            <Route path="/issue-asset" element={<IssueAsset />} />
            <Route path="/return-asset" element={<ReturnAsset />} />
            <Route path="/scrap-asset" element={<ScrapAsset />} />
            <Route path="/asset-history" element={<AssetHistory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
