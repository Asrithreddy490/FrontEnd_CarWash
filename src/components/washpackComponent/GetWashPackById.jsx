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
      .then((response) => {
        setWashpacks(response.data);
        console.log(response.data);
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
          maxWidth: '400px',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardContent>
          <h2 style={{ color: '#333' }}>Wash Pack Details</h2>
          {washpacks.length === 0 ? (
            <div>No data found</div>
          ) : (
            <>
              <div>
                <strong>Wash Pack Name:</strong> {washpacks.washPackName}
              </div>
              <div>
                <strong>Description:</strong> {washpacks.washPackDescription}
              </div>
              <div>
                <strong>AMOUNT:</strong> {washpacks.washPackCost} /-
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default GetWashPackById;
