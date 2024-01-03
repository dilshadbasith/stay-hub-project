import React from "react";
import "./App.css";

import Home from "./Components/Home";
import { myContext } from "./Components/Context";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginModal from "./Components/Modals/LoginModal";
import DialogWithForm from "./Components/Modals/RegisterModal";
import BrowseCards from "./Components/Cards/BrowseCards";
import { list } from "./Components/Assets/CardsLists";
import AirbnbYourHome from "./Components/Airbnb-components/AirbnbYourHome";
import AdminHome from "./Components/Admin/AdminHome";
import Dash from "./Components/Admin/Dash";
import { UserList } from "./Components/Admin/UserList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RentPage from "./Components/RentPage/RentPage";

function App() {
  const [cards, setCards] = useState(list);
  const [modal, setModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const handleLoginOpen = () => setLoginOpen((cur) => !cur);

  return (
    <>    
    <ToastContainer autoClose={3000} position="top-center"/>
      <myContext.Provider
        value={{
          modal,
          setModal,
          open,
          setOpen,
          handleOpen,
          loginOpen,
          setLoginOpen,
          handleLoginOpen,
          cards,
          setCards,
        }}
      >
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browsecard/:id" element={<BrowseCards />} />
          <Route path="/airbnbhome" element={<AirbnbYourHome />} />
          <Route path="/rentpage" element={<RentPage />} />

          <Route path="/adminhome" element={<AdminHome />} />
          <Route element={<AdminHome />}>
            <Route path="/dash" element={<Dash />} />
            <Route path="/userlist" element={<UserList />} />
          </Route>
        </Routes>
      </myContext.Provider>
    </>
  );
}

export default App;
