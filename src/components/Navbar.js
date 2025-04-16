import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div style={{backgroundColor : '#2871c5',padding :"10px", textAlign:"center"}}>
        <Link className="navbar-brand" to="/" style={{ color:"white"}}>
          Asset Management
        </Link>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/employee-master">
                Employee Master
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/asset-master">
                Asset Master
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/asset-category-master">
                Asset Category
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stock-view">
                Stock View
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/issue-asset">
                Issue Asset
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/return-asset">
                Return Asset
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/scrap-asset">
                Scrap Asset
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/asset-history">
                Asset History
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
