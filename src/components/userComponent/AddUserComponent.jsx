import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
import './AddUserComponent.css';

const AddUserComponent = () => {
  const [userName, setUserName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  const history = useNavigate();

  const clearError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^[A-Za-z]+$/.test(userName)) {
      newErrors.userName = 'Only alphabets are allowed in the Name field';
    }
    if (!/^[a-zA-Z0-9._-]+@gmail\.com$/.test(emailId)) {
      newErrors.emailId = 'Invalid email address. Email should end with @gmail.com';
    }
    if (!address) newErrors.address = 'Address is required';
    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Invalid Phone Number';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{7,}/.test(password)) {
      newErrors.password = 'Password must contain a capital letter, a number, a special character, and be at least 7 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveOrUpdateUser = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const users = { userName, emailId, address, phoneNumber, password };
    if (id) {
      UserService.updateUser(id, users)
        .then((Response) => {
          console.log(Response.data);
          Swal.fire({
            icon: 'success',
            title: 'User Updated',
            text: 'User details have been updated successfully.',
          });
          history(`/user/Profile/${id}`);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while updating the user.',
          });
        });
    } else {
      UserService.createUser(users)
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            icon: 'success',
            title: 'User Added',
            text: 'User has been added successfully.',
          });
          history('/login');
        })
        .catch((error) => {
          console.log(error.response.status);
          console.log(error.response.data);
          if (error.response && error.response.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'User with this email or phone number already exists.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while adding the user.',
            });
          }
        });
    }
  };

  useEffect(() => {
    UserService.getUserById(id)
      .then((Response) => {
        setUserName(Response.data.userName);
        setPhoneNumber(Response.data.phoneNumber);
        setEmailId(Response.data.emailId);
        setAddress(Response.data.address);
        setPassword(Response.data.password);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Container maxWidth="sm" className="page-container">
      <Typography variant="h4" color="primary" gutterBottom>
        {id ? 'Update User' : 'Add User'}
      </Typography>
      <form className="form-container">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={!!errors.userName}
          helperText={errors.userName}
          onFocus={() => clearError('userName')} // Clear error when focused
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phoneNumber}
          onChange={(e) => {
            if (/^\d{0,10}$/.test(e.target.value)) {
              setPhoneNumber(e.target.value);
            }
          }}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          onFocus={() => clearError('phoneNumber')} // Clear error when focused
        />
        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          margin="normal"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          error={!!errors.emailId}
          helperText={errors.emailId}
          onFocus={() => clearError('emailId')} // Clear error when focused
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={!!errors.address}
          helperText={errors.address}
          onFocus={() => clearError('address')} // Clear error when focused
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          onFocus={() => clearError('password')} // Clear error when focused
        />
        <div className="submit-button-container">
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={(e) => saveOrUpdateUser(e)}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<ArrowBackIcon />}
            onClick={() => (id ? history(`/userHome/${id}`) : history('/login'))}
            style={{ marginLeft: '10px' }}
          >
            Back
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AddUserComponent;
