import React, { useContext } from "react";
import Navigationbar from "./Header/Navigationbar";
import Icons from "./Icons/Icons";
import ListCards from "./Cards/ListCards";
import LoginModal from "./Modals/LoginModal";
import { myContext } from "./Context";

function Home() {
  const { modal } = useContext(myContext);
  return (
    <div>
      <Navigationbar />
      <Icons />
      <ListCards />
      {modal && <LoginModal />}
    </div>
  );
}

export default Home;
