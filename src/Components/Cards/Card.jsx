import React, { useContext, useState } from "react";
import "../Cards/Cards.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { myContext } from "../Context";


function Card({ card }) {
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();


  const { currentUser } = useSelector((state) => state.user);
  const {handleLoginOpen}=useContext(myContext)

  const handleFav = () => {
    setIsClicked(!isClicked);
  };


  return (
    <div className="property-card">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        mousewheel={true}
        cssMode={true}
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="swiper-container"
      >
        {card?.imgSrc?.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              className="card-img"
              onClick={() => navigate(`/browsecard/${card.id}`)}
            />
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                cursor: "pointer",
              }}
            >
              {currentUser ? (
                <FaHeart onClick={handleFav} className={isClicked?"redheart":"heart"} />
              ) : (
                <FaHeart className="heart" onClick={()=>handleLoginOpen()}/>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="card-info">
        <h3 className="card-title">{card.title}</h3>
        <div className="card-rating">
          <FaStar />
          <p>{card.rating}</p>
        </div>
      </div>
      <p style={{ margin: 0, color: "gray" }}>{card.place}</p>
      <p style={{ margin: 0, color: "gray" }}>{card.date}</p>
      <p style={{ margin: 0, color: "black", fontSize: ".8rem" }}>
        {" "}
        <span style={{ fontWeight: "600" }}>₹{card.price}</span> night{" "}
      </p>
    </div>
  );
}

export default Card;
