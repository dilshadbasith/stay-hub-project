import React, { useContext } from "react";
import Navigationbar from "./Header/Navigationbar";
import Icons from "./Icons/Icons";
import ListCards from "./Cards/ListCards";
import LoginModal from "./Modals/LoginModal";
import { myContext } from "./Context";
import DialogWithForm from "./Modals/RegisterModal";
import Footer from "./Footer/Footer";

function Home() {
  const { open,loginOpen } = useContext(myContext);
  return (
    <div>
      <Navigationbar />
      <Icons />
      <ListCards />
      {loginOpen && <LoginModal />}
      {open && <DialogWithForm/>}
      <Footer/>
    </div>
  );
}

export default Home;
