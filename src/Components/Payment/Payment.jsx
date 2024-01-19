import React, { useContext, useEffect, useState } from "react";
import Navigationbar from "../Header/Navigationbar";
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
import '../Payment/Payment.css'
// import DefaultLayout from "../components/DefaultLayout";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import "../pages/paymentSection.css";
// import Footer from "./Footer";
// import Socialmedia from "./Socialmedia";

const Payment = () => {
//   const [car, setCar] = useState({});
//   const id = currentCarDetails;
  const { currentUser } = useSelector((state) => state.user);
const [reservation, setReservation] = useState();

const [cookies] = useCookies(["access_token"]);


useEffect(() => {
    Axios.get(`/api/data/reservations/${currentUser._id}`, {
      headers: { Authorization: `Bearer ${cookies.access_token}` },
    })
      .then((res) => {
        // console.log(res.data.data);
        setReservation(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(reservation && reservation.length > 0 ? reservation[reservation.length - 1] : null);

  const Razorpay = async(e)=>{
    e.preventDefault();  
    
    var options = {
      key: "rzp_test_LarllNYjBbsQE5",
      key_secret:"uRYhTQETdBPllUGu5FcKBLyF",
      amount:(reservation && reservation.length > 0 ? reservation[reservation.length - 1]?.totalPrice : null)*100,
      currency:"INR",
      name:"Stay Hub",
      description:"Just For The Text Purpose",
      handler: function async(response){
        console.log(response,"response");
        const { razorpay_payment_id : payment_id } = response;
        // console.log(payment_id,"payment ID");
        // if(response){
        //   const updateStatus = axios.post("http://localhost:5000/api/admin/payments", {payment_id,car, currentUser ,currentBooking,currentCarDetails,updatedPrice}, {
        //     headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        // });
        //   navigate('/')
        // }
      },
      prefill:{
        name:"Arshaquu",
        email:"Muhammedarshaque@gmail.com",
        contact : "9561478543"
      },
      notes:{
        address:"Razorpay Coperative Office"
      },
      theme:{
        color:'#FCE22A'
      }
    }
    var pay = new window.Razorpay(options);
    pay.open()
  
}

  

//   const getCarDetails = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/auth/details`,
//         { id }
//       );
//       setCar(response.data.cars);
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   useEffect(() => {
//     getCarDetails();
//   }, [currentBooking]);

  
//   const amountPrice = updatedPrice || 0;
//   const gstPrice = 500; 
//   const totalAmount = amountPrice + gstPrice;

  return (
    <div>
      <header className="sticky-top">
        <Navigationbar />
      </header>
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
            marginTop:'2rem'
          }}
        >
         
          <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>{reservation && reservation.length > 0 ? reservation[reservation.length - 1]?.listingId?.title : null}</h4>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Checkin:{reservation && reservation.length > 0 ? reservation[reservation.length - 1]?.startDate : null}</h4>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Checkout:{reservation && reservation.length > 0 ? reservation[reservation.length - 1]?.endDate : null}</h4>


        
          <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Amount Price: {(reservation && reservation.length > 0 ? reservation[reservation.length - 1]?.totalPrice : null)-450}</h4>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Insurance Amount: ₹0.00</h4>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Delivery Charges: ₹0.00</h4>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>TAX:₹450</h4>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Diff Location Charge: ₹0.00</h4>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '10px' }}>Total Amount:{reservation && reservation.length > 0 ? reservation[reservation.length - 1]?.totalPrice : null} </h3>
          </div>
          {/* <button type="button" class="button"> */}
  <button type="button" onClick={Razorpay} class="button-top">PAY NOW</button>
  {/* <div class="button-bottom"></div> */}
  {/* <div class="button-base"></div> */}
{/* </button> */}
        </div>

        <div style={{ paddingTop: "3rem" }}>
        <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={reservation && reservation.length > 0 ? reservation[reservation.length - 1]?.listingId?.properties[0] : null}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {reservation && reservation.length > 0 ? reservation[reservation.length - 1]?.listingId?.title : null}
        </Typography>
      </CardBody>
    </Card>
        </div>
      </div>
      {/* <div style={{marginTop:"1rem"}}>
        <Footer/>
      </div>
      <div>
        <Socialmedia/>
      </div> */}
    </div>
    
    
  );
};

export default Payment;