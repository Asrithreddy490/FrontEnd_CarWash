import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import WasherService from '../../services/WasherService';

const WasherDetails = () => {
  const { id } = useParams();
  const [washer, setWasher] = useState(null);

  useEffect(() => {
    WasherService.getWasherById(id)
      .then((response) => {
        console.log(response.data);
        setWasher(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <div className="back-button">
      <Link to={`/washerHome/${id}`}>
          <button
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Back
          </button>
        </Link>
      </div>
      <h2>Washer Details</h2>
      {washer ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Washer Name</th>
              <th>Washer Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{washer.washerName}</td>
              <td>{washer.washerEmail}</td>
              <td>{washer.washerPassword}</td>
            
              <td>
                <Link to={`/updateWasher/${washer.id}`}>
                  <Button variant="contained" color="info" startIcon={<EditIcon />}>
                    Update
                  </Button>
                </Link>
              </td>
            </tr>
            {/* Add more rows for additional details */}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WasherDetails;
