import React from "react";
import Logo from "../Assets/StayHub.png";
import "../Header/Header.css";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { FaSearch } from "react-icons/fa";
import ProfileContainer from '../Header/ProfileContainer'

function Navigationbar() {
  return (
    <div className="navbar">
      <img src={Logo} alt="logo" className="logo" />
      <div className="search-bar">
        <div className="searchbar-text">AnyWhere</div>
        <div className="searchbar-text">Any week</div>
        <div className="searchbar-text2">Add Guests</div>
        <div className="search-icon-div">
          <FaSearch className="search-icon" />
        </div>
      </div>
      <div className="profile-container">
        <div className="airbnb-your-home">Airbnb your home</div>
        <div className="earth-icon-div">
          <LanguageRoundedIcon />
        </div>
        <div><ProfileContainer/></div>
      </div>
    </div>
  );
}

export default Navigationbar;
