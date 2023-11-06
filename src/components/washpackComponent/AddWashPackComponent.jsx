import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WashPackService from '../../services/WashPackService';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import styled from 'styled-components';
import Swal from 'sweetalert2'; // Import SweetAlert

const PageContainer = styled(Container)`
  background: linear-gradient(90deg, #f5f5f5 50%, #ffffff 50%);
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const FormContainer = styled(Container)`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const SubmitButtonContainer = styled('div')`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled(Button)`
  margin-right: 10px;

  &:hover {
    background-color: #3085d6;
    color: #fff;
  }
`;

const AddWashPackComponent = () => {
  const [washPackName, setWashPackName] = useState('');
  const [washPackDescription, setWashPackDescription] = useState('');
  const [washPackCost, setWashPackCost] = useState('');
  const { id } = useParams();
  const history = useNavigate();

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Wash Pack Name validation
    if (!washPackName.trim()) {
      newErrors.washPackName = 'Wash Pack Name is required';
    } else if (washPackName.trim().length < 4) {
      newErrors.washPackName = 'Wash Pack Name must have at least 4 characters';
    }

    // Description validation
    if (!washPackDescription.trim()) {
      newErrors.washPackDescription = 'Description is required';
    } else if (washPackDescription.replace(/\s/g, '').length < 10) {
      newErrors.washPackDescription = 'Description must contain at least 10 letters including spaces';
    }

    // Cost of Wash Pack validation
    if (!washPackCost || !washPackCost.trim()) {
      newErrors.washPackCost = 'Cost of Wash Pack is required';
    } else if (isNaN(washPackCost) || +washPackCost <= 0) {
      newErrors.washPackCost = 'Cost of Wash Pack must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveOrUpdateUser = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const washpack = { washPackName, washPackDescription, washPackCost };

    if (id) {
      WashPackService.updateWashPack(id, washpack)
        .then((Response) => {
          console.log(Response.data);
          showSuccessAlert("Wash Pack updated successfully!");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      WashPackService.addWashPack(washpack)
        .then((Response) => {
          console.log(Response.data);
          showSuccessAlert("Wash Pack added successfully!");
        })
        .catch((error) => {
          console.log(error.response.status);
          console.log(error.response.data);
        });
    }
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    }).then(() => {
      history('/admin/ListWashPack'); // Redirect after confirmation
    });
  };
  useEffect(() => {
    WashPackService.getWashPackId(id).then((Response)=>{
      setWashPackName(Response.data.washPackName);
      setWashPackDescription(Response.data.washPackDescription);
      setWashPackCost(Response.data.washPackCost.toString()); // Convert to string
      console.log(Response.data)
    }).catch(error=>{
      console.log(error)
    })
  }, [])
  

  const title = () => {
    if (id) {
      return <Typography variant="h4" color="primary" gutterBottom>Update WashPack</Typography>;
    } else {
      return <Typography variant="h4" color="primary" gutterBottom>Add WashPack</Typography>;
    }
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  };

  return (
    <div className='bg'>
    <PageContainer maxWidth="sm">
      {title()}
      <FormContainer>
        <TextField
          label="Wash Pack"
          variant="outlined"
          fullWidth
          margin="normal"
          value={washPackName}
          onChange={(e) => setWashPackName(e.target.value)}
          error={!!errors.washPackName}
          helperText={errors.washPackName}
          onFocus={() => clearError('washPackName')} // Clear error when focused
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={washPackDescription}
          onChange={(e) => setWashPackDescription(e.target.value)}
          error={!!errors.washPackDescription}
          helperText={errors.washPackDescription}
          onFocus={() => clearError('washPackDescription')} // Clear error when focused
        />
        <TextField
          label="Cost of washPack"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={washPackCost}
          onChange={(e) => setWashPackCost(e.target.value)}
          error={!!errors.washPackCost}
          helperText={errors.washPackCost}
          onFocus={() => clearError('washPackCost')} // Clear error when focused
        />
        <SubmitButtonContainer>
          <SubmitButton
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={(e) => saveOrUpdateUser(e)}
          >
            Submit
          </SubmitButton>
          <Button
            variant="contained"
            color="error"
            startIcon={<ArrowBackIcon />}
            onClick={() => history('/admin/ListWashPack')}
          >
            Back
          </Button>
        </SubmitButtonContainer>
      </FormContainer>
    </PageContainer>
    </div>
  );
};

export default AddWashPackComponent;
