import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Axios from "../../lib/Axios";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import "../Payment/Payment.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

const Payment = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [reservation, setReservation] = useState();
  const { currentBooking } = useSelector((state) => state.Booking);
  const [cookies] = useCookies(["access_token"]);
  const hotelName = currentBooking?.listingId?.title;
  const totalPrice = currentBooking?.totalPrice;

  const Reserve = async () => {
    const res = {
      listingId: currentBooking?.listingId?._id,
      totalPrice: currentBooking?.totalPrice,
      startDate: currentBooking?.startDate,
      endDate: currentBooking?.endDate,
      email: currentUser.email,
    };
    await Axios.post("/api/users/reservations", res, {
      headers: { Authorization: `Bearer ${cookies.access_token}` },
    })
      .then((res) => {
        console.log(res);
        toast.success("Reservation Successfull!")
        navigate("/trips");
      })
      .catch((err) => console.log(err));
  };

  const Razorpay = async (e) => {
    e.preventDefault();

    var options = {
      key: "rzp_test_LarllNYjBbsQE5",
      key_secret: "uRYhTQETdBPllUGu5FcKBLyF",
      amount: currentBooking?.totalPrice * 100,
      currency: "INR",
      name: "Stay Hub",
      description: "Just For The Text Purpose",
      handler: function async(response) {
        console.log(response, "response");
        const { razorpay_payment_id: payment_id } = response;
        console.log(payment_id, "payment ID");
        if (response) {
          Reserve();
          const updateStatus = Axios.post(
            "/api/users/payments",
            {
              payment_id,
              hotelName,
              currentUser,
              currentBooking,
              totalPrice,
            },
            {
              headers: { Authorization: `Bearer ${cookies.access_token}` },
            }
          );
        }
      },
      prefill: {
        name: "Arshaquu",
        email: "Muhammedarshaque@gmail.com",
        contact: "9561478543",
      },
      notes: {
        address: "Razorpay Coperative Office",
      },
      theme: {
        color: "#FCE22A",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: "2px solid black",
            padding: "2rem",
            borderRadius: "2rem",
            marginTop: "2rem",
          }}
        >
          <h4
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {currentBooking?.listingId?.title}
          </h4>
          <h4
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Checkin:{moment(currentBooking?.startDate).format("DD/MM/YY")}
          </h4>
          <h4
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Checkout: {moment(currentBooking?.endDate).format("DD/MM/YY")}
          </h4>

          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #ccc",
              paddingTop: "10px",
            }}
          >
            <h4 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Amount Price: {currentBooking?.totalPrice - 450}
            </h4>
            <h4 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Insurance Amount: ₹0.00
            </h4>
            <h4 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>TAX:₹450</h4>

            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Total Amount:{currentBooking?.totalPrice}{" "}
            </h3>
          </div>

          <button type="button" onClick={Razorpay} className="button-top">
            PAY NOW
          </button>
        </div>

        <div style={{ paddingTop: "3rem" }}>
          <Card className="mt-6 w-96">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={currentBooking?.listingId?.properties[0]}
                alt="card-image"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {currentBooking?.listingId?.title}
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
