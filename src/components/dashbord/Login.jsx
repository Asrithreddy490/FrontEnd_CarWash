import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UserService from '../../services/UserService';
import WasherService from '../../services/WasherService';
import Button from '@mui/material/Button';
import './Login.css';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [washers, setWashers] = useState([]);
  const navigate = useNavigate();

  const customEmailValidation = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(value);
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    UserService.getAllUsers().then((Response) => {
      setUsers(Response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    WasherService.getAllWashers().then((Response) => {
      setWashers(Response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const onSubmit = (data) => {
    const credentials = { username, password };
    const foundUser = users.find((user) => user.emailId === credentials.username && user.password === credentials.password);
    const foundWasher = washers.find((washer) => washer.washerEmail === credentials.username && washer.washerPassword === credentials.password);

    if (foundUser) {
      Swal.fire({
        title: 'User Login',
        text: 'You are logged in as a user.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate(`/userHome/${foundUser.id}`);
    } else if (foundWasher) {
      Swal.fire({
        title: 'Washer Login',
        text: 'You are logged in as a washer.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate(`/washerHome/${foundWasher.id}`);
    } else {
      // Invalid credentials alert
      Swal.fire({
        title: 'Invalid Credentials',
        text: 'Please check your username and password.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className='bgimage'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <div
          className='form-container'
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '5px',
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h3 align='center' className='title'>
            Login
          </h3>

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
          <p className="warning">{errors.username?.message}</p>

          <div className="form-group">
            <label className='label'>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              {...register("password", { required: 'Password is required' })}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(onSubmit)();
                }
              }}
              required
            />
          </div>
          <p className="warning">{errors.password?.message}</p>

          <div className="button-container">
            <Button variant="contained" color="success" onClick={handleSubmit(onSubmit)}>
              Login
            </Button>
            <Button component={Link} to="/" variant="contained" color="error">
              Cancel
            </Button>
          </div>

          <p className="forgot-password text-right">
            Not Registered? <Link to="/adduser">Register here</Link> | <Link to="/admin/login">Admin Login</Link>
          </p>
        </div>

        <div style={{ flex: 1 }}></div>
      </div>
    </div>
  );
};

export default Login;
