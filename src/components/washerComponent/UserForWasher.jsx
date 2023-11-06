import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';

const UserForWasher = () => {
  const { id } = useParams(); // Retrieve the washPackId from the URL parameters
  const [user, setUser] = useState({
    userName: '',
    phoneNumber: '',
    emailId: '',
  });

  useEffect(() => {
    UserService.getUserFromWashPackId(id)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Phone number</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.userName}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.emailId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserForWasher;
