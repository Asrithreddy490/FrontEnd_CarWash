import React from 'react';
//import '../App.css';
//import { Button } from './Button';
import './Home.css';
import ListWashPackForUser from '../washpackComponent/ListWashPackForUser'
import HomeNavbar from './HomeNavBar';
import HeroSection from './HeroSection';
import Cards from './Cards';

function Home() {
  return (
    <div>
      
      <HeroSection/>
      <Cards/>
    </div>
  );
}

export default Home;
