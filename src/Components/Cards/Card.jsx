import React from 'react'
import '../Cards/Cards.css'
import hotel from '../Assets/hotel-1.jpg'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

function Card() {
  return (
    <div>
        <img src={hotel} alt="image" className='card-img'/>
        <div className='card-info'>
            <h3 className='card-title'>place</h3>
            <div className='card-rating'>
                <StarRateRoundedIcon/>
                <p>4.87</p>
            </div>
        </div>
        <p style={{margin:0, color:"gray"}}>Beach and sea views</p>
        <p style={{margin:0, color:"gray"}}>19-26 may</p>
    </div>
  )
}

export default Card