import React from 'react'
import logo from '../Assets/StayHub.png'
import '../Airbnb-components/Airbnb.css'
import { MdOutlineAddHome } from "react-icons/md";

function AirbnbNavbar() {
  return (
    <>
    <div className='navbar-div'>
        <div>
            <img src={logo} alt="logo" />
        </div>
        <div className='navbar-subdiv'>
            <div><h4>Ready to Airbnb it?</h4></div>
            <div><button  className='setup-btn'><MdOutlineAddHome className='home-icon'/>Airbnb Setup</button></div>
            
        </div>
    </div>
    </>
  )
}

export default AirbnbNavbar