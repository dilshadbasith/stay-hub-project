import React, { useContext } from "react";
import "../GoogleAuth/GAuth.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../Firebase";
import Axios from "../../lib/Axios";
import { signInFailure, signinSuccess } from "../../Redux/Reducers/UserReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myContext } from "../Context";
import { useCookies } from "react-cookie";
import google from "../Assets/google-icon.png";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";

function GAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleLoginOpen } = useContext(myContext);
  const [_, setCookie] = useCookies(["access_token"]);

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      // console.log(result.user.displayName)
      const res = await fetch("https://airbnb-backend-yzyl.onrender.com/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }),
      });

      const data = await res.json();
      if (data.adminSuspended == true) {
        toast.error("Login failed. You are a Suspended User");
        dispatch(signInFailure());
        handleLoginOpen()
      } else {
        //  console.log(data);
        setCookie("access_token", data.accessToken);
        dispatch(signinSuccess(data));
        navigate("/");
        handleLoginOpen();
        toast.success("Login successfull");
      }
    } catch (error) {
      console.log("could not signin with google", error);
    }
  };
  return (
    <div>
      <Button
      color="white"
      fullWidth
        onClick={handleGoogleClick}
        type="button"
        className=" flex items-center justify-center border-[.05rem] border-black font-bold"
      >
        <img src={google} alt="image" className="g-img" />
        <h1>Continue with Google</h1>
      </Button>
    </div>
  );
}

export default GAuth;
