import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import "../Cards/Cards.css";
 

const BookingForm = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    if (checkOutDate && date > checkOutDate) {
      setCheckOutDate(null);
    }
  };

  const handleCheckOutDateChange = (date) => {
    if (checkInDate && date < checkInDate) {
      return;
    }
    setCheckOutDate(date);
  };

  const handleCheckAvailability = () => {
    console.log('Check Availability');
    console.log('Check-in Date:', moment(checkInDate).format('YYYY-MM-DD'));
    console.log('Check-out Date:', moment(checkOutDate).format('YYYY-MM-DD'));
  };

  return (
    <div className="booking-form">
      <div className="form-group">
        <label>Check-in:</label>
        <DatePicker
          selected={checkInDate}
          onChange={handleCheckInDateChange}
          dateFormat="dd/MM/yyyy"
          className="date-picker"
        />
      </div>
      <div className="form-group">
        <label>Check-out:</label>
        <DatePicker
          selected={checkOutDate}
          onChange={handleCheckOutDateChange}
          dateFormat="dd/MM/yyyy"
          className="date-picker"
        />
      </div>
      <button className='check-btn' onClick={handleCheckAvailability}>Check Availability</button>
    </div>
  );
};

export default BookingForm;
