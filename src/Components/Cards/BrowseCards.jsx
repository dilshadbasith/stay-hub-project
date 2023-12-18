import React, { useContext } from "react";
import { myContext } from "../Context";
import { useParams } from "react-router-dom";
import Navigationbar from "../Header/Navigationbar";
import "../Cards/Cards.css";

function BrowseCards() {
  const { cards } = useContext(myContext);
  const { id } = useParams();

  

  const data = cards.filter((item) => item.id === parseInt(id));
  return (
    <div>
      <Navigationbar />
      {data.map((item, index) => (
        <div key={index} className="browse-div">
          <h2 className="browse-title">{item.desc}</h2>
          <div className="img-main-div">
            <div>
              <img src={item.imgSrc[0]} alt="image" className="img1" />
            </div>
            <div className="img-sub-div">
              <img src={item.imgSrc[1]} alt="image" className="img2" />
              <img src={item.imgSrc[2]} alt="image" className="img2" />
            </div>
            <div className="img-sub-div">
              <img src={item.imgSrc[3]} alt="image" className="img2" />
              <img src={item.imgSrc[4]} alt="image" className="img2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BrowseCards;
