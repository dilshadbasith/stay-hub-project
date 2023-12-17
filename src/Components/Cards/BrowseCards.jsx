import React, { useContext } from "react";
import { myContext } from "../Context";
import { useParams } from "react-router-dom";
import Navigationbar from "../Header/Navigationbar";

function BrowseCards() {
  const { cards } = useContext(myContext);
  const { id } = useParams();

  const data = cards.filter((item) => item.id === parseInt(id));
  return (
    <div>
      <Navigationbar />
      {data.map((item,index) => (
        <div key={index}>
            <h2>{item.title}</h2>
            <img src={item.imgSrc[0]} alt="" />
                                
        </div>
        
      ))}
    </div>
  );
}

export default BrowseCards;
