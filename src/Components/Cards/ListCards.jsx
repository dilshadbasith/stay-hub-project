import React, { useEffect, useState } from "react";
import "../Cards/Cards.css";
import Card from "./Card";
import Axios from "../../lib/Axios";

function ListCards({ searchQuery }) {
  const [cardList, setCardList] = useState([]);
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
        cardList.map((card, i) => <Card card={card} key={i} />)
      )}
    </div>
  );
}

export default ListCards;
