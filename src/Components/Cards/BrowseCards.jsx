import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../Context";
import { useParams } from "react-router-dom";
import Navigationbar from "../Header/Navigationbar";
import "../Cards/Cards.css";
import BookingForm from "./BookingForm";
import Footer from "../Footer/Footer";
import WorldMap from "../Map/WorldMap";
import LoginModal from "../Modals/LoginModal";
import DialogWithForm from "../Modals/RegisterModal";
import { useSelector } from "react-redux";
import Axios from "../../lib/Axios";

function BrowseCards() {
  const { open, loginOpen } = useContext(myContext);
  const { id } = useParams();
  const [showcard, setShowcard] = useState(null);

  // const cards = useSelector((state) => state.listingCard);

  async function ViewCards(){
    try {
      const list = await Axios.get(`/api/data/listings/${id}`);
      // console.log(list.data, "lk");
      setShowcard(list.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(()=>{
    ViewCards()
  },[])

  return (
    <div>
      <Navigationbar />
      {loginOpen && <LoginModal />}
      {open && <DialogWithForm />}
      
        <div >
          <div className="browse-div">
            <h2 className="browse-title"><u>{showcard?.title}</u></h2>
            <div className="img-main-div">
              <div>
                <img src={showcard?.properties[0]} alt="image" className="img1" />
              </div>
              <div className="img-sub-div">
                <img src={showcard?.properties[1]} alt="image" className="img2" />
                <img src={showcard?.properties[2]} alt="image" className="img2" />
              </div>
              <div className="img-sub-div">
                <img src={showcard?.properties[3]} alt="image" className="img2" />
                <img src={showcard?.properties[4]} alt="image" className="img2" />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{display:"flex", flexDirection:"column", width:"55rem"}}>
              <h1 style={{ paddingLeft: "2rem" }} className="spec">
                Bedrooms: {showcard?.roomCount} ◉ Bathrooms: {showcard?.bathroomCount} ◉ Guest Capacity: {showcard?.guestCount}
              </h1>
              <p style={{ paddingLeft: "2rem" }}>About:{showcard?.description}</p>
            </div>

            <BookingForm />
          </div>
          <WorldMap />
        </div>

      <Footer />
    </div>
  );
}

export default BrowseCards;
