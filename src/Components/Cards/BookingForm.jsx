import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "../Cards/Cards.css";
import Axios from "../../lib/Axios";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { myContext } from "../Context";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ night, listID}) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  );
  const [days, setDays] = useState(1);
  const [cookies] = useCookies(["access_token"]);
  const {currentUser}= useSelector((state)=>state.user);
  const {handleLoginOpen}=useContext(myContext)
  const navigate = useNavigate()


  // const handleCheckInDateChange = (date) => {
  //   setCheckInDate(date);
  //   if (checkOutDate && date > checkOutDate) {
  //     setCheckOutDate(null);
  //   }
  // };

  // const handleCheckOutDateChange = (date) => {
  //   if (checkInDate && date < checkInDate) {
  //     return;
  //   }
  //   setCheckOutDate(date);
  // };
  const Reserve = () => {
    if(currentUser){
      const res = {
        listingId: listID,
        totalPrice: (night *days)+450,
        startDate: checkInDate,
        endDate: checkOutDate,
        email:currentUser.email,
      };
      Axios.post("/api/users/reservations", res, {
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      })
        .then((res) => {
          console.log(res);
          toast("reservation success")
          navigate(`/payment`)
        })
        .catch((err) => console.log(err));
    }else{
      handleLoginOpen()
    }
  };

  useEffect(() => {
    const calculateTotalDays = (checkInDate, checkOutDate) => {
      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
      const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

      setDays(Math.round(dayDifference));
    };
    calculateTotalDays(checkInDate, checkOutDate);
  }, [checkInDate, checkOutDate]);

  return (
    <div className="booking-form">
      <div className="form-group">
        <label>Check-in:</label>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          dateFormat="dd/MM/yyyy"
          className="date-picker"
        />
      </div>
      <div className="form-group">
        <label>Check-out:</label>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          dateFormat="dd/MM/yyyy"
          className="date-picker"
        />
      </div>
      <div className="flex justify-center">
        <button className="check-btn" onClick={Reserve}>
          Reserve
        </button>
      </div>

      <div className="flex justify-between">
        <p>₹{`${night} X ${days} nights`}</p>
        <p>₹{night * days}</p>
      </div>
      <div className="flex justify-between">
        <p>Tax:</p>
        <p>₹450</p>
      </div>
      <div className="flex justify-between">
        <p className="font-bold">Total Amount:</p>
        <p className="font-bold">₹{(night * days )+ 450}</p>
      </div>
    </div>
  );
};

export default BookingForm;
