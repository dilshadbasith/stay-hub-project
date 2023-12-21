import React from 'react'
import '../Cards/Cards.css'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Pagination,Navigation} from "swiper/modules"
import { useNavigate } from 'react-router-dom';

function Card({card}) {
  const navigate = useNavigate()
  return (
    <div className='property-card'>
        <Swiper
        slidesPerView={1}
        spaceBetween={20}       
        loop={true}
        mousewheel={true}
        cssMode={true}
        pagination={{
            dynamicBullets:true
        }}
        navigation={true}
        modules={[Pagination,Navigation]}
        className="swiper-container"
      >
        {card?.imgSrc?.map((src, i) => (
          <SwiperSlide key={i}>
            <img src={src} className="card-img" onClick={()=>navigate(`/browsecard/${card.id}`)}/>
          </SwiperSlide>
        ))}
      </Swiper>
        
        <div className='card-info'>
            <h3 className='card-title'>{card.title}</h3>
            <div className='card-rating'>
                <StarRateRoundedIcon/>
                <p>{card.rating}</p>
            </div>
        </div>
        <p style={{margin:0, color:"gray"}}>{card.place}</p>
        <p style={{margin:0, color:"gray"}}>{card.date}</p>
        <p style={{margin:0, color:"black", fontSize:".8rem"}}> <span style={{fontWeight:"600"}}>₹{card.price}</span> night </p>
    </div>
  )
}

export default Card