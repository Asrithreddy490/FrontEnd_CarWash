import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserForWasher = () => {
  const { id, washPackName } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getUserFromWashPackId(id)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{washPackName} - List of Users</h2>
       
      </div>
      {Array.isArray(users) && users.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Phone number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.emailId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserForWasher;
