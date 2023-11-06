import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AdminLogin.css'; // Import the CSS file

function AdminLogin() {
  const navigate = useNavigate();

  const initialValues = { username: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:9094/api/auth/signin', {
        username: formValues.username,
        password: formValues.password,
      });

      console.log(data);
      localStorage.setItem('jwt', JSON.stringify(data));
      localStorage.setItem('username', formValues.username);

      if (data) {
        const roles = data.roles;

        if (roles.includes('ROLE_ADMIN')) {
          localStorage.setItem('roles', 'ROLE_ADMIN');
          Swal.fire('Admin logged in successfully');
          navigate('/adminHome');
        } else {
          alert('Invalid Credentials');
        }
      }
    } catch (error) {
      console.log('error is ', error);
      alert('Invalid Credentials. Please check your username and password.');
    }
  };

  return (
    <div className="form-container-s">
      <form className="form" onSubmit={handleSubmit}>
        <h3 align="center" className="title">
          Admin Login
        </h3>
        <br />
        <div className="form-group">
          <label className="label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            name="username"
            autoComplete="off"
            value={formValues.username}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label className="label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="buttons-container">
          <button className="btn btn-dark btn btn-success login-button">
            Login
          </button>
          <Link to="/login" className="btn btn-danger">
            Cancel
          </Link>
        </div>
        
      </form>
    </div>
  );
}

export default AdminLogin;
