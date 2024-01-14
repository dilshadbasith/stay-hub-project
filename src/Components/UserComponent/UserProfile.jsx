import React from 'react'
import '../UserComponent/Profile.css'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Navigationbar from '../Header/Navigationbar';


function UserProfile() {
    const {currentUser}= useSelector((state)=>state.user);
    const navigate = useNavigate()

  return (
    <div><Navigationbar/>
    <div className='profile-main-div'>     
        <div className='sub-card' onClick={()=>navigate('/personal-info')}>
           <h1 className='sub-card-h1'>Personal info</h1>
           <p style={{color:"gray"}}>Provide Personal details and how we can reach you</p> 
        </div>
        <div className='sub-card' onClick={()=>navigate('/userlisting')}>
           <h1 className='sub-card-h1'>Hosted</h1> 
           <p style={{color:"gray"}}>See what you are hosted!</p> 

        </div>
        <div className='sub-card' onClick={()=>navigate('/trips')}>
           <h1 className='sub-card-h1'>Reservations</h1> 
           <p style={{color:"gray"}}>See your Reservations</p> 

        </div>
        <div className='sub-card' onClick={()=>navigate('/favorites')}>
           <h1 className='sub-card-h1'>Favorites</h1> 
           <p style={{color:"gray"}}>See your favorites</p> 

        </div>
        <div className='sub-card' >
           <h1 className='sub-card-h1'>Global Preference</h1>
           <p style={{color:"gray"}}>Set your default language, currency and timezone</p> 

        </div>
        <div className='sub-card' >
           <h1 className='sub-card-h1'>Privacy and sharing</h1> 
           <p style={{color:"gray"}}>Manage your personal data, connected services and data sharing settings</p> 

        </div>
        <div className='sub-card' >
           <h1 className='sub-card-h1'>Travel For work</h1> 
           <p style={{color:"gray"}}>Add a work email for bussiness trip benefits</p> 

        </div>
    </div>
    </div>
  )
}

export default UserProfile