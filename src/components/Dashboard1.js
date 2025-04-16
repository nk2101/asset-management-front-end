import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Forums from "./Forums";
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navi = useNavigate();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       navi("/login");
  //       return;
  //     }

  //     try {
  //       const response = await axios.get("http://localhost:5000/api/auth/me", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setUser(response.data.user);
  //     } catch (error) {
  //       console.error("Error fetching user data", error);
  //       alert("Error fetching user data.");
  //     }
  //   };

  //   fetchUser();
  // }, [navi]);

  return (
    <div>
      {/* <ForumList /> */}
      <Forums />
    </div>
  );
};

export default Dashboard;
