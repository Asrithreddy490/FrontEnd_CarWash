import React, { useState, useEffect } from 'react';
import WashPackService from '../../services/WashPackService';
import { Link } from 'react-router-dom';
import CarWash1 from '../images/img-1.jpg';
import CarWash2 from '../images/img-4.jpg';
import CarWash3 from '../images/img-3.jpg';
import CarWash4 from '../images/img-4.jpg';
import CarWash5 from '../images/img-5.jpg';
import CarWash6 from '../images/img-3.jpg';
import Carwash7 from '../images/img-7.jpg';
import CarWash8 from '../images/img-8.jpg';
import Carwash9 from '../images/img-9.jpg';

const ListWashPackForUser = () => {
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
  };

  useEffect(() => {
    WashPackService.getAllWashPacks()
      .then((Response) => {
        console.log(Response.data); // Add this line for debugging
        setWashPacks(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
    height: '100%',
  };

  const hoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.4)',
    borderColor: '#555',
  };

  const highlightCost = {
    color: 'red',
  };

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='text-success my-5'>WashPacks</h1>
      </div>
      <div className='container'>
        <div className='row'>
          {washpacks.map((washpack) => {
            const carPhoto = photoes[washpack.washPackName];
            return (
              <div className='col-lg-4 col-md-6 mb-4' key={washpack.id}>
                <div
                  className='card'
                  style={{ ...cardStyle }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = hoverStyle.transform;
                    e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
                    e.currentTarget.style.borderColor = hoverStyle.borderColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.borderColor = '#ccc';
                  }}
                >
                  <img src={carPhoto} className='card-img-top' alt={washpack.washPackName} />
                  <div className='card-body'>
                  <h5 className='card-title'>{washpack.washPackName}</h5>
                    <p className='card-text'>{washpack.washPackDescription}</p>
                    <p className='card-cost' style={highlightCost}>Cost: {washpack.washPackCost}.Rs</p>
                    <div className='d-flex justify-content-between'>
                      {/* Your other card content */}
                    </div>
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

export default ListWashPackForUser;
