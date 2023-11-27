import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.getUserById(id) 
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const centerContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  };

  const tableContainerStyle = {
    width: '80%',
    marginBottom: '20px', // Add margin below the table
  };

  const backButtonStyle = {
    alignSelf: 'flex-end',
    marginTop: '20px',
  };

  return (
    <div style={centerContainerStyle}>
      <Button variant="contained" color="error" style={backButtonStyle} component={Link} to={`/userHome/${id}`}>
        <ArrowBackIcon /> Back
      </Button>
      {user ? (
        <Paper className="p-4" style={tableContainerStyle}>
          <Table className="table table-striped table-bordered"> 
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.userName}</TableCell> 
                <TableCell>{user.emailId}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell><Link to={`/updateUser/${user.id}`}>
                      <Button variant="contained" color="primary" sx={{ fontSize: 16 }} startIcon={<EditIcon />}>
                        Update
                      </Button>
                    </Link></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Typography variant="h6">data not found...</Typography>
      )}
      {/* <Link className="btn btn-info" to={`/addWashPackToUser/${user ? user.id : ''}`}>Add Washpack</Link> */}
    </div>
  );
}

export default UserProfile;
