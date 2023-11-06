import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useRazorpay from 'react-razorpay';
import './Payment.css'

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Razorpay, initializeRazorpay] = useRazorpay();
  const [paymentMode, setPaymentMode] = useState('');


  const location = useLocation();
  const totalPrice = location.state ? location.state.totalPrice : 1000;

  const createOrder = async () => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:9988/getAmount/${totalPrice * 100}`, { // Multiply by 100 to convert to paise
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const orderData = await response.json();
        setLoading(false);
        return orderData.orderId;
      } else {
        throw new Error('Failed to create the order');
      }
    } catch (error) {
      setLoading(false);
      setError('Error creating order. Please try again.');
      console.error('Error creating order:', error);
      throw error;
    }
  };


const handlePayment = async () => {
    const order = await createOrder();
  
    if (!order) return;
  
    const options = {
      key: 'rzp_test_58JW9XrCVTGkpq',
      amount: totalPrice * 100,
      currency: 'INR',
      name: userName,
      description: 'Test Transaction',
      order_id: order,
      handler: function (response) {
        const paymentDetails = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_amount: totalPrice,
         
        };
        const paymentInfo = `Payment ID: ${paymentDetails.razorpay_payment_id}\nOrder ID: ${paymentDetails.razorpay_order_id}\nAmount: ${paymentDetails.razorpay_amount}`;
        alert(paymentInfo);
  
        // Retrieve existing payments from local storage
        const storedPayments = JSON.parse(localStorage.getItem('payments')) || [];
  
        // Add the new payment to the array of payments
        const updatedPayments = [...storedPayments, paymentDetails];
  
        // Store updated payments in local storage
        localStorage.setItem('payments', JSON.stringify(updatedPayments));
  
        // Redirect to the 'AllPayments.js' page
        window.location.href = '/login'; // Change the URL as needed
      },
      prefill: {
        name: userName,
        email: email,
        contact: contact,
      },
      notes: {
        address: 'ABC, Delhi',
      },
      theme: {
        color: '#3399cc',
      },
    };
  
    try {
      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
    }
  };
  
  return (
    <div className='payment-heading'>
        <center>
      <h1>Razorpay Payment Integration</h1>
      <div className='amount-pay'>
        <strong style={{color:'white'}}>Amount to Pay: {totalPrice} INR</strong>
      </div>
      <br />
     
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Creating order...</div>
      ) : (
        <button onClick={handlePayment}>Pay Now</button>
      )}
      </center>
    </div>
  );
};

export default Payment;

