import React, { useEffect, useState } from "react";
import Axios from "../../lib/Axios";
import Navigationbar from "../Header/Navigationbar";
import "../Bookings/Bookings.css";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

function Booking() {
  const [reservation, setReservation] = useState();
  const [cookies] = useCookies(["access_token"]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    Axios.get(`/api/data/reservations/${currentUser._id}`, {
      headers: { Authorization: `Bearer ${cookies.access_token}` },
    })
      .then((res) => {
        console.log(res.data.data);
        setReservation(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(reservation);
  return (
    <div>
      <div>
        <Navigationbar />
      </div>
      {reservation?.map((item, i) => (
        <div key={i} className="main-card">
          <div style={{ fontWeight: "bold" }}>{item?.listingId?.title}</div>
          <div>
            <p>Checkin date:</p>
            {item.startDate}
          </div>
          <div>
            <p>Checkout date:</p>
            {item.endDate}
          </div>
          <div>₹{item.totalPrice}</div>
          <div>
            <img
              className="booked-img"
              src={item?.listingId?.properties[0]}
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Booking;
