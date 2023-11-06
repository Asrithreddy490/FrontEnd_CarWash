import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ExitToApp, Person, ListAlt, CreditCard } from '@mui/icons-material';
import ListWashPackForUser from '../washpackComponent/ListWashPackForUser';
import Swal from 'sweetalert2'; // Import SweetAlert

function UserDashboard(props) {

  const handleLogout = () => {
    // Show a SweetAlert confirmation dialog
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, navigate to the login page
        window.location.href = "/login"; // or use your routing method here
      }
    });
  };

  return (
    <div>
      <div className="col main pt-5 mt-3">
        {/* ... Your existing content ... */}
        <hr />
        <h2>User ID: {props.data}</h2> 
      </div>
      <div style={{ position: 'absolute', top: '80px', right: '20px' }}>
        <IconButton onClick={handleLogout}>
          <ExitToApp />LOGOUT
        </IconButton>
      </div>
      <div class="row mb-3">
        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card bg-success text-white h-100">
            <div class="card-body bg-success" style={{ backgroundColor: "#57b960" }}>
              <div class="rotate"> 
                <Person />
              </div>
              <h6 class="text-uppercase">
                <Link to={`/user/Profile/${props.data}`} style={{ color: '#FFF' }}>
                  Profile
                </Link>
              </h6>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card text-white bg-danger h-100">
            <div class="card-body bg-danger">
              <div class="rotate">
                <ListAlt />
              </div>
              <h6 class="text-uppercase">
                <Link to={`/user/washPack/${props.data}`} style={{ color: '#FFF' }}>
                  Wash Packs
                </Link>
              </h6>
            </div>
          </div>
        </div>
        
      </div>
      <ListWashPackForUser/>
    </div>
  );
}

export default UserDashboard;
