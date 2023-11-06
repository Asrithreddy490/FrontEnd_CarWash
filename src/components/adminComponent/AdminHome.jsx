import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';
import './AdminHome.css'; // Import your CSS file


function AdminHome() {
  return (
    <div >
    <AdminNavbar/>
  <div className="hotel-background">
    <div className="adminImage">
      <h1>Welcome Admin....!</h1>
      
    </div>
  </div>
  
  </div>
  );
}

export default AdminHome;
