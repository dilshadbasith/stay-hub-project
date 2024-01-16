import React, { useContext, useEffect, useState } from "react";
import "../Cards/Cards.css";
import Card from "./Card";
import Axios from "../../lib/Axios";
import { myContext } from "../Context";

function ListCards({ searchQuery }) {
  const [cardList, setCardList] = useState([]);
  const {searchs}=useContext(myContext)
  // console.log({searchQuery});

  async function Cards() {
    const list = await Axios.get(`/api/data/listings?category=${searchQuery}`);
    // console.log(list.data, "kooi");
    setCardList(list.data.data);
  }

  useEffect(() => {
    if (searchQuery) {
      Cards();
    } else {
      setCardList([]);
    }
  }, [searchQuery]);
  // console.log(cardList, "hello");

  return (
    <div className="cards-flex">
      {cardList.length === 0 && searchQuery ? (
        <h1 className="no-list">No Listings Found!</h1>
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
  );
}

export default ListCards;
