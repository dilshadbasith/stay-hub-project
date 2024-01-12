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
        {/* <div className='profile-main-div'>
            <div className='profile-sub-div'>
                <div className='profile-head-div'>
                    <Avatar sx={{ width: 80, height: 80 }} className='avatar-profile'/>
                </div>
                <div className='info-div'>
                    <h4 className='info-h4'>Name:{currentUser?.name}</h4>
                    <h4 className='info-h4'>Email:{currentUser?.email}</h4>
                    <h4 className='info-h4'>Mobile:{currentUser?.mobilenumber}</h4>
                </div>
            </div>
            <div className='profile-sec-div'>

            </div>
        </div> */}
        
        <div className='sub-card' onClick={()=>navigate('/personal-info')}>
           <h1 className='sub-card-h1'>Personal info</h1>
           <p style={{color:"gray"}}>Provide Personal details and how we can reach you</p> 
        </div>
        <div className='sub-card' >
           <h1 className='sub-card-h1'>Hosted</h1> 
           <p style={{color:"gray"}}>See what you are hosted!</p> 

        </div>
        <div className='sub-card' >
           <h1 className='sub-card-h1'>Reservations</h1> 
           <p style={{color:"gray"}}>See your Reservations</p> 

        </div>
        <div className='sub-card' >
           <h1 className='sub-card-h1'>Professional hosting tools</h1> 
           <p style={{color:"gray"}}>Get professionaltools if you manage several properties on stayHub</p> 

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