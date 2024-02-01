import React, { useEffect, useState } from "react";
import Axios from "../../lib/Axios";
import Navigationbar from "../Header/Navigationbar";
import "../Bookings/Bookings.css";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import moment from "moment";


function Booking() {
  const [reservation, setReservation] = useState();
  const [cookies] = useCookies(["access_token"]);
  const { currentUser } = useSelector((state) => state.user);

  async function BookingDiv() {
    const list = await Axios.get(`/api/data/reservations/${currentUser._id}`, {
      headers: { Authorization: `Bearer ${cookies.access_token}` },
    });
    setReservation(list.data.data);
  }

  useEffect(() => {
    BookingDiv();
  }, []);

  // useEffect(() => {
  //   Axios.get(`/api/data/reservations/${currentUser._id}`, {
  //     headers: { Authorization: `Bearer ${cookies.access_token}` },
  //   })
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setReservation(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // console.log(reservation);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to Cancel?")) {
      await Axios.delete(`/api/users/reservations/${id}`, {
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      });
    }
    BookingDiv();
  };
  return (
    <div>
      <div>
        <Navigationbar />
      </div>
      {reservation?.length === 0 ? (
        <h1 className="no-list">No Bookings!</h1>
      ) : (
        reservation?.slice()?.reverse()?.map((item, i) => (
          <div className="parent-div-card">
            <div key={i} className="main-card">
              <div style={{ fontWeight: "bold" }}>{item?.listingId?.title}</div>
              <div>
                <p>Checkin date:</p>
                {moment(item?.startDate).format("DD/MM/YY")}
              </div>
              <div>
                <p>Checkout date:</p>
                {moment(item?.endDate).format("DD/MM/YY")}
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
            <button className="cancel" onClick={() => handleDelete(item._id)}>
              Cancel Reservation
              <span></span>
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Booking;
