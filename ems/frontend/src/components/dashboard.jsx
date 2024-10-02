import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './Dashboard.css'; // Import the custom CSS file
import axios from 'axios';

const Dashboard = () => {
  const navigate=useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout=()=>{
    axios.get('http://localhost:3000/auth/logout')
    .then(result=>{
      if(result.data.status){
        localStorage.removeItem("")
         navigate('/')
      }
    })
  }
  return (
    <div className="dashboard-container">
      <div className="sidebar-wrapper">
        <div className="sidebar">
          <div>
            <Link to="/dashboard" className="sidebar-logo">EMS</Link>
            <ul>
              <li>
                <Link to="/dashboard">
                  <i className="bi bi-house"></i> Dashboard
                </Link>
              </li>
              <li>
                <Link to="employee">
                  <i className="bi bi-people"></i> Manage Employees
                </Link>
              </li>
              <li>
                <Link to="category">
                  <i className="bi bi-folder"></i> Category
                </Link>
              </li>
              <li>
                <Link to="profile">
                  <i className="bi bi-person"></i> Profile
                </Link>
              </li>
              <li onClick={handleLogout}>
                <Link to="/adminlogin">
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="content">
          <div className="head">
            <h4>Employee Management System</h4>
          </div>
          <div className="content-body">
            <Outlet /> {/* Nested routes will render here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
