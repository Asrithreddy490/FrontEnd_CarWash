import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { Link } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import ViewListIcon from '@mui/icons-material/ViewList';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';

const ListUsers = () => { 
  const [users, setUser] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    UserService.getAllUsers()
      .then((Response) => {
        setUser(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteUser = async (id) => {
    // Show a confirmation alert
    Swal.fire({
      title: 'Delete User',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed the deletion, proceed with the request
        UserService.deleteUser(id)
          .then((Response) => {
            console.log(Response.data);
            // Show a success notification
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            // Show an error notification
            Swal.fire('Error', 'An error occurred while deleting the user.', 'error');
          });
      }
    });
  };

  return (
    <div className="container">
      <h2 className="text-center">List Of Users</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          height: "30px",
          borderColor: "blue",
          float: "right",
          marginRight: "20px",
          marginBottom: '20px'
        }}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => {
              return search.toLowerCase() === '' ? user : user.userName.toLowerCase().includes(search);
            })
            .map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.emailId}</td>
                <td>{user.address}</td>
                <td>{user.phoneNumber}</td>
                <td>
 



                  <Link to={`/viewDetailsById/${user.id}`} className='btn btn-secondary'>
                    <ViewListIcon sx={{ fontSize: 16 }} /> View Details
                  </Link>

                  {/* <div style={{ margin: '5px' }}>
                    <Link to={`/updateUser/${user.id}`}>
                      <Button variant="contained" color="primary" sx={{ fontSize: 16 }} startIcon={<EditIcon />}>
                        Update
                      </Button>
                    </Link>
                  </div> */}

                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteUser(user.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </Button>



                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListUsers;
