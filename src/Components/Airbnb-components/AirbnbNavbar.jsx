import React, { useContext } from "react";
import logo from "../Assets/StayHub.png";
import "../Airbnb-components/Airbnb.css";
import { MdOutlineAddHome } from "react-icons/md";
import { myContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AirbnbNavbar() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const {handleLoginOpen}=useContext(myContext)
  return (
    <>
      <div className="navbar-div">
        <div>
          <img src={logo} alt="logo" className="airbnb-logo" />
        </div>
        <div className="navbar-subdiv">
          <div>
            <h4>Ready to Airbnb it?</h4>
          </div>
          <div>
            {currentUser ? (
              <button
                className="setup-btn"
                onClick={() => navigate("/rentpage")}
              >
                <MdOutlineAddHome className="home-icon" />
                Hosting Setup
              </button>
            ) : (
              <button
                className="setup-btn"
                onClick={() => handleLoginOpen()}
              >
                <MdOutlineAddHome className="home-icon" />
                Hosting Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AirbnbNavbar;
