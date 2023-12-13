import React from 'react'
import Navigationbar from './Header/Navigationbar'
import Icons from './Icons/Icons'
import ListCards from './Cards/ListCards'


function Home() {
  return (
    <div>
      <Navigationbar/>  
      <Icons/>
      <ListCards/>
    </div>
  )
}

export default Home