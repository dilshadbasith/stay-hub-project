
import React from "react";
import './App.css'

import Home from './Components/Home'
import { myContext } from './Components/Context'
import { useState } from 'react'


function App() {
  const [modal,setModal]=useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const handleLoginOpen = () => setLoginOpen((cur) => !cur);

  return (
    <>
    <myContext.Provider value={{modal,setModal,open,setOpen,handleOpen,loginOpen,setLoginOpen,handleLoginOpen}}>
    <Home/>
    </myContext.Provider>
      
    </>
  )
}

export default App
