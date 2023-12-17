import React from 'react'
import '../Cards/Cards.css'
import Card from './Card'
import { list } from '../Assets/CardsLists'
import { useNavigate } from 'react-router-dom'


function ListCards() {
  
  return (
    <div className='cards-flex'>
      {list.map((card, i) => (
        <div>
        <Card card={card} key={i} />
        </div>
      ))}
    </div>
  )
}

export default ListCards