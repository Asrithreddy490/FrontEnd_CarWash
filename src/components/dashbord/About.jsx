import React from 'react';

const About = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
  };

  const headingStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    fontFamily: 'Roboto, sans-serif', // Apply the imported font
    color: '#333',
  };

  const paragraphStyle = {
    fontSize: '18px',
    lineHeight: '1.5',
    marginBottom: '20px',
    fontFamily: 'Roboto, sans-serif', // Apply the imported font
    color: '#555',
  };

  return (
    <div className="about-container" style={containerStyle}>
      <h2 style={headingStyle}>About CarWash</h2>
      <p style={paragraphStyle}>
        CarWash is your trusted partner for keeping your vehicle in pristine condition. We take pride in providing top-notch car washing and detailing services to our customers.
      </p>
      <p style={paragraphStyle}>
        Our experienced team of professionals is committed to making your car look its best. We use the latest equipment and eco-friendly cleaning products to ensure a thorough and environmentally responsible cleaning process.
      </p>
      <p style={paragraphStyle}>
        At CarWash, we offer a range of services, from basic car washes to comprehensive detailing packages. We understand that your car is more than just a mode of transportation; it's a reflection of your style and personality. That's why we pay attention to every detail to ensure your car leaves our facility looking as good as new.
      </p>
      <p style={paragraphStyle}>
        Whether you drive a compact car, an SUV, or a luxury vehicle, we have the expertise and resources to cater to your specific needs. We are dedicated to customer satisfaction and work tirelessly to provide a convenient, reliable, and affordable car washing experience.
      </p>
      <p style={paragraphStyle}>
        Thank you for choosing CarWash for all your car care needs. We look forward to serving you and keeping your vehicle clean and beautiful.
      </p>
      
    </div>
  );
}

export default About;
