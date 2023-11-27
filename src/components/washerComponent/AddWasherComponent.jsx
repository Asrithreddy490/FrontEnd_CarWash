import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WasherService from '../../services/WasherService';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import './AddWasherComponent.css'; // Import the external CSS file

const AddWasherComponent = () => {
  const [washerName, setWasherName] = useState('');
  const [washerEmail, setWasherEmail] = useState('');
  const [washerPassword, setWasherPassword] = useState('');
  const { id } = useParams();
  const history = useNavigate();

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!washerName.trim()) {
      newErrors.washerName = 'Field is required';
    } else if (washerName.trim().length < 3) {
      newErrors.washerName = 'Name must contain at least three characters';
    } else if (!/^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(washerName.trim())) {
      newErrors.washerName = 'Name must contain only alphabets';
    }

    // Email validation
    if (!washerEmail.trim()) {
      newErrors.washerEmail = 'Field is required';
    } else if (!/^[a-zA-Z0-9._-]+@gmail\.com$/.test(washerEmail)) {
      newErrors.washerEmail = 'Invalid email address. Email should end with @gmail.com';
    }

    // Password validation
    if (!washerPassword.trim()) {
      newErrors.washerPassword = 'Field is required';
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{7,}/.test(washerPassword)) {
      newErrors.washerPassword =
        'Password must contain a capital letter, a number, a special character, and be at least 7 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveOrUpdateUser = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const washers = { washerName, washerEmail, washerPassword };
    if (id) {
      WasherService.updateWasher(id, washers)
        .then((Response) => {
          console.log(Response.data);
          Swal.fire({
            title: 'Success',
            text: 'Washer details have been updated successfully',
            icon: 'success',
          }).then(() => {
            history(`/washerDetails/${id}`);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      WasherService.addWasher(washers)
        .then((Response) => {
          console.log(Response.data);
          Swal.fire({
            title: 'Success',
            text: 'Washer details have been added successfully',
            icon: 'success',
          }).then(() => {
            history('/admin/listWashers');
          });
        })
        .catch((error) => {
          console.log(error.response.status);
          console.log(error.response.data);
        });
    }
  };

  useEffect(() => {
    WasherService.getWasherById(id)
      .then((Response) => {
        setWasherName(Response.data.washerName);
        setWasherEmail(Response.data.washerEmail);
        setWasherPassword(Response.data.washerPassword);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const title = () => {
    if (id) {
      return <Typography variant="h4" color="primary" gutterBottom>Update Washer</Typography>;
    } else {
      return <Typography variant="h4" color="primary" gutterBottom>Add Washer</Typography>;
    }
  };

  const backDestination = id ? `/washerDetails/${id}` : '/admin/listWashers';

  const clearError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  };

  return (
    <div className='bg'>
    <Container maxWidth="sm">
      {title()}
      <Container className="form-container">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={washerName}
          onChange={(e) => setWasherName(e.target.value)}
          error={!!errors.washerName}
          helperText={errors.washerName}
          onFocus={() => clearError('washerName')} // Clear error when focused
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={washerEmail}
          onChange={(e) => setWasherEmail(e.target.value)}
          error={!!errors.washerEmail}
          helperText={errors.washerEmail}
          onFocus={() => clearError('washerEmail')} // Clear error when focused
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={washerPassword}
          onChange={(e) => setWasherPassword(e.target.value)}
          error={!!errors.washerPassword}
          helperText={errors.washerPassword}
          onFocus={() => clearError('washerPassword')} // Clear error when focused
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
              onClick={() => history(backDestination)}
            >
              Back
            </Button>
        </div>
      </Container>
    </Container>
    </div>
  );
};

export default AddWasherComponent;
