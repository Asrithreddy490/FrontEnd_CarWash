import React, { useState, useEffect } from 'react';
import WasherService from '../../services/WasherService';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import AddIcon from '@mui/icons-material/Add';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';

const ListWasher = () => {
  const [washers, setWashers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    WasherService.getAllWashers()
      .then((Response) => {
        setWashers(Response.data);
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteWasher = (id) => {
    // Show a confirmation dialog before deleting
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this washer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        WasherService.deleteWasher(id)
          .then((Response) => {
            // Show a success message and reload the page
            Swal.fire('Deleted!', 'Washer has been deleted.', 'success').then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="container">
      <h2 className="text-center">Washers List</h2>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <div className="input-group" style={{ width: '3-4cm' }}>
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
          <div className="input-group-append">
            <Link to={"/addWasher"}><Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              size="small" // Smaller button size
            >
              Add Washer
            </Button></Link>
          </div>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {washers.filter((washer)=>{
            return search.toLowerCase()==='' ? washer:washer.washerName.toLowerCase().includes(search);
          }).map((washer) => (
            <tr key={washer.id}>
              <td>{washer.id}</td>
              <td>{washer.washerName}</td>
              <td>{washer.washerEmail}</td>
              <td>
                
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteWasher(washer.id)}
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

export default ListWasher;
