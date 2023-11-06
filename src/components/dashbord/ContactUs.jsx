import React from 'react';

const ContactUs = () => {
  const contactUsStyles = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  };

  const headingStyles = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const paragraphStyles = {
    fontSize: '18px',
    lineHeight: '1.5',
    marginBottom: '20px',
    color: '#555',
  };

  const contactInfoStyles = {
    color: '#555',
  };

  return (
    <div style={contactUsStyles}>
      <h1 style={headingStyles}>Contact Us</h1>
      <p style={paragraphStyles}>
        If you have any questions or need assistance, feel free to reach out to us.
      </p>
      <div style={contactInfoStyles}>
        <p>
          <strong>Email:</strong> info@carwash.com
        </p>
        <p>
          <strong>Phone:</strong> +1-123-456-7890
        </p>
        <p>
          <strong>Address:</strong> 123 Car Wash Street, City, State, Zip
        </p>
      </div>
    </div>
  );
}

export default ContactUs;
