import React, { useState } from "react";
import AirbnbNavbar from "./AirbnbNavbar";
import AirbnbMap from "./AirbnbMap";
import Footer from "../Footer/Footer";

function AirbnbYourHome() {
  const [inputValue, setInputValue] = useState(0);
  const calculatePrice = () => {
    const pricePerNight = 3580;
    const numberOfNights = inputValue;
    const totalValue = pricePerNight * numberOfNights;
    return { numberOfNights, totalValue };
  };

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setInputValue(newValue);
  };
  const { numberOfNights, totalValue } = calculatePrice();
  return (
    <div>
      <AirbnbNavbar />
      <div className="Airbnb-subdiv">
        <div>
          <h1 className="airbnb-h1">Airbnb it.</h1>
          <h1 className="airbnb-h2">You could earn</h1>
          <p className="expense">₹{totalValue}</p>
          <p className="night"><span className="specific-nyt"><u>{numberOfNights} nights</u></span> at an estimated ₹3,580 a night</p>
          <input
            id="priceInput"
            class="slider"
            value={inputValue}
            max={30}
            min={0}
            type="range"
            step={1}
            onChange={handleChange}
          />
        </div>
        <AirbnbMap />
      </div>
      <h1 className="airbnb-h3">Airbnb it easily with Airbnb Setup</h1>
      <img
        style={{ paddingTop: "2rem" }}
        src="https://a0.muscache.com/im/pictures/65214d06-ffb4-4b70-93c0-01d368e76649.jpg?im_w=2560&im_q=highq"
        alt="image"
      />
      <div className="airbnb-desc">
        <div>
          <h5 className="desc-h5">One-to-one guidance from a Superhost</h5>
          <p className="desc-p">We’ll match you with a Superhost in your area, who’ll guide you from your first question to your first guest – by phone, video call or chat.</p>
        </div>
        <div>
          <h5 className="desc-h5">An experienced guest for your first booking</h5>
          <p className="desc-p">For your first booking, you can choose to welcome an experienced guest who has at least three stays and a good track record on Airbnb.</p>
        </div>
        <div>
          <h5 className="desc-h5">Specialised support from Airbnb</h5>
          <p className="desc-p">New Hosts get one-tap access to specially trained Community Support agents who can help with everything from account issues to billing support.</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AirbnbYourHome;
