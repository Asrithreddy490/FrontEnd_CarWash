import React, { useState, useEffect } from 'react';
import WashPackService from '../../services/WashPackService';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AddWasherIcon from '@mui/icons-material/AddBox';
import CarWash1 from '../images/img-1.jpg';
import CarWash2 from '../images/img-4.jpg';
import CarWash3 from '../images/img-3.jpg';
import CarWash4 from '../images/img-4.jpg';
import CarWash5 from '../images/img-5.jpg';
import CarWash6 from '../images/img-3.jpg';
import Carwash7 from '../images/img-7.jpg';
import CarWash8 from '../images/img-8.jpg';
import Carwash9 from '../images/img-9.jpg';
import Swal from 'sweetalert2'; // Import sweetalert2

const ListWashPack = () => {
  const [washpacks, setWashPacks] = useState([]);

  const photoes = {
    "Basic Wash Pack": CarWash1,
    "Premium Wash Pack": CarWash2,
    "Deluxe Wash Pack": CarWash3,
    "Ultimate Wash Pack": CarWash4,
    "Monthly Membership Wash Pack": CarWash5,
    "Eco-Friendly Wash Pack": CarWash6,
    "Truck and SUV Wash Pack": Carwash7,
    "Express Wash Pack": CarWash8,
    "Only Wash Pack": Carwash9,
    "ultra clean":Carwash7,
  };

  useEffect(() => {
    WashPackService.getAllWashPacks()
      .then((Response) => {
        setWashPacks(Response.data);
      })
      .catch((error) => {
        console.error('Error fetching Wash Packs:', error);
      });
  }, []);

  const deleteWashPack = (id) => {
    // Use SweetAlert for confirmation
    Swal.fire({
      title: 'Delete Wash Pack',
      text: 'Are you sure you want to delete this Wash Pack?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        WashPackService.deleteWashPack(id)
          .then(() => {
            // Show a success alert
            Swal.fire({
              title: 'Deleted!',
              text: 'The Wash Pack has been deleted.',
              icon: 'success',
            }).then(() => {
              // Reload the page after the alert is closed
              window.location.reload();
            });
          })
          .catch((error) => {
            console.error('Error deleting Wash Pack:', error);
  
            // Show an error alert
            Swal.fire({
              title: 'Error',
              text: 'An error occurred while deleting the Wash Pack. Please try again later.',
              icon: 'error',
            });
          });
      }
    });
  };
  

  const buttonStyle = {
    fontSize: '16px',
    width: '100%',
    margin: '4px 0',
  };

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='text-success my-5'>WashPacks</h1>
        <Link to="/addWashpack" className='btn btn-primary'>
          <AddIcon sx={{ fontSize: 20 }} /> Add Wash Pack
        </Link>
      </div>
      <div className='container'>
        <div className='row'>
          {washpacks.map((washpack) => {
            // Retrieve the corresponding image path based on washPackName
            const carPhoto = photoes[washpack.washPackName];

            return (
              <div className='col-lg-4 col-md-6 mb-4' key={washpack.id}>
                <div
                  className='card'
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                    cursor: 'pointer',
                    height: '100%',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 16px 0 rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.borderColor = '#555';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.borderColor = '#ccc';
                  }
                }>
                  <img src={carPhoto} className='card-img-top' />
                  <div className='card-body'>
                    <h5 className='card-title'>{washpack.washPackName}</h5>
                    <p className='card-text'>{washpack.washPackDescription}</p>
                    <p className='card-cost'>Cost: {washpack.washPackCost}</p>
                    <Link to={`/updateWashpack/${washpack.id}`}>
                      <Button variant="contained" color="info" startIcon={<EditIcon />} sx={buttonStyle}>
                        Update
                      </Button>
                    </Link>
                    <Link to={`/addWasherToWashpack/${washpack.id}`}>
                      <Button variant="contained" color="success" startIcon={<AddWasherIcon />} sx={buttonStyle}>
                        Add Washer
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteWashPack(washpack.id)}
                      sx={buttonStyle}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListWashPack;
