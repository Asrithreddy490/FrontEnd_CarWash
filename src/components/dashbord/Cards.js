import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import car1 from '../images/forcard1.jpg'
import car2 from '../images/forcard2.jpg'
import car3 from '../images/forcard3.jpg'
import car4 from '../images/forcard4.jpg'

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out CarWash Services</h1>
      <h2>LOVE YOUR CAR, WE MAKE IT MORE ADORABLE.</h2>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={car1}
              text='Speed Car Wash is offering a wide range of washing services to the car owners including the top wash to entire internal detailing or whether a paint protection treatment...'
              label='SCW WASHING'
              path='/login'
            />
            <CardItem
              src={car2}
              text='As a Speed Service Point (SSP), we pledge to provide high quality automotive maintenance services at a fair price using only the best available parts and labor for the job...'
              label='SCW QUICKSERVICE'
              path='/login'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={car3}
              text='Speed Car Wash primary motive to serve our customers with professional car detailing service with internationally approved standards to deliver impeccable quality...'
              label='SCW DETAILING'
              path='/login'
            />
            <CardItem
              src={car4}
              text='Our network of trained SCW Vehicle Wrappers can help you create impactful vehicle branding to simply cater for your colour change and car personalisation needs...'
              label='SCW Wrapping'
              path='/login'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
