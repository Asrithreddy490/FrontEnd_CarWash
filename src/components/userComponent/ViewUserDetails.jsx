import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';

const ViewUserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.getUserFromAdmin(id)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card" style={{ maxWidth: '400px', background: 'linear-gradient(to bottom, #eee, #fff)', border: '2px solid #333' }}>
        <div className="card-body" style={{ background: '#ddd' }}>
          <h5 className="card-title">User Details</h5>
          {user ? (
            <div>
              <p className="card-text">
                <strong>User Name:</strong> {user.userName}
              </p>
              <p className="card-text">
                <strong>Phone Number:</strong> {user.phoneNumber}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {user.emailId}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {user.address}
              </p>
              <p className="card-text">
                <strong>Wash Pack Name:</strong> {user.washerName}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {user.washPackDescription}
              </p>
              <p className="card-text">
                <strong>Wash Pack Cost:</strong> {user.washPackCost}
              </p>
              <p className="card-text">
                <strong>Assigned Washer:</strong> {user.washPackName }
              </p>
            </div>
          ) : (
            <p>Washer needs to be assigned...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUserDetails;
