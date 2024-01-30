

import React, { useContext, useEffect, useState } from "react";
import "../Cards/Cards.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { myContext } from "../Context";
import Axios from "../../lib/Axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { addToFav, removeFromFav } from "../../Redux/Reducers/UserReducer";

function Card({ card }) {
  const [isClicked, setIsClicked] = useState(false);
  const [cardList, setCardList] = useState([]);
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { handleLoginOpen } = useContext(myContext);

  const handleFav = async (listingId) => {
    try {
      const isFavorite = currentUser.favoriteIds?.some((fav) => fav == listingId);

      if (isFavorite) {
        const res = await Axios.put(
          "/api/users/favorites",
          { listingId },
          {
            headers: { Authorization: `Bearer ${cookies.access_token}` },
          }
        );

        const listingIds = currentUser.favoriteIds.map((fav) => fav);
        const newlistingid = listingIds.filter((item) => item == listingId);

        dispatch(removeFromFav(newlistingid.toString()));
        toast.success("Removed from Favorites");
      } else {
        const res = await Axios.post(
          "/api/users/favorites",
          { listingId },
          {
            headers: { Authorization: `Bearer ${cookies.access_token}` },
          }
        );
        dispatch(addToFav(res.data.favorite.listingId));
        toast.success("Added to Favorites");
        console.log(res.data, "looi");
      }

      setIsClicked(!isFavorite);
      localStorage.setItem(`favorite_${listingId}`, JSON.stringify(!isFavorite));
    } catch (error) {
      console.log(error);
    }
  };

  async function Cards() {
    const list = await Axios.get("/api/data/listings");
    setCardList(list.data);
  }

  useEffect(() => {
    Cards();
  }, []);

  useEffect(() => {
    const storedFavorite = localStorage.getItem(`favorite_${card._id}`);
    if (storedFavorite !== null) {
      setIsClicked(JSON.parse(storedFavorite));
    }
  }, [card._id]);

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
        {card?.properties?.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              className="card-img"
              onClick={() => navigate(`/browsecard/${card._id}`)}
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
                <FaHeart
                  onClick={() => handleFav(card._id)}
                  className={isClicked ? "redheart" : "heart"}
                />
              ) : (
                <FaHeart className="heart" onClick={() => handleLoginOpen()} />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="card-info">
        <h3 className="card-title">{card.title}</h3>
      </div>
      <p style={{ margin: 0, color: "gray" }}>{card.locationValue.location}</p>
      <p style={{ margin: 0, color: "black", fontSize: ".8rem" }}>
        {" "}
        <span style={{ fontWeight: "600" }}>₹{card.price}</span> night{" "}
      </p>
    </div>
  );
}

export default Card;
