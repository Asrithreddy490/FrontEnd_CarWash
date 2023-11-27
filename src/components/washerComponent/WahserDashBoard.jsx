import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert

import './WasherDashboard.css'; // Import the CSS file

function WasherDashboard(props) {
  const nav = useNavigate();

  function handleLogout() {
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
        nav('/login');
      }
    });
  }

  return (
    <div className="background-image-container">
      <Container>
        <div style={{ marginTop: '20px' }}>
          <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
          <h3 className="text-dark">Washer Dashboard</h3>
            <IconButton color="primary" onClick={handleLogout}>
              <ExitToAppIcon />LOGOUT
            </IconButton>
          </div>
          <Row>
            <Col md={4}>
              <Card className="hover-card card-size">
                <CardContent>
                  <h2>Wash Packs</h2>
                  <p>Description of the service request.</p>
                  <Link to={`/washer/Profil/${props.data}`}>
                    <Button variant="contained" color="primary">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="hover-card card-size">
                <CardContent>
                  <h2>Washer Details</h2>
                  <p>Description of the service request.</p>
                  <h6 className="text-uppercase">
                    <Link to={`/washerDetails/${props.data}`}>
                      <Button variant="contained" color="primary">
                        View Details
                      </Button>
                    </Link>
                  </h6>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default WasherDashboard;
