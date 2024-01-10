import React, { useState } from "react";
import Logo from "../Assets/StayHub.png";
import "../Header/Header.css";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { FaSearch } from "react-icons/fa";
import ProfileContainer from "../Header/ProfileContainer";
import { IoIosGlobe } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MobileSearchbar from "../MobileSearchbar/MobileSearchbar";
import SimpleBottomNavigation from "./BottomNav";

function Navigationbar() {
  const navigate = useNavigate();
  const [isInputMode, setIsInputMode] = useState(false);

  const handleSearchBarClick = () => {
    setIsInputMode(true);
  };
  return (
    <div className="navbar">
      <img src={Logo} alt="logo" className="logo"  onClick={()=>navigate('/')}/>
      <div
        className={`search-bar ${isInputMode ? "input-mode" : ""}`}
        onClick={handleSearchBarClick}
      >
        {isInputMode ? (
          <div className="isinputmode">
            <input
              type="text"
              className="styled-input"
              placeholder="Search..."
            />
            <div className="search-icon-div">
              <FaSearch className="search-icon" />
            </div>
          </div>
        ) : (
          <>
            <div className="searchbar-text">AnyWhere</div>
            <div className="searchbar-text">Any week</div>
            <div className="searchbar-text2">Add Guests</div>
            <div className="search-icon-div">
              <FaSearch className="search-icon" />
            </div>
          </>
        )}
      </div>
      <div className="profile-container">
        <div
          className="airbnb-your-home"
          onClick={() => navigate("/airbnbhome")}
        >
          Host your home
        </div>
        <div className="earth-icon-div">
          <IoIosGlobe className="globe" />
        </div>
        <div>
          <ProfileContainer />
        </div>
      </div>
      {/* <MobileSearchbar/> */}
      <SimpleBottomNavigation />
    </div>
  );
}

export default Navigationbar;
