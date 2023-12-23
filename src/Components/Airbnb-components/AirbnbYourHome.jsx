import React from "react";
import AirbnbNavbar from "./AirbnbNavbar";
import AirbnbMap from "./AirbnbMap";

function AirbnbYourHome() {
  return (
    <div>
      <AirbnbNavbar />
      <div className="Airbnb-subdiv">
        <div>
            <h1 className="airbnb-h1">Airbnb it.</h1>
            <h1 className="airbnb-h2">You could earn</h1>
        </div>
            <AirbnbMap/>
      </div>
      <h1 className="airbnb-h3">Airbnb it easily with Airbnb Setup</h1>
      <img style={{paddingTop:"2rem"}} src="https://a0.muscache.com/im/pictures/65214d06-ffb4-4b70-93c0-01d368e76649.jpg?im_w=2560&im_q=highq" alt="image" />
    </div>
  );
}

export default AirbnbYourHome;
