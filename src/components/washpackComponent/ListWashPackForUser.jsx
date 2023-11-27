import React, { useState, useEffect } from 'react';
import WashPackService from '../../services/WashPackService';
import UserService from '../../services/UserService';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
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

const ListWashPackForUser = ({ userId }) => {
  const [washpacks, setWashPacks] = useState([]);
  const [selectedWashPack, setSelectedWashPack] = useState(null);
  const nav = useNavigate();

  const photoes = {
    'Basic Wash Pack': CarWash1,
    'Premium Wash Pack': CarWash2,
    'Deluxe Wash Pack': CarWash3,
    'Ultimate Wash Pack': CarWash4,
    'Monthly Membership Wash Pack': CarWash5,
    'Eco-Friendly Wash Pack': CarWash6,
    'Truck and SUV Wash Pack': Carwash7,
    'Express Wash Pack': CarWash8,
    'Only Wash Pack': Carwash9,
    'ultra clean': Carwash7,
  };

  useEffect(() => {
    WashPackService.getAllWashPacks()
      .then((Response) => {
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
    cursor: 'pointer',
  };

  const selectedCardStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.4)',
    borderColor: '#555',
    backgroundColor: 'lightblue', // Change the background color
  };

  const highlightCost = {
    color: 'red',
  };

  const addWashPackToUser = () => {
    if (selectedWashPack) {
      const user = { washPackId: selectedWashPack.id };
      UserService.updateWashPackIdinUser(userId, user)
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            title: 'WashPack Added',
            text: 'The selected washpack has been added successfully!',
            icon: 'success',
            
          }).then(() => {
            nav("/payment", {state: { totalPrice: selectedWashPack.washPackCost }});
            window.location.reload(); // Reload the page
          });
          // Optionally, you can update the UI or take additional actions after updating the user
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire({
        title: 'No WashPack Selected',
        text: 'Please select a washpack before adding.',
        icon: 'warning',
      });
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='text-success my-5'>WashPacks available at our car wash :</h1>
      </div>
      <div className='container'>
        <div className='row'>
          {washpacks.map((washpack) => {
            const carPhoto = photoes[washpack.washPackName];
            const isSelected = selectedWashPack && selectedWashPack.id === washpack.id;

            return (
              <div
                className='col-lg-4 col-md-6 mb-4'
                key={washpack.id}
                onClick={() => setSelectedWashPack(washpack)}
              >
                <div
                  className='card'
                  style={{
                    ...cardStyle,
                    ...(isSelected ? selectedCardStyle : {}),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 16px 0 rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.borderColor = '#555';
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
                    <p className='card-cost' style={highlightCost}>
                      Cost: {washpack.washPackCost}.Rs
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='d-flex justify-content-center mt-4'>
        <button onClick={addWashPackToUser}>Add selected washpack</button>
      </div>
    </div>
  );
};

export default ListWashPackForUser;
