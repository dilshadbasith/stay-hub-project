

import './App.css'

import Home from './Components/Home'
import { myContext } from './Components/Context'
import { useState } from 'react'


function App() {
  const [modal,setModal]=useState(false)

  return (
    <>
    <myContext.Provider value={{modal,setModal}}>
    <Home/>
    </myContext.Provider>
      
    </>
  )
}

export default App
