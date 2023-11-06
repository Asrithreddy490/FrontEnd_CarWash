import React from 'react';
//import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/videocar.mp4' autoPlay loop muted />
      <h1>NEW LOOK NEW FEELS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Link to='/login'><Button
          className='btns1'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          
        >
          Book a Wash
        </Button></Link>
        
      </div>
    </div>
  );
}

export default HeroSection;
