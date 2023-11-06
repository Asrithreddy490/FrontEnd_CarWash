import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import WasherService from '../../services/WasherService';



const WasherLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassWord] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
  
    const customEmailValidation = (value) => {
      // Custom email validation logic
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return emailRegex.test(value);
    };
  
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    useEffect(() => {
      WasherService.getAllWashers().then((Response) => {
        setUsers(Response.data);
      }).catch(error => {
        console.log(error);
      });
    }, []);
  
    const onSubmit = (data) => {
      console.log(data);
      const credentials = { username, password };
      console.log(credentials);
  
      const foundUser = users.find((user) => user.emailId === credentials.username && user.password === credentials.password);
  
      if (foundUser) {
        console.log("Login successful");
        navigate(`/userHome/${foundUser.id}`);
      } else {
        console.log("Invalid credentials");
        alert("Invalid credentials. Please check your username and password.");
      }
    };
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#333' }}>
        <form className='form' style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', background: '#ddd' }} onSubmit={handleSubmit(onSubmit)}>
          <h3 align="center" className='title'>Washer Login</h3>
  
          <div className="form-group">
            <label className='label'>Mobile/Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Mobile/Email"
              name="username"
              autoComplete="off"
              {...register("username", { required: 'Email / Phone is required', validate: customEmailValidation })}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <p>{errors.username?.message}</p>
  
          <div className="form-group">
            <label className='label'>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              {...register("password", { required: 'Password is required' })}
              onChange={(e) => setPassWord(e.target.value)}
              required
            />
          </div>
          <p>{errors.password?.message}</p>
  
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="success" onClick={handleSubmit(onSubmit)}>
              Login
            </Button>
            <Button component={Link} to="/" variant="contained" color="error">
              Cancel
            </Button>
          </div>
  
          {/*  */}
        </form>
      </div>
    );
  };

export default WasherLogin
