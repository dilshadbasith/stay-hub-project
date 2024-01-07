import React, { useEffect, useState } from 'react'
import '../Cards/Cards.css'
import Card from './Card'
import { useSelector } from 'react-redux'
import Axios from '../../lib/Axios'
// import { list } from '../Assets/CardsLists'



function ListCards() {
  // const list = useSelector(state=>state.listingCard)
  const [cardList, setCardList] = useState([]);

  async function Cards(){
    const list = await Axios.get("/api/data/listings")
    console.log(list.data)
    setCardList(list.data.data)
  }

  useEffect(()=>{
    Cards()
  },[])
  
  return (
    <div className='cards-flex'>
      {cardList.map((card, i) => (
        <div key={i}>
        <Card card={card} key={i} />
        </div>
      ))}
    </div>
  )
}

export default ListCards