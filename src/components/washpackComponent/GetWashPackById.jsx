import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import WashPackService from '../../services/WashPackService';
import UserService from '../../services/UserService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GetWashPackById = () => {
  const { id } = useParams();
  const [washpacks, setWashpacks] = useState([]);

  useEffect(() => {
    UserService.getUserFromAdmin(id)
      .then((Response) => {
        setWashpacks(Response.data);
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        position: 'relative',
      }}
    >
      <Link to={`/userHome/${id}`}>
        <button
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            borderRadius: '5px',
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          <ArrowBackIcon /> Back
        </button>
      </Link>
      <Card
        variant="outlined"
        style={{
          maxWidth: '400px', // Set a maximum width for the card
          backgroundColor: '#f5f5f5', // Background color (change to your preferred color)
          border: '1px solid #ccc', // Border
          borderRadius: '8px', // Border radius
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Box shadow
        }}
      >
        <CardContent>
          <h2 style={{ color: '#333' }}>Wash Pack Details</h2>
          <div>
            <strong>Wash Pack Name:</strong> {washpacks.washPackName}
          </div>
          <div>
            <strong>Description:</strong> {washpacks.washPackDescription}
          </div>
          <div>
            <strong>Cost:</strong> {washpacks.washPackCost}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default GetWashPackById;
