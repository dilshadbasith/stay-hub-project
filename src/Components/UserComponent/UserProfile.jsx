import React from 'react'
import '../UserComponent/Profile.css'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'


function UserProfile() {
    const {currentUser}= useSelector((state)=>state.user);

  return (
    <div>
        <div className='profile-main-div'>
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
        </div>
    </div>
  )
}

export default UserProfile