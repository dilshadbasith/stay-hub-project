import React from 'react'
import '../Cards/Cards.css'
import Card from './Card'
import { useSelector } from 'react-redux'
// import { list } from '../Assets/CardsLists'



function ListCards() {
  const list = useSelector(state=>state.listingCard)
  
  return (
    <div className='cards-flex'>
      {list.map((card, i) => (
        <div key={i}>
        <Card card={card} key={i} />
        </div>
      ))}
    </div>
  )
}

export default ListCards