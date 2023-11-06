import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <header>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'red' }}>On Demand Car Wash</p><Link to={"/"} className='btn btn-primary'>back</Link>
          </div>

        </nav>
      </header>
    </div>
  )
}

export default Header
