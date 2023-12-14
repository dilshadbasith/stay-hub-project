import React from 'react'
import '../Cards/Cards.css'
import Card from './Card'
import { list } from '../Assets/CardsLists'


function ListCards() {
  return (
    <div className='cards-flex'>
      {list.map((card, i) => (
        <Card card={card} key={i} />
      ))}
    </div>
  )
}

export default ListCards