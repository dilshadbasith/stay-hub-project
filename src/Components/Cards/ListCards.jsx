import React, { useContext, useEffect, useState } from "react";
import "../Cards/Cards.css";
import Card from "./Card";
import Axios from "../../lib/Axios";
import { myContext } from "../Context";
import Skeleton from "react-loading-skeleton";

function ListCards({ searchQuery }) {
  const [cardList, setCardList] = useState([]);
  const { searchs } = useContext(myContext);
  const [isLoading, setIsLoading] = useState(true);
  // console.log({searchQuery});

  async function Cards() {
    const list = await Axios.get(`/api/data/listings?category=${searchQuery}`)
    setCardList(list.data.data);
    
  }

  useEffect(() => {
    setTimeout(()=>{
      if (searchQuery) {
        Cards();
        setIsLoading(false);
      } else {
        setCardList([]);
      }
    },1000)
  }, [searchQuery]);
  // console.log(cardList, "hello");

  return (
    <>
      
       
     
        <div className="cards-flex">
          {cardList.length === 0 && searchQuery ? (
            // <h1 className="no-list">No Listings Found!</h1>
        <div className="property-card-sk">
            <div className="property-card">
              <Skeleton height={270} width={270} />
              <Skeleton width={270} />
              <Skeleton width={270} />
              <Skeleton width={270} />
            </div>    
            <div className="property-card">
              <Skeleton height={270} width={270} />
              <Skeleton width={270} />
              <Skeleton width={270} />
              <Skeleton width={270} />
            </div>    
            <div className="property-card">
              <Skeleton height={270} width={270} />
              <Skeleton width={270} />
              <Skeleton width={270} />
              <Skeleton width={270} />
            </div>    
            <div className="property-card">
              <Skeleton height={270} width={270} />
              <Skeleton width={270} />
              <Skeleton width={270} />
              <Skeleton width={270} />
            </div>    
        </div>
          ) : (
            cardList
              .filter((item) => {
                return searchs?.toLowerCase() === ""
                  ? item
                  : item?.title?.toLowerCase()?.includes(searchs);
              })
              .map((card, i) => <Card card={card} key={i} />)
          )}
        </div>
    </>
  );
}

export default ListCards;
