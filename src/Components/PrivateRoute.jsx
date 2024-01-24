import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoginModal from "./Modals/LoginModal";

function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      {currentUser ? (
        <div>
          <Outlet />
        </div>
      ) : (
        <div>
          <LoginModal />
        </div>
      )}
    </div>
  );
}

export default PrivateRoute;
