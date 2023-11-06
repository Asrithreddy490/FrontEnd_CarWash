import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-item' style={{ marginRight: '700px' }}>
          Reddy Carwash
        </Link>
        <div className='navbar-menu'>
          <Link to='/about' className='navbar-item'>
            About
          </Link>
          <Link to='/contact-us' className='navbar-item'>
            Contact
          </Link>
          {isHomePage && (
            <Link to='/login' className='navbar-item' id='login-button'>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
